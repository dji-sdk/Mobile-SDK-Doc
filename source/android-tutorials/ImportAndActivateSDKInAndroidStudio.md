---
title: Importing and Activating DJI SDK in Android Studio Project
version: v4.0
date: 2017-2-20
github: https://github.com/DJI-Mobile-SDK-Tutorials/Android-ImportAndActivateSDKInAndroidStudio
keywords: [import and activate SDK, Android Studio]
---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, we will use the Android Studio's HelloWorld template project to show you how to import DJI Android SDK and register the application. Throughout this tutorial we will be using Android Studio 2.1.1, which you can download from here: <a href="http://developer.android.com/sdk/index.html" target="_blank">http://developer.android.com/sdk/index.html</a>.

You can download the tutorial's final sample code project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/Android-ImportAndActivateSDKInAndroidStudio).

## Creating an Android Studio Project

 Open Android Studio and select **Start a new Android Studio project** to create a new project.

![createProject](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/createProject.png)   
   
 Then enter the **Application name** as "ImportSDKDemo". Next enter the **Company Domain** and **Package Name** you want and select the **Project location** path to store the project.

  Here we use "com.dji.importSDKDemo" for both Company Domain and Package name.
  
![enterProjectName](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/enterProjectName.png)

> **Important:** The **Package Name** you enter here should be the same as the "Package Name" of the App Information you apply in DJI Developer Website. 
> 
> ![appKey](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/appKey.png)
> 
> For more details of applying for an DJI App, please check [Get Started](../quick-start/index.html) for details.
 
  Press "Next" button to continue and set the mimimum SDK version as `API 19: Android 4.4 (KitKat)` for "Phone and Tablet" and press Next. 
  
![minimumSDK](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/minimumSDK.png)

  Then select "Basic Activity" and press Next. 
  
![basicAcitivity](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/basicActivity.png)
  
  Lastly, leave the **Activity Name** as "MainActivity", the **Layout Name** as "activity_main", the **Title** as "MainActivity", and the **Menu Resource Name** as "menu_main". Press "Finish" to create the project.
  
## Downloading and Importing Module to the Project

  You can download DJI Android SDK from <a href="https://developer.dji.com/mobile-sdk/downloads" target="_blank">DJI Developer Website</a>. 

  Unzip the Android SDK package, go to **File -> New -> Import Module** on the top bar of Android Studio. Then enter the "API Library" folder location of the downloaded Android SDK package in the **Source directory** field. A "dJISDKLib" name will show in the "Module name" field. Press Next and finish button to finish the settings.
 
 ![importSDK](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/importsSDK.png)

## Configurating the Gradle File

Double click on the "build.gradle(Module: app)" in the project navigator to open it:

![gradle](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/gradle.png)

Then replace the content with the following:

~~~xml
apply plugin: 'com.android.application'

