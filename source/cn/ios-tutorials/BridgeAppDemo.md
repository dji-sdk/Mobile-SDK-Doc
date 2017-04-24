---
title: DJI Bridge App Tutorial
version: v4.0.1
date: 2017-04-24
github: https://github.com/DJI-Mobile-SDK-Tutorials/DJIBridgeAppDemo
keywords: [DJI Bridge App demo, remote debugging]
---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

This tutorial is designed for you to gain a better understanding of the DJI Bridge App. It will teach you how to use it for app debugging by implementing the live video view and two basic camera functionalities: "Take Photo" and "Record video".

You can download the <a href="https://github.com/dji-sdk/DJI-Bridge-App" target="_blank">DJI Bridge App Source Code</a>, build and install it on your mobile device.

You can download the tutorial's final sample code project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/DJIBridgeAppDemo).
   
## Introduction

The design of the DJI Bridge App is simple. It's a universal app supports both iPhone and iPad. You can use it to debug app for Phantom 3 Professional, Phantom 3 Advanced, Inspire 1, M100 and other products using USB/MFI connection between RC and your app.

### Workflow

![workflow](../../images/tutorials-and-samples/iOS/BridgeAppDemo/workFlow.png)

As you see above, the Bridge App and the iOS Device or Xcode Simulator should work in the same local network using TCP service to communicate. You can connect them to the same WiFi network or connect to a local wireless connection created on your Mac too. 

### Signal Light

At the top of the screen, there are two signal lights, which represent the connection between the bridge app and the remote controller or your application. When the bridge app connect to the remote controller successfully, the **RC light** will turn green. Similarly, when the bridge app connect to your app successfully, the **App Light** will turn green too.

![signalLight](../../images/tutorials-and-samples/iOS/BridgeAppDemo/toolScreenshot.png)

### TCP Connection

The bridge app uses TCP sockets to communicate with your app. It use **Debug Id** to distinguish between different bridge apps running on different mobile devices.

TCP connection is stable and supports security network, which means your local network has firewall. The debug ID will change in different IP addresses.

Now try to open the bridge app, and connect your mobile device to the remote controller using usb cable, you should see the RC Light turn green!

> **Note**: 
> 
> If you connect the bridge app to the RC and the RC light is still red, you may need to restart the app and try again. It should works.
> 

### Link Reset

   If the bridge app cannot connect to your app successfully because of switching your mobile device's wifi network or other unknown situations, you can press the **Link Reset** button at the bottom to force restart the TCP service to refresh the Debug ID.
   
## Importing the DJI SDK

Now, let's create a new project in Xcode, choose **Single View Application** template for your project and press "Next", then enter "BridgeAppDemo" in the **Product Name** field and keep the other default settings.

Once the project is created, let's import the **DJISDK.framework** to it. If you are not familiar with the process of importing and activating DJI SDK, please check this tutorial: [Importing and Activating DJI SDK in Xcode Project](../application-development-workflow/workflow-integrate.html#Xcode-Project-Integration) for details.

## Importing the VideoPreviewer

 You can check this tutorial [Creating a Camera Application](./index.html) to learn how to download and import the **VideoPreviewer** into your Xcode project.

## Implement the Live Video View

  **1**. In the Main.storyboard, add a new View Controller and call it **DJICameraViewController**. Set **DJICameraViewController** as the root View Controller for the new View Controller you just added in Main.storyboard:
  
  ![rootController](../../images/tutorials-and-samples/iOS/BridgeAppDemo/cameraViewController.png)
  
  Add a UIView inside the View Controller and set it as an IBOutlet called "**fpvPreviewView**". Then, add two UIButtons and one UISegmentedControl at the bottom of the View Control and set their IBOutlets and IBActions, as shown below:
  
  ![Storyboard](../../images/tutorials-and-samples/iOS/BridgeAppDemo/mainStoryboard.png)
  
  Go to **DJICameraViewController.m** file and import the **DJISDK** and **VideoPreviewer** header files. Then create a **DJICamera** property and implement several delegate protocols as below:
  
~~~objc
#import <DJISDK/DJISDK.h>
#import <VideoPreviewer/VideoPreviewer.h>

#define WeakRef(__obj) __weak typeof(self) __obj = self
#define WeakReturn(__obj) if(__obj ==nil)return;

@interface DJICameraViewController ()<DJICameraDelegate, DJIBaseProductDelegate, DJIVideoFeedListener>

@property (nonatomic, strong) DJICamera* camera;
@property (weak, nonatomic) IBOutlet UIButton *recordBtn;
@property (weak, nonatomic) IBOutlet UISegmentedControl *changeWorkModeSegmentControl;
@property (weak, nonatomic) IBOutlet UIView *fpvPreviewView;
@property (weak, nonatomic) IBOutlet UILabel *currentRecordTimeLabel;

