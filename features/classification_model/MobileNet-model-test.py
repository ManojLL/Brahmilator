import os
import cv2
import numpy as np
import tensorflow as tf
from tqdm import tqdm

model_save_path = "./saved-models/saved-models-mobilenet"

loaded_model = tf.keras.models.load_model(model_save_path)

CATEGORIES = ["ba", "ga", "gu", "ha", "le", "na", "na", "ne", "ra",
              "sa", "so", "ta", "ti", "u", "ya"]


def prepare(filepath):
    img_size = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (img_size, img_size))
    return new_array.reshape(-1, img_size, img_size, 3)


test_path = os.path.join("plate1")

testing_results = {}

for img in tqdm(os.listdir(test_path)):
    prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])

    testing_results[img] = CATEGORIES[int(np.argmax(prediction))]

print()
print("------ Results ------")
for x in testing_results:
    print(x, " : ", testing_results[x])
print("---------------------")
