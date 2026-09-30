import os
import sys
import json

import numpy as np
from PIL import Image
import keras

from dotenv import load_dotenv
load_dotenv()

# ============================================================
# CONFIGURATION
# ============================================================

MODEL_PATH = "crop_disease_mobilenetv2.keras"
IMAGE_SIZE = (224, 224)

TOP_K = 5

HIGH_CONFIDENCE = 0.80
MEDIUM_CONFIDENCE_LOW = 0.60
MEDIUM_CONFIDENCE_HIGH = 0.79

# If the top two predictions are very close, treat the result
# as ambiguous even if the top prediction has reasonable confidence.
AMBIGUITY_GAP = 0.15


# ============================================================
# 38 PLANTVILLAGE CLASSES
# Must stay in exactly the same order as the trained model.
# ============================================================

DISEASE_LABELS = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy',
]


# ============================================================
# MODEL
# ============================================================

def load_model():
    print("\nLoading disease model...")

    if not os.path.exists(MODEL_PATH):
        print(f"ERROR: Model not found: {MODEL_PATH}")
        sys.exit(1)

    model = keras.saving.load_model(
        MODEL_PATH,
        compile=False
    )

    print("Model loaded successfully.")
    print(f"Input shape : {model.input_shape}")
    print(f"Output shape: {model.output_shape}")

    if model.output_shape[-1] != len(DISEASE_LABELS):
        print(
            "\nERROR: Model output count does not match "
            "DISEASE_LABELS."
        )
        print(f"Model outputs: {model.output_shape[-1]}")
        print(f"Labels       : {len(DISEASE_LABELS)}")
        sys.exit(1)

    return model


# ============================================================
# IMAGE PREPROCESSING
# ============================================================

def preprocess_image(image_path):
    if not os.path.exists(image_path):
        print(f"\nERROR: Image not found: {image_path}")
        sys.exit(1)

    print("\nLoading image...")
    print(f"Image: {image_path}")

    image = Image.open(image_path).convert("RGB")

    print(f"Original size: {image.size}")

    image = image.resize(IMAGE_SIZE)

    # The saved model contains a Rescaling layer:
    #
    # scale  = 1 / 127.5
    # offset = -1
    #
    # Therefore:
    #
    # [0,255] -> [-1,1]
    #
    # IMPORTANT:
    # We do NOT apply this transformation here because
    # the Keras model already contains the Rescaling layer.

    image_array = np.asarray(image, dtype=np.float32)

    image_array = np.expand_dims(image_array, axis=0)

    return image_array


# ============================================================
# CNN PREDICTION
# ============================================================

def predict_cnn(model, image_array):
    print("\nRunning CNN prediction...")

    predictions = model.predict(
        image_array,
        verbose=0
    )[0]

    # Safety check
    if not np.isclose(np.sum(predictions), 1.0, atol=0.01):
        print(
            "WARNING: Model output does not appear "
            "to be a probability distribution."
        )

    top_indices = np.argsort(predictions)[::-1][:TOP_K]

    results = []

    for rank, index in enumerate(top_indices, start=1):
        confidence = float(predictions[index])

        results.append({
            "rank": rank,
            "class_index": int(index),
            "label": DISEASE_LABELS[index],
            "confidence": confidence
        })

    return results


# ============================================================
# CONFIDENCE ANALYSIS
# ============================================================

def analyze_confidence(results):
    top = results[0]

    top_confidence = top["confidence"]

    if len(results) >= 2:
        second_confidence = results[1]["confidence"]
    else:
        second_confidence = 0.0

    confidence_gap = top_confidence - second_confidence

    if top_confidence >= HIGH_CONFIDENCE:
        confidence_level = "HIGH"
    elif top_confidence >= MEDIUM_CONFIDENCE_LOW:
        confidence_level = "MEDIUM"
    else:
        confidence_level = "LOW"

    ambiguous = confidence_gap < AMBIGUITY_GAP

    return {
        "confidence_level": confidence_level,
        "top_confidence": top_confidence,
        "second_confidence": second_confidence,
        "confidence_gap": confidence_gap,
        "ambiguous": ambiguous
    }


# ============================================================
# HEALTHY / DISEASE CLASSIFICATION
# ============================================================

def is_healthy_label(label):
    return "___healthy" in label


