import numpy as np
import tensorflow as tf
from PIL import Image

MODEL_PATH = "crop_disease_mobilenetv2.keras"

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
# 1. LOAD MODEL
# --------------------------------------------------

print("Loading model...")

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Model loaded successfully.")
print("Input shape:", model.input_shape)
print("Output shape:", model.output_shape)


# --------------------------------------------------
# 2. LOAD IMAGE
# --------------------------------------------------

print(f"\nLoading image: {IMAGE_PATH}")

image = Image.open(IMAGE_PATH).convert("RGB")

print("Original image size:", image.size)

# Model expects 224 x 224
image = image.resize((224, 224))

# Convert to NumPy
# IMPORTANT:
# Do NOT divide by 255 here.
# The model already contains its own Rescaling layer.
image_array = np.array(image, dtype=np.float32)

# Add batch dimension
image_array = np.expand_dims(image_array, axis=0)

print("Input shape:", image_array.shape)


# --------------------------------------------------
# 3. RUN PREDICTION
# --------------------------------------------------

print("\nRunning prediction...")

predictions = model.predict(
    image_array,
    verbose=0
)

print("Prediction completed.")


# --------------------------------------------------
# 4. GET PROBABILITIES
# --------------------------------------------------

probabilities = predictions[0]

print("\nNumber of model outputs:", len(probabilities))


# --------------------------------------------------
# 5. TOP 5 PREDICTIONS
# --------------------------------------------------

top_indices = np.argsort(probabilities)[::-1][:5]

print("\n--- TOP 5 CNN PREDICTIONS ---")

for rank, index in enumerate(top_indices, start=1):

    label = DISEASE_LABELS[index]
    confidence = float(probabilities[index]) * 100

    print(f"\n{rank}. {label}")
    print(f"   Class index: {index}")
    print(f"   Confidence: {confidence:.2f}%")


# --------------------------------------------------
# 6. FINAL PREDICTION
# --------------------------------------------------

predicted_class = int(top_indices[0])
predicted_label = DISEASE_LABELS[predicted_class]
confidence = float(probabilities[predicted_class])


print("\n===================================")
print("        FINAL CNN RESULT")
print("===================================")

print("Predicted class index:", predicted_class)
print("Predicted disease:", predicted_label)
print(f"Confidence: {confidence * 100:.2f}%")

print("===================================")
