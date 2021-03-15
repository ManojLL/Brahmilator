import cv2
import matplotlib.pyplot as plt

max_operator = 4
max_elem = 2
max_kernel_size = 21

title_trackbar_element_type1 = 'Erosion | Dilation:\n0: Rect\n1:Cross\n2: Ellipse\n'
title_trackbar_kernel_size1 = 'Kernel size:\n 2n +1'

title_window = 'Pre Process Module'

title_trackbar_operator_type2 = 'More Morph:\n 0: Opening\n1: Closing\n2: Gradient\n3: Top Hat\n4: Black Hat\n'
title_trackbar_element_type2 = 'Type:\n0: Rect\n1:Cross\n2: Ellipse\n'
title_trackbar_kernel_size2 = 'Kernel size:\n 2n + 1'

morph_op_dic = {0: cv2.MORPH_OPEN, 1: cv2.MORPH_CLOSE, 2: cv2.MORPH_GRADIENT, 3: cv2.MORPH_TOPHAT,
                4: cv2.MORPH_BLACKHAT}

max_value = 255
max_type = 4
max_binary_value = 255
trackbar_type = 'Threshold Type:\n 0: Binary\n 1: Binary Inverted\n 2: Truncate\n 3: To Zero\n 4: To Zero Inverted\n'
trackbar_value = 'Value'


def erosion(val):
    erosion_size = cv2.getTrackbarPos(title_trackbar_kernel_size1, title_window)
    erosion_type = 0
    val_type = cv2.getTrackbarPos(title_trackbar_element_type1, title_window)
    if val_type == 0:
        erosion_type = cv2.MORPH_RECT
    elif val_type == 1:
        erosion_type = cv2.MORPH_CROSS
    elif val_type == 2:
        erosion_type = cv2.MORPH_ELLIPSE
    element = cv2.getStructuringElement(erosion_type, (2 * erosion_size + 1, 2 * erosion_size + 1),
                                        (erosion_size, erosion_size))
    erosion_dst = cv2.erode(src, element)
    cv2.imshow(title_window, erosion_dst)


def dilatation(val):
    dilatation_size = cv2.getTrackbarPos(title_trackbar_kernel_size1, title_window)
    dilatation_type = 0
    val_type = cv2.getTrackbarPos(title_trackbar_element_type1, title_window)
    if val_type == 0:
        dilatation_type = cv2.MORPH_RECT
    elif val_type == 1:
        dilatation_type = cv2.MORPH_CROSS
    elif val_type == 2:
        dilatation_type = cv2.MORPH_ELLIPSE
    element = cv2.getStructuringElement(dilatation_type, (2 * dilatation_size + 1, 2 * dilatation_size + 1),
                                        (dilatation_size, dilatation_size))
    dilatation_dst = cv2.dilate(src, element)
    cv2.imshow(title_window, dilatation_dst)


def morphology_operations(val):
    morph_operator = cv2.getTrackbarPos(title_trackbar_operator_type2, title_window)
    morph_size = cv2.getTrackbarPos(title_trackbar_kernel_size2, title_window)
    morph_elem = 0
    val_type = cv2.getTrackbarPos(title_trackbar_element_type2, title_window)
    if val_type == 0:
        morph_elem = cv2.MORPH_RECT
    elif val_type == 1:
        morph_elem = cv2.MORPH_CROSS
    elif val_type == 2:
        morph_elem = cv2.MORPH_ELLIPSE
    element = cv2.getStructuringElement(morph_elem, (2 * morph_size + 1, 2 * morph_size + 1),
                                        (morph_size, morph_size))
    operation = morph_op_dic[morph_operator]
    dst = cv2.morphologyEx(src, operation, element)
    cv2.imshow(title_window, dst)


def threshold(val):
    # 0: Binary
    # 1: Binary Inverted
    # 2: Threshold Truncated
    # 3: Threshold to Zero
    # 4: Threshold to Zero Inverted
    threshold_type = cv2.getTrackbarPos(trackbar_type, title_window)
    threshold_value = cv2.getTrackbarPos(trackbar_value, title_window)
    _, dst = cv2.threshold(src, threshold_value, max_binary_value, threshold_type)
    cv2.imshow(title_window, dst)


original_image = cv2.imread('testImage.jpg')
original_image_resize = cv2.resize(original_image, (0, 0), fx=0.75, fy=0.75)
src = cv2.cvtColor(original_image_resize, cv2.COLOR_BGR2GRAY)

if src is None:
    print('Could not open or find the image')
    exit(0)

# cv2.namedWindow(title_window)
cv2.createTrackbar(title_trackbar_element_type1, title_window, 0, max_elem, erosion)
cv2.createTrackbar(title_trackbar_kernel_size1, title_window, 0, max_kernel_size, erosion)

cv2.namedWindow(title_window)
cv2.createTrackbar(title_trackbar_element_type1, title_window, 0, max_elem, dilatation)
cv2.createTrackbar(title_trackbar_kernel_size1, title_window, 0, max_kernel_size, dilatation)

# cv2.namedWindow(title_transform_window)
cv2.createTrackbar(title_trackbar_operator_type2, title_window, 0, max_operator, morphology_operations)
cv2.createTrackbar(title_trackbar_element_type2, title_window, 0, max_elem, morphology_operations)
cv2.createTrackbar(title_trackbar_kernel_size2, title_window, 0, max_kernel_size, morphology_operations)

# cv2.namedWindow(threshold_demo)
cv2.createTrackbar(trackbar_type, title_window, 3, max_type, threshold)
cv2.createTrackbar(trackbar_value, title_window, 0, max_value, threshold)

erosion(0)
dilatation(0)
morphology_operations(0)
threshold(0)

cv2.waitKey(0)
