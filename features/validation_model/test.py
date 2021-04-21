from tensorflow import keras
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import numpy as np

model = keras.models.load_model('model')

def predictImage(filename):
    img1 = image.load_img(filename, target_size=(150, 150))

    plt.imshow(img1)

    Y = image.img_to_array(img1)

    X = np.expand_dims(Y, axis=0)
    val = model.predict(X)
    # print(val)
    if val == 1:
        print("is a plate")
    elif val == 0:
        print("is a non plate")


print("data/test/plates/plate1.png")
predictImage("data/test/plates/plate1.png")

print("\ndata/test/plates/plate2.jpeg")
predictImage("data/test/plates/plate2.jpeg")

print("\ndata/test/plates/plate3.png")
predictImage("data/test/plates/plate3.png")

print("\ndata/test/plates/plate4.png")
predictImage("data/test/plates/plate4.png")

print("\ndata/test/non_plates/dog.jpg")
predictImage("data/test/non_plates/dog.jpg")

