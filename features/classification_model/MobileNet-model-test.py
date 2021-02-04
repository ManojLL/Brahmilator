import os
import cv2
import numpy as np
import tensorflow as tf
from tqdm import tqdm

model_save_path = "./saved-models/saved-models-mobilenet"
model_save_path1 = "./saved-models/saved-models-mobilenet1"
model_save_path2 = "./saved-models/saved-models-mobilenet2"
model_save_path3 = "./saved-models/saved-models-mobilenet3"
TESTDIR = "Early_Brahmi/test/"

loaded_model = tf.keras.models.load_model(model_save_path2)

CATEGORIES = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
              "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
              "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
              "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
              "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta+u", "ta1", "tha1",
              "tha2", "u", "u2", "va", "ya", "ya+e"] #66

CATEGORIES1 = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
               "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
               "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
               "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
               "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa1+e", "sa1+i", "sa1+o", "sa1+u", "sa2", "sa3", "ta",
               "ta+e", "ta+i", "ta+u", "ta1", "tha1",
               "tha2", "u", "u2", "va", "va+e", "va+i", "ya", "ya+e"] #71

CATEGORIES2 = ["a", "da", "ga", "ha", "ka", "la", "ta", "va"] #8

CATEGORIES3 = ["a", "ba", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da1",
               "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
               "ja", "jha", "ka", "kha", "la", "la+e", "la+u", "la2", "ma",
               "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
               "pha", "ra", "sa1", "sa1+e", "sa1+u", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta1", "tha1",
               "tha2", "u", "u2", "va", "va+e", "va+i", "ya"] #54


def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


test_path = os.path.join(TESTDIR, "Test")

testing_results = {}

for img in tqdm(os.listdir(test_path)):
    prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])
    testing_results[img] = CATEGORIES2[int(np.argmax(prediction))]

print()
print("------ Results ------")
for x in testing_results:
    print(x, " : ", testing_results[x])
print("---------------------")