def analyze_domain(result):
    label = result["label"]

    parts = label.split("___", 1)

    if len(parts) == 2:
        crop = parts[0]
        condition = parts[1]
    else:
        crop = "Unknown"
        condition = label

    return {
        "crop": crop,
        "condition": condition,
        "healthy": is_healthy_label(label)
    }


# ============================================================
# GEMINI
# ============================================================

def run_gemini(image_path, cnn_results, confidence_analysis):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return {
            "enabled": False,
            "status": "SKIPPED",
            "reason": "GEMINI_API_KEY is not set."
        }

    try:
        from google import genai
    except ImportError:
        return {
            "enabled": False,
            "status": "SKIPPED",
            "reason": (
                "google-genai is not installed in this environment."
            )
        }

    print("\nRunning Gemini visual verification...")

    top_prediction = cnn_results[0]

    prompt = f"""
You are a secondary visual verification system for a crop disease
detection application.

Do NOT replace the specialist CNN classifier.

The CNN predicted:

Disease/class: {top_prediction["label"]}
CNN confidence: {top_prediction["confidence"]:.2%}

The CNN's top-2 confidence gap is:
{confidence_analysis["confidence_gap"]:.2%}

Your job is to visually inspect the supplied image and determine:

1. What crop/plant is visible, if identifiable.
2. Whether the image appears to show a plant leaf suitable for
   leaf-disease classification.
3. Whether the CNN prediction is visually supported.
4. Whether the image appears to show a condition that may not
   be reliably represented by the CNN's 38-class PlantVillage
   label set.
5. Briefly explain the visual evidence.

Important:
- Do not invent certainty.
- If the image is a fruit, object, poor-quality image, or otherwise
  unsuitable for leaf disease classification, say so.
- If the CNN prediction is not visually supported, say so.
- Do not simply repeat the CNN prediction.
- This is a verification step, not the primary classifier.

Return JSON with exactly these fields:

{{
  "crop": "...",
  "is_leaf_image": true,
  "cnn_prediction_supported": true,
  "possible_unsupported_category": false,
  "assessment": "...",
  "visual_evidence": ["...", "..."]
}}
"""

    try:
        client = genai.Client(api_key=api_key)

        with open(image_path, "rb") as f:
            image_bytes = f.read()

        # Gemini's Python SDK accepts image bytes through Part.
        from google.genai import types

        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type="image/jpeg"
                ),
                prompt
            ]
        )

        text = response.text.strip()

        # Remove markdown code fences if Gemini adds them.
        if text.startswith("```"):
            text = text.strip("`")

            if text.startswith("json"):
                text = text[4:].strip()

        try:
            parsed = json.loads(text)

            return {
                "enabled": True,
                "status": "SUCCESS",
                "result": parsed
            }

        except json.JSONDecodeError:
            return {
                "enabled": True,
                "status": "SUCCESS_TEXT",
                "result": text
            }

    except Exception as exc:
        return {
            "enabled": True,
            "status": "ERROR",
            "reason": f"{type(exc).__name__}: {exc}"
        }


# ============================================================
# FINAL DECISION
# ============================================================

def determine_status(cnn_results, confidence_analysis, gemini_result):
    top = cnn_results[0]

    confidence = confidence_analysis["top_confidence"]
    ambiguous = confidence_analysis["ambiguous"]

    # --------------------------------------------------------
    # 1. Start with the CNN assessment
    # --------------------------------------------------------

    if ambiguous:
        status = "NEEDS_REVIEW"
    elif confidence < MEDIUM_CONFIDENCE_LOW:
        status = "NEEDS_REVIEW"
    else:
        status = "CNN_PREDICTION"

    # --------------------------------------------------------
    # 2. Use Gemini only as a verification layer
    # --------------------------------------------------------

    if gemini_result.get("status") == "SUCCESS":

        result = gemini_result.get("result", {})

        is_leaf_image = result.get("is_leaf_image")
        cnn_supported = result.get("cnn_prediction_supported")
        unsupported_category = result.get(
            "possible_unsupported_category"
        )

        # Image isn't appropriate for the disease classifier.
        if is_leaf_image is False:
            status = "UNSUITABLE_IMAGE"

        # Gemini believes the image may contain something
        # outside the supported classification categories.
        elif unsupported_category is True:
            status = "NEEDS_REVIEW"

        # Gemini specifically disagrees with the CNN.
        elif cnn_supported is False:
            status = "NEEDS_REVIEW"

        # CNN is supported by Gemini and confidence isn't low.
        elif cnn_supported is True and not ambiguous:
            status = "CNN_PREDICTION_SUPPORTED"

        # CNN and Gemini agree, but CNN itself is ambiguous.
        elif cnn_supported is True and ambiguous:
            status = "NEEDS_REVIEW"

    return status


