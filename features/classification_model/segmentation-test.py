
from imutils.contours import sort_contours
import imutils
import cv2
import numpy as np
import tensorflow as tf


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
              "tha2", "u", "u2", "va", "ya", "ya+e"]  # 66

CATEGORIES1 = ["a", "ba", "ba+i", "ba+o", "ba+u", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da+u", "da1",
               "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
               "ja", "jha", "jha+e", "jha+i", "jha+u", "ka", "ka+e", "ka+i", "kha", "la", "la+e", "la+u", "la2", "ma",
               "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
               "pa+e", "pa+i", "pa+u", "pha", "ra", "sa1", "sa1+e", "sa1+i", "sa1+o", "sa1+u", "sa2", "sa3", "ta",
               "ta+e", "ta+i", "ta+u", "ta1", "tha1",
               "tha2", "u", "u2", "va", "va+e", "va+i", "ya", "ya+e"]  # 71

CATEGORIES2 = ["a", "da", "ga", "ha", "ka", "la", "ta", "va"]  # 8

CATEGORIES3 = ["a", "ba", "bha", "ca", "ca+e", "cha", "da", "da+e", "da+i", "da1",
               "dha1", "dha2", "e", "ga", "ga+i", "gha", "ha", "ha+a", "i",
               "ja", "jha", "ka", "kha", "la", "la+e", "la+u", "la2", "ma",
               "ma+i", "na", "na+e", "na+u", "na2", "na2+i", "o", "pa",
               "pha", "ra", "sa1", "sa1+e", "sa1+u", "sa2", "sa3", "ta", "ta+e", "ta+i", "ta1", "tha1",
               "tha2", "u", "u2", "va", "va+e", "va+i", "ya"]  # 54


image = cv2.imread("Early_Brahmi/test/a/images.jpg")

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
# perform edge detection, find contours in the edge map, and sort the
# resulting contours from left-to-right
edged = cv2.Canny(blurred, 30, 150)
cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)
cnts = sort_contours(cnts, method="left-to-right")[0]

chars = []


for i, c in enumerate(cnts):
    # compute the bounding box of the contour
    (x, y, w, h) = cv2.boundingRect(c)
    # filter out bounding boxes, ensuring they are neither too small
    # nor too large
    if (w >= 30 and w <= 200) and (h >= 30 and h <= 200):
        # extract the character and threshold it to make the character
        # appear as *white* (foreground) on a *black* background, then
        # grab the width and height of the thresholded image
        roi = gray[y:y + h + 35, x:x + w + 35]
        thresh = cv2.threshold(roi, 0, 255,
                               cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        (tH, tW) = thresh.shape
        # if the width is greater than the height, resize along the
        # width dimension
        if tW > tH:
            thresh = imutils.resize(thresh, width=32)
        # otherwise, resize along the height
        else:
            thresh = imutils.resize(thresh, height=32)

        # re-grab the image dimensions (now that its been resized)
        # and then determine how much we need to pad the width and
        # height such that our image will be 32x32
        (tH, tW) = thresh.shape
        dX = int(max(0, 32 - tW) / 2.0)
        dY = int(max(0, 32 - tH) / 2.0)
        # pad the image and force 32x32 dimensions
        padded = cv2.copyMakeBorder(thresh, top=dY, bottom=dY,
                                    left=dX, right=dX, borderType=cv2.BORDER_CONSTANT,
                                    value=(0, 0, 0))
        padded = cv2.resize(padded, (32, 32))
        # prepare the padded image for classification via our
        # handwriting OCR model
        padded = padded.astype("float32") / 255.0
        padded = np.expand_dims(padded, axis=-1)
        # update our list of characters that will be OCR'd
        chars.append((padded, (x, y, w, h)))

boxes = [b[1] for b in chars]
chars = np.array([c[0] for c in chars], dtype="float32")

testing_results = {}

for i, char in enumerate(chars):
    cv2.imwrite(f"output/{i}.jpg", cv2.convertScaleAbs(char, alpha=(255.0)))
    # char = cv2.convertScaleAbs(char, alpha=(255.0))
    char = cv2.resize(char, (224, 224), interpolation=cv2.INTER_AREA)
    char = cv2.cvtColor(char, cv2.COLOR_GRAY2RGB)
    char = np.array(char).reshape(-1, 224, 224, 3)
    # print(char.shape)
    prediction = loaded_model.predict([char])
    testing_results[i] = CATEGORIES2[int(np.argmax(prediction))]

print()
print("------ Results ------")
for x in testing_results:
    print(x, " : ", testing_results[x])
print("---------------------")



