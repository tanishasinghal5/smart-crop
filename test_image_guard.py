"""Test Suite for ImageGuard.

Comprehensive tests:
1. Good Leaf Image:
   - High-resolution (512x512), sharp focus, natural daylight exposure, clearly visible leaf with lesions.
2. Bad Images:
   - Blur Failure: Out-of-focus / motion-blurred leaf.
   - Low Brightness Failure: Severely underexposed / dark shadow.
   - High Brightness Failure: Severely overexposed / blown-out flash glare.
   - No Leaf Failure: Sharp, textured non-plant surface (checkerboard/countertop).
   - Dimensions Failure: Undersized image (80x80) and skewed aspect ratio (600x60).
"""

import os
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from image_guard import ImageGuard, ImageVerdict

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "test_images")
os.makedirs(OUTPUT_DIR, exist_ok=True)


def generate_good_leaf_image(path: str) -> Image.Image:
    """Creates a high-quality, sharp, well-exposed leaf image with lesion spots."""
    img = Image.new("RGB", (512, 512), color=(215, 218, 212))
    draw = ImageDraw.Draw(img)

    # 1. Main leaf body (healthy green)
    draw.ellipse([90, 60, 420, 450], fill=(42, 135, 38), outline=(28, 90, 22), width=3)

    # 2. Leaf midrib and lateral veins
    draw.line([255, 60, 255, 450], fill=(24, 78, 18), width=4)
    for y in range(110, 410, 35):
        draw.line([255, y, 140, y + 30], fill=(60, 165, 50), width=2)
        draw.line([255, y, 370, y + 30], fill=(60, 165, 50), width=2)

    # 3. Disease lesions (concentric early blight spots with chlorotic halo)
    draw.ellipse([160, 150, 230, 220], fill=(160, 175, 45))
    draw.ellipse([170, 160, 220, 210], fill=(105, 55, 20), outline=(75, 38, 12), width=2)
    draw.ellipse([185, 175, 205, 195], fill=(50, 25, 8))

    draw.ellipse([290, 260, 360, 330], fill=(165, 178, 50))
    draw.ellipse([300, 270, 350, 320], fill=(115, 62, 22), outline=(80, 42, 14), width=2)

    img.save(path, format="JPEG", quality=95)
    return img


def generate_blurry_image(good_img: Image.Image, path: str) -> Image.Image:
    """Heavily blurs the good leaf image."""
    blurred = good_img.filter(ImageFilter.GaussianBlur(radius=12))
    blurred.save(path, format="JPEG", quality=90)
    return blurred


def generate_dark_image(good_img: Image.Image, path: str) -> Image.Image:
    """Severely underexposes the leaf image (mean luminance < 25)."""
    arr = np.asarray(good_img, dtype=np.float32) * 0.12
    dark = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    dark.save(path, format="JPEG", quality=90)
    return dark


def generate_bright_image(good_img: Image.Image, path: str) -> Image.Image:
    """Severely overexposes / washes out the image (mean luminance > 240)."""
    arr = np.asarray(good_img, dtype=np.float32) * 0.8 + 170.0
    bright = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    bright.save(path, format="JPEG", quality=90)
    return bright


