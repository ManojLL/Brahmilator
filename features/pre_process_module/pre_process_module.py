import cv2
import numpy as np

path = "image2.jpg"
img = cv2.imread(path)


def empty(a):
    pass


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


def getKernelValue(input):
    result = 0
    if input == 0:
        result = 0  # means no input
    elif input % 2 != 1:
        result = input + 1
    elif input % 2 == 1:
        result = input

    return result


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

    outputImage = imgBlackhat

    cv2.imshow("Result", outputImage)
    cv2.imshow("frame", frame)
    key = cv2.waitKey(1)

    if key == ord("q"):
        break
    if key == ord("p"):
        cv2.waitKey(-1)

    if key == ord("s"):
        cv2.imwrite('Output/output.jpg', cv2.cvtColor(outputImage, cv2.COLOR_GRAY2BGR))

cv2.waitKey(0)

