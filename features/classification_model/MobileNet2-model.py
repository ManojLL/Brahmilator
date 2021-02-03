import os
import cv2
import numpy as np
import tensorflow as tf
from random import shuffle
from PIL import Image
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.optimizer_v2.adam import Adam
from tqdm import tqdm

CATEGORIES = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
              "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
              "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
              "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
              "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta+u", "ta1", "tha1",
              "tha2", "u", "u2", "va", "ya", "ya+e"]

train_path = "Early_Brahmi/train"
test_path = "Early_Brahmi/test"
valid_path = "Early_Brahmi/"

IMG_SIZE = 32


def create_training_data(train_path):
    x = []
    y = []
    for category in CATEGORIES:

        path = os.path.join(train_path, category)
        if not os.path.isdir(path):
            continue
        class_num = CATEGORIES.index(category)
        one_hot = [0] * len(CATEGORIES)
        one_hot[class_num] = 1

        for img in tqdm(os.listdir(path)):
            try:
                img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
                new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE)) / 255
                new_array = new_array.reshape([IMG_SIZE, IMG_SIZE, 1])
                new_array = np.around(new_array)
                # data.append([new_array, one_hot])
                x.append(new_array)
                y.append(one_hot)
            except Exception as e:
                pass
    return np.array(x), np.array(y)


x_train, y_train = create_training_data(train_path)
x_test, y_test = create_training_data(test_path)
print(x_train.shape, y_train.shape)

# shuffle(training_data)

# train_batches = ImageDataGenerator(
#     preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
#     directory=train_path, target_size=(IMG_SIZE, IMG_SIZE), batch_size=10, shuffle=True)
# valid_batches = ImageDataGenerator(
#     preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
#     directory=valid_path, target_size=(IMG_SIZE, IMG_SIZE), batch_size=10)
# test_batches = ImageDataGenerator(
#     preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
#     directory=test_path, target_size=(IMG_SIZE, IMG_SIZE), batch_size=10, shuffle=False)

# train_ds = tf.keras.preprocessing.image_dataset_from_directory(
#     train_path,
#     validation_split=0.2,
#     subset="train",
#     seed=123,
#     image_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=16)
#
# val_ds = tf.keras.preprocessing.image_dataset_from_directory(
#     valid_path,
#     validation_split=0.2,
#     subset="validation",
#     seed=123,
#     image_size=(IMG_SIZE, IMG_SIZE),
#     batch_size=16)


model = tf.keras.applications.MobileNet(weights=None, include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 1))

x = model.output
x = GlobalAveragePooling2D()(x)
# x = Dense(1024, activation='relu')(x)
# x = Dense(1024, activation='relu')(x)
x = Dense(512, activation='relu')(x)
preds = Dense(65, activation='softmax')(x)

model = Model(inputs=model.input, outputs=preds)

print(model.summary())

# x = mobile.layers[-6].output
#
# output = Dense(units=66, activation='softmax')(x)
#
# model = Model(inputs=mobile.input, outputs=output)
#
# for layer in model.layers[:-23]:
#     layer.trainable = False

model.compile(optimizer=Adam(lr=0.01), loss='binary_crossentropy', metrics=['accuracy'])

model.fit(x=x_train, y=y_train, validation_data=(x_test, y_test),
          steps_per_epoch=len(x_train),
          # validation_data=valid_batches,
          validation_steps=2,
          epochs=10,
          verbose=2
          )

model_save_path = "./saved-models/saved-models-mobilenet"

# tf.saved_model.save(model, model_save_path)

model.save(model_save_path)
