import os
import cv2
import numpy as np
import tensorflow as tf
from tqdm import tqdm

classification_model = "saved-models-mobilenet6"

segmented_letters = "segmented_letters"

loaded_model = tf.keras.models.load_model(classification_model)

CATEGORIES = ["a", "ba", "bha", "ca", "cha", "da1", "da2", "dha1", "dha2", "e", "ga", "gha", "ha", "i", "ja", "jha",
              "ka", "kha", "la", "la2", "ma", "na1", "na2", "o", "pa", "pha", "ra", "sa1", "sa2", "sa3", "ta1", "tha1",
              "tha2", "u", "u2", "va", "ya"]


def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


def classify_letters():
    test_path = os.path.join(segmented_letters)
    testing_results = {}
    results = []

    for img in tqdm(os.listdir(test_path)):
        prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])
        testing_results[img] = CATEGORIES[int(np.argmax(prediction))]
        os.remove(os.path.join(test_path, img))

    for x in testing_results:
        results.append(testing_results[x])

    return results
