---
title: Creating a TapFly and ActiveTrack Missions Application
version: v4.3.2
date: 2017-09-29
github: https://github.com/DJI-Mobile-SDK-Tutorials/Android-Phantom4Missions
keywords: [Android Phantom 4 Mission, TapFly mission demo, ActiveTrack mission demo]
---

In this tutorial, you will learn how to use the TapFly and ActiveTrack Missions of DJI Android SDK to create a cool application for Mavic Pro. Also, you will get familiar with `ActiveTrackOperator`, `TapFlyMissionOperator` and using the Simulator of DJI Assistant 2 for testing, which is convenient for you to test the missions indoor. We will use Android Studio 2.1.1 version for demo here. So let's get started!

You can download the tutorial's final sample code project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/Android-Phantom4Missions).
   
## Introduction
   
The TapFly and ActiveTrack missions bring you a more autonomous flying experience. They are originally supported by Phantom 4, now they are also supported by Mavic Pro, Phantom 4 Pro, Phantom 4 Advanced, Spark, M200 and Inspire 2.
    
### TapFly Mission

Given a coordinate in the live video stream (which can come from a user tap), the aircraft will calculate and fly towards the coordinate's direction in the real world. During a flight, the aircraft will automatically detect and avoid obstacles. Also, the aircraft will stop flying in the direction if it reaches its radius limitation, the mission is stopped, the user pulls back on the pitch stick or if it comes to an obstacle it cannot bypass. 

During the mission, you can use the remote controller's yaw stick to adjust the heading of the aircraft, which also adjusts the direction of flight to the new yaw. Using any other stick controls will cancel the mission.

Here is a <a href="https://www.djivideos.com/watch/1230a9a3-2985-4262-9cc4-6ce09c765028" target="_blank"> video </a> for you to get the first impression of the TapFly Mission.

### ActiveTrack Mission

An ActiveTrack Mission allows an aircraft to track a moving subject using the vision system and without a GPS tracker on the subject. To use an ActiveTrack mission:

The main camera is used to track the target, so the gimbal cannot be adjusted during an ActiveTrack mission. During the mission, the aircraft can be manually flown with pitch, roll and throttle to move around the subject being tracked.

Here is a <a href="https://www.djivideos.com/watch/b90658c6-2dbe-4993-93e6-1a146c991eff" target="_blank"> video </a> for you to get the first impression of the ActiveTrack Mission.

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile application used in China, it's required to activate the application and bind the aircraft to the user's DJI account. 

 If an application is not activated, the aircraft not bound (if required), or a legacy version of the SDK (< 4.1) is being used, flight will be limited to a cylinder of 100m diameter and 30m height to ensure the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

## Implementing the UI of Application

Now that you know the details of the two missions, we can start working on the application.

### Importing Maven Dependency

Open Android Studio and select **File -> New -> New Project** to create a new project, named 'P4MissionsDemo'. Enter the company domain and package name(Here we use "com.dji.P4MissionsDemo") you want and press Next. Set the minimum SDK version as `API 19: Android 4.4 (KitKat)` for "Phone and Tablet" and press Next. Then select "Empty Activity" and press Next. Lastly, leave the Activity Name as "MainActivity", and the Layout Name as "activity_main", Press "Finish" to create the project.

In our previous tutorial [Importing and Activating DJI SDK in Android Studio Project](../application-development-workflow/workflow-integrate.html#Android-Studio-Project-Integration), you have learned how to import the Android SDK Maven Dependency and activate your application. If you haven't read that previously, please take a look at it and implement the related features. Once you've done that, continue to implement the next features.

### Building the Layouts of Activities

#### 1. Creating DJIDemoApplication Class 

Right-click on the package `com.dji.p4MissionsDemo` in the project navigator and choose **New -> Java Class**, Type in "DJIDemoApplication" in the Name field and select "Class" as Kind field content.
   
Next, replace the code of the "DJIDemoApplication.java" file with the following:
   
~~~java
package com.dji.p4MissionsDemo;
import android.app.Application;

public class DJIDemoApplication extends Application{

    @Override
    public void onCreate() {
        super.onCreate();
    }
}
~~~

Here, we override the onCreate() method. We can do some settings when the application is created here.

#### 2. Implementing DemoBaseActivity Class

Similarly, create a new Empty Activity class with the name of "DemoBaseActivity" in the `com.dji.p4MissionsDemo` package. Remember to deselect the "Generate Layout File". Replace the code with the following, remember to import the related classes as Android Studio suggested:
   
~~~java
public class DemoBaseActivity extends FragmentActivity implements SurfaceTextureListener {

    protected TextView mConnectStatusTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mConnectStatusTextView = (TextView) findViewById(R.id.ConnectStatusTextView);

    }

    @Override
    public void onSurfaceTextureAvailable(SurfaceTexture surface, int width, int height) {
    }

    @Override
    public void onSurfaceTextureSizeChanged(SurfaceTexture surface, int width, int height) {
    }

    @Override
    public boolean onSurfaceTextureDestroyed(SurfaceTexture surface) {
        return false;
    }

    @Override
    public void onSurfaceTextureUpdated(SurfaceTexture surface) {
    }

}
~~~

We will use this activity class as our base class later. More details of the implementation will be done later.

#### 3. Creating the MainActivity

##### Working on the MainActivity Class

Let's come back to the MainActivity.java class, and replace the code with the following, remember to import the related classes as Android Studio suggested:

~~~java
public class MainActivity extends DemoBaseActivity {
    
    public static final String TAG = MainActivity.class.getName();
    
    public String mString = null;
    private BaseProduct mProduct;
        
    private ArrayList<DemoInfo> demos = new ArrayList<DemoInfo>();

    private ListView mListView;
    
    private DemoListAdapter mDemoListAdapter = new DemoListAdapter();
    
    private TextView mFirmwareVersionView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // When the compile and target version is higher than 22, please request the
        // following permissions at runtime to ensure the
        // SDK work well.
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
        
        mConnectStatusTextView = (TextView) findViewById(R.id.ConnectStatusTextView);
        
        mListView = (ListView)findViewById(R.id.listView); 
        mListView.setAdapter(mDemoListAdapter);
        
        mFirmwareVersionView = (TextView)findViewById(R.id.version_tv);
                
        loadDemoList();

        mDemoListAdapter.notifyDataSetChanged();
        
        updateVersion();

        if ((UserAccountManager.getInstance().getUserAccountState() == UserAccountState.NOT_LOGGED_IN)
                || (UserAccountManager.getInstance().getUserAccountState() == UserAccountState.TOKEN_OUT_OF_DATE)
                || (UserAccountManager.getInstance().getUserAccountState() == UserAccountState.INVALID_TOKEN)){
            loginAccount();
        }
        
    }    
    
    private void loadDemoList() {
        mListView.setOnItemClickListener(new OnItemClickListener() {  
            public void onItemClick(AdapterView<?> arg0, View v, int index, long arg3) {  
                onListItemClick(index);
            }
        });
        demos.clear();
        demos.add(new DemoInfo(R.string.title_activity_tracking_test, R.string.demo_desc_tracking, TrackingTestActivity.class));
        demos.add(new DemoInfo(R.string.title_activity_pointing_test, R.string.demo_desc_pointing, PointingTestActivity.class));
    }
    
    private void onListItemClick(int index) {
        Intent intent = null;
        intent = new Intent(MainActivity.this, demos.get(index).demoClass);
        this.startActivity(intent);
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
    
    public void onReturn(View view){
        Log.d(TAG ,"onReturn");  
        this.finish();
    }

    @SuppressLint("ViewHolder")
    private class DemoListAdapter extends BaseAdapter {
        public DemoListAdapter() {
            super();
        }

        @Override
        public View getView(int index, View convertView, ViewGroup parent) {
            convertView = View.inflate(MainActivity.this, R.layout.demo_info_item, null);
            TextView title = (TextView)convertView.findViewById(R.id.title);
            TextView desc = (TextView)convertView.findViewById(R.id.desc);

            title.setText(demos.get(index).title);
            desc.setText(demos.get(index).desc);
            return convertView;
        }
        @Override
        public int getCount() {
            return demos.size();
        }
        @Override
        public Object getItem(int index) {
            return  demos.get(index);
        }

        @Override
        public long getItemId(int id) {
            return id;
        }
    }
    
    private static class DemoInfo{
        private final int title;
        private final int desc;
        private final Class<? extends android.app.Activity> demoClass;

        public DemoInfo(int title , int desc,Class<? extends android.app.Activity> demoClass) {
            this.title = title;
            this.desc  = desc;
            this.demoClass = demoClass;
        }
    }
    
    @Override
    protected void onProductChange() {
        super.onProductChange();
        loadDemoList();
        mDemoListAdapter.notifyDataSetChanged();
        updateVersion();
    }

    private void setResultToToast(final String string) {
        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(MainActivity.this, string, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void loginAccount(){

        UserAccountManager.getInstance().logIntoDJIUserAccount(this, new CommonCallbacks.CompletionCallbackWith<UserAccountState>() {
            @Override
            public void onSuccess(UserAccountState userAccountState) {
                Log.d(TAG ,"Login Success");
            }

            @Override
            public void onFailure(DJIError djiError) {
                setResultToToast("Login Failed: " +  djiError.getDescription());
            }
        });
    }

    String version = null;

    private void updateVersion() {

        BaseProduct product = DJISDKManager.getInstance().getProduct();
        if(product != null) {
            version = product.getFirmwarePackageVersion();
        }
        
        if(version == null) {
            version = "N/A";
        }
        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mFirmwareVersionView.setText("Firmware version: " + version);
            }
        });
        
    }
}
~~~