- (IBAction)captureAction:(id)sender;
- (IBAction)recordAction:(id)sender;
- (IBAction)changeWorkModeAction:(id)sender;
~~~

  **2**. Implement the DJISDKManagerDelegate method as shown below:
  
~~~objc

- (void)showAlertViewWithTitle:(NSString *)title withMessage:(NSString *)message
{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
    [alert addAction:okAction];
    [self presentViewController:alert animated:YES completion:nil];
}

- (DJICamera*) fetchCamera {
    
    if (![DJISDKManager product]) {
        return nil;
    }
    
    if ([[DJISDKManager product] isKindOfClass:[DJIAircraft class]]) {
        return ((DJIAircraft*)[DJISDKManager product]).camera;
    }else if ([[DJISDKManager product] isKindOfClass:[DJIHandheld class]]){
        return ((DJIHandheld *)[DJISDKManager product]).camera;
    }
    
    return nil;
}

#pragma mark DJIBaseProductDelegate Method

- (void)productConnected:(DJIBaseProduct *)product
{
    if(product){
        [product setDelegate:self];
        DJICamera *camera = [self fetchCamera];
        if (camera != nil) {
            camera.delegate = self;
        }
    }
}

~~~

 The delegate method above is called when SDK detects a product. Then invoke the `fetchCamera` method to fetch the updated DJICamera object.
  
 Moreover, in the viewWillAppear method, set "fpvPreviewView" instance as a View of VideoPreviewer to show the Video Stream and reset it to nil in the viewWillDisappear method:
 
~~~objc
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    [[VideoPreviewer instance] setView:self.fpvPreviewView];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [[VideoPreviewer instance] setView:nil];
    [[DJISDKManager videoFeeder].primaryVideoFeed removeListener:self];
}
~~~
  
  Lastly, implement the `DJIVideoFeedListener` delgate method, as shown below:
  
~~~objc
#pragma mark - DJIVideoFeedListener

-(void)videoFeed:(DJIVideoFeed *)videoFeed didUpdateVideoData:(NSData *)videoData {
    [[VideoPreviewer instance] push:videoBuffer length:(int)size];
}
~~~

  The `videoFeed:didUpdateVideoData:` method is used to send the video stream to **VideoPreviewer** to decode.
 
## Enter Debug Mode

**1**. Implement the **DJISDKManagerDelegate** protocol method in the DJICameraViewController.m file's extension part. Then create a new method named **registerApp** and invoke it in the `viewDidAppear` method as shown below:

~~~objc
- (void)registerApp
{
    //Please enter your App key in the "DJISDKAppKey" key in info.plist file.
    [DJISDKManager registerAppWithDelegate:self];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [[VideoPreviewer instance] setView:self.fpvPreviewView];
    [self registerApp];    
}
~~~

> Note: If you don't know how to apply as a DJI developer and get the App Key, please refer to [Get Started](../quick-start/index.html).

**2**. Next, let's implement the DJISDKManagerDelegate method as shown below:

~~~objc
- (void)appRegisteredWithError:(NSError *)error
{
    NSString* message = @"Register App Successed!";
    if (error) {
        message = @"Register App Failed! Please enter your App Key and check the network.";
    }else
    {
        NSLog(@"registerAppSuccess");
        [DJISDKManager enableBridgeModeWithBridgeAppIP:@"Please type in Debug ID of the DJI Bridge app here"];
        [[DJISDKManager videoFeeder].primaryVideoFeed addListener:self withQueue:nil];
        [[VideoPreviewer instance] start];
    }
    
    [self showAlertViewWithTitle:@"Register App" withMessage:message];
}
~~~

The delegate method above gets called when the app is registered. If the registration is successful, we can call the `enableBridgeModeWithBridgeAppIP:` class method of **DJISDKManager** to enter debug mode of the SDK by passing the **bridgeAppIP** parameter, which you can get from **the Bridge App**. Then add the listener for the `primaryVideoFeed` of `videoFeeder` in **DJISDKManager** and call the start method of the VideoPreviewer class to start video decoding.

**3**. Build and Run the project in Xcode. If everything is OK, you will see a "Register App Successed!" alert once the application loads. 
  
  ![Screenshot](../../images/tutorials-and-samples/iOS/BridgeAppDemo/Screenshot.png)

## Debug Live Video View on iOS Simulator

After you finish the steps above, you can now connect the DJI Bridge app to your aircraft to try debugging the Live Video View on your **iOS Simulator**. Here are the guidelines:

 In order to connect to DJI Inspire 1, Phantom 3 Professional, Phantom 3 Advanced or M100:

  **1**. First, turn on your remote controller and connect it to the mobile device which is running the DJIBridge app.
  
  **2**. Trust the device if an alert asking “Do you trust this device” comes up.
  
  **3**. Make sure your mobile device connect to the same WiFi network to your Mac.

  **4**. Then, turn on the power of the aircraft.
  
  **5**. Now build and run the project in Xcode, wait for a few seconds, you will be able to view the live video stream from your aircraft's camera on your iOS simulator now!
    
Here are the screenshots of the bridge app and iOS simulator if everthing goes well:

  ![TCP](../../images/tutorials-and-samples/iOS/BridgeAppDemo/workMode.png)
  
![simulator](../../images/tutorials-and-samples/iOS/BridgeAppDemo/simulator.png)

> **Note:** 
> 
> **1.** If you cannot see the live video, please check the log message in Xcode's console and try to move your aircraft around the RC. The live video should show up.
> 
> **2.** You may notice that the live video has mosaics. It's due to the delayed transmission and the software decoding quality of iOS Simulator.

Congratulations! By using the bridge app, you can now debug your app with all the Xcode features, like adding **Breakpoints** in your code, using **Instruments** to profile the app, etc. Let's move forward.

## Implement the Capture and Record function

Create a BOOL property variable named **isRecording** in the DJICameraViewController.m file's extension part and implement the DJICameraDelegate method as shown below:

~~~objc

- (NSString *)formattingSeconds:(NSUInteger)seconds
{
    NSDate *date = [NSDate dateWithTimeIntervalSince1970:seconds];
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"mm:ss"];
    [formatter setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];
    
    NSString *formattedTimeString = [formatter stringFromDate:date];
    return formattedTimeString;
}

-(void) camera:(DJICamera*)camera didUpdateSystemState:(DJICameraSystemState*)systemState
{
   self.isRecording = systemState.isRecording;
    
    [self.currentRecordTimeLabel setHidden:!self.isRecording];
    [self.currentRecordTimeLabel setText:[self formattingSeconds:systemState.currentVideoRecordingTimeInSeconds]];
    
    if (self.isRecording) {
        [self.recordBtn setTitle:@"Stop Record" forState:UIControlStateNormal];
    }else
    {
        [self.recordBtn setTitle:@"Start Record" forState:UIControlStateNormal];
    }
    
    //Update UISegmented Control's state
    if (systemState.mode == DJICameraModeShootPhoto) {
        [self.changeWorkModeSegmentControl setSelectedSegmentIndex:0];
    }else if (systemState.mode == DJICameraModeRecordVideo){
        [self.changeWorkModeSegmentControl setSelectedSegmentIndex:1];
    }
    
}
~~~

The delegate method above is used to get the camera state from the camera on your aircraft. It will be called frequently, so you can update your user interface or camera settings accordingly here. We update the **currentRecordTimeLabel**'s text with latest recording time. Then, update the recordBtn's title with the correct state. Lastly, update the changeWorkModeSegmentControl's selected index with **systemState**'s `mode` value.
  
Once you finish it, let's implement the **captureAction**, **recordAction** and **changeWorkModeAction** IBAction methods, and show an alertView when error occurs as shown below:

~~~objc
- (IBAction)captureAction:(id)sender {
    
    __weak DJICamera* camera = [self fetchCamera];
    if (camera) {
        WeakRef(target);
        [camera setShootPhotoMode:DJICameraShootPhotoModeSingle withCompletion:^(NSError * _Nullable error) {
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [camera startShootPhotoWithCompletion:^(NSError * _Nullable error) {
                    WeakReturn(target);
                    if (error) {
                        [target showAlertViewWithTitle:@"Take Photo Error" withMessage:error.description];
                    }
                }];
            });
        }];
    }
    
}

- (IBAction)recordAction:(id)sender {
    
    WeakRef(target);
    if (self.isRecording) {
        
        [self.camera stopRecordVideoWithCompletion:^(NSError * _Nullable error) {
            WeakReturn(target);
            if (error) {
                [target showAlertViewWithTitle:@"Stop Record Video Error" withMessage:error.description];
            }
        }];
        
    }else
    {
        [self.camera startRecordVideoWithCompletion:^(NSError * _Nullable error) {
            WeakReturn(target);
            if (error) {
                [target showAlertViewWithTitle:@"Start Record Video Error" withMessage:error.description];
            }
        }];
    }
    
}

- (IBAction)changeWorkModeAction:(id)sender {
    
    UISegmentedControl *segmentControl = (UISegmentedControl *)sender;
    __weak DJICamera* camera = [self fetchCamera];
    
    if (camera) {
        WeakRef(target);
        if (segmentControl.selectedSegmentIndex == 0) { //Take photo
            
            [camera setMode:DJICameraModeShootPhoto withCompletion:^(NSError * _Nullable error) {
                WeakReturn(target);
                if (error) {
                    [target showAlertViewWithTitle:@"Set DJICameraModeShootPhoto Failed" withMessage:error.description];
                }
            }];
            
        }else if (segmentControl.selectedSegmentIndex == 1){ //Record video
            
            [camera setMode:DJICameraModeRecordVideo withCompletion:^(NSError * _Nullable error) {
                WeakReturn(target);
                if (error) {
                    [target showAlertViewWithTitle:@"Set DJICameraModeRecordVideo Failed" withMessage:error.description];
                }
            }];
            
        }
    }
}
~~~
   
   Now, we can build and run the project. You can try to play with the **Record** and **Switch Camera WorkMode** functions, if everything is going well, you should see the simulator screenshot like this:
   
   ![Screenshot](../../images/tutorials-and-samples/iOS/BridgeAppDemo/record_screenshot.png)
   
## Debug on Actual iOS Device

   Currently, we are running the app on **iOS Simulator**. Although the iOS Simulator is extremely useful during app development, when you want to ensure the required functionality and performance of an application, such as App Memory Usage, Hardware usage like Accelerometer, Gyroscope, etc, testing on an actual device is still required. For more difference between iOS Simulator and actual iOS device, please refer to <a href="http://bluetubeinc.com/blog/2014/11/ios-simulator-vs-device-testing" target="_blank"> iOS Simulator Vs. Actual Device Testing </a>.
   
   The good thing is DJI Bridge app supports actual iOS device debugging. You can find another iOS device, like an iPhone 6, iPad air 2, etc, and connect it to your Mac. Then build and run the project on it. It should work perfectly the same to the iOS Simulator.
   
## Debug on DJI Product requires WiFI Connection

   For the Phantom 3 Standard and OSMO, you cannot use DJI Bridge App to debug your application because they use WiFi to connect between your application and the remote controller or the handheld device.
   
   Actually you can work without the DJI Bridge App. Let's add a Macro named "ENABLE_DEBUG_MODE" above the DJICameraViewController.m file's extension part as shown below:
   
~~~objc
#import "DJICameraViewController.h"
#import <DJISDK/DJISDK.h>
#import <VideoPreviewer/VideoPreviewer.h>

#define ENABLE_DEBUG_MODE 0

@interface DJICameraViewController ()<DJICameraDelegate, DJISDKManagerDelegate, DJIBaseProductDelegate, DJIVideoFeedListener>

~~~

  Then go to `- (void)appRegisteredWithError:(NSError *)error` method and replace the code with the following:
  
~~~objc
- (void)appRegisteredWithError:(NSError *)error
{
    NSString* message = @"Register App Successed!";
    if (error) {
        message = @"Register App Failed! Please enter your App Key and check the network.";
    }else
    {
        NSLog(@"registerAppSuccess");
        
#if ENABLE_DEBUG_MODE
        [DJISDKManager enableBridgeModeWithBridgeAppIP:@"Please type in Debug ID of the DJI Bridge app here"];
#else
        [DJISDKManager startConnectionToProduct];
#endif
        [[DJISDKManager videoFeeder].primaryVideoFeed addListener:self withQueue:nil];
        [[VideoPreviewer instance] start];
        
    }
    
    [self showAlertViewWithTitle:@"Register App" withMessage:message];
}
~~~

   As the code shown above, if you don't want to use debug mode of the SDK with DJI Bridge app, you can call `+ (void)startConnectionToProduct;` class method of DJISDKManager instead once the app registration is successful.
   
   Finally, connect your Mac, which uses iOS Simulator to debug, or your iOS device's WiFi network to DJI Product. Build and run the application on your Mac, if everthing goes well, you should see the following screenshot for iOS Simulator:
   
   ![Screenshot](../../images/tutorials-and-samples/iOS/BridgeAppDemo/osmoScreenshot.png)
      
>**Notes:**
>
>**1.** If it's the first time to run the application, which isn't registered before, you may need to connect your Mac or iOS device's WiFi to the internet and build and run the app for registration. Next time, you can connect their WiFi back to the DJI Product to debug without problems.
>
>**2.** You may notice the video is clear without mosaic. Because the iOS device use hardware decoding for live video, which is better than software decoding.
>

### Summary

   Congratulations! You've learned how to use DJI Bridge App to debug your application using DJI Mobile SDK. Also, for better understanding, the tutorial shows you how to show the live video view from the DJI Product's camera and control the camera to take photo and record video too. 
   
   With DJI Bridge App, you can build your application with DJI Mobile SDK more efficiently. Hope you enjoy this tutorial, Thanks!
   