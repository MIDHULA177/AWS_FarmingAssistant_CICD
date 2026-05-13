# CNN Model Architecture Output

## Model Summary

```
Model: "sequential"
_________________________________________________________________
Layer (type)                Output Shape              Param #   
=================================================================
conv2d (Conv2D)             (None, 222, 222, 32)      896       
batch_normalization         (None, 222, 222, 32)      128       
max_pooling2d               (None, 111, 111, 32)      0         
                                                                 
conv2d_1 (Conv2D)           (None, 109, 109, 64)      18496     
batch_normalization_1       (None, 109, 109, 64)      256       
max_pooling2d_1             (None, 54, 54, 64)        0         
                                                                 
conv2d_2 (Conv2D)           (None, 52, 52, 128)       73856     
batch_normalization_2       (None, 52, 52, 128)       512       
max_pooling2d_2             (None, 26, 26, 128)       0         
                                                                 
conv2d_3 (Conv2D)           (None, 24, 24, 256)       295168    
batch_normalization_3       (None, 24, 24, 256)       1024      
max_pooling2d_3             (None, 12, 12, 256)       0         
                                                                 
conv2d_4 (Conv2D)           (None, 10, 10, 512)       1180160   
batch_normalization_4       (None, 10, 10, 512)       2048      
max_pooling2d_4             (None, 5, 5, 512)         0         
                                                                 
flatten (Flatten)           (None, 12800)             0         
dense (Dense)               (None, 512)               6554112   
dropout (Dropout)           (None, 512)               0         
dense_1 (Dense)             (None, 256)               131328    
dropout_1 (Dropout)         (None, 256)               0         
dense_2 (Dense)             (None, 38)                9766      
=================================================================
Total params: 8,267,750
Trainable params: 8,265,766
Non-trainable params: 1,984
_________________________________________________________________
```

## Model Details

**Input Shape:** (224, 224, 3)
**Output Classes:** 38 plant diseases
**Total Parameters:** 8,267,750
**Trainable Parameters:** 8,265,766

## Disease Classes (38 total)

1. Apple Scab
2. Apple Black Rot
3. Apple Cedar Rust
4. Apple Healthy
5. Blueberry Healthy
6. Cherry Powdery Mildew
7. Cherry Healthy
8. Corn Gray Leaf Spot
9. Corn Common Rust
10. Corn Northern Leaf Blight
11. Corn Healthy
12. Grape Black Rot
13. Grape Esca
14. Grape Leaf Blight
15. Grape Healthy
16. Orange Citrus Greening
17. Peach Bacterial Spot
18. Peach Healthy
19. Pepper Bacterial Spot
20. Pepper Healthy
21. Potato Early Blight
22. Potato Late Blight
23. Potato Healthy
24. Raspberry Healthy
25. Soybean Healthy
26. Squash Powdery Mildew
27. Strawberry Leaf Scorch
28. Strawberry Healthy
29. Tomato Bacterial Spot
30. Tomato Early Blight
31. Tomato Late Blight
32. Tomato Leaf Mold
33. Tomato Septoria Leaf Spot
34. Tomato Spider Mites
35. Tomato Target Spot
36. Tomato Yellow Leaf Curl Virus
37. Tomato Mosaic Virus
38. Tomato Healthy

## Model Performance (Expected)

- **Training Accuracy:** ~98%
- **Validation Accuracy:** ~95%
- **Test Accuracy:** ~94%
- **Inference Time:** ~100ms per image

## Usage

The model is ready for training with PlantVillage dataset.
After training, it can detect plant diseases from leaf images with high accuracy.

**Status:** ✅ Model architecture created successfully
**Ready for:** Training with dataset
