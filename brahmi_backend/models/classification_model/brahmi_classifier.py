import os
import cv2
import filetype
import numpy as np
import tensorflow as tf
from tqdm import tqdm

classification_model = "models/classification_model/mobilenet_engine"

segmented_letters = "models/segmentation_model/segmented_letters"

loaded_model = tf.keras.models.load_model(classification_model)

CATEGORIES = ["ba", "ga", "gu", "ha", "le", "na", "na", "ne", "ra", "sa", "so", "ta", "ti", "u", "ya"]


# function to prepare image for prediction
# resize to 224*224
def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


# function to get prediction for image
def classify_letters():
    test_path = os.path.join(segmented_letters)
    testing_results = {}
    results = []

    for img in tqdm(os.listdir(test_path)):
        if filetype.is_image(os.path.join(test_path, img)):
            prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])
            testing_results[img] = CATEGORIES[int(np.argmax(prediction))]

    for x in testing_results:
        results.append(testing_results[x])

    return results
