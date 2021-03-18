import os
import cv2
import numpy as np
import tensorflow as tf
from tqdm import tqdm

classification_model = "../features/classification_model/saved-models/saved-models-mobilenet4"
input_data = "input_data"
pre_process_data = "pre_process_data"

loaded_model = tf.keras.models.load_model(classification_model)

CATEGORIES = ["ba", "da", "ha", "la", "na", "ta"]

def prepare(filepath):
    IMG_SIZE = 224
    img_array = cv2.imread(filepath)
    new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
    return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 3)

def classify_letters():
    test_path = os.path.join(input_data)
    testing_results = {}
    results = []

    for img in tqdm(os.listdir(test_path)):
        prediction = loaded_model.predict([prepare(os.path.join(test_path, img))])
        testing_results[img] = CATEGORIES[int(np.argmax(prediction))]

    print()
    print("------ Results ------")
    for x in testing_results:
        print(x, " : ", testing_results[x])
        results.append(testing_results[x])
    print("---------------------")

    return results

def getKernelValue(input):
    result = 0
    if input == 0:
        result = 0  # means no input
    elif input % 2 != 1:
        result = input + 1
    elif input % 2 == 1:
        result = input

    return result

def empty(a):
    pass

def pre_process():
    image_path = ""
    test_path = os.path.join(input_data)
    for img in tqdm(os.listdir(test_path)):
        image_path = os.path.join(test_path, img)

    img = cv2.imread(image_path)

    cv2.namedWindow("frame")

    cv2.namedWindow("TrackBars")
    cv2.resizeWindow("TrackBars", 480, 500)
    ## create Trackbars

    cv2.createTrackbar("Threshold", "TrackBars", 0, 255, empty)
    cv2.createTrackbar("kernel", "TrackBars", 1, 30, empty)
    cv2.createTrackbar("Dialation", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Erosion", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Opening", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Closing", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Gradient", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Top Hat", "TrackBars", 0, 30, empty)
    cv2.createTrackbar("Black Hat", "TrackBars", 0, 30, empty)

    while True:

        frame = img

        imgGray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        ## get the values from trackvars

        thresh = cv2.getTrackbarPos("Threshold", "TrackBars")

        kernel_erode_dialate = cv2.getTrackbarPos("kernel", "TrackBars")
        iterErode = cv2.getTrackbarPos("Erosion", "TrackBars")
        iterDilate = cv2.getTrackbarPos("Dialation", "TrackBars")
        opening_kern = cv2.getTrackbarPos("Opening", "TrackBars")
        closing_kern = cv2.getTrackbarPos("Closing", "TrackBars")
        gradient_kern = cv2.getTrackbarPos("Gradient", "TrackBars")
        top_hat_kern = cv2.getTrackbarPos("Top Hat", "TrackBars")
        black_hat_kern = cv2.getTrackbarPos("Black Hat", "TrackBars")

        result_img = frame.copy()

        if thresh == 0:
            imgThresh = result_img
        else:
            minThresh = thresh
            ret, imgThresh = cv2.threshold(imgGray, minThresh, 255, 0)

            # 1. Erosion
        kernelValue = getKernelValue(kernel_erode_dialate)
        if kernelValue == 0 or iterErode == 0:
            imgErode = imgThresh  # No change
        else:
            kernel = np.ones((kernelValue, kernelValue), np.uint8)
            imgErode = cv2.erode(imgThresh, kernel, iterations=iterErode)

        # 2. Dialation
        if kernelValue == 0 or iterDilate == 0:
            imgDialated = imgErode  # No change
        else:
            kernel = np.ones((kernelValue, kernelValue), np.uint8)
            imgDialated = cv2.dilate(imgErode, kernel, iterations=iterDilate)

        # 3. Opening
        opening_kern_odd = getKernelValue(opening_kern)
        if opening_kern_odd == 0:
            imgOpen = imgDialated
        else:
            kernel_opening = np.ones((opening_kern_odd, opening_kern_odd), np.uint8)
            imgOpen = cv2.morphologyEx(imgDialated, cv2.MORPH_OPEN, kernel_opening)

        # 4. Closing
        closing_kern_odd = getKernelValue(closing_kern)
        if closing_kern_odd == 0:
            imgClose = imgOpen
        else:
            kernel_closing = np.ones((closing_kern_odd, closing_kern_odd), np.uint8)
            imgClose = cv2.morphologyEx(imgOpen, cv2.MORPH_CLOSE, kernel_closing)

        # 5. gradient
        gradient_kern_odd = getKernelValue(gradient_kern)
        if gradient_kern_odd == 0:
            imgGradient = imgClose
        else:
            kernel_gradient = np.ones((gradient_kern_odd, gradient_kern_odd), np.uint8)
            imgGradient = cv2.morphologyEx(imgClose, cv2.MORPH_GRADIENT, kernel_gradient)

        # 6. tophat
        top_hat_kern_odd = getKernelValue(top_hat_kern)
        if top_hat_kern_odd == 0:
            imgTophat = imgGradient
        else:
            kernel_topHat = np.ones((top_hat_kern_odd, top_hat_kern_odd), np.uint8)
            imgTophat = cv2.morphologyEx(imgGradient, cv2.MORPH_TOPHAT, kernel_topHat)

        # 7. blackhat
        black_hat_kern_odd = getKernelValue(black_hat_kern)
        if black_hat_kern_odd == 0:
            imgBlackhat = imgTophat
        else:
            kernel_blackHat = np.ones((black_hat_kern_odd, black_hat_kern_odd), np.uint8)
            imgBlackhat = cv2.morphologyEx(imgTophat, cv2.MORPH_BLACKHAT, kernel_blackHat)

        outputImage = imgBlackhat

        cv2.imshow("Result", outputImage)
        cv2.imshow("frame", frame)
        key = cv2.waitKey(1)

        if key == ord("q"):
            break
        if key == ord("p"):
            cv2.waitKey(-1)

        if key == ord("s"):
            cv2.imwrite('pre_process_data/output.jpg', cv2.cvtColor(outputImage, cv2.COLOR_GRAY2BGR))

    cv2.waitKey(0)