In the code shown above, we mainly implement the following features:

**1.** Create a ListView to show the "TapFly" and "ActiveTrack" activities' layouts, and a TextView to show the firmware version.

**2.** In the `onCreate()` method, we request several permissions at runtime to ensure the SDK works well when the compile and target SDK version is higher than 22(Like Android Marshmallow 6.0 device and API 23).

**3.** Then create the `mListView` and invoke the `loadDemoList()` method to refresh the listView.

**4.** Create a DemoInfo class to includes title, desc and demoClass content. Implement the `loadDemoList()` method to add listView data source and implement the `mListView`'s `setOnItemClickListener()` method. Then implement the `onListItemClick()` method by creating an Intent to launch the "TapFly" and "ActiveTrack" Activities from MainActivity.

**5.** Create the DemoListAdapter class, which extends from the BaseAdapter class, override the `getView()` method to update the `title` and `desc` variables' text content. Also, override the `getCount()`, `getItem()` and `getItemId()` interface methods.

**6.** Create the `loginAccount()` method to login to user's DJI account and activate the application. This method is invoked in the `onCreate()` method.

##### Implementing the MainActivity Layout

Open the **activity_main.xml** layout file and replace the code with the following:

~~~xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:keepScreenOn="true"
    android:orientation="vertical" >

    <RelativeLayout
        android:id="@+id/main_title_rl"
        android:layout_width="fill_parent"
        android:layout_height="40dp"
        android:background="@android:color/black" >

        <ImageButton
            android:id="@+id/ReturnBtnMain"
            android:layout_width="wrap_content"
            android:layout_height="35dp"
            android:layout_alignParentLeft="true"
            android:layout_centerVertical="true"
            android:layout_marginLeft="20dp"
            android:adjustViewBounds="true"
            android:background="@android:color/transparent"
            android:onClick="onReturn"
            android:scaleType="centerInside"
            android:src="@drawable/selector_back_button" />

        <TextView
            android:id="@+id/ConnectStatusTextView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:text="@string/title_activity_mainactivity"
            android:textColor="@android:color/white"
            android:textSize="21sp" />
    </RelativeLayout>
    <TextView android:id="@+id/version_tv"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Firmware version: N/A"/>
    <ListView
        android:id="@+id/listView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
~~~

  In the xml file, firstly, we implement the RelativeLayout element. We declare an ImageButton(id: ReturnBtnMain) element to exit the application, and a TextView(id: ConnectStatusTextView) element to show the connection status text. Next, create a TextView(id:version_tv) element to show the firmware version and a ListView(id:listView) element to show the list items.
  
  Next, copy all the image files from this Github sample project to the **drawable** folders inside the **res** folder.
  
  ![imageFiles](../images/tutorials-and-samples/Android/Phantom4Missions/imageFiles.png)
  
  Moreover, open the AndroidManifest.xml file and update the ".MainActivity" activity element with several attributes as shown below:
  
~~~xml
<activity
            android:name=".MainActivity"
            android:configChanges="orientation|screenSize"
            android:label="@string/title_activity_mainactivity"
            android:screenOrientation="landscape"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
</activity>
~~~
   
  Furthermore, open the "strings.xml" file in **values** folder and add the following string content:
  
~~~xml
 <string name="title_activity_mainactivity">P4MissionsDemo</string>
~~~

   Lastly, let's create a new xml file named "demo_info_item.xml" in the layout folder by right-clicking on the "layout" folder and select **New->XML->Layout XML File**. Then replace the code of the file with the following:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
    
    <TextView
        android:id="@+id/title"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:textSize="22sp"
        android:layout_marginTop="6dp"
        android:layout_marginBottom="3dp"
        android:layout_marginLeft="10dp"
        android:text="demo title" />

     <TextView 
        android:id="@+id/desc"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:textSize="14sp"
        android:layout_marginBottom="6dp"
        android:layout_marginLeft="10dp"
        android:text="demo desc"
        android:textColor="@color/white"/>

</LinearLayout>
~~~

This xml file will help to setup the two TextViews with "title" and "desc" ids for the convertView of DemoListAdapter.

Now, if you check the activity_main.xml file, you can see the preview screenshot of MainActivity as shown below:
   
<img src="../images/tutorials-and-samples/Android/Phantom4Missions/mainActivityImage.png" width=70%>

For more details, please check the source code of this tutorial's Github sample project.

#### 4. Creating the PointingTestActivity

##### Implementing the PointingTestActivity Class

   Let's create a new Empty Activity class with the name of "PointingTestActivity" in the `com.dji.p4MissionsDemo` package. Replace the code with the following, remember to import the related classes as Android Studio suggested: 
  
~~~java
public class PointingTestActivity extends DemoBaseActivity implements TextureView.SurfaceTextureListener, View.OnClickListener {

    private static final String TAG = "PointingTestActivity";
    private ImageButton mPushDrawerIb;
    private SlidingDrawer mPushDrawerSd;
    private Button mStartBtn;
    private ImageButton mStopBtn;
    private TextView mPushTv;
    private RelativeLayout mBgLayout;
    private ImageView mRstPointIv;
    private TextView mAssisTv;
    private Switch mAssisSw;
    private TextView mSpeedTv;
    private SeekBar mSpeedSb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_pointing_test);
        super.onCreate(savedInstanceState);
        initUI();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void initUI() {
        mPushDrawerIb = (ImageButton)findViewById(R.id.pointing_drawer_control_ib);
        mPushDrawerSd = (SlidingDrawer)findViewById(R.id.pointing_drawer_sd);
        mStartBtn = (Button)findViewById(R.id.pointing_start_btn);
        mStopBtn = (ImageButton)findViewById(R.id.pointing_stop_btn);
        mPushTv = (TextView)findViewById(R.id.pointing_push_tv);
        mBgLayout = (RelativeLayout)findViewById(R.id.pointing_bg_layout);
        mRstPointIv = (ImageView)findViewById(R.id.pointing_rst_point_iv);
        mAssisTv = (TextView)findViewById(R.id.pointing_assistant_tv);
        mAssisSw = (Switch)findViewById(R.id.pointing_assistant_sw);
        mSpeedTv = (TextView)findViewById(R.id.pointing_speed_tv);
        mSpeedSb = (SeekBar)findViewById(R.id.pointing_speed_sb);

        mPushDrawerIb.setOnClickListener(this);
        mStartBtn.setOnClickListener(this);
        mStopBtn.setOnClickListener(this);
        mSpeedSb.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                mSpeedTv.setText(progress + 1 + "");
            }
            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });
    }

    public void onReturn(View view){
        Log.d(TAG, "onReturn");
        this.finish();
    }

    @Override
    public void onClick(View v) {

        if (v.getId() == R.id.pointing_drawer_control_ib) {
            if (mPushDrawerSd.isOpened()) {
                mPushDrawerSd.animateClose();
            } else {
                mPushDrawerSd.animateOpen();
            }
            return;
        }
    }
}
~~~

 Here, we implement several features: 
 
**1.** Declare the UI member variables like ImageButton, TextView, SeekBar, etc. Then override the `onCreate()` method to invoke the `initUI()` method to initialize the UI elements of the Activity.

