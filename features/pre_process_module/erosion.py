from __future__ import print_function
import cv2 as cv2
import argparse

src = None
erosion_size = 0
max_elem = 2
max_kernel_size = 21

title_trackbar_element_shape = 'Element:\n 0: Rect \n 1: Cross \n 2: Ellipse'
title_trackbar_kernel_size = 'Kernel size:\n 2n +1'
title_erosion_window = 'Erosion Demo'

def main(image):
    global src
    src = cv2.imread('image.jpg')
    if src is None:
        print('Could not open or find the image: ', image)
        exit(0)

    cv2.namedWindow(title_erosion_window)
    cv2.createTrackbar(title_trackbar_element_shape, title_erosion_window, 0, max_elem, erosion)
    cv2.createTrackbar(title_trackbar_kernel_size, title_erosion_window, 0, max_kernel_size, erosion)

    erosion(0)
    cv2.waitKey()


# optional mapping of values with morphological shapes
def morph_shape(val):
    if val == 0:
        return cv2.MORPH_RECT
    elif val == 1:
        return cv2.MORPH_CROSS
    elif val == 2:
        return cv2.MORPH_ELLIPSE


def erosion(val):
    erosion_size = cv2.getTrackbarPos(title_trackbar_kernel_size, title_erosion_window)
    erosion_shape = morph_shape(cv2.getTrackbarPos(title_trackbar_element_shape, title_erosion_window))

    element = cv2.getStructuringElement(erosion_shape, (2 * erosion_size + 1, 2 * erosion_size + 1),
                                        (erosion_size, erosion_size))

    erosion_dst = cv2.erode(src, element)
    cv2.imshow(title_erosion_window, erosion_dst)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Code for Eroding and Dilating tutorial.')
    parser.add_argument('--input', help='Path to input image.', default='LinuxLogo.jpg')
    args = parser.parse_args()
    main(args.input)
