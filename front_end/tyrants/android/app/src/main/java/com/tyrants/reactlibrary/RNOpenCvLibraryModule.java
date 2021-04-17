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
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;

            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            int l = CvType.CV_8UC1; //8-bit grey scale image
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
    public void preProcess(String imageAsBase64, int thresh, Callback errorCallback, Callback successCallback) {
        try {
            // Loading the OpenCV core library
//            System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
//            Mat mat = Mat.eye(3, 3, CvType.CV_8UC1);
//            System.out.println("mat = " + mat.dump());

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
            Mat matImageGrey = new Mat();
            Imgproc.cvtColor(sourceImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

//            // remove some noise
//            Mat imgGaussianBlur = new Mat();
//            Imgproc.GaussianBlur(sourceImage, imgGaussianBlur, new Size(3, 3), 0);

            // get threshold values from the UI
            // H ranges 0-180, S and V range 0-255
            Mat imgAdaptiveThreshold = new Mat();
            Imgproc.adaptiveThreshold(matImageGrey, imgAdaptiveThreshold, thresh, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY, 99, 4);

            // creating bitmap from last open cv img proc
            Bitmap bmp = Bitmap.createBitmap(imgAdaptiveThreshold.cols(), imgAdaptiveThreshold.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(imgAdaptiveThreshold, bmp);

            String encoded = ImageUtil.convert(bmp);

            successCallback.invoke(encoded);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
