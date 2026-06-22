from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load pre-trained model (you need to train and save it first)
try:
    model = tf.keras.models.load_model('plant_disease_model.h5')
    print("Model loaded successfully")
except:
    print("Model not found. Please train the model first.")
    model = None

# Disease classes
DISEASE_CLASSES = [
    'Apple Scab', 'Apple Black Rot', 'Apple Cedar Rust', 'Apple Healthy',
    'Blueberry Healthy', 'Cherry Powdery Mildew', 'Cherry Healthy',
    'Corn Gray Leaf Spot', 'Corn Common Rust', 'Corn Northern Leaf Blight', 'Corn Healthy',
    'Grape Black Rot', 'Grape Esca', 'Grape Leaf Blight', 'Grape Healthy',
    'Orange Citrus Greening', 'Peach Bacterial Spot', 'Peach Healthy',
    'Pepper Bacterial Spot', 'Pepper Healthy',
    'Potato Early Blight', 'Potato Late Blight', 'Potato Healthy',
    'Raspberry Healthy', 'Soybean Healthy', 'Squash Powdery Mildew',
    'Strawberry Leaf Scorch', 'Strawberry Healthy',
    'Tomato Bacterial Spot', 'Tomato Early Blight', 'Tomato Late Blight',
    'Tomato Leaf Mold', 'Tomato Septoria Leaf Spot', 'Tomato Spider Mites',
    'Tomato Target Spot', 'Tomato Yellow Leaf Curl Virus', 'Tomato Mosaic Virus', 'Tomato Healthy'
]

# Treatment recommendations
TREATMENTS = {
    'Leaf Blight': 'Use Copper fungicide spray. Apply every 7-10 days.',
    'Bacterial Spot': 'Apply copper-based bactericide. Remove infected leaves.',
    'Powdery Mildew': 'Use sulfur-based fungicide. Improve air circulation.',
    'Early Blight': 'Apply chlorothalonil fungicide. Practice crop rotation.',
    'Late Blight': 'Use mancozeb or copper fungicide immediately.',
    'Rust': 'Apply propiconazole fungicide. Remove infected parts.',
    'Healthy': 'No treatment needed. Continue regular care.'
}

def preprocess_image(image):
    """Preprocess image for model prediction"""
    img = image.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    """Predict plant disease from uploaded image"""
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Read and preprocess image
        file = request.files['image']
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        disease_name = DISEASE_CLASSES[predicted_class]
        
        # Get treatment recommendation
        treatment = 'Consult agricultural expert for specific treatment.'
        for key, value in TREATMENTS.items():
            if key.lower() in disease_name.lower():
                treatment = value
                break
        
        return jsonify({
            'disease': disease_name,
            'confidence': f'{confidence * 100:.2f}%',
            'treatment': treatment,
            'prevention': 'Ensure proper drainage and avoid overhead watering.'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
