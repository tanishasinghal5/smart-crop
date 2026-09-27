"""Image Quality & Input Guard for Crop Disease Detection.

Validates leaf photos before they reach the disease detection model:
  1. Basic Image Dimensions (resolution >= 224x224, aspect ratio, 3-channel RGB)
  2. Brightness Check (underexposure, overexposure, clipping)
  3. Blur Detection (Laplacian variance edge energy)
  4. Leaf Visibility (Excess Green & botanical color space segmentation)
"""

from __future__ import annotations

import io
from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union

import numpy as np
from PIL import Image


@dataclass
class ImageVerdict:
    status: str  # "ok" | "caution" | "reject"
    passed: bool
    headline: str
    issues: List[str] = field(default_factory=list)
    recommendations: List[str] = field(default_factory=list)
    metrics: Dict[str, Any] = field(default_factory=dict)
    failed_check: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class ImageGuard:
    """Pre-inference validation for crop disease leaf images."""

    # Default thresholds calibrated for plant pathology photography
    MIN_WIDTH: int = 224
    MIN_HEIGHT: int = 224
    MAX_ASPECT_RATIO: float = 3.0

    # Brightness thresholds (0-255 scale)
    MIN_BRIGHTNESS: float = 40.0
    MAX_BRIGHTNESS: float = 215.0
    MAX_DARK_CLIPPING: float = 0.35   # fraction of pixels < 15
    MAX_BRIGHT_CLIPPING: float = 0.35 # fraction of pixels > 245

    # Blur threshold (Laplacian variance on 224x224 grayscale)
    MIN_BLUR_VARIANCE: float = 80.0
    CAUTION_BLUR_VARIANCE: float = 140.0

    # Leaf visibility threshold (fraction of leaf/foliage pixels in image)
    MIN_LEAF_RATIO: float = 0.15      # At least 15% leaf area required
    CAUTION_LEAF_RATIO: float = 0.25

    @classmethod
    def load_image(cls, source: Union[str, bytes, io.BytesIO, Image.Image]) -> Image.Image:
        """Helper to convert file path, raw bytes, or BytesIO to a PIL Image."""
        if isinstance(source, Image.Image):
            return source.copy()
        if isinstance(source, (str, bytes, io.BytesIO)):
            if isinstance(source, str):
                img = Image.open(source)
            elif isinstance(source, bytes):
                img = Image.open(io.BytesIO(source))
            else:
                img = Image.open(source)
            return img
        raise TypeError(f"Unsupported image input type: {type(source)}")

    # -------------------------------------------------------------------------
    # 1. BASIC IMAGE DIMENSIONS
    # -------------------------------------------------------------------------
    @classmethod
    def check_dimensions(
        cls,
        image: Image.Image,
        min_w: int = MIN_WIDTH,
        min_h: int = MIN_HEIGHT,
        max_aspect: float = MAX_ASPECT_RATIO,
    ) -> Tuple[bool, List[str], Dict[str, Any]]:
        w, h = image.size
        aspect = max(w / h, h / w) if min(w, h) > 0 else 999.0
        mode = image.mode

        issues = []
        if w < min_w or h < min_h:
            issues.append(
                f"Image resolution {w}x{h} is too small. Minimum required is {min_w}x{min_h} pixels "
                f"to resolve leaf textures and lesions."
            )

        if aspect > max_aspect:
            issues.append(
                f"Aspect ratio {w}:{h} ({aspect:.2f}:1) is excessively skewed. "
                f"Use a standard square or 4:3 / 16:9 crop."
            )

        # Color channels check
        if mode not in ("RGB", "RGBA"):
            issues.append(
                f"Image mode '{mode}' is not color RGB. Disease models require color images."
            )

        metrics = {
            "width": w,
            "height": h,
            "aspect_ratio": round(aspect, 2),
            "mode": mode,
            "min_required": f"{min_w}x{min_h}",
        }
        return (len(issues) == 0, issues, metrics)

    # -------------------------------------------------------------------------
    # 2. BRIGHTNESS CHECK
    # -------------------------------------------------------------------------
    @classmethod
    def check_brightness(
        cls,
        image: Image.Image,
        min_mean: float = MIN_BRIGHTNESS,
        max_mean: float = MAX_BRIGHTNESS,
        max_dark_clip: float = MAX_DARK_CLIPPING,
        max_bright_clip: float = MAX_BRIGHT_CLIPPING,
    ) -> Tuple[str, List[str], Dict[str, Any]]:
        """Evaluates image exposure and luminance distribution."""
        rgb = np.asarray(image.convert("RGB"), dtype=np.float32)
        # Perceived luminance (ITU-R BT.601)
        lum = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]

        mean_lum = float(np.mean(lum))
        dark_clip = float(np.mean(lum < 15.0))
        bright_clip = float(np.mean(lum > 245.0))

        issues = []
        status = "ok"

        if mean_lum < min_mean or dark_clip > max_dark_clip:
            status = "reject"
            issues.append(
                f"Image is too dark / underexposed (average brightness: {mean_lum:.1f}/255, "
                f"{dark_clip * 100:.1f}% shadows clipped). Retake with adequate lighting."
            )
        elif mean_lum > max_mean or bright_clip > max_bright_clip:
            status = "reject"
            issues.append(
                f"Image is too bright / overexposed (average brightness: {mean_lum:.1f}/255, "
                f"{bright_clip * 100:.1f}% highlights clipped). Retake avoiding harsh flash/glare."
            )
        elif mean_lum < min_mean + 15.0 or mean_lum > max_mean - 15.0:
            status = "caution"
            issues.append(
                f"Suboptimal lighting (average brightness: {mean_lum:.1f}/255). "
                f"Diagnosis confidence may be affected."
            )

        metrics = {
            "mean_luminance": round(mean_lum, 1),
            "dark_clipped_pct": round(dark_clip * 100, 1),
            "bright_clipped_pct": round(bright_clip * 100, 1),
            "acceptable_range": f"{min_mean}-{max_mean}",
        }
        return (status, issues, metrics)

    # -------------------------------------------------------------------------
    # 3. BLUR DETECTION
    # -------------------------------------------------------------------------
    @classmethod
    def check_blur(
        cls,
        image: Image.Image,
        min_variance: float = MIN_BLUR_VARIANCE,
        caution_variance: float = CAUTION_BLUR_VARIANCE,
    ) -> Tuple[str, List[str], Dict[str, Any]]:
        """Measures focus sharpness using the variance of the 2D discrete Laplacian."""
        # Resize to fixed standard evaluation resolution (e.g. 224x224) so blur score is scale-invariant
        eval_img = image.convert("L").resize((224, 224), Image.BILINEAR)
        gray = np.asarray(eval_img, dtype=np.float32)

        # 4-connected discrete Laplacian operator
        lap = (
            gray[:-2, 1:-1]
            + gray[2:, 1:-1]
            + gray[1:-1, :-2]
            + gray[1:-1, 2:]
            - 4.0 * gray[1:-1, 1:-1]
        )
        variance = float(np.var(lap))

        # Normalized sharpness index (0 to 100)
        sharpness_index = min(100.0, round((variance / 500.0) * 100.0, 1))

        issues = []
        status = "ok"

        if variance < min_variance:
            status = "reject"
            issues.append(
                f"Image is out-of-focus or motion-blurred (sharpness variance: {variance:.1f}, "
                f"threshold: {min_variance}). Hold camera steady and refocus on leaf."
            )
        elif variance < caution_variance:
            status = "caution"
            issues.append(
                f"Image focus is soft (sharpness variance: {variance:.1f}). "
                f"Fine disease pustules/veins may be blurry."
            )

        metrics = {
            "laplacian_variance": round(variance, 2),
            "sharpness_index": sharpness_index,
            "threshold": min_variance,
            "is_sharp": variance >= min_variance,
        }
        return (status, issues, metrics)

    # -------------------------------------------------------------------------
    # 4. LEAF VISIBILITY CHECK
    # -------------------------------------------------------------------------
    @classmethod
    def check_leaf_visibility(
        cls,
        image: Image.Image,
        min_ratio: float = MIN_LEAF_RATIO,
        caution_ratio: float = CAUTION_LEAF_RATIO,
    ) -> Tuple[str, List[str], Dict[str, Any]]:
        """Segments botanical foliage and lesion tissue using color space indices."""
        eval_img = image.convert("RGB").resize((224, 224), Image.BILINEAR)
        rgb = np.asarray(eval_img, dtype=np.float32)
        r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]

        # 1. Excess Green Index (ExG): standard agricultural vegetation index
        exg = 2.0 * g - r - b

        # 2. Green healthy/chlorotic foliage
        green_foliage = (g > r * 1.04) & (g > b * 1.10) & (g > 25.0) & (exg > 8.0)

        # 3. Chlorotic / yellow diseased foliage (e.g. Tomato yellow leaf curl, rust halos)
        yellow_foliage = (
            (r > 65.0) & (g > 65.0) & (b < 85.0) & (np.abs(r - g) < 45.0) & (g > b * 1.2)
        )

        # 4. Necrotic / brown leaf spots (e.g. Black rot, Early blight lesions)
        brown_lesions = (
            (r > 40.0)
            & (g > 25.0)
            & (b < 60.0)
            & (r > b * 1.25)
            & (g > b * 0.9)
            & (r >= g)
            & (r < 190.0)
        )

        leaf_mask = green_foliage | yellow_foliage | brown_lesions
        leaf_ratio = float(np.mean(leaf_mask))

        issues = []
        status = "ok"

        if leaf_ratio < min_ratio:
            status = "reject"
            issues.append(
                f"No leaf detected in photo (detected plant tissue: {leaf_ratio * 100:.1f}%, "
                f"minimum required: {min_ratio * 100:.0f}%). "
                f"Upload a clear close-up of an infected plant leaf."
            )
        elif leaf_ratio < caution_ratio:
            status = "caution"
            issues.append(
                f"Leaf occupies only a small portion of the frame ({leaf_ratio * 100:.1f}%). "
                f"Move camera closer to the leaf for more accurate diagnosis."
            )

        metrics = {
            "leaf_pixel_ratio": round(leaf_ratio, 3),
            "leaf_coverage_pct": round(leaf_ratio * 100.0, 1),
            "min_required_pct": round(min_ratio * 100.0, 1),
            "has_leaf": leaf_ratio >= min_ratio,
        }
        return (status, issues, metrics)

    # -------------------------------------------------------------------------
    # COMPREHENSIVE VERDICT
    # -------------------------------------------------------------------------
    @classmethod
    def validate(cls, source: Union[str, bytes, io.BytesIO, Image.Image]) -> ImageVerdict:
        """Runs the four screening layers in sequence:
        Dimensions -> Brightness -> Blur -> Leaf Visibility.
        """
        try:
            image = cls.load_image(source)
        except Exception as exc:
            return ImageVerdict(
                status="reject",
                passed=False,
                headline="Could not read image file",
                issues=[f"Corrupt or unsupported image format: {exc}"],
                recommendations=["Please upload a valid JPG or PNG photo."],
                failed_check="format",
            )

        all_issues = []
        all_recs = []
        metrics: Dict[str, Any] = {}

        # Layer 1: Basic Dimensions
        ok_dim, dim_issues, dim_metrics = cls.check_dimensions(image)
        metrics["dimensions"] = dim_metrics
        if not ok_dim:
            return ImageVerdict(
                status="reject",
                passed=False,
                headline="Image resolution or aspect ratio invalid",
                issues=dim_issues,
                recommendations=[
                    "Provide a color photo of at least 224x224 pixels with standard aspect ratio."
                ],
                metrics=metrics,
                failed_check="dimensions",
            )

        # Layer 2: Brightness
        bright_status, bright_issues, bright_metrics = cls.check_brightness(image)
        metrics["brightness"] = bright_metrics
        if bright_status == "reject":
            return ImageVerdict(
                status="reject",
                passed=False,
                headline="Poor lighting conditions",
                issues=bright_issues,
                recommendations=[
                    "Take photo in natural, indirect daylight without dark shadows or direct flash."
                ],
                metrics=metrics,
                failed_check="brightness",
            )
        elif bright_status == "caution":
            all_issues.extend(bright_issues)

        # Layer 3: Blur Detection
        blur_status, blur_issues, blur_metrics = cls.check_blur(image)
        metrics["blur"] = blur_metrics
        if blur_status == "reject":
            return ImageVerdict(
                status="reject",
                passed=False,
                headline="Image is too blurry",
                issues=blur_issues,
                recommendations=[
                    "Hold phone steady, tap on the leaf lesion to focus, and retake the picture."
                ],
                metrics=metrics,
                failed_check="blur",
            )
        elif blur_status == "caution":
            all_issues.extend(blur_issues)

        # Layer 4: Leaf Visibility
        leaf_status, leaf_issues, leaf_metrics = cls.check_leaf_visibility(image)
        metrics["leaf_visibility"] = leaf_metrics
        if leaf_status == "reject":
            return ImageVerdict(
                status="reject",
                passed=False,
                headline="No plant leaf detected",
                issues=leaf_issues,
                recommendations=[
                    "Ensure the camera is pointing directly at a plant leaf, filling at least 25% of the frame."
                ],
                metrics=metrics,
                failed_check="leaf_visibility",
            )
        elif leaf_status == "caution":
            all_issues.extend(leaf_issues)

        # If any check raised a caution
        if all_issues:
            return ImageVerdict(
                status="caution",
                passed=True,
                headline="Image quality acceptable with cautions",
                issues=all_issues,
                recommendations=[
                    "For highest diagnostic confidence, ensure sharp focus and fill frame with leaf."
                ],
                metrics=metrics,
                failed_check=None,
            )

        return ImageVerdict(
            status="ok",
            passed=True,
            headline="Image passed quality screening",
            issues=[],
            recommendations=[],
            metrics=metrics,
            failed_check=None,
        )
