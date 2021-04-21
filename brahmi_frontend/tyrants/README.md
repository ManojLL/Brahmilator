# Client-side of the Brahmilator

Brahmilator has a React-Native client-side component which is fully configured for Android Platform. In order to maximize the efficiency of the pre - process module React-Native has been configured with OpenCV as a native module.

## Configuration between React-Native and OpenCV

Pre-process module uses the device’s camera to take a photo, processes it with native code and returns the processed image as a Base64 String. Doing it in plain JavaScript would be highly ineffective.

1.  Download the [OpenCV Android SDK](https://opencv.org/releases/) In my case, it was v4.5.2
2.  Extract the zip file
3.  Open Android Studio and open the 'android' folder inside your React Native project
4.  File > New > Import Module
5.  Select `OpenCV-android-sdk/sdk/java`
6.  Change module name to `OpenCV452` and untick all the options on the next screen
7.  From top left, change the display from Android to Project
8.  Open `build.gradle` of opencv module
9.  Change `apply plugin: 'com.android.application'` to `apply plugin: 'com.android.library'`
10. Delete this line `applicationId: "org.opencv"`
11. File > Project Structure and click on Dependencies on the left side
12. Select app and click on + then Module Dependency and select opencv
13. Create a folder inside `android/app/src/main/` named jniLibs
14. Copy the contents of `OpenCV-android-sdk/sdk/native/libs` to **jniLibs**
15. If you are using `react-native-camera` your app will not build. To fix this add `multiDexEnabled true` under defaultConfig inside `android/app/build.gradle`
16. Now follow from Step 7 to end from [this blog](https://brainhub.eu/library/opencv-react-native-image-processing/)
17. After you are done open `RNOpenCvLibraryModule.java`
18. Whatever function you write under `@ReactMethod` will be accessible from Javascript
19. Example

```
public void toGrayscale(String imageAsBase64, Callback errorCallback, Callback successCallback) {
   try {
     // do your stuff here like Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2GRAY)
     // to return your processed image back to js use the following line
     successCallback.invoke(abc);
   }
   catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
}
```

20. Inside the React-Native

```
OpenCV.toGrayScale(img, (e) => console.log(e), (img) => {
    // do whatever you want with the processed img
  })
```

Courtesy: [Dark Matter](https://stackoverflow.com/users/10333905/dark-matter)
