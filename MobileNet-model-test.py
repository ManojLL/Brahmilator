import os

import cv2
import tensorflow as tf

model_save_path = "./saved-models"
TESTDIR = "Early_Brahmi/test/da"

loaded_model = tf.keras.models.load_model(model_save_path)


def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


prediction = loaded_model.predict([prepare(os.path.join(TESTDIR, "382.png"))])

print(prediction)
