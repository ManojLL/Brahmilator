import os
import cv2
import numpy as np
import tensorflow as tf
from tqdm import tqdm

classification_model = "../features/classification_model/saved-models/saved-models-mobilenet4"
segmented_letters = "segmented_letters"

loaded_model = tf.keras.models.load_model(classification_model)

CATEGORIES = ["a", "ga+i", "ka", "ma", "ra", "sa3"]


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

    print()
    print("------ Results ------")
    for x in testing_results:
        print(x, " : ", testing_results[x])
        results.append(testing_results[x])
    print("---------------------")

    return results
