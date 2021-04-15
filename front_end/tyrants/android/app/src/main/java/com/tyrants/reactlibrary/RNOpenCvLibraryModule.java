package com.tyrants.reactlibrary;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.imgproc.Imgproc;

public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }

    @ReactMethod
    public void checkForBlurryImage(String imageAsBase64, Callback errorCallback, Callback successCallback) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;

            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);


//      Bitmap image = decodeSampledBitmapFromFile(imageurl, 2000, 2000);
            int l = CvType.CV_8UC1; //8-bit grey scale image
            Mat matImage = new Mat();
            Utils.bitmapToMat(image, matImage);
            Mat matImageGrey = new Mat();
            Imgproc.cvtColor(matImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

            Bitmap destImage;
            destImage = Bitmap.createBitmap(image);
            Mat dst2 = new Mat();
            Utils.bitmapToMat(destImage, dst2);
            Mat laplacianImage = new Mat();
            dst2.convertTo(laplacianImage, l);
            Imgproc.Laplacian(matImageGrey, laplacianImage, CvType.CV_8U);
            Mat laplacianImage8bit = new Mat();
            laplacianImage.convertTo(laplacianImage8bit, l);

            Bitmap bmp = Bitmap.createBitmap(laplacianImage8bit.cols(), laplacianImage8bit.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(laplacianImage8bit, bmp);
            int[] pixels = new int[bmp.getHeight() * bmp.getWidth()];
            bmp.getPixels(pixels, 0, bmp.getWidth(), 0, 0, bmp.getWidth(), bmp.getHeight());
            int maxLap = -16777216; // 16m
            for (int pixel : pixels) {
                if (pixel > maxLap)
                    maxLap = pixel;
            }

//            int soglia = -6118750;
            int soglia = -8118750;
            if (maxLap <= soglia) {
                System.out.println("is blur image");
            }
            successCallback.invoke(maxLap <= soglia);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void toGrayscale(String imageAsBase64, Callback errorCallback, Callback successCallback) {
        try {
            // do your stuff here like Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2GRAY)
            // to return your processed image back to js use the following line
//            Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2GRAY);
            System.out.println(imageAsBase64);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void preProcess(String imageAsBase64, Callback errorCallback, Callback successCallback, int thresh) {

        // Loading the OpenCV core library
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        Mat mat = Mat.eye(3, 3, CvType.CV_8UC1);
        System.out.println("mat = " + mat.dump());

        // Config BitmapFactory to cvt imageAsBase64
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inDither = true;
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;

        // Decode imageAsBase64
        byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
        Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

        // Convert src to dest using encoded bitmap
        Mat sourceImage = new Mat();
        Utils.bitmapToMat(image, sourceImage);

        // Convert image to grey
        Mat imgGray = new Mat();
        Imgproc.cvtColor(sourceImage, imgGray, Imgproc.COLOR_BGR2GRAY);

        // remove some noise
        Mat imgGaussianBlur = new Mat();
        Imgproc.GaussianBlur(sourceImage, imgGaussianBlur, new Size(3, 3), 0);

        // get threshold values from the UI
        // H ranges 0-180, S and V range 0-255
        Mat imgAdaptiveThreshold = new Mat();
        Imgproc.adaptiveThreshold(imgGaussianBlur, imgAdaptiveThreshold, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 99, 4);

        while (true) {
//            if (thresh == 0) {
//
//            } else {
//                ret, imgThresh = cv2.threshold(imgGray, minThresh, 255, 0);
//            }
//
//
//            // Add Threshold to image
//            Mat thresholdImg = new Mat();
//            Imgproc.adaptiveThreshold(matImageGrey, thresholdImg, 125, Imgproc.ADAPTIVE_THRESH_MEAN_C,
//                    Imgproc.THRESH_BINARY, 11, 12);
//
//
//            // get threshold values from the UI
//            // remember: H ranges 0-180, S and V range 0-255
//            Scalar minValues = new Scalar(this.hueStart.getValue(), this.saturationStart.getValue(), this.valueStart.getValue());
//            Scalar maxValues = new Scalar(this.hueStop.getValue(), this.saturationStop.getValue(), this.valueStop.getValue());
//
//            // show the current selected HSV range
//            String valuesToPrint = "Hue range: " + minValues.val[0] + "-" + maxValues.val[0]
//                    + "\tSaturation range: " + minValues.val[1] + "-" + maxValues.val[1] + "\tValue range: "
//                    + minValues.val[2] + "-" + maxValues.val[2];
//            this.onFXThread(this.hsvValuesProp, valuesToPrint);
//
//            // threshold HSV image to select tennis balls
//            Core.inRange(hsvImage, minValues, maxValues, mask);
//            // show the partial output
//            this.onFXThread(maskProp, this.mat2Image(mask));
        }
    }
}
