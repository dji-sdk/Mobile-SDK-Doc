---
title: Running DJI SDK Sample Code in Android Studio
version: v3.5.1
date: 2016-12-15
github: https://github.com/dji-sdk/Mobile-SDK-Android
keywords: [Run SDK Sample Code, Android Studio]
---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, you will learn how to run the DJI Android SDK Sample Code using Android Studio. We use Android Studio 2.2 for demonstration here. 

You can download the DJI Android SDK Sample Code project from this [Github Page](https://github.com/dji-sdk/Mobile-SDK-Android).

## Prerequisites

- Android Studio 1.5 or higher
- Android API Level 22 or higher

## Registering an App Key

Please go to your DJI Account's <a href="http://developer.dji.com/en/user/apps/" target="_blank">User Center</a>, select the "Apps" tab on the left:

![pressCreateApp](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/pressCreateApp.png)

Press the "Create App" button and select "Android" as your operating system. Then type in the info in the pop up dialog as shown below:

![fillInInfo](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/fillInInfo.png)

> **Important**: Please type in "com.dji.sdk.sample" in the `Package Name` field, because the Android Package Name in the DJI SDK Sample project is "com.dji.sdk.sample". We should make sure they are the same.

Once you complete it, press "Create" button to finish. Then you will see the following status:

![email](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/email.png)

After a few seconds, you will receive an email from DJI Developer to ask you to activate your app:

![activateEmail](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/activateEmail.png)

Click the link in the email to open the website and press the app you just created in User Center:

![appActivated](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/appActivated.png)

You may be able to get your App Key in the **App Information**:

![sdkDemoApp_Key](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/createAppSuccessful_android_en.png)

## Running DJI SDK Sample Code

Please download or clone the Github Project repository to your computer and navigate to the **Sample Code** folder:

![sampleCode_folder](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/sampleCode_folder.png)

Open Android Studio, select "Open an existing Android Studio project" in the Android Studio Setup Wizard, then select the **Sample Code** folder to open the project:

![openSampleCode](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/openSampleCode.png)

### Entering App Key

Find and double click the "AndroidManifest.xml" file in left project navigator to open it.

![enterAppKey](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/enterAppKey.png)

Please substitude your App Key of the application we just created in the value attribute under the android:name="com.dji.sdk.API_KEY" attribute as shown below:

~~~xml
<!--
    ADD API_KEY HERE and make sure you
    are connected to the Internet before
    the app is launched
-->
<meta-data
    android:name="com.dji.sdk.API_KEY"
    android:value="" /> //Enter your App Key here.
~~~

### Checking Remote Controller AOA Support

Please make sure your DJI Remote Controller supports <a href="https://source.android.com/devices/accessories/protocol.html" target="_blank"> AOA </a> before you test the Sample app. You can upgrade your DJI Remote Controller to the latest firmware and check if there is a dialog pops up when you connect the app to it like this:
 
![dialog](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/dialog.png)

> Note: To upgrade your DJI Remote Controller's firmware, you can download the **DJI Go** app from Google Play Store: <a href="https://play.google.com/store/apps/details?id=dji.pilot" target="_blank"> https://play.google.com/store/apps/details?id=dji.pilot </a> and open it. Connect the DJI Go app to your remote controller and upgrade its firmware.

### Checking Default App Settings

Sometimes, developers may meet the problem of connecting their DJI SDK-based application to the DJI remote controller (USB accessory). This may because there is more than one SDK-based app(Like DJI Go app) installed on their mobile devices and one of the app is set as default for the USB accessory. So everytime the app connects to the DJI remote controller, the android system will use the chosen app as default to connect.

 To learn how to change the default app for USB accessory, please check these two FAQs: [Android Device](../faq/index.html#How-do-I-reset-the-default-app-behavior-for-a-USB-Accessory-DJI-Product-on-Android-devices), [Samsung Device](../faq/index.html#How-do-I-reset-the-default-app-behavior-for-a-USB-Accessory-DJI-Product-on-Samsung-devices).

Once you finish it, build and run the project on your Android Device. Then connect the Android device to the Remote Controller, turn on the Remote Controller and the aircraft or handheld device. You can start to try different features in the sample project now! 

Here are the screenshots when you run the Sample app on Phantom 3 Professional successfully:

![sampleCodeScreenshot1](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/sampleCodeScreenshot1.png)
![sampleCodeScreenshot1](../images/tutorials-and-samples/Android/RunSDKSampleInAndroidStudio/sampleCodeScreenshot2.png)