**2.** In the `initUI()` method, we create the member variables by invoking the `fineViewById()` method and passing the related id value declared in the associated layout xml file. Then call the `setOnClickListener()` method by assigning "this" to it for all the Button member variables. Next implement the SeekBar's `setOnSeekBarChangeListener()` method and override the three interface methods of OnSeekBarChangeListener. Here we update the text value of SeekBar in the `onProgresshanged()` method. 

**3.** Lastly, we override the `onClick()` method to implement the click action of the `mPushDrawerIb` ImageButton. When you press the `mPushDrawerIb`, it will add animations when open and close the `mPushDrawerSd`, which is a **SlidingDrawer**.

##### Working on PointingTestActivity Layout

  Open the colors.xml file in the **values** folder and replace the content with the following:
  
~~~xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="button_normal">#50808080</color>
    <color name="button_press">#5086BFFF</color>
    <color name="white">#FFFFFF</color>
    <color name="black">#000000</color>
</resources>
~~~
  Here, we add button press and normal colors, white and black colors.
  
  Moreover, add the two new string elements to the strings.xml file:
  
~~~xml
<string name="push_info">Push Info</string>
<string name="title_activity_pointing_test">TapFly Sample</string>
~~~

  Then, update the styles.xml with the following code:
  
~~~xml
<resources>
    
    <style name="left_button_list_button">
        <item name="android:minHeight">@dimen/left_button_list_button_height</item>
        <item name="android:layout_width">@dimen/left_button_list_button_width</item>
        <item name="android:layout_height">wrap_content</item>
        <item name="android:paddingLeft">@dimen/left_button_list_button_padding_left</item>
        <item name="android:paddingRight">@dimen/left_button_list_button_padding_right</item>
        <item name="android:layout_marginLeft">@dimen/left_button_list_button_margin_left</item>
        <item name="android:layout_marginTop">@dimen/left_button_list_button_margin_top</item>
        <item name="android:background">@drawable/selector_button</item>
        <item name="android:textSize">@dimen/left_button_list_button_text_size</item>
        <item name="android:textColor">@color/white</item>
    </style>

    <!--
        Base application theme, dependent on API level. This theme is replaced
        by AppBaseTheme from res/values-vXX/styles.xml on newer devices.
    -->
    <style name="AppBaseTheme" parent="android:Theme.Light">
        <!--
            Theme customizations available in newer API levels can go in
            res/values-vXX/styles.xml, while customizations related to
            backward-compatibility can go here.
        -->
    </style>

    <!-- Application theme. -->
    <style name="AppTheme" parent="AppBaseTheme">
        <!-- All customizations that are NOT specific to a particular API-level can go here. -->
    </style>
    
    <style name="test_text">
        <item name="android:shadowColor">@color/black</item>
        <item name="android:shadowDx">2</item>
        <item name="android:shadowDy">1</item>
        <item name="android:shadowRadius">6</item>
        <item name="android:textSize">@dimen/test_log_textsize</item>
        <item name="android:textColor">@color/white</item>
    </style>

</resources>
~~~
  
Lastly, jump over to your associated layout in "layout/activity_ pointing_test.xml" file and replace everything with the same xml file from the tutorial's Github Sample Project, since the xml file's content is too much, we don't show them here. 
   
For the UI, we declare a main title, a return button, a connect status text view, a pointing button, etc. Here is a screenshot of the preview of PointingTestActivity:

<img src="../images/tutorials-and-samples/Android/Phantom4Missions/tapFlyActivityUI.png" width=70%>
    
#### 5. Creating the TrackingTestActivity

##### Working on TrackingTestActivity Class

Once you finish the steps above, let's create a new Empty Activity class with the name of "TrackingTestActivity" in the `com.dji.p4MissionsDemo` package. Replace the code with the following: 
  
~~~java
public class TrackingTestActivity extends DemoBaseActivity implements SurfaceTextureListener, OnClickListener, View.OnTouchListener {

    private static final String TAG = "TrackingTestActivity";
    private ImageButton mPushDrawerIb;
    private SlidingDrawer mPushInfoSd;
    private ImageButton mStopBtn;
    private ImageView mTrackingImage;
    private RelativeLayout mBgLayout;
    private TextView mPushInfoTv;
    private TextView mPushBackTv;
    private TextView mGestureModeTv;
    private Switch mPushBackSw;
    private Switch mGestureModeSw;
    private ImageView mSendRectIV;
    private Button mConfigBtn;
    private Button mConfirmBtn;
    private Button mRejectBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_tracking_test);
        super.onCreate(savedInstanceState);
        initUI();
    }

    private void initUI() {
        mPushDrawerIb = (ImageButton)findViewById(R.id.tracking_drawer_control_ib);
        mPushInfoSd = (SlidingDrawer)findViewById(R.id.tracking_drawer_sd);
        mStopBtn = (ImageButton)findViewById(R.id.tracking_stop_btn);
        mTrackingImage = (ImageView) findViewById(R.id.tracking_rst_rect_iv);
        mBgLayout = (RelativeLayout)findViewById(R.id.tracking_bg_layout);
        mPushInfoTv = (TextView)findViewById(R.id.tracking_push_tv);
        mSendRectIV = (ImageView)findViewById(R.id.tracking_send_rect_iv);
        mPushBackSw = (Switch)findViewById(R.id.tracking_pull_back_sw);
        mPushBackTv = (TextView)findViewById(R.id.tracking_backward_tv);
        mGestureModeTv = (TextView)findViewById(R.id.gesture_mode_tv);
        mGestureModeSw = (Switch)findViewById(R.id.gesture_mode_enable_sw);
        mConfigBtn = (Button)findViewById(R.id.recommended_configuration_btn);
        mConfirmBtn = (Button)findViewById(R.id.confirm_btn);
        mRejectBtn = (Button)findViewById(R.id.reject_btn);
        mStopBtn.setOnClickListener(this);
        mBgLayout.setOnTouchListener(this);
        mPushDrawerIb.setOnClickListener(this);
        mConfigBtn.setOnClickListener(this);
        mConfirmBtn.setOnClickListener(this);
        mRejectBtn.setOnClickListener(this);
    }

    public void onReturn(View view){
        Log.d(TAG, "onReturn");
        this.finish();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tracking_stop_btn:
                break;
            case R.id.tracking_drawer_control_ib:
                if (mPushInfoSd.isOpened()) {
                    mPushInfoSd.animateClose();
                } else {
                    mPushInfoSd.animateOpen();
                }
                break;
            case R.id.recommended_configuration_btn:
                break;
            case R.id.confirm_btn:
                break;
            case R.id.reject_btn:
                break;
            default:
                break;
        }
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        return true;
    }
}
~~~

Here, we implement several features: 
 
**1.** Declare the UI member variables like ImageButton, SlidingDrawer, SeekBar, etc. Then override the `onCreate()` method to invoke the `initUI()` method to initialize the UI elements of the Activity.

**2.** In the `initUI()` method, we create the member variables by invoking the `fineViewById()` method and passing the related id value declared in the associated layout xml file. Then call the `setOnClickListener()` method by assigning "this" to it for all the Button member variables.

**3.** Lastly, we override the `onClick()` method to implement the click action of the `mStopBtn`, `mConfigBtn`, `mConfirmBtn`, `mRejectBtn` and `mPushDrawerIb` member variables. When you press the `mPushDrawerIb` ImageButton, it will add animation to open and close the `mPushInfoSd`.

Next, open the strings.xml file and add the following code:

~~~xml
    <string name="title_activity_tracking_test">ActiveTrack Sample</string>
    <string name="demo_desc_tracking">ActiveTrack Mission</string>
    <string name="demo_desc_pointing">TapFly Mission</string>
~~~

Finally, jump over to your associated layout in layout/activity_ tracking_test.xml and replace everything with the same xml file from the tutorial's Github Sample Project, since the xml file's content is a lot, we don't show them here. For more details, please check the related xml file from the Github Sample Project of the demo project.

For the UI, we declare a main title, a return button, a connect status text view, a TextureView to show live video stream, an ImageView to show the tracking rectangle, etc. Here is a screenshot of the preview of TrackingTestActivity:
   
<img src="../images/tutorials-and-samples/Android/Phantom4Missions/activeTrackActivityUI.png" width=70%>

#### 6. Preview the UI of the Application