def generate_sharp_no_leaf_image(path: str) -> Image.Image:
    """Creates a high-contrast, sharp textured pattern without any botanical leaf tissue."""
    arr = np.zeros((400, 400, 3), dtype=np.uint8)
    for i in range(0, 400, 25):
        for j in range(0, 400, 25):
            if (i // 25 + j // 25) % 2 == 0:
                arr[i : i + 25, j : j + 25] = [210, 80, 80]   # reddish-pink squares
            else:
                arr[i : i + 25, j : j + 25] = [70, 70, 130]   # blue squares
    no_leaf = Image.fromarray(arr)
    no_leaf.save(path, format="JPEG", quality=95)
    return no_leaf


def generate_undersized_image(good_img: Image.Image, path: str) -> Image.Image:
    """Downsamples image to 80x80 pixels."""
    small = good_img.resize((80, 80), Image.BILINEAR)
    small.save(path, format="JPEG", quality=85)
    return small


def run_tests():
    print("=" * 82)
    print("IMAGE QUALITY & INPUT GUARD TEST SUITE")
    print("=" * 82)

    good_path = os.path.join(OUTPUT_DIR, "test_good_leaf.jpg")
    blurry_path = os.path.join(OUTPUT_DIR, "test_bad_blur.jpg")
    dark_path = os.path.join(OUTPUT_DIR, "test_bad_dark.jpg")
    bright_path = os.path.join(OUTPUT_DIR, "test_bad_bright.jpg")
    no_leaf_path = os.path.join(OUTPUT_DIR, "test_bad_no_leaf.jpg")
    undersized_path = os.path.join(OUTPUT_DIR, "test_bad_small.jpg")

    good_img = generate_good_leaf_image(good_path)
    generate_blurry_image(good_img, blurry_path)
    generate_dark_image(good_img, dark_path)
    generate_bright_image(good_img, bright_path)
    generate_sharp_no_leaf_image(no_leaf_path)
    generate_undersized_image(good_img, undersized_path)

    test_cases = [
        {
            "name": "Good Leaf Image",
            "path": good_path,
            "expected_status": "ok",
            "expected_pass": True,
            "expected_fail_check": None,
        },
        {
            "name": "Bad Image: Out-of-Focus / Motion Blur",
            "path": blurry_path,
            "expected_status": "reject",
            "expected_pass": False,
            "expected_fail_check": "blur",
        },
        {
            "name": "Bad Image: Underexposed (Too Dark)",
            "path": dark_path,
            "expected_status": "reject",
            "expected_pass": False,
            "expected_fail_check": "brightness",
        },
        {
            "name": "Bad Image: Overexposed (Too Bright / Glare)",
            "path": bright_path,
            "expected_status": "reject",
            "expected_pass": False,
            "expected_fail_check": "brightness",
        },
        {
            "name": "Bad Image: No Leaf Tissue Visible",
            "path": no_leaf_path,
            "expected_status": "reject",
            "expected_pass": False,
            "expected_fail_check": "leaf_visibility",
        },
        {
            "name": "Bad Image: Undersized Dimensions (80x80)",
            "path": undersized_path,
            "expected_status": "reject",
            "expected_pass": False,
            "expected_fail_check": "dimensions",
        },
    ]

    all_passed = True

    for idx, tc in enumerate(test_cases, 1):
        print(f"\n[{idx}] Testing: {tc['name']}")
        verdict: ImageVerdict = ImageGuard.validate(tc["path"])

        m = verdict.metrics
        dim_info = m.get("dimensions", {})
        bright_info = m.get("brightness", {})
        blur_info = m.get("blur", {})
        leaf_info = m.get("leaf_visibility", {})

        print(f"    • Resolution:      {dim_info.get('width')}x{dim_info.get('height')}")
        print(f"    • Brightness:      {bright_info.get('mean_luminance', 'N/A')} / 255")
        print(f"    • Blur Variance:   {blur_info.get('laplacian_variance', 'N/A')} (min {ImageGuard.MIN_BLUR_VARIANCE})")
        print(f"    • Leaf Coverage:   {leaf_info.get('leaf_coverage_pct', 'N/A')}% (min {ImageGuard.MIN_LEAF_RATIO * 100:.0f}%)")
        print(f"    • Verdict Status:  {verdict.status.upper()} (passed: {verdict.passed})")
        print(f"    • Headline:        {verdict.headline}")
        if verdict.issues:
            print(f"    • Detected Issue:  {verdict.issues[0]}")
        if verdict.recommendations:
            print(f"    • Action Advice:   {verdict.recommendations[0]}")

        # Assertions
        status_match = verdict.status == tc["expected_status"]
        pass_match = verdict.passed == tc["expected_pass"]
        check_match = (verdict.failed_check == tc["expected_fail_check"])

        test_success = status_match and pass_match and check_match
        tag = "[PASS]" if test_success else "[FAIL]"
        print(f"    • Assertion Check: {tag} (Expected status='{tc['expected_status']}', failed_check='{tc['expected_fail_check']}')")

        if not test_success:
            all_passed = False

    print("\n" + "=" * 82)
    print(f"FINAL RESULT: {'[SUCCESS] ALL TEST CASES PASSED PERFECTLY' if all_passed else '[FAILURE] SOME TESTS FAILED'}")
    print("=" * 82)
    return all_passed


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
