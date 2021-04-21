from tensorflow import keras
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import numpy as np

model = keras.models.load_model('validation_model/validation_engine')

def validateImage():
    filename = "./input_data/plate.png"
    img1 = image.load_img(filename, target_size=(150, 150))

    plt.imshow(img1)

    Y = image.img_to_array(img1)

    X = np.expand_dims(Y, axis=0)
    val = model.predict(X)
    # print(val)
    if val == 1:
        print("is a plate")
        return True
    elif val == 0:
        print("is a non plate")
        return False