Now, let's open the dimens.xml file and replace the code with the following:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- left button list -->
    <dimen name="left_button_list_button_width">150dp</dimen>
    <dimen name="left_button_list_button_height">45dp</dimen>
    <dimen name="left_button_list_button_padding_left">5dp</dimen>
    <dimen name="left_button_list_button_padding_right">5dp</dimen>
    <dimen name="left_button_list_button_margin_left">10dp</dimen>
    <dimen name="left_button_list_button_margin_top">10dp</dimen>
    <dimen name="left_button_list_button_text_size">14sp</dimen>
    
    <dimen name="test_log_textsize">17sp</dimen>
</resources>
~~~

Next, open the AndroidManifest.xml file and modify the **.PointingTestActivity** and **.TrackingTestActivity** elements as shown below:

~~~xml
    <activity
        android:name=".TrackingTestActivity"
        android:label="@string/title_activity_tracking_test"
        android:launchMode="singleInstance"
        android:screenOrientation="landscape"
        android:theme="@android:style/Theme.Holo.NoActionBar.Fullscreen" >
    </activity>
    <activity
        android:name=".PointingTestActivity"
        android:label="@string/title_activity_pointing_test"
        android:launchMode="singleInstance"
        android:screenOrientation="landscape"
        android:theme="@android:style/Theme.Holo.NoActionBar.Fullscreen" >
    </activity>
~~~

In the code above, we modify the label, launchMode, screenOrientation and theme attributes for the two Activities.

We have gone through a long process to setup the UI of the application. Now, let's build and run the project and install it in your Android device to test it. If everything goes well, you may see something similar to the following animation:

<img src="../images/tutorials-and-samples/Android/Phantom4Missions/uiTest.gif" width=70%>

### Registering the Application

After you finish the above steps, let's register our application with the **App Key** you apply from DJI Developer Website. If you are not familiar with the App Key, please check the [Get Started](../quick-start/index.html).

**1.** Let's open the AndroidManifest.xml file and add the following elements above the **application** element:

~~~xml
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

    <application
        android:name=".DJIDemoApplication"
        android:allowBackup="true"
        tools:replace="android:icon"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name" >
~~~

Here, we add uses permissions and uses features for the app. They are required for registration.

Then add the following elements above the **MainActivity** activity element:

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

In the code above, we enter the **App Key** of the application under the `android:name="com.dji.sdk.API_KEY"` attribute. For more details of the AndroidManifest.xml file, please check the Github source code of the demo project.

**2.** After you finish the steps above, open the DJIDemoApplication.java file and replace the code with the same file in the Github Source Code, here we explain the important parts of it:

~~~java
@Override
public void onCreate() {
    super.onCreate();
    mHandler = new Handler(Looper.getMainLooper());
    DJISDKManager.getInstance().registerApp(this, mDJISDKManagerCallback);
}
    
private DJISDKManager.SDKManagerCallback mDJISDKManagerCallback = new DJISDKManager.SDKManagerCallback() {

    @Override
    public void onRegister(DJIError error) {
        Log.d(TAG, error == null ? "success" : error.getDescription());
        if(error == DJISDKError.REGISTRATION_SUCCESS) {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {

                @Override
                public void run() {
                    Toast.makeText(getApplicationContext(), "Register Success", Toast.LENGTH_LONG).show();
                }
            });

            DJISDKManager.getInstance().startConnectionToProduct();
        } else {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {
                
                @Override
                public void run() {
                    Toast.makeText(getApplicationContext(), "Register sdk fails, check network is available", Toast.LENGTH_LONG).show();
                }
            });
            
        }
        Log.e("TAG", error.toString());
    }

    @Override
    public void onProductChange(BaseProduct oldProduct, BaseProduct newProduct) {

        mProduct = newProduct;
        if(mProduct != null) {
            mProduct.setBaseProductListener(mDJIBaseProductListener);
        }
        
        notifyStatusChange();
    }
};
~~~

Here, we implement several features:
  
1. We override the `onCreate()` method to invoke the `registerApp()` method of DJISDKManager to register the application.
2. Implement the two methods of the DJISDKManagerCallback interface. You can use the `onRegister()` method to check the Application registration status and show text message here. Using the `onProductChange()` method, we can check the product connection status and invoke the `notifyStatusChange()` method to notify status changes.

Now, let's build and run the project and install it in your Android device to test it. If everything goes well, you should see the "success" textView like the following screenshot when you register the app successfully.

![registerSuccess](../images/tutorials-and-samples/Android/Phantom4Missions/registerSuccess.png)

> **Important:** Please check if the "armeabi-v7a", "arm64-v8a" and "x86" lib folders has been added to your jnLibs folder in **dJISDKLib** successfully before testing resgistering the app. 
> 
> ![armeabi](../images/tutorials-and-samples/Android/Phantom4Missions/armeabi.png)

## Coordinate Transformations for Missions

Before we dive into the implementation of two missions, let's learn something about the special coordinate transformations of them.

### TapFly Mission Coordinate Transformation

If we check the **TapFlyExecutionState** class, you can see the following two public methods:

~~~java

public Vector getDirection ()
public PointF getImageLocation ()

~~~

**1.** The `getDirection ()` method returns a DJIVector object, which represents a cartesian vector in 3D space. You can get the actual flying direction of the aircraft using the N-E-D(North-East-Down) coordinate system when the aircraft is executing a TapFly mission.

**2.** The `getImageLocation ()` method returns a PointF object, which represents the image point from the live video stream where the vision system should calculate the flight direction from. The image point is normalized to [0,1] where (0,0) is the top left corner and (1,1) is the bottom right.

Here is a diagram to show the coordinate transformation of the mission:

![tapFlyMissionCoordinate](../images/tutorials-and-samples/Android/Phantom4Missions/android_tapFlyMissionCoordinate.png)

As the diagram shown above, you can see the process of transformation.

- The `target` object shown above is transformed from TouchPoint (PointF) to a Video Stream Coordinate System PointF.

- The `getDirection()` method shown above belongs to the **N-E-D (North-East-Down) Coordinate System** and you can invoke this method to get the field value from the SDK.

- The `imageLocation()` method shown above belongs to the **Video Stream Coordinate System** and you can invoke this method to get the field value from the SDK.

So in our demo application, in order to implement the TapFly mission, we should transform the user's touch location (A PointF object) of Android View Coordinate System into the image location (A PointF object) of Video Stream Coordination System and pass it to the following `target` object of DJITapFlyMission:

~~~java
/**
 *  The image point from the video feed where the vision system should calculate the flight direction from. The image point is normalized to [0,1] where (0,0) is the top left corner and (1,1) is the bottom right.
 */
public PointF target
~~~

### ActiveTrack Mission Coordinate Transformation

Next, let's check the **ActiveTrackTrackingState** class, you may see the following public getter method:

~~~java
public RectF getTargetRect()
~~~

Check the **ActiveTrackMission** class, you can also see this method:

~~~java
public void setTargetRect(RectF var1)
~~~

**1.** You can invoke the `getTargetRect ()` method to get a RectF object which is a rectangle in the live video stream view image that represents the target being tracked. The rectangle is normalized to [0,1] where (0,0) is the top left of the video preview and (1,1) is the bottom right.

**2.** By invoking the `setTargetRect(RectF var1)` method, you can set the target rect object, which is a RectF class object, it represents a bounding box for the target. The rectangle is normalized to [0,1] where (0,0) is the top left of the video preview and (1,1) is the bottom right.

If the mission is initialized with a PointF object, the vision system will try to recognize object around the point and return the representative rect in the MissionProgressStatusCallback.
   
Here is a diagram to show the coordinate transformation of the ActiveTrack mission:

![ActiveTrackMissionCoordinate](../images/tutorials-and-samples/Android/Phantom4Missions/android_ActiveTrackMissionCoordinateSystem.png)

As the diagram shown above, you can see the process of transformation. 

- The `getTargetRect()` and `setTargetRect(RectF var1)` methods shown above belongs to the **Video Stream Coordinate System**.

So in order to implement the ActiveTrack Mission, we should transform the user's touch rect (A RectF object) of Android View Coordinate System into the tracking rect (A RectF object) of Video Stream Coordination System and pass it to the `setTargetRect(RectF var1)` method of `ActiveTrackMission`. You can get the tracking rect object by invoking the `getTargetRect()` method of `ActiveTrackTrackingState`. And you can use it to update the rectangle on your screen.

## Implementing the TapFly Mission

### Updating the DemoBaseActivity

