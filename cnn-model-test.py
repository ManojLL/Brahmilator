import os
import cv2
import tensorflow as tf

MODELDIR = "./"
TESTDIR = "Early_Brahmi/test"


def prepare(filepath):
    IMG_SIZE = 80
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)


model_save_path = os.path.join(MODELDIR, "saved-models")

loaded_model = tf.keras.models.load_model(model_save_path)

prediction = loaded_model.predict([prepare(os.path.join(TESTDIR, "3.png"))])

print(prediction)
