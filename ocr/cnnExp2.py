import time
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
from keras.preprocessing import image
from tensorflow.python.keras.layers import BatchNormalization
from tqdm import tqdm
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.callbacks import TensorBoard

NAME = "Brahmi-CNN"

DATADIR = "Early_Brahmi/train"
TESTDIR = "Early_Brahmi/test"
VALDIR = "Early_Brahmi/validation"

CATEGORIES = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1", "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
              "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma", "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
              "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta+u", "ta1", "tha1", "tha2", "u", "u2", "va", "ya", "ya+e"]

# for category in CATEGORIES:
#     path = os.path.join(DATADIR, category)  # create path
#     for img in os.listdir(path):  # iterate over each image
#         img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)  # convert to array
#
#     #     plt.imshow(img_array, cmap='gray')  # graph it
#     #     plt.show()  # display!
#     #     break  # we just want one for now so break
#     # break

IMG_SIZE = 80

# new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
# plt.imshow(new_array, cmap='gray')
# plt.show()

training_data = []


def create_training_data():
    for category in CATEGORIES:

        path = os.path.join(DATADIR, category)
        class_num = CATEGORIES.index(category)

        for img in tqdm(os.listdir(path)):
            try:
                img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
                new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
                training_data.append([new_array, class_num])
            except Exception as e:
                pass


create_training_data()

print(len(training_data))

import random

random.shuffle(training_data)

X = []
y = []

for features, label in training_data:
    X.append(features)
    y.append(label)

X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
y = np.array(y)

X = X / 255.0

print(len(X))
print(len(y))

# MODEL 01
################################################################################################
# model = Sequential()
# model.add(Conv2D(64, (3, 3), input_shape=X.shape[1:]))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(pool_size=(2, 2)))
#
# model.add(Conv2D(64, (3, 3)))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(pool_size=(2, 2)))
#
# model.add(Flatten())
#
# model.add(Dense(64, activation='relu'))
#
# model.add(Dense(3, activation='softmax'))
#
tensorBoard = TensorBoard(log_dir="logs/{}".format(NAME))
#
# model.compile(loss='sparse_categorical_crossentropy',
#                  optimizer='adam',
#              metrics=['accuracy']
#                )
#
# model.fit(X, y,
#           batch_size=32,
#           epochs=100,
#           validation_split=0.3,
#           callbacks=[tensorboard])

#################################################################################################

train_datagen = ImageDataGenerator(rotation_range=45,
                                   width_shift_range=0.2,
                                   zoom_range=0.2,
                                   horizontal_flip=True)
train_datagen.fit(X)

train_generator = train_datagen.flow(
    X,
    y,
    batch_size=32)

# MODEL 02
#################################################################################################
# activation = 'sigmoid'
# model = Sequential()
# model.add(Conv2D(32, 3, activation=activation, padding='same', input_shape=X.shape[1:]))
# model.add(BatchNormalization())
# model.add(MaxPooling2D(pool_size=(2,2)))
# model.add(Dropout(0.5))
#
# model.add(Conv2D(32, 3, activation=activation, padding='same', kernel_initializer='he_uniform'))
# model.add(BatchNormalization())
# model.add(MaxPooling2D(pool_size=(2,2)))
# model.add(Dropout(0.5))
#
# model.add(Conv2D(64, 3, activation=activation, padding='same', kernel_initializer='he_uniform'))
# model.add(BatchNormalization())
# model.add(MaxPooling2D(pool_size=(2,2)))
# model.add(Dropout(0.5))
#
# model.add(Conv2D(64, 3, activation=activation, padding='same', kernel_initializer='he_uniform'))
# model.add(BatchNormalization())
# model.add(MaxPooling2D(pool_size=(2,2)))
# model.add(Dropout(0.5))
#
# model.add(Flatten())
# model.add(Dense(128, activation=activation, kernel_initializer='he_uniform'))
# model.add(Dense(3, activation='softmax'))
# model.add(Dropout(0.5))

# Model 03
##################################################################################################
model = Sequential()
model.add(Conv2D(32, 3, padding='same', input_shape=X.shape[1:]))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.5))

model.add(Conv2D(32, 3, padding='same', kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.5))

model.add(Conv2D(64, 3, padding='same', kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.5))

model.add(Conv2D(64, 3, padding='same', kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.5))

model.add(Flatten())
model.add(Dense(128, kernel_initializer='he_uniform'))
model.add(Activation('relu'))
model.add(Dense(66))
model.add(Activation('softmax'))
model.add(Dropout(0.5))

model.compile(optimizer='rmsprop', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(train_generator,
          batch_size=32,
          epochs=150,
          callbacks=[tensorBoard]
          )

model.save('./')


##################################################################################################

# plot the training and validation accuracy and loss at each epoch
# loss = history.history['loss']
# val_loss = history.history['val_loss']
# epochs = range(1, len(loss) + 1)
# plt.plot(epochs, loss, 'y', label='Training loss')
# plt.plot(epochs, val_loss, 'r', label='Validation loss')
# plt.title('Training and validation loss')
# plt.xlabel('Epochs')
# plt.ylabel('Loss')
# plt.legend()
# plt.show()
#
# acc = history.history['acc']
# val_acc = history.history['val_acc']
# plt.plot(epochs, acc, 'y', label='Training acc')
# plt.plot(epochs, val_acc, 'r', label='Validation acc')
# plt.title('Training and validation accuracy')
# plt.xlabel('Epochs')
# plt.ylabel('Accuracy')
# plt.legend()
# plt.show()

def prepare(filepath):
    IMG_SIZE = 80
    img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)

prediction = model.predict([prepare('Early_Brahmi/test/3.png')])

print(prediction)

# print(CATEGORIES[int(prediction[0][0][0][0])])
