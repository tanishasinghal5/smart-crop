import numpy as np
import tensorflow as tf
from PIL import Image


MODEL_PATH = "disease-model.tflite"
IMAGE_PATH = "/Users/Dell/smart-crop/test_images/3-CercosporaLeaf1.jpg"


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


# --------------------------------------------------
# 1. LOAD TFLITE MODEL
# --------------------------------------------------

print("Loading TFLite model...")

interpreter = tf.lite.Interpreter(
    model_path=MODEL_PATH
)

interpreter.allocate_tensors()

print("TFLite model loaded successfully.")


# --------------------------------------------------
# 2. INSPECT INPUT / OUTPUT
# --------------------------------------------------

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print("\n--- INPUT DETAILS ---")
print(input_details)

print("\n--- OUTPUT DETAILS ---")
print(output_details)


# --------------------------------------------------
# 3. LOAD IMAGE
# --------------------------------------------------

print(f"\nLoading image: {IMAGE_PATH}")

image = Image.open(IMAGE_PATH).convert("RGB")
print("Original image size:", image.size)

image = image.resize((224, 224))

image_array = np.array(
    image,
    dtype=np.float32
)

image_array = np.expand_dims(
    image_array,
    axis=0
)

print("Input shape:", image_array.shape)


# --------------------------------------------------
# 4. CHECK EXPECTED INPUT TYPE
# --------------------------------------------------

input_dtype = input_details[0]["dtype"]

print("Expected input dtype:", input_dtype)

if input_dtype == np.float32:
    input_data = image_array

elif input_dtype == np.uint8:
    input_data = image_array.astype(np.uint8)

elif input_dtype == np.int8:
    scale, zero_point = input_details[0]["quantization"]

    input_data = (
        image_array / scale + zero_point
    ).astype(np.int8)

else:
    raise ValueError(
        f"Unsupported input dtype: {input_dtype}"
    )


# --------------------------------------------------
# 5. RUN TFLITE PREDICTION
# --------------------------------------------------

print("\nRunning TFLite prediction...")

interpreter.set_tensor(
    input_details[0]["index"],
    input_data
)

interpreter.invoke()

output = interpreter.get_tensor(
    output_details[0]["index"]
)

probabilities = output[0]


# --------------------------------------------------
# 6. HANDLE QUANTIZED OUTPUT
# --------------------------------------------------

output_dtype = output_details[0]["dtype"]

if output_dtype in [np.uint8, np.int8]:

    scale, zero_point = output_details[0]["quantization"]

    if scale != 0:
        probabilities = (
            probabilities.astype(np.float32) - zero_point
        ) * scale


# --------------------------------------------------
# 7. TOP 5 PREDICTIONS
# --------------------------------------------------

top_indices = np.argsort(probabilities)[::-1][:5]

print("\n--- TOP 5 TFLITE PREDICTIONS ---")

for rank, index in enumerate(top_indices, start=1):

    label = DISEASE_LABELS[index]
    confidence = float(probabilities[index]) * 100

    print(f"\n{rank}. {label}")
    print(f"   Class index: {index}")
    print(f"   Confidence: {confidence:.2f}%")


# --------------------------------------------------
# 8. FINAL RESULT
# --------------------------------------------------

predicted_class = int(top_indices[0])
predicted_label = DISEASE_LABELS[predicted_class]
confidence = float(probabilities[predicted_class])


print("\n===================================")
print("       FINAL TFLITE RESULT")
print("===================================")

print("Predicted class index:", predicted_class)
print("Predicted disease:", predicted_label)
print(f"Confidence: {confidence * 100:.2f}%")

print("===================================")