Before we implement the TapFly Mission, we should update the DemoBaseActivity.java class to configure the live video streaming feature. Let's open the file and add the following codes to it:

~~~java
private static final String TAG = MainActivity.class.getName();
protected VideoFeeder.VideoDataCallback mReceivedVideoDataCallBack = null;
protected DJICodecManager mCodecManager = null;
private BaseProduct mProduct;

//To store index chosen in PopupNumberPicker listener
protected static int[] INDEX_CHOSEN = {-1, -1, -1};

protected TextView mConnectStatusTextView;

protected TextureView mVideoSurface = null;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
     
    IntentFilter filter = new IntentFilter();  
    filter.addAction(DJIDemoApplication.FLAG_CONNECTION_CHANGE);
    registerReceiver(mReceiver, filter);

    mVideoSurface = (TextureView) findViewById(R.id.video_previewer_surface);
    mConnectStatusTextView = (TextView) findViewById(R.id.ConnectStatusTextView);

    if (null != mVideoSurface) {
        mVideoSurface.setSurfaceTextureListener(this);
    }

    // The callback for receiving the raw H264 video data for camera live view
    mReceivedVideoDataCallBack = new VideoFeeder.VideoDataCallback() {

        @Override
        public void onReceive(byte[] videoBuffer, int size) {
            if(mCodecManager != null){
                mCodecManager.sendDataToDecoder(videoBuffer, size);
            }
        }
    };

}
~~~

Here we declare a TextureView(`mVideoSurface` object) to show the live video stream data. We use the `video_previewer_surface` id from its layout xml file to create the object. This id should be the same as PointingTestActivity and TrackingTestActivity's layout settings. Then create the callback variable `mReceivedVideoDataCallBack` to implement the DJICamera's interface methods for receiving video data.
 
Moreover, we implement the `initPreviewer()` method as shown below to check product connection status and set the `mReceivedVideoDataCallBack` as the callback of VideoFeeder:
 
~~~java
private void initPreviewer() {
    try {
        mProduct = DJIDemoApplication.getProductInstance();
    } catch (Exception exception) {
        mProduct = null;
    }
    
    if (mProduct == null || !mProduct.isConnected()) {
        showToast("Disconnect");
    } else {
        if (null != mVideoSurface) {
            mVideoSurface.setSurfaceTextureListener(this);
        }

        if (!mProduct.getModel().equals(Model.UNKNOWN_AIRCRAFT)) {
            VideoFeeder.getInstance().getPrimaryVideoFeed().setCallback(mReceivedVideoDataCallBack);
        }
    }
}
~~~

For more details of the implementation, please check the "DemoBaseActivity.java" file in this tutorial's Github sample project.

### Working on the PointingTestActivity

#### Showing the Live Video Stream

Now let's come back to the "PointingTestActivity.java" class and override the `onCreate()` method firstly:
  
~~~java
@Override
protected void onCreate(Bundle savedInstanceState) {

    setContentView(R.layout.activity_pointing_test);
    super.onCreate(savedInstanceState);
    initUI();
}
~~~

In the method shown above, we invoke the `setContentView()` method firstly to show the PointingTestActivity view. Then invoke the DemoBaseActivity class's `onCreate()` method to implement the live video stream showing methods. Lastly, invoke the `initUI()` to initialize all the UI elements.
    
#### Working on the TapFly Mission

##### Configure Mission

Before we start to create the `TapFlyMission` object, let's use the `TapFlyMissionOperator` to configure the following settings:

**1.** AutoFlightSpeed

You can set the aircraft's auto flight speed during the mission by invoking the `setAutoFlightSpeed()` method of `TapFlyMissionOperator`. The range for it is [1, 10] m/s.

**2.** isHorizontalObstacleAvoidanceEnabled

If you want to allow the aircraft to bypass or move around an obstacle by going to the left or right of the obstacle when executing TapFly mission, you can set this member variable to YES. Otherwise, the aircraft will only go over an obstacle to avoid it.

**3.** Target

This is where we should pass the coordinate transformation PointF object to, we can use the `getTapFlyPoint()` method to do the coordinate transformation and return the PointF object. It's the image point from the video feed where the vision system should calculate the flight direction from.

Now, let's implement the above settings in source code, in the `initUI()` method, let's improve the `setOnSeekBarChangeListener()` method of `mSpeedSb` as shown below:

~~~java
mSpeedSb.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        mSpeedTv.setText(progress + 1 + "");
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        getTapFlyOperator().setAutoFlightSpeed(getSpeed(), new CommonCallbacks.CompletionCallback() {
            @Override
            public void onResult(DJIError error) {
                setResultToToast(error == null ? "Set Auto Flight Speed Success" : error.getDescription());
            }
        });
    }
});
~~~

In the code above, we invoke the `setAutoFlightSpeed()` method of `TapFlyMissionOperator` in the `onStopTrackingTouch()` method of `setOnSeekBarChangeListener()` to configure the auto flight speed for TapFly mission.

Next, let's implement the `initTapFlyMission()` method to initialize the `mTapFlyMission` variable and set the `isHorizontalObstacleAvoidanceEnabled` boolean value as shown below:

~~~java
private void initTapFlyMission() {
    mTapFlyMission = new TapFlyMission();
    mTapFlyMission.isHorizontalObstacleAvoidanceEnabled = mAssisSw.isChecked();
    mTapFlyMission.tapFlyMode = TapFlyMode.FORWARD;
}
~~~