android {

    defaultConfig {
        applicationId "com.dji.importSDKDemo"
        minSdkVersion 19
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:multidex:1.0.1'
    compile project(':dJISDKLIB')  // <------------
}
~~~

 Here we add `compile project(':dJISDKLIB')` at the end of "dependencies" part. This is where we configure the Android Studio Project dependencies.

Then, select the **Tools -> Android -> Sync Project with Gradle Files** on the top bar of Android Studio and wait for Gradle project sync finish.

Lastly, right click on the "app" module in the project navigator and click "Open Module Settings" to open the Project Struture window. 

![openModulesSettings](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/openModulesSettings.png)

Select "app" Modules and navigate to the "Dependencies" tab, you should find the "dJISDKLIB" appear in the list. Your SDK environmental setup should be ready now!

![dependencies](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/dependencies.png)

## Trying to use Android SDK in the Project

Now, let's double click to open the MainActivity.java file in the `com.dji.importSDKDemo` package from the project navigator area.

![mainActivity](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/mainActivity.png)

Then add `import dji.sdk.sdkmanager.DJISDKManager;` at the bottom of the import classes section as shown below:
 
~~~java
package com.dji.importSDKDemo;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import dji.sdk.sdkmanager.DJISDKManager;
~~~

  Wait for a few seconds and check if the `import dji.sdk.sdkmanager.DJISDKManager;` line turn red, if it remains gray color, it means that you import DJI Android SDK to your Android Studio project successfully. Here is the status you should see if everything goes well:
  
![checkSDK](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/checkSDK.png)

  Congratulations, now you should be able to use DJI Android SDK in your Android Studio Project!
  
### Registering the Application

After you finish the above steps, let's register our application with the **App Key** you apply from DJI Developer Website. If you are not familiar with the App Key, please check the [Get Started](../quick-start/index.html).

#### Configurating the AndroidManifest.xml

Let's double click the AndroidManifest.xml file in the project navigator to open it:

![androidManifest](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/androidManifest.png)

Then add the following elements code on top of the "application" element:

~~~xml
<!-- Permissions and features -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
    <uses-feature
        android:name="android.hardware.usb.host"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.usb.accessory"
        android:required="true" />
<!-- Permissions and features -->
~~~

Here, we request permissions that the application must be granted in order for it to register DJI SDK correctly. Also we declare the camera and usb hardwares which is used by the application.

Moreover, let's add the following elements as childs of **<application>** element as shown below:

~~~xml
<!-- DJI SDK -->
        <uses-library android:name="com.android.future.usb.accessory" />
        <meta-data
            android:name="com.dji.sdk.API_KEY"
            android:value="Please enter your App Key here." />
        <activity
            android:name="dji.sdk.sdkmanager.DJIAoaControllerActivity"
            android:theme="@android:style/Theme.Translucent" >
            <intent-filter>
                <action android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED" />
            </intent-filter>
            <meta-data
                android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED"
                android:resource="@xml/accessory_filter" />
        </activity>
        <service android:name="dji.sdk.sdkmanager.DJIGlobalService" >
        </service>
<!-- DJI SDK -->
~~~

In the code above, you should substitude your **App Key** of the application for "Please enter your App Key here." in the **value** attribute under the `android:name="com.dji.sdk.API_KEY"` attribute. 

Finally, once you finish all the configurations for AndroidManifest.xml file, you should see the following content:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.dji.importSDKDemo">

    <!-- Permissions and features -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
    <uses-feature
        android:name="android.hardware.usb.host"
        android:required="false" />
    <uses-feature
        android:name="android.hardware.usb.accessory"
        android:required="true" />

    <!-- Permissions and features -->

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!-- DJI SDK -->
        <uses-library android:name="com.android.future.usb.accessory" />
        <meta-data
            android:name="com.dji.sdk.API_KEY"
            android:value="Please enter your App Key here." />
        <activity
            android:name="dji.sdk.sdkmanager.DJIAoaControllerActivity"
            android:theme="@android:style/Theme.Translucent" >
            <intent-filter>
                <action android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED" />
            </intent-filter>
            <meta-data
                android:name="android.hardware.usb.action.USB_ACCESSORY_ATTACHED"
                android:resource="@xml/accessory_filter" />
        </activity>
        <service android:name="dji.sdk.sdkmanager.DJIGlobalService" >
        </service>
        <!-- DJI SDK -->
        
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
~~~

#### Implementing Application Registration

After you finish the steps above, open the **MainActivity.java** file and replace the code with the following content:

~~~java
package com.dji.importSDKDemo;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import dji.sdk.sdkmanager.DJISDKManager;
import dji.sdk.base.BaseComponent;
import dji.sdk.base.BaseProduct;
import dji.common.error.DJIError;
import dji.common.error.DJISDKError;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getName();

    public static final String FLAG_CONNECTION_CHANGE = "dji_sdk_connection_change";

    private static BaseProduct mProduct;

    private Handler mHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // When the compile and target version is higher than 22, please request the following permission at runtime to ensure the SDK works correctly.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.VIBRATE,
                            Manifest.permission.INTERNET, Manifest.permission.ACCESS_WIFI_STATE,
                            Manifest.permission.WAKE_LOCK, Manifest.permission.ACCESS_COARSE_LOCATION,
                            Manifest.permission.ACCESS_NETWORK_STATE, Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.CHANGE_WIFI_STATE, Manifest.permission.MOUNT_UNMOUNT_FILESYSTEMS,
                            Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.SYSTEM_ALERT_WINDOW,
                            Manifest.permission.READ_PHONE_STATE,
                    }
                    , 1);
        }
        
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //Initialize DJI SDK Manager
        mHandler = new Handler(Looper.getMainLooper());
        DJISDKManager.getInstance().registerApp(this, mDJISDKManagerCallback);
    }

    /*
     *  Implement DJISDKManager Callback methods
     */
    private DJISDKManager.SDKManagerCallback mDJISDKManagerCallback = new DJISDKManager.SDKManagerCallback() {

        @Override
        public void onRegister(DJIError error) {
            Log.d(TAG, error == null ? "success" : error.getDescription());
            if(error == DJISDKError.REGISTRATION_SUCCESS) {
                DJISDKManager.getInstance().startConnectionToProduct();
                Handler handler = new Handler(Looper.getMainLooper());
                handler.post(new Runnable() {

                    @Override
                    public void run() {
                        Toast.makeText(getApplicationContext(), "Success", Toast.LENGTH_LONG).show();
                    }
                });
            } else {
                Handler handler = new Handler(Looper.getMainLooper());
                handler.post(new Runnable() {

                    @Override
                    public void run() {
                        Toast.makeText(getApplicationContext(), "register sdk fails, check if network is available", Toast.LENGTH_LONG).show();
                    }
                });

            }
            Log.e("TAG", error.toString());
        }

        @Override
        public void onProductChanged(BaseProduct oldProduct, BaseProduct newProduct) {

            mProduct = newProduct;
            if(mProduct != null) {
                mProduct.setDJIBaseProductListener(mDJIBaseProductListener);
            }

            notifyStatusChange();
        }
    };

    /*
     *  Implement BaseProductListener methods
     */
    private BaseProduct.BaseProductListener mDJIBaseProductListener = new BaseProduct.BaseProductListener() {

        @Override
        public void onComponentChange(BaseProduct.DJIComponentKey key, BaseComponent oldComponent, BaseComponent newComponent) {
            if(newComponent != null) {
                newComponent.setDJIComponentListener(mDJIComponentListener);
            }
            notifyStatusChange();
        }

        @Override
        public void onConnectivityChange(boolean isConnected) {
            notifyStatusChange();
        }

    };

    private BaseComponent.ComponentListener mDJIComponentListener = new BaseComponent.ComponentListener() {

        @Override
        public void onConnectivityChange(boolean isConnected) {
            notifyStatusChange();
        }

    };

    private void notifyStatusChange() {
        mHandler.removeCallbacks(updateRunnable);
        mHandler.postDelayed(updateRunnable, 500);
    }

    private Runnable updateRunnable = new Runnable() {

        @Override
        public void run() {
            Intent intent = new Intent(FLAG_CONNECTION_CHANGE);
            sendBroadcast(intent);
        }
    };

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
~~~

  Here, we implement several features:
  
