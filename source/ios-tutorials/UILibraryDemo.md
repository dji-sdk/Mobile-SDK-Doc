---
title: Getting Started with DJI UI Library
version: v4.3.2
date: 2017-10-17
github: https://github.com/DJI-Mobile-SDK-Tutorials/iOS-UILibraryDemo
keywords: [UI Library, Default Layout, playback, preview photos and videos, download photos and videos, delete photos and videos]

---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, you will learn how to use DJI iOS UI Library and DJI iOS SDK to create a fully functioning mini-DJI Go app easily, with standard DJI Go UIs and functionalities. By the end of this tutorial you will have an app that you can use to show the camera FPV view, check aircraft status, shoot photos, record videos and so on.

You can download the tutorial's final sample project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/iOS-UILibraryDemo).

We use Mavic Pro and iPad Air as an example to make this demo. Let's get started!

## Introduction

DJI UI Library is a visual framework consisting of UI Elements. It helps you simplify the creation of DJI Mobile SDK based apps in iOS. With similar design to DJI Go,UI Elements allow you to create consistent UX between your apps and DJI apps.

Additionally, with the ease of use, UILibrary let you focus more on business and application logic. 

As DJI UI Library is built on top of DJI Mobile SDK and VideoPreviewer, you need to use it with them together in your application development.

For an in depth learning on DJI UI Library, please go to the [UI Library Introduction](../introduction/ui_library_introduction.html).

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile application used in China, it's required to activate the application and bind the aircraft to the user's DJI account. 

 If an application is not activated, the aircraft not bound (if required), or a legacy version of the SDK (< 4.1) is being used, all **camera live streams** will be disabled, and flight will be limited to a zone of 100m diameter and 30m height to ensure the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

## Importing DJI SDK and UILibrary with CocoaPods

Now, let's create a new project in Xcode, choose **Single View Application** template for your project and press "Next", then enter "UILibraryDemo" in the **Product Name** field and keep the other default settings.

Once the project is created, let's download and import the **DJISDK.framework** and **UILibrary.framework** using CocoaPods to it. In Finder, navigate to the root folder of the project, and create a **Podfile**. To learn more about Cocoapods, please check [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started).

Then replace the content of the **Podfile** with the followings:

~~~
# platform :ios, '9.0'

target 'UILibraryDemo' do
  pod 'DJI-SDK-iOS', '~> 4.3'
  pod 'DJI-UILibrary-iOS', '~> 4.3'
end

~~~

Next, run the following command in the path of the project's root folder:

~~~
pod install
~~~

If you install it successfully, you should get the messages similar to the followings:

~~~
Analyzing dependencies
Downloading dependencies
Installing DJI-SDK-iOS (4.3)
Installing DJI-UILibrary-iOS (4.3)
Generating Pods project
Integrating client project

[!] Please close any current Xcode sessions and use `UILibraryDemo.xcworkspace` for this project from now on.
Sending stats
Pod installation complete! There are 2 dependencies from the Podfile and 2 total pods installed.
~~~

> **Note**: If you saw "Unable to satisfy the following requirements" issue during pod install, please run the following commands to update your pod repo and install the pod again:
> 
~~~
 pod repo update
 pod install
~~~

## Importing VideoPreviewer

 You can check our previous tutorial [Creating a Camera Application](./index.html) to learn how to download and import the **VideoPreviewer** into your Xcode project.

## Configure Build Settings

 You can also check our previous tutorial [Integrate SDK into Application](../application-development-workflow/workflow-integrate.html#configure-build-settings) to learn how to configure the necessary Xcode project build settings.

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile application used in China, it's required to activate the application and bind the aircraft to the user's DJI account. 

 If an application is not activated, the aircraft not bound (if required), or a legacy version of the SDK (< 4.1) is being used, all **camera live streams** will be disabled, and flight will be limited to a zone of 100m diameter and 30m height to ensure the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

## Implementing the DULDefaultLayoutViewController

After you finish the steps above, let's try to implement the standard DJI Go UIs and functionalities using DJI UI Library with very few steps.

#### Working on the Storyboard

Now, let's open the `UILibraryDemo.xcworkspace` file in Xcode and delete the **ViewController** class which is created by Xcode by default. Then create a new file, choose the "Cocoa Touch Class" template and choose **UIViewController** as its subclass, name it as "DefaultLayoutViewController". 

Once you finish the steps above, let's open the "Main.storyboard". Set the existing View Controller's "Class" value as **DefaultLayoutViewController** as shown below:

![](../images/tutorials-and-samples/iOS/UILibraryDemo/defaultLayoutViewController.png)

For more details of the storyboard settings, please check the tutorial's Github Sample Project.

#### Working on the Header File

Next, let's open the **DefaultLayoutViewController.h** file and import the **DJIUILibrary** header file and change the subclass to `DULDefaultLayoutViewController` as shown below:

~~~objc
#import <DJIUILibrary/DJIUILibrary.h>

@interface DefaultLayoutViewController : DULDefaultLayoutViewController

@end
~~~

The **DULDefaultLayoutViewController** is a viewController designed around 5 child view controllers, and it's a fully functioning mini-DJI Go. It uses all the elements of the UILibrary to give you the foundation of your app. It includes status bar, take off, go home, camera actions buttons and camera settings, OSD dashboard, FPV live vide feed view, etc. The default layout is easily changeable and configurable.

## Application Registration

Lastly, let's implement the application registration feature. Open the **DefaultLayoutViewController.m** file and implement the `DJISDKManagerDelegate` protocol as shown below:

~~~objc
#import "DefaultLayoutViewController.h"

@interface DefaultLayoutViewController ()<DJISDKManagerDelegate>

@end
~~~

Furthermore, replace the @implementation part of **DefaultLayoutViewController** with the followings:

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

In the code above, we have implemented the following logics:

1. In the `viewDidLoad` method, we invoke the `registerAppWithDelegate` method of `DJISDKManager` to make the application connect to a DJI Server through the Internet to verify the App Key and set the `DJISDKManagerDelegate` to `DefaultLayoutViewController`. For more details of registering the application, please check this tutorial: [Importing and Activating DJI SDK in Xcode Project](../application-development-workflow/workflow-integrate.html#register-application) for details.

2. Implement the delegate method `- (void)appRegisteredWithError:(NSError *)error` of **DJISDKManagerDelegate** to connect the application to DJI Product by invoking the `startConnectionToProduct` method of **DJISDKManager** when register successfully, if register failed, show an alert view and disable the `connectButton`.

## Connecting to the Aircraft and Run the Project

Now, please check this [Connect Mobile Device and Run Application](../application-development-workflow/workflow-run.html#connect-mobile-device-and-run-application) guide to run the application and try the mini-DJI Go features of UILibrary based on what we've finished of the application so far!
  
If you can see the live video feed and test the features like this, congratulations! Using the DJI UI Library is that easy.

![freeform](../images/tutorials-and-samples/iOS/UILibraryDemo/playVideo.gif)

### Summary

In this tutorial, you have learned how to use the DJI iOS UI Library and DJI iOS SDK to create a fully functioning mini-DJI Go app easily, with standard DJI Go UIs and functionalities. Hope you enjoy it!

