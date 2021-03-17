import cv2
import numpy as np

path = "image.jpeg"
img = cv2.imread(path)


def empty(a):
    pass


cv2.namedWindow("frame")

cv2.namedWindow("TrackBars")
cv2.resizeWindow("TrackBars", 640, 300)

## create Trackbars
cv2.createTrackbar("minThresh", "TrackBars", 0, 255, empty)
cv2.createTrackbar("maxThresh", "TrackBars", 0, 255, empty)

cv2.createTrackbar("kernel", "TrackBars", 1, 179, empty)
cv2.createTrackbar("iterDilate", "TrackBars", 1, 20, empty)
cv2.createTrackbar("iterErode", "TrackBars", 1, 20, empty)

while True:

    frame = img

    imgGray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    ## get the values from trackvars
    minThresh = cv2.getTrackbarPos("minThresh", "TrackBars")
    maxThresh = cv2.getTrackbarPos("maxThresh", "TrackBars")

    kernelValue = cv2.getTrackbarPos("kernel", "TrackBars")
    iterDilate = cv2.getTrackbarPos("iterDilate", "TrackBars")
    iterErode = cv2.getTrackbarPos("iterErode", "TrackBars")

    print(f"minThresh, maxThresh : {minThresh}, {maxThresh}")
    print(f"kernelValue,  : ({kernelValue}, {kernelValue})")
    print(f"Iterations for Erosion  : {iterErode}")
    print(f"Iterations for Diatation  : {iterDilate}")

    ## oerride values manually here to see
    minThresh =127
    maxThresh = 255
    kernelValue = 13
    iterDilate = 1
    iterErode = 1

    if kernelValue % 2 != 1:
        kernelValue += 1

    kernel = np.ones((kernelValue, kernelValue), np.uint8)

    print("kernel : ", kernel)
    ret, imgThreshold = cv2.threshold(imgGray, minThresh, maxThresh, 0)
    # 1. Erosion
    imgErode = cv2.erode(imgThreshold, kernel, iterations=iterErode)
    # 2. Dialation
    imgDialated = cv2.dilate(imgErode, kernel, iterations=iterDilate)

    # 3. Opening
    imgOpen = cv2.morphologyEx(imgThreshold, cv2.MORPH_OPEN, kernel)

    # 4. Closing
    imgClose = cv2.morphologyEx(imgThreshold, cv2.MORPH_CLOSE, kernel)

    # 5. gradient

    imgGradient = cv2.morphologyEx(imgThreshold, cv2.MORPH_GRADIENT, kernel)
    # 6. tophat
    imgTophat = cv2.morphologyEx(imgThreshold, cv2.MORPH_TOPHAT, kernel)

    # 7. blackhat
    imgBlackhat = cv2.morphologyEx(imgThreshold, cv2.MORPH_BLACKHAT, kernel)

    hstack1 = np.hstack((imgThreshold, imgGradient))
    hstack2 = np.hstack((imgErode, imgDialated))
    hstack3 = np.hstack((imgOpen, imgClose))
    hstack4 = np.hstack((imgTophat, imgClose))

    allStack = np.vstack((hstack1, hstack2, hstack3, hstack4))

    allStack = cv2.resize(allStack, None, fx=0.25, fy=0.25)

    # cv2.imshow("imgThreshold", imgThreshold)
    # cv2.imshow("imgErode", imgErode)
    # cv2.imshow("imgDialated", imgDialated)
    # cv2.imshow("imgOpen", imgOpen)
    # cv2.imshow("imgClose", imgClose)
    cv2.imshow("imgGradient", imgGradient)
    # cv2.imshow("1.threshold, 2. gradient 3. erosion, 4. dialation 5. opening, 6. closing 7. tophat 8. blk hat",
    #            allStack)

    cv2.imshow("frame", frame)
    key = cv2.waitKey(1)

    if key == ord("q"):
        break
    if key == ord("p"):
        cv2.waitKey(-1)

cv2.waitKey(0)