Here we use `FORWARD` value of the `TapFlyMode` enum, for more details of the `TapFlyMode`, please check this [documentation](http://developer.dji.com/api-reference/android-api/Components/Missions/DJITapFlyMission.html#djitapflymission_djitapflymode_inline).
   
Moreover, let's implement the following two methods to manage the mission coordinate transformations:

~~~java
private PointF getTapFlyPoint(View iv) {
    if (iv == null) return null;
    View parent = (View)iv.getParent();
    float centerX = iv.getLeft() + iv.getX()  + ((float)iv.getWidth()) / 2;
    float centerY = iv.getTop() + iv.getY() + ((float)iv.getHeight()) / 2;
    centerX = centerX < 0 ? 0 : centerX;
    centerX = centerX > parent.getWidth() ? parent.getWidth() : centerX;
    centerY = centerY < 0 ? 0 : centerY;
    centerY = centerY > parent.getHeight() ? parent.getHeight() : centerY;
    
    return new PointF(centerX / parent.getWidth(), centerY / parent.getHeight());
}
    
private void showPointByTapFlyPoint(final PointF point, final ImageView iv) {
    if (point == null || iv == null) {
        return;
    }
    final View parent = (View)iv.getParent();
     PointingTestActivity.this.runOnUiThread(new Runnable() {

         @Override
         public void run() {
             iv.setX(point.x * parent.getWidth() - iv.getWidth() / 2);
             iv.setY(point.y * parent.getHeight() - iv.getHeight() / 2);
             iv.setVisibility(View.VISIBLE);
             iv.requestLayout();
         }
     });
}
~~~
   
We can use the `getTapFlyPoint()` method to transform the tap point position of Android View coordinate system to the video stream coordinate system. In contrast, we use the `showPointByTapFlyPoint()` method to transform the tap point position(We use `mRstPointIv` to represent it) from video stream coordinate system back to the Android View coordinate system and show it on screen.

Lastly, let's override the `onTouch()` method to track the **ACTION_UP** gesture of MotionEvent:

~~~java
@Override
public boolean onTouch(View v, MotionEvent event) {
    if (v.getId() == R.id.pointing_bg_layout) {
        
        switch (event.getAction()) {
        case MotionEvent.ACTION_UP:
            if (mTapFlyMission != null) {
                mStartBtn.setVisibility(View.VISIBLE);
                mStartBtn.setX(event.getX() - mStartBtn.getWidth() / 2);
                mStartBtn.setY(event.getY() - mStartBtn.getHeight() / 2);
                mStartBtn.requestLayout();
                mTapFlyMission.target = getTapFlyPoint(mStartBtn);
            } else {
                setResultToToast("TapFlyMission is null");
            }
            break;

        default:
            break;
        }
    }
    return true;
}
~~~

Here, we update the `mStartBtn`'s position to the position user press. Then we invoke the `getTapFlyPoint()` method to do the coordinate transformation and pass it to TapFlyMission's `target` member variable. 

##### Start and Stop Mission

Next, let's override the `onClick()` method to implement the click action of `mStartBtn` and `mStopBtn` buttons to start and stop the DJITapFlyMission:

~~~java
@Override
public void onClick(View v) {
    if (v.getId() == R.id.pointing_drawer_control_ib) {
        if (mPushDrawerSd.isOpened()) {
            mPushDrawerSd.animateClose();
        } else {
            mPushDrawerSd.animateOpen();
        }
        return;
    }
    if (getTapFlyOperator() != null) {
        switch (v.getId()) { 
        case R.id.pointing_start_btn:
            getTapFlyOperator().startMission(mTapFlyMission, new CommonCallbacks.CompletionCallback() {
                @Override
                public void onResult(DJIError error) {
                    setResultToToast(error == null ? "Start Mission Successfully" : error.getDescription());
                    if (error == null){
                        setVisible(mStartBtn, false);
                    }
                }
            });
            break;
        case R.id.pointing_stop_btn:
            getTapFlyOperator().stopMission(new CommonCallbacks.CompletionCallback() {
                @Override
                public void onResult(DJIError error) {
                    setResultToToast(error == null ? "Stop Mission Successfully" : error.getDescription());
                }
            });
            break;
        default:
            break;
        }
    } else {
        setResultToToast("TapFlyMission Operator is null");
    }
}
~~~

In the code above, we use a switch statement to identify the `mStartBtn` and `mStopBtn` buttons' click action. In the 'mStartBtn' click action case, we invoke the `startMission()` method of `TapFlyMissionOperator` to start the mission and update the visibilities of the `mStartBtn` button. 

In the `mStopBtn` click action case, we invoke the `stopMission()` method of `TapFlyMissionOperator` to stop the mission.

##### Add Listener to Receive Mission Events

During the TapFly mission execution, we can add a listener to receive the mission events for status infos. You can use this status infos to inform users of the results or update the UI interface.

Now, let's add the following code at the bottom of `onCreate()` method:

~~~java
@Override
protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.activity_pointing_test);
    super.onCreate(savedInstanceState);
    initUI();
    getTapFlyOperator().addListener(new TapFlyMissionOperatorListener() {
        @Override
        public void onUpdate(@Nullable TapFlyMissionEvent aggregation) {
            TapFlyExecutionState executionState = aggregation.getProgressState();
            if (executionState != null){
                showPointByTapFlyPoint(executionState.getImageLocation(), mRstPointIv);
            }

            StringBuffer sb = new StringBuffer();
            String errorInformation = (aggregation.getError() == null ? "null" : aggregation.getError().getDescription()) + "\n";
            String currentState = aggregation.getCurrentState() == null ? "null" : aggregation.getCurrentState().getName();
            String previousState = aggregation.getPreviousState() == null ? "null" : aggregation.getPreviousState().getName();
            Utils.addLineToSB(sb, "CurrentState: ", currentState);
            Utils.addLineToSB(sb, "PreviousState: ", previousState);
            Utils.addLineToSB(sb, "Error:", errorInformation);

            TapFlyExecutionState progressState = aggregation.getProgressState();

            if (progressState != null) {
                Utils.addLineToSB(sb, "Heading: ", progressState.getRelativeHeading());
                Utils.addLineToSB(sb, "PointX: ", progressState.getImageLocation().x);
                Utils.addLineToSB(sb, "PointY: ", progressState.getImageLocation().y);
                Utils.addLineToSB(sb, "BypassDirection: ", progressState.getBypassDirection().name());
                Utils.addLineToSB(sb, "VectorX: ", progressState.getDirection().getX());
                Utils.addLineToSB(sb, "VectorY: ", progressState.getDirection().getY());
                Utils.addLineToSB(sb, "VectorZ: ", progressState.getDirection().getZ());
                setResultToText(sb.toString());
            }

            TapFlyMissionState missionState = aggregation.getCurrentState();
            if (!((missionState == TapFlyMissionState.EXECUTING) || (missionState == TapFlyMissionState.EXECUTION_PAUSED)
                    || (missionState == TapFlyMissionState.EXECUTION_RESETTING))){
                setVisible(mRstPointIv, false);
                setVisible(mStopBtn, false);
            }else
            {
                setVisible(mStopBtn, true);
                setVisible(mStartBtn, false);
            }
        }
    });
}
~~~

In the code above, we implement the following features:

1. Invoke the `addListener()` method of `TapFlyMissionOperator` and implement the `onUpdate()` method to receive the TapFly mission events.
2. In the `onUpdate()` method, we firstly get the `TapFlyExecutionState` object `executionState` from the updated `aggregation` variable. Next, check if the `executionState` is null, if not, invoke the `showPointByTapFlyPoint()` method to update the position of the`mRstPointIv` image View (A green circle) on screen. This green circle represents the direction which Mavic Pro will fly towards.
3. Moreover, store the TapFly execution state infos into the StringBuffer `sb` and show it on the `mPushTv` TextView.
4. Lastly, we get the updated `TapFlyMissionState` and set visible property for `mRstPointIv`, `mStartBtn` and `mStopBtn`. 

For more implementation details of the `PointingTestActivity` class, please check the Github source code. 

Now let's build and run the project to install the app to your Android device, if everything goes well, you should be able to use the TapFly mission of Mavic Pro now.

>**Important**: Remember to switch the remote controller to **P** mode before you test the TapFly mission.

Here is a gif animation for you to get a better understanding of using the TapFly mission feature:

<img src="../images/tutorials-and-samples/Android/Phantom4Missions/tapFlyMission.gif" width=70%>

In the animation, when you tap on the screen, a green circle with a "GO" button appears, which is the direction you want Mavic Pro fly towards. Then, press the **GO** button, Mavic Pro will start to execute the TapFly mission and fly. When you want to stop the mission, just press the **X** button, Mavic Pro will stop immediately and hover there.

## Implementing ActiveTrack Mission

### Working on the TrackingTestActivity

#### Showing the Live Video Stream

Now let's go to TrackingTestActivity.java class and override the `onCreate()` method firstly:
  
~~~java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_tracking_test);
        super.onCreate(savedInstanceState);
        initUI();
    }
~~~

In the method shown above, we invoke the `setContentView()` method firstly to show the TrackingTestActivity view. Then invoke the DemoBaseActivity class's `onCreate()` method to implement the live video stream showing methods. Lastly, invoke the `initUI()` to initialize all the UI elements.
    
#### Working on the ActiveTrack Mission

##### Configure Mission

Before we start to create the `ActiveTrackMission` object, let's use the `ActiveTrackOperator` to configure the following settings:

- Enable/Disable Gesture Mode

Gesture mode allows the subject to confirm tracking as well as take pictures using gestures. Raise your arms in a **V**, the human subject can accept the confirmation to track them. Gesture mode can only be enabled when the aircraft is flying but not tracking a target. If the aircraft is already tracking a target, disabling gesture mode will stop the ActiveTrack mission.

You can check this [video](https://www.djivideos.com/watch/b45aa08d-0bd3-46df-a89e-e36f94dffbe9) to get a better understanding of the Gesture Mode.

Now let's implement the `setChecked()` and `setOnCheckedChangeListener()` methods of the `mGestureModeSw` switch at the bottom of the `initUI()` method as shown below:

~~~java
mGestureModeSw.setChecked(getActiveTrackOperator().isGestureModeEnabled());

mGestureModeSw.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener()
{
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked)
    {
        getActiveTrackOperator().setGestureModeEnabled(isChecked, new CommonCallbacks.CompletionCallback() {
            @Override
            public void onResult(DJIError error) {
                setResultToToast("Set GestureMode Enabled: " + (error == null
                        ? "Success"
                        : error.getDescription()));
            }
        });
    }
});
~~~

In the code above, we firstly invoke the `isGestureModeEnabled()` method of `ActiveTrackOperator` to check if the gesture mode is enabled and update the value of the `mGestureModeSw` switch. Next, invoke the `setGestureModeEnabled()` method of `ActiveTrackOperator` to set the gesture mode and inform users by showing a toast message in the completion callback.

- Enable/Disable Retreat

When retreat is enabled, the aircraft will retreat (fly backwards) when the target comes toward it. When it is disabled, the aircraft will not retreat and instead rotate the gimbal pitch down to track the target as it goes underneath. If the target goes beyond the gimbal's pitch stop, the target will be lost and the mission will stop.

Here, let's implement the `setOnCheckedChangeListener()` method of the `mPushBackSw` switch at the bottom of the `initUI()` method as shown below:

