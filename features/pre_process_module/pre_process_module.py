import cv2
import argparse
import numpy as np

# Create a Window
cv2.namedWindow('Processed')
cv2.resizeWindow('Processed', 400, 300)

# Sample img for the pre process
img = cv2.imread('image.jpg')
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 7 different pre process operations
# exposure, contrast, threshold, erosion, dilation, opening, closing

# Brightness/ Contrast
alpha = 1.0
beta = 0
new_image = np.zeros(gray_img.shape, gray_img.dtype)

# Erosion
erosion_flag = False
max_elem = 2
max_kernel_size = 21
title_trackbar_element_shape = 'Element:\n 0: Rect \n 1: Cross \n 2: Ellipse'
title_trackbar_kernel_size = 'Kernel size:\n 2n +1'

# optional mapping of values with morphological shapes
def erosion(erosion_index, erosion_size, para_img):
    erosion_shape = cv2.MORPH_RECT

    if erosion_index == 0:
        erosion_shape = cv2.MORPH_RECT
    elif erosion_index == 1:
        erosion_shape = cv2.MORPH_CROSS
    elif erosion_index == 2:
        erosion_shape = cv2.MORPH_ELLIPSE

    element = cv2.getStructuringElement(erosion_shape,
                                        (2 * erosion_size + 1, 2 * erosion_size + 1),
                                        (erosion_size, erosion_size))

    erosion_dst = cv2.erode(para_img, element)
    erosion_flag = True
    return erosion_dst


def track(x):
    print(f'position value: {x}')


# Trackbar Brightness -> alpha
cv2.createTrackbar('Exposure Min', 'Processed', 1, 3, track)
# Trackbar Contrast -> beta
cv2.createTrackbar('Contrast Min', 'Processed', 0, 100, track)

# Trackbar -> Erosion (Shape Type)
cv2.createTrackbar('Erosion Type', 'Processed', 0, 2, erosion)
# Trackbar -> Erosion (Value)
cv2.createTrackbar('Erosion Value', 'Processed', 0, 21, erosion)

while True:
    ex_min = cv2.getTrackbarPos('Exposure Min', 'Processed')
    con_min = cv2.getTrackbarPos('Contrast Min', 'Processed')

    ero_type = cv2.getTrackbarPos('Erosion Type', 'Processed')
    ero_value = cv2.getTrackbarPos('Erosion value', 'Processed')

    processed_img = cv2.convertScaleAbs(gray_img, alpha=ex_min, beta=(-1 * con_min))

    if erosion_flag:
        processed_img = erosion(ero_type, ero_value, processed_img)

    cv2.imshow('Processed', processed_img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.waitKey(0)
