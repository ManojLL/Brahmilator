import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from tensorflow.python.keras.layers import Dense
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.optimizer_v2.adam import Adam

train_path = "Early_Brahmi/train"     # 66 classes
train_path1 = "Early_Brahmi/train 1"  # all classes (with and without data) - 71
train_path2 = "Early_Brahmi/train 2"  # classes with more than 30 images - 8
train_path3 = "Early_Brahmi/train 3"  # classes with data - 54
test_path = "Early_Brahmi/test"
valid_path = "Early_Brahmi/validation"

train_batches = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
    directory=train_path2, target_size=(224, 224), batch_size=10, shuffle=True)
valid_batches = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
    directory=valid_path, target_size=(224, 224), batch_size=10)
test_batches = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(
    directory=test_path, target_size=(224, 224), batch_size=10, shuffle=False)

mobile = tf.keras.applications.mobilenet.MobileNet()
mobile.summary()

x = mobile.layers[-6].output

output = Dense(units=8, activation='softmax')(x)

model = Model(inputs=mobile.input, outputs=output)

for layer in model.layers[:-23]:
    layer.trainable = False

model.compile(optimizer=Adam(lr=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(x=train_batches,
          steps_per_epoch=len(train_batches),
          validation_data=valid_batches,
          validation_steps=len(valid_batches),
          epochs=250,
          verbose=2
          )

model_save_path = "./saved-models/saved-models-mobilenet2"

tf.saved_model.save(model, model_save_path)