~~~java
mPushBackSw.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener()
{
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked)
    {
        getActiveTrackOperator().setRetreatEnabled(isChecked, new CommonCallbacks.CompletionCallback() {
            @Override
            public void onResult(DJIError error) {
                setResultToToast("Set RetreatEnabled: " + (error == null
                        ? "Success"
                        : error.getDescription()));
            }
        });
    }
});
~~~

As you see the code above, we invoke the `setRetreatEnabled()` method of `ActiveTrackOperator` to enable the retreat feature. Next, in the completion callback, inform users by showing a toast message.

- Set Recommended Configuration

Using this feature, we can set the recommended camera and gimbal configuration that optimizes performance for the ActiveTrack Mission in most environments.

Now, let's implement the `onClick()` method of the `mConfigBtn` button as shown below:

~~~objc
case R.id.recommended_configuration_btn:
    getActiveTrackOperator().setRecommendedConfiguration(new CommonCallbacks.CompletionCallback() {
        @Override
        public void onResult(DJIError error) {
            setResultToToast("Set Recommended Config" + (error == null ? "Success" : error.getDescription()));
        }
    });
    break;
~~~

Here, we can invoke the `setRecommendedConfiguration()` method of `ActiveTrackOperator` to set the recommended camera and gimbal configuration. Then in the completion callback, show a toast message to inform users of the results.

##### Start the Mission

Once you finish the steps above, let's continue to implement the following methods to start the ActiveTrack mission:

~~~java
private RectF getActiveTrackRect(View iv) {
    View parent = (View)iv.getParent();
    return new RectF(
            ((float)iv.getLeft() + iv.getX()) / (float)parent.getWidth(),
            ((float)iv.getTop() + iv.getY()) / (float)parent.getHeight(),
            ((float)iv.getRight() + iv.getX()) / (float)parent.getWidth(),
            ((float)iv.getBottom() + iv.getY()) / (float)parent.getHeight()
    );
}

private double calcManhattanDistance(double point1X, double point1Y, double point2X, double point2Y) {
    return Math.abs(point1X - point2X) + Math.abs(point1Y - point2Y);
}

@Override
public boolean onTouch(View v, MotionEvent event) {

    switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
            isDrawingRect = false;
            downX = event.getX();
            downY = event.getY();
            break;
        case MotionEvent.ACTION_MOVE:
            if (calcManhattanDistance(downX, downY, event.getX(), event.getY()) < 20 && !isDrawingRect) {
                return true;
            }
            isDrawingRect = true;
            mSendRectIV.setVisibility(View.VISIBLE);
            int l = (int)(downX < event.getX() ? downX : event.getX());
            int t = (int)(downY < event.getY() ? downY : event.getY());
            int r = (int)(downX >= event.getX() ? downX : event.getX());
            int b = (int)(downY >= event.getY() ? downY : event.getY());
            mSendRectIV.setX(l);
            mSendRectIV.setY(t);
            mSendRectIV.getLayoutParams().width = r - l;
            mSendRectIV.getLayoutParams().height = b - t;
            mSendRectIV.requestLayout();

            break;

        case MotionEvent.ACTION_UP:

            RectF rectF = getActiveTrackRect(mSendRectIV);
            PointF pointF = new PointF(downX / mBgLayout.getWidth(), downY / mBgLayout.getHeight());
            RectF pointRectF = new RectF(pointF.x, pointF.y, 0, 0);
            mActiveTrackMission = isDrawingRect ? new ActiveTrackMission(rectF, ActiveTrackMode.TRACE) :
                    new ActiveTrackMission(pointRectF, ActiveTrackMode.TRACE);

            getActiveTrackOperator().startTracking(mActiveTrackMission, new CommonCallbacks.CompletionCallback() {
                @Override
                public void onResult(DJIError error) {
                    setResultToToast("Start Tracking: " + (error == null
                                ? "Success"
                                : error.getDescription()));
                }
            });
            mSendRectIV.setVisibility(View.INVISIBLE);
            break;
        default:
            break;
    }

    return true;
}
~~~

In the code above, we implement the following features:

1. In the getActiveTrackRect() method, we transform the tracking rectangle of Android View coordinate system to the video stream coordinate system. 
2. Next, in the `calcManhattanDistance()` method, we calculate the Manhattan distance between two points when drawing rect on the screen.
3. Moreover, we implement the `onTouch()` method to handle the `ACTION_DOWN`, `ACTION_MOVE` and `ACTION_UP` MotionEvents. In the `ACTION_DOWN` and `ACTION_MOVE` events, we mainly work on updating the size and position of the white `mSendRectIV` rectangle on screen when user draws. 
4. In the `ACTION_UP` event, we firstly invoke the `getActiveTrackRect()` method and pass the `mSendRectIV` variable to transform the drawing rectangle to the video stream coordinate system. Next, check the value of the `isDrawingRect` and initialize the `mActiveTrackMission` variable accordingly. Here, we use the `TRACE` mode of the [ActiveTrackMode](http://developer.dji.com/api-reference/android-api/Components/Missions/DJIActiveTrackMission.html?search=trace&i=0&#djiactivetrackmission_djiactivetrackmode_inline). Furthermore, invoke the `startTracking()` method of `ActiveTrackOperator` to start the ActiveTrack mission and inform users by showing a toast message. Lastly, we hide the `mSendRectIV` image view.

##### Accept and Reject Confirmation

When the vision system is not sure if the tracking rectangle is around the user's desired target, it will need confirmation before starting to fly relative to the target. Let's implement the `onClick()` method of the `mConfirmBtn` button as shown below:

~~~java
case R.id.confirm_btn:
    getActiveTrackOperator().acceptConfirmation(new CommonCallbacks.CompletionCallback() {

        @Override
        public void onResult(DJIError error) {
            setResultToToast(error == null ? "Accept Confirm Success!" : error.getDescription());
        }
    });
    break;
~~~

Here, we invoke the `acceptConfirmation()` method of `ActiveTrackOperator` to accept the confirmation and show a toast message to inform users of the results.

If you want to stop the aircraft from following the target, and ask for user's confirmation again, you can implement the `onClick()` method of the `mRejectBtn` button as shown below:

~~~java
case R.id.reject_btn:
    getActiveTrackOperator().rejectConfirmation(new CommonCallbacks.CompletionCallback() {

        @Override
        public void onResult(DJIError error) {
            setResultToToast(error == null ? "Reject Confirm Success!" : error.getDescription());
        }
    });
    break;
~~~

In the code above, we invoke the `rejectConfirmation()` method of `ActiveTrackOperator` to reject the confirmation and stop the aircraft from following the target. Then show a toast message to inform users of the results.

##### Add Listener to Receive Mission Events

During the ActiveTrack mission execution, we can add a listener to receive the mission events for status infos. You can use this status infos to inform users of the results or update the UI interface.

Now, let's implement the `ActiveTrackMissionOperatorListener` interface and add the following code at the bottom of the `onCreate()` method:

~~~java
@Override
protected void onCreate(Bundle savedInstanceState) {
    setContentView(R.layout.activity_tracking_test);
    super.onCreate(savedInstanceState);
    initUI();
    getActiveTrackOperator().addListener(this);
}
~~~

Here we add `TrackingTestActivity` as the listener to receive mission events. Next, let's implement the `updateActiveTrackRect()` method and `onUpdate` callback method as shown below:

~~~java

private void updateActiveTrackRect(final ImageView iv, final ActiveTrackMissionEvent event) {
    if (iv == null || event == null) return;
    View parent = (View)iv.getParent();

    if (event.getTrackingState() != null){
        RectF trackingRect = event.getTrackingState().getTargetRect();
        final int l = (int)((trackingRect.centerX() - trackingRect.width() / 2) * parent.getWidth());
        final int t = (int)((trackingRect.centerY() - trackingRect.height() / 2) * parent.getHeight());
        final int r = (int)((trackingRect.centerX() + trackingRect.width() / 2) * parent.getWidth());
        final int b = (int)((trackingRect.centerY() + trackingRect.height() / 2) * parent.getHeight());

        TrackingTestActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {

                ActiveTrackTargetState targetState = event.getTrackingState().getState();

                if ((targetState == ActiveTrackTargetState.CANNOT_CONFIRM)
                        || (targetState == ActiveTrackTargetState.UNKNOWN))
                {
                    iv.setImageResource(R.drawable.visual_track_cannotconfirm);
                } else if (targetState == ActiveTrackTargetState.WAITING_FOR_CONFIRMATION) {
                    iv.setImageResource(R.drawable.visual_track_needconfirm);
                } else if (targetState == ActiveTrackTargetState.TRACKING_WITH_LOW_CONFIDENCE){
                    iv.setImageResource(R.drawable.visual_track_lowconfidence);
                } else if (targetState == ActiveTrackTargetState.TRACKING_WITH_HIGH_CONFIDENCE){
                    iv.setImageResource(R.drawable.visual_track_highconfidence);
                }
                iv.setVisibility(View.VISIBLE);
                iv.setX(l);
                iv.setY(t);
                iv.getLayoutParams().width = r - l;
                iv.getLayoutParams().height = b - t;
                iv.requestLayout();
            }
        });
    }
}

