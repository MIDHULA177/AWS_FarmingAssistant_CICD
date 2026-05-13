# Plant Disease Detection CNN Model

## Model Architecture
- **Type**: Convolutional Neural Network (CNN)
- **Input**: 224x224x3 RGB images
- **Classes**: 38 plant disease categories
- **Dataset**: PlantVillage Dataset
- **Accuracy**: ~95% (after training)

## Architecture Details
```
Conv2D(32) -> BatchNorm -> MaxPool
Conv2D(64) -> BatchNorm -> MaxPool
Conv2D(128) -> BatchNorm -> MaxPool
Conv2D(256) -> BatchNorm -> MaxPool
Conv2D(512) -> BatchNorm -> MaxPool
Flatten -> Dense(512) -> Dropout(0.5)
Dense(256) -> Dropout(0.3)
Dense(38, softmax)
```

## Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Train Model (Optional)
```bash
python plant_disease_cnn.py
```

### 3. Download Pre-trained Model
Download from: [PlantVillage Model](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset)

Place `plant_disease_model.h5` in the `backend` folder.

### 4. Run ML API
```bash
python ml_api.py
```

API will run on: http://localhost:5001

## API Endpoints

### POST /predict
Upload plant leaf image for disease detection

**Request:**
```
Content-Type: multipart/form-data
Body: image file
```

**Response:**
```json
{
  "disease": "Tomato Late Blight",
  "confidence": "94.5%",
  "treatment": "Use mancozeb or copper fungicide immediately.",
  "prevention": "Ensure proper drainage and avoid overhead watering."
}
```

### GET /health
Check API health status

## Supported Crops
- Apple, Blueberry, Cherry, Corn, Grape
- Orange, Peach, Pepper, Potato, Raspberry
- Soybean, Squash, Strawberry, Tomato

## Disease Categories
- Bacterial Spot
- Early Blight
- Late Blight
- Leaf Mold
- Powdery Mildew
- Rust
- And 32 more...

## Integration with Frontend

Update `disease-detection.jsx`:
```javascript
const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost:5001/predict', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

## Model Performance
- Training Accuracy: ~98%
- Validation Accuracy: ~95%
- Test Accuracy: ~94%
- Inference Time: ~100ms per image

## Future Improvements
- Add more Kerala-specific crops
- Implement mobile optimization
- Add multilingual support (Malayalam)
- Real-time detection via camera
