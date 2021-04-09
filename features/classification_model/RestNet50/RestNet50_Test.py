import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tqdm import tqdm

model_save_path = "./saved_models/ResNet50_saved_model"
test_data_dir = "brahmi_data_reduced/test/"

loaded_model = tf.keras.models.load_model(model_save_path)

CATEGORIES = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
              "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
              "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
              "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
              "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa1+e", "sa1+i", "sa1+o", "sa1+u", "sa2", "sa3", "ta",
              "ta+e", "ta+i", "ta+u", "ta1", "tha1",
              "tha2", "u", "u2", "va", "va+e", "va+i", "ya", "ya+e"]


CATEGORIES1Reduced = ["a", "ba", "bha", "ca", "cha", "da1", "da2", "dha2", "e", "ga", "gha", "ha", "i",
                      "ja", "jha", "ka", "kha", "la", "ma", "na1", "na2", "o", "pa", "pha", "ra", "sa1", "sa2", "sa3",
                      "ta", "ta1", "tha1", "tha2", "u", "u2", "va", "ya"]


def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


test_path = os.path.join(test_data_dir, "ta")

testing_results = {}

for img in tqdm(os.listdir(test_path)):
    prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])
    testing_results[img] = CATEGORIES1Reduced[int(np.argmax(prediction))]

print()
print("------ Results ------")
for x in testing_results:
    print(x, " : ", testing_results[x])
print("---------------------")
