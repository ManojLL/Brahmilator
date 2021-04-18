package com.tyrants.reactlibrary;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tyrants.util.ImageUtil;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import static org.opencv.imgproc.Imgproc.ADAPTIVE_THRESH_MEAN_C;
import static org.opencv.imgproc.Imgproc.THRESH_BINARY;
import static org.opencv.imgproc.Imgproc.THRESH_BINARY_INV;

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

    /**
     * Convert captured image or selected image from gallery to grayscale
     *
     * @param imageAsBase64   - image as Base64 Format
     * @param errorCallback   - if interrupted, return the errorCallback with err
     * @param successCallback - if successful, return processed image as Base64 Format
     */
    @ReactMethod
    public void toGrayscale(String imageAsBase64, Callback errorCallback, Callback successCallback) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;

            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            Mat matImage = new Mat();
            Utils.bitmapToMat(image, matImage);

            Mat matImageGrey = new Mat();
            Imgproc.cvtColor(matImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

            // creating bitmap from last open cv img proc
            Bitmap bmp = Bitmap.createBitmap(matImageGrey.cols(), matImageGrey.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(matImageGrey, bmp);

            String encoded = ImageUtil.convert(bmp);

            successCallback.invoke(encoded);

        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void preProcess(String imageAsBase64, int thresh, int opening, int erode, int dilation, int smoothing, Callback errorCallback, Callback successCallback) {
        try {
            // OpenCV library will load once the onCreate() executes
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

            // Convert image to grey scale
            Mat greyImage = new Mat();
            Imgproc.cvtColor(sourceImage, greyImage, Imgproc.COLOR_BGR2GRAY);

            /*
             * There are four different type of threshold operations
             * in this case, we have use To Zero
             * which is -> type 3
             *
             * 0: Binary
             * 1: Binary Inverted
             * 2: Truncate
             * 3: To Zero
             * 4: To Zero Inverted
             * */
            Mat imgAdaptiveThreshold = new Mat();
            Imgproc.threshold(greyImage, imgAdaptiveThreshold, thresh, 255, 3);

            // Remove some noise using Gaussian Blur
            Mat imgGaussianBlur = new Mat();
            Imgproc.GaussianBlur(imgAdaptiveThreshold, imgGaussianBlur, new Size(3, 3), 0);

            /*
             * We can choose any of three shapes for our kernel -> 1st para of the Structuring Element:
             * Ellipse: CV_SHAPE_ELLIPSE
             * Rectangular box: CV_SHAPE_RECT
             * Cross: CV_SHAPE_CROSS
             * */

            // element for erode
            Mat openingStructuringElement = Imgproc.getStructuringElement(
                    Imgproc.CV_SHAPE_ELLIPSE,
                    new Size(2 * opening + 1, 2 * opening + 1),
                    new Point(opening, opening)
            );

            // element for opening
            Mat erodeStructuringElement = Imgproc.getStructuringElement(
                    Imgproc.CV_SHAPE_ELLIPSE,
                    new Size(2 * erode + 1, 2 * erode + 1),
                    new Point(erode, erode)
            );

            // element for dilate
            Mat dilationStructuringElement = Imgproc.getStructuringElement(
                    Imgproc.CV_SHAPE_ELLIPSE,
                    new Size(2 * dilation + 1, 2 * dilation + 1),
                    new Point(dilation, dilation)
            );

            // Opening morph
            Imgproc.morphologyEx(imgGaussianBlur, imgGaussianBlur, Imgproc.MORPH_OPEN, openingStructuringElement);

            // Erosion
            Imgproc.erode(imgGaussianBlur, imgGaussianBlur, erodeStructuringElement);

            // Dilate
            Imgproc.dilate(imgGaussianBlur, imgGaussianBlur, dilationStructuringElement);

            // Smoothing
            if (smoothing!=0) {
                for (int i = 1; i < smoothing; i = i + 2) {
                    Imgproc.medianBlur(imgGaussianBlur, imgGaussianBlur, i);
                }
                Imgproc.pyrDown(imgGaussianBlur, imgGaussianBlur);
            }

            // Creating bitmap from last open cv img
            Bitmap bmp = Bitmap.createBitmap(imgGaussianBlur.cols(), imgGaussianBlur.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(imgGaussianBlur, bmp);

            String encoded = ImageUtil.convert(bmp);

            successCallback.invoke(encoded);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
