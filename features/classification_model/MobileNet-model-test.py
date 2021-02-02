import os
import cv2
import numpy as np
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

model_save_path = "./saved-models/saved-models-mobilenet"
TESTDIR = "Early_Brahmi/test/"

loaded_model = tf.keras.models.load_model(model_save_path)

CATEGORIES = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
              "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
              "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
              "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
              "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta+u", "ta1", "tha1",
              "tha2", "u", "u2", "va", "ya", "ya+e"]

# brahmi_df = pd.DataFrame(
#     data=[['a'], ['ba'], ['ba+i'], ['ba+o'], ['ba+u'], ['bha'], ['ca'], ['ca+e'], ['cha'], ['da'], ['da+e'], ['da+i'],
#           ['da+u'], ['da1'],
#           ['dha1'], ['dha2'], ['e'], ['ga'], ['ga+i'], ['gha'], ['ha'], ['ha+a'], ['i'],
#           ['ja'], ['jha'], ['jha+e'], ['jha+i'], ['jha+u'], ['ka'], ['ka+e'], ['ka+i'], ['kha'], ['la'], ['la+e'],
#           ['la+u'], ['la2'], ['ma'],
#           ['ma+i'], ['na'], ['na+e'], ['na+u'], ['na2'], ['na2+i'], ['o'], ['pa'],
#           ['pa+e'], ['pa+i'], ['pa+u'], ['pha'], ['ra'], ['sa1'], ['sa2'], ['sa3'], ['ta'], ['ta+e'], ['ta+i'],
#           ['ta+u'], ['ta1'], ['tha1'],
#           ['tha2'], ['u'], ['u2'], ['va'], ['ya'], ['ya+e']], columns=['letter'])
#
# print('Before One Hot Encoding:')
#
# one_hot_encoder = OneHotEncoder(sparse=False)
# one_hot_encoder.fit(brahmi_df)
#
# colors_df_encoded = one_hot_encoder.transform(brahmi_df)
# colors_df_encoded = pd.DataFrame(data=colors_df_encoded, columns=one_hot_encoder.categories_)


def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)


prediction = loaded_model.predict([prepare(os.path.join(TESTDIR, "ha/72.png"))])

print(CATEGORIES[int(np.argmax(prediction))])


