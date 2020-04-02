---
title: Getting Started with DJI UX SDK
version: v4.11.2
date: 2020-03-20
github: https://github.com/DJI-Mobile-SDK-Tutorials/iOS-UXSDKDemo
keywords: [UX SDK, Default Layout, playback, preview photos and videos, download photos and videos, delete photos and videos]

---

*If you come across any mistakes or bugs in this tutorial, please let us know by sending emails to dev@dji.com. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, you will learn how to use DJI iOS UX SDK and DJI iOS Mobile SDK to  easily create a fully functioning mini-DJI Go app, with standard DJI Go UIs and functionalities. By the end of this tutorial you will have an app that you can use to show the camera FPV view, check aircraft status, shoot photos, record videos and so on.

You can download the tutorial's final sample project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/iOS-UXSDKDemo).

We used Mavic Pro and iPad Air as an example to make this demo. Let's get started!

## Introduction

DJI UX SDK is a visual framework consisting of UI Elements. It helps you simplify the creation of DJI Mobile SDK based apps in iOS. With s similar design to DJI Go, UI Elements allow you to create consistent UX between your apps and DJI apps.

In addition, with the ease of use that the UX SDK provides, it frees developers to focus more on business and application logic.

As DJI UX SDK is built on top of DJI Mobile SDK and DJIWidget, you need to use them together in your application development.

For a more in depth understanding of the DJI UX SDK, please go to the [UX SDK Introduction](../introduction/ux_sdk_introduction.html).

## Importing DJI SDK, UX SDK and DJIWidget with CocoaPods

Now, let's create a new project in Xcode, choose the **Single View Application** template, press "Next" and enter "UXSDKDemo" in the **Product Name** field (keep the other default settings).

Once the project is created, let's download and import the **DJISDK.framework** and **DJIUXSDK.framework** using CocoaPods. In Finder, navigate to the root folder of the project and create a **Podfile**. To learn more about Cocoapods, please check [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started).

Replace the content of the **Podfile** with the following:

~~~
# platform :ios, '9.0'

target 'UXSDKDemo' do
  pod 'DJI-SDK-iOS', '~> 4.11.2'
  pod 'DJI-UXSDK-iOS', '~> 4.11.1'
  pod 'DJIWidget', '~> 1.6.2'
end

~~~

Next, run the following command in the path of the project's root folder:

~~~
pod install
~~~

If you installed it successfully, you should get a message similar to the following:

~~~
Analyzing dependencies
Downloading dependencies
Installing DJI-SDK-iOS (4.11.2)
Installing DJI-UXSDK-iOS (4.11.1)
Installing DJIWidget (1.6.2)
Generating Pods project
Integrating client project

[!] Please close any current Xcode sessions and use `UXSDKDemo.xcworkspace` for this project from now on.
Sending stats
Pod installation complete! There are 2 dependencies from the Podfile and 2 total pods installed.
~~~

> **Note**: If you saw "Unable to satisfy the following requirements" issue during pod install, please run the following commands to update your pod repo and install the pod again:
>
~~~
 pod repo update
 pod install
~~~