# ============================================================
# DISPLAY
# ============================================================

def print_results(
    image_path,
    cnn_results,
    confidence_analysis,
    domain_analysis,
    gemini_result,
    final_status
):
    print("\n")
    print("=" * 70)
    print("DISEASE DETECTION PIPELINE RESULT")
    print("=" * 70)

    print(f"\nImage:")
    print(f"  {image_path}")

    print("\nCNN TOP PREDICTIONS")
    print("-" * 70)

    for result in cnn_results:
        print(
            f"{result['rank']}. "
            f"{result['label']:<55} "
            f"{result['confidence'] * 100:6.2f}%"
        )

    print("\nCNN CONFIDENCE ANALYSIS")
    print("-" * 70)
    print(
        f"Confidence level : "
        f"{confidence_analysis['confidence_level']}"
    )
    print(
        f"Top confidence   : "
        f"{confidence_analysis['top_confidence'] * 100:.2f}%"
    )
    print(
        f"Second           : "
        f"{confidence_analysis['second_confidence'] * 100:.2f}%"
    )
    print(
        f"Confidence gap   : "
        f"{confidence_analysis['confidence_gap'] * 100:.2f}%"
    )
    print(
        f"Ambiguous        : "
        f"{confidence_analysis['ambiguous']}"
    )

    print("\nCNN DOMAIN")
    print("-" * 70)
    print(f"Crop      : {domain_analysis['crop']}")
    print(f"Condition : {domain_analysis['condition']}")
    print(f"Healthy   : {domain_analysis['healthy']}")

    print("\nGEMINI VERIFICATION")
    print("-" * 70)

    if gemini_result["status"] == "SUCCESS":
        result = gemini_result["result"]

        print(f"Status: SUCCESS")
        print(f"Crop: {result.get('crop')}")
        print(f"Leaf image: {result.get('is_leaf_image')}")
        print(
            "CNN supported: "
            f"{result.get('cnn_prediction_supported')}"
        )
        print(
            "Possible unsupported category: "
            f"{result.get('possible_unsupported_category')}"
        )

        print(f"\nAssessment:")
        print(result.get("assessment", ""))

        evidence = result.get("visual_evidence", [])

        if evidence:
            print("\nVisual evidence:")

            for item in evidence:
                print(f"  - {item}")

    elif gemini_result["status"] == "SUCCESS_TEXT":
        print("Status: SUCCESS (non-JSON response)")
        print(gemini_result["result"])

    else:
        print(f"Status: {gemini_result['status']}")
        print(
            f"Reason: "
            f"{gemini_result.get('reason', 'Unknown')}"
        )

    print("\nFINAL PIPELINE STATUS")
    print("-" * 70)
    print(final_status)

    print("\n" + "=" * 70)


# ============================================================
# MAIN
# ============================================================

def main():
    if len(sys.argv) < 2:
        print("\nUsage:")
        print(
            "  python test_disease_pipeline.py "
            "test_images/your_image.jpg"
        )
        print("\nExample:")
        print(
            "  python test_disease_pipeline.py "
            "test_images/3-CercosporaLeaf1.jpg"
        )
        sys.exit(1)

    image_path = sys.argv[1]

    model = load_model()

    image_array = preprocess_image(image_path)

    cnn_results = predict_cnn(
        model,
        image_array
    )

    confidence_analysis = analyze_confidence(
        cnn_results
    )

    domain_analysis = analyze_domain(
        cnn_results[0]
    )

    gemini_result = run_gemini(
        image_path,
        cnn_results,
        confidence_analysis
    )

    final_status = determine_status(
        cnn_results,
        confidence_analysis,
        gemini_result
    )

    print_results(
        image_path,
        cnn_results,
        confidence_analysis,
        domain_analysis,
        gemini_result,
        final_status
    )


if __name__ == "__main__":
    main()