@Override
public void onUpdate(ActiveTrackMissionEvent event) {

    StringBuffer sb = new StringBuffer();
    String errorInformation = (event.getError() == null ? "null" : event.getError().getDescription()) + "\n";
    String currentState = event.getCurrentState() == null ? "null" : event.getCurrentState().getName();
    String previousState = event.getPreviousState() == null ? "null" : event.getPreviousState().getName();
    Utils.addLineToSB(sb, "CurrentState: ", currentState);
    Utils.addLineToSB(sb, "PreviousState: ", previousState);
    Utils.addLineToSB(sb, "Error:", errorInformation);

    ActiveTrackTrackingState trackingState = event.getTrackingState();
    if (trackingState != null){
        RectF trackingRect = trackingState.getTargetRect();
        if (trackingRect != null) {

            Utils.addLineToSB(sb, "Rect center x: ", trackingRect.centerX());
            Utils.addLineToSB(sb, "Rect center y: ", trackingRect.centerY());
            Utils.addLineToSB(sb, "Rect Width: ", trackingRect.width());
            Utils.addLineToSB(sb, "Rect Height: ", trackingRect.height());
            Utils.addLineToSB(sb, "Reason", trackingState.getReason().name());
            Utils.addLineToSB(sb, "Target Index: ", trackingState.getTargetIndex());
            Utils.addLineToSB(sb, "Target Type", trackingState.getType().name());
            Utils.addLineToSB(sb, "Target State", trackingState.getState().name());

            setResultToText(sb.toString());
        }
    }

    updateActiveTrackRect(mTrackingImage, event);

    ActiveTrackState state = event.getCurrentState();
    if (state == ActiveTrackState.FINDING_TRACKED_TARGET ||
            state == ActiveTrackState.AIRCRAFT_FOLLOWING ||
            state == ActiveTrackState.ONLY_CAMERA_FOLLOWING ||
                    state == ActiveTrackState.CANNOT_CONFIRM ||
                    state == ActiveTrackState.WAITING_FOR_CONFIRMATION ||
                    state == ActiveTrackState.PERFORMING_QUICK_SHOT){

        TrackingTestActivity.this.runOnUiThread(new Runnable() {

            @Override
            public void run() {
                mStopBtn.setVisibility(View.VISIBLE);
                mStopBtn.setClickable(true);
                mConfirmBtn.setVisibility(View.VISIBLE);
                mConfirmBtn.setClickable(true);
                mRejectBtn.setVisibility(View.VISIBLE);
                mRejectBtn.setClickable(true);
                mConfigBtn.setVisibility(View.INVISIBLE);
            }
        });
    }else
    {
        TrackingTestActivity.this.runOnUiThread(new Runnable() {

            @Override
            public void run() {
                mStopBtn.setVisibility(View.INVISIBLE);
                mStopBtn.setClickable(false);
                mConfirmBtn.setVisibility(View.INVISIBLE);
                mConfirmBtn.setClickable(false);
                mRejectBtn.setVisibility(View.INVISIBLE);
                mRejectBtn.setClickable(false);
                mConfigBtn.setVisibility(View.VISIBLE);
                mTrackingImage.setVisibility(View.INVISIBLE);
            }
        });
    }
}
~~~

In the code above, we implement the following features:
1. In the `updateActiveTrackRect()` method, we update the `mTrackingImage` image view's position and size based on the current target rect. Also, update the image resource of the `mTrackingImage` variable based on the `ActiveTrackTargetState`.
2. Next, in the `onUpdate()` method, we create a StringBuffer `sb` object and store the ActiveTrack execution state infos into it and show it on the `mPushInfoTv` TextView.
3. Moreover, invoke the `updateActiveTrackRect()` method to update the position of the `mTrackingImage` image View (A rectangle with different colors) on screen base on the updated `ActiveTrackMissionEvent`.
4. Lastly, get the updated `ActiveTrackState` object and update the UI interfaces' **visibility** and **clickable** status.

##### Stop the Mission

Lastly, let's continue to implement the `onClick()` method of the `mStopBtn` button as shown below:

~~~java
case R.id.tracking_stop_btn:
    getActiveTrackOperator().stopTracking(new CommonCallbacks.CompletionCallback() {
        @Override
        public void onResult(DJIError error) {
            setResultToToast(error == null ? "Stop Tracking Success!" : error.getDescription());
        }
    });

    break;
~~~

Here, we invoke the `stopTracking()` method of `ActiveTrackOperator` to stop executing the ActiveTrack mission and show a toast message to inform users of the result.

For more implementation details of the **TrackingTestActivity.java** file, please check this tutorial's Github source code. 

Now let's build and run the project, if everything goes well, you should be able to use the ActiveTrack mission of Mavic Pro now. 

>**Important**: Remember to switch the remote controller to **P** mode before you test the ActiveTrack mission.

Here are two gif animations for you to get a better understanding of using the ActiveTrack mission:

- TRACE Mode

<img src="../images/tutorials-and-samples/Android/Phantom4Missions/activeTrackAnim.gif" width=70%>

Here we use the `TRACE` mode of `ActiveTrackMode` for demonstration. In the animation above, you can see there is a person riding a bicycle there, you can touch the screen to draw a white rectangle on him. Then the rectangle locks on him and turns purple when the `ActiveTrackTargetState` is `WAITING_FOR_CONFIRMATION`. Press the **A** button to accept the confirmation. After the confirmation, the rectangle turns green and the ActiveTrack mission starts. The person rides around and the green rectangle will follow him to track its movement.

Press the **X** button if you want to stop the ActiveTrack mission. By the way, you can try to switch on the "RetreatEnabled" switcher on the upper left corner of the screen to enable the **Retreat** feature. Once you go towards the Mavic Pro, it will fly backwards.

- Enable Gesture Mode

<img src="../images/tutorials-and-samples/Android/Phantom4Missions/gestureMode.gif" width=70%>

In the animation above, you can see there is a person standing there, when he raise his arms in a **V**, the Mavic Pro will accept the confirmation and start to track him automatically. Press the **X** button if you want to stop the ActiveTrack mission.

### Using the DJI Assistant 2 for Mission Testing

Since most of our developers don't have a perfect testing environment, like a big indoor space, wide backyard, etc. If we need to go outdoors and bring our laptop to debug and test our application everytime, it's time-consuming and not efficient. 

Luckily, we have a new DJI Assistant 2 (Includes the 3D Simulator) for you to test the mission easily on your Mac. The simulator creates a virtual 3D environment from flight data transmitted to the Mac.

You can check the [Using DJI Assistant 2 Simulator](../application-development-workflow/workflow-testing.html#DJI-Assistant-2-Simulator) for its basic usage.

Now you can connect your Android which is running the demo application to the remote controller, and start to test the **TapFly** and **ActiveTrack** missions on the simulator of DJI Assistant 2.  

By the way, you can use Wireless Android Debug Bridge (adb) to debug the app using Android Studio when your android device is connecting to the remote controller. If you are not familiar with Android Debug Bridge, please check this <a href="http://developer.android.com/tools/help/adb.html" target="_blank"> link </a> for details.

### Summary

  Congratulations! You've finished the demo project and implement the two cool **TapFly** and **ActiveTrack** missions using DJI Mobile SDK. It's easy and straightforward. You've learned how to use the DJITapFlyMission, DJIActiveTrackMission and DJIMissionControl to implement the features.

  But, In order to make a cool **TapFly** and **ActiveTrack** mission application, you still have a long way to go. You can add more necessary features like showing the battery percentage, GPS signal quality, add a checklist like DJI Go app to check the aircraft status before flying, etc. Good luck and hope you enjoy this tutorial!
  