1. In the `onCreate()` method, we request several permissions at runtime to ensure the SDK works well when the compile and target SDK version is higher than 22(Like Android Marshmallow 6.0 device and API 23).
2. Next we initialize the DJISDKManager and Handler in the `onCreate()` method.
3. Implement the two interface methods of SDKManagerCallback. We can use the `onRegister()` method to check the Application registration status and show text message here. Using the `onProductChange()` method, we can check the product connection status and invoke the `notifyStatusChange()` method to notify status changes.
4. Implement the two interface methods of BaseProductListener. We can use the `onComponentChange()` method to check if a component object changes. Using the `onConnectivityChange()` method to check the connectivity status changes for the base product.

Now let's build and run the project and install it to your Android device. If everything goes well, you should see the "success" textView like the following screenshot when you register the app successfully.

![registerSuccess](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/registerSuccess.png)

> **Important:** Please check if the "armeabi-v7a", "arm64-v8a" and "x86" lib folders has been added to your jnLibs folder in **dJISDKLib** successfully before testing resgistering the app. 
> 
> ![armeabi](../images/tutorials-and-samples/Android/ImportAndActivateSDKInAndroidStudio/armeabi.png)
  
## Where to go from here?
  
  If you want to learn how to use DJI Android SDK to create a simple app, please check this tutorial: [Creating a Camera Application](./FPVDemo.html). It’s our introductory tutorial, which guides you through connecting to your aircraft's camera to displaying a live video feed in your app, through which you can take photos and videos.