## Configure Build Settings

 You can also check our previous tutorial [Integrate SDK into Application](../application-development-workflow/workflow-integrate.html#configure-build-settings) to learn how to configure the necessary Xcode project build settings.

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile applications used in China, it's required to activate the application and bind the aircraft to the user's DJI account.

 If an application is not activated, the aircraft will not bind (if required) or if a legacy version of the SDK (< 4.1) is being used, all **camera live streams** will be disabled and flight will be limited to a zone of 100m diameter and 30m height to ensure that the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

## Implementing the DUXDefaultLayoutViewcontroller

After you finish the steps above, let's try to implement standard DJI Go UIs and functionalities with DJI's UX SDK functionalities, by just going through a very few simple steps.

#### Working on the Storyboard

Open the `UXSDKDemo.xcworkspace` file in Xcode and delete the **ViewController** class that Xcode created by default. Then create a new file, pick the "Cocoa Touch Class" template, choose **UIViewController** as its subclass and name it "DefaultLayoutViewController".

Once you finish the steps above, let's open the "Main.storyboard" and set the existing View Controller's "Class" value to **DefaultLayoutViewController** as shown below:

![](../images/tutorials-and-samples/iOS/UXSDKDemo/defaultLayoutViewController.png)

For more details on the storyboard settings, please check the tutorial's Github Sample Project.

#### Working on the Header File

Next, let's open the **DefaultLayoutViewController.h** file, import the **DJIUXSDK** header file and change the subclass to `DUXDefaultLayoutViewcontroller` as shown below:

~~~objc
#import <DJIUXSDK/DJIUXSDK.h>

@interface DefaultLayoutViewController : DUXDefaultLayoutViewcontroller

@end
~~~

The **DUXDefaultLayoutViewcontroller** is a viewController designed around 5 child view controllers, and it's a fully functioning mini-DJI Go. It uses all the elements of the UX SDK to give you the foundation of your app. It includes status bar, take off, go home, camera actions buttons and camera settings, OSD dashboard, FPV live vide feed view, etc. The default layout is easily configured and adjusted.

## Application Registration

Last, let's implement the application registration feature. Open the **DefaultLayoutViewController.m** file and implement the `DJISDKManagerDelegate` protocol as shown below:

~~~objc
#import "DefaultLayoutViewController.h"

@interface DefaultLayoutViewController ()<DJISDKManagerDelegate>

@end
~~~

Now, add to the @implementation part of **DefaultLayoutViewController** the following code:

~~~objc
@implementation DefaultLayoutViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    //Please enter your App Key in the info.plist file.
    [DJISDKManager registerAppWithDelegate:self];

}

- (void)showAlertViewWithMessage:(NSString *)message
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIAlertController* alertViewController = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction* okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
        [alertViewController addAction:okAction];
        UIViewController *rootViewController = [[UIApplication sharedApplication] keyWindow].rootViewController;
        [rootViewController presentViewController:alertViewController animated:YES completion:nil];
    });

}

#pragma mark DJISDKManager Delegate Methods
- (void)appRegisteredWithError:(NSError *)error
{
    if (!error) {
        [self showAlertViewWithMessage:@"Registration Success"];
        [DJISDKManager startConnectionToProduct];
    }else
    {
        [self showAlertViewWithMessage:[NSString stringWithFormat:@"Registration Error:%@", error]];
    }
}
~~~

In the code above, we have implemented the following logic:

1. In the `viewDidLoad` method, we invoked the `registerAppWithDelegate` method of `DJISDKManager` to make the application connect to a DJI Server through the internet. Doing this, verified the App Key and set the `DJISDKManagerDelegate` to `DefaultLayoutViewController`. For more details on registering the application, please check this tutorial: [Importing and Activating DJI SDK in Xcode Project](../application-development-workflow/workflow-integrate.html#register-application).

2. Implemented the delegate method `- (void)appRegisteredWithError:(NSError *)error` of **DJISDKManagerDelegate** to connect the application to a DJI Product by invoking the `startConnectionToProduct` method of **DJISDKManager** when registered successfully. If registration failed, showed an alert view and disabled the `connectButton`.

## Connecting to the Aircraft and Run the Project

Now, please check this [Connect Mobile Device and Run Application](../application-development-workflow/workflow-run.html#connect-mobile-device-and-run-application) guide to run the application and try the mini-DJI Go features we built so far using the UX SDK!

If you can see the live video feed and are able to test the features like in the video below, then congratulations! Using the DJI UX SDK is that easy.

![freeform](../images/tutorials-and-samples/iOS/UXSDKDemo/playVideo.gif)

### Summary

In this tutorial, you have learned how to easily use the DJI iOS UX SDK and DJI iOS Mobile SDK to create a fully functioning mini-DJI Go app, with standard DJI Go UIs and functionalities. Hope you enjoy it!
