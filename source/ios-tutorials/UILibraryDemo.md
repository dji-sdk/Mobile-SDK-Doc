---
title: Getting Started with DJI UI Library
version: v4.0.1
date: 2017-05-11
github: https://github.com/DJI-Mobile-SDK-Tutorials/xxxxx
keywords: [UI Library, Default Layout, playback, preview photos and videos, download photos and videos, delete photos and videos]

---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, you will learn how to use DJI iOS UI Library and DJI iOS SDK to create a fully functioning mini-DJI Go app easily, with standard DJI Go UIs and functionalities. By the end of this tutorial you will have an app that you can use to show the camera FPV view, check aircraft status, shoot photos, record videos and so on.

You can download the tutorial's final sample code project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/xxxxx).

We use Phantom 4 and iPad Air as an example to make this demo. For more details of customizing the layouts for iPhone devices, please check the tutorial's Github Sample Project. Let's get started!

## Introduction

DJI UI Library is a visual framework consisting of UI Elements. It helps you simplify the creation of DJI Mobile SDK based apps in iOS. With similar design to DJI Go,UI Elements allow you to create consistent UX between your apps and DJI apps.

Additionally, with the ease of use, UILibrary let you focus more on business and application logic. 

As DJI UI Library is built on top of DJI Mobile SDK and VideoPreviewer, you need to use it with them together in your application developement.

## Importing DJI SDK and UILibrary with CocoaPods

Now, let's create a new project in Xcode, choose **Single View Application** template for your project and press "Next", then enter "UILibraryDemo" in the **Product Name** field and keep the other default settings.

Once the project is created, let's download and import the **DJISDK.framework** and **UILibrary.framework** using CocoaPods to it. In Finder, navigate to the root folder of the project, and create a **Podfile**. To learn more about Cocoapods, please check [this guide](https://guides.cocoapods.org/using/getting-started.html#getting-started).

Then replace the content of the **Podfile** with the followings:

~~~
# platform :ios, '9.0'

target 'UILibraryDemo' do
  pod 'DJI-SDK-iOS', '~> 4.0.1'
  pod 'DJI-UILibrary-iOS', '~> 4.0'
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
Installing DJI-SDK-iOS (4.0.1)
Installing DJI-UILibrary-iOS (4.0.1.1.0.0)
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
 
## Working on the MainViewController and DefaultlayoutViewController

**1**. Now, let's open the `UILibraryDemo.xcworkspace` file in Xcode and delete the **ViewController** class which is created by Xcode by default. Then create a new file, choose the "Cocoa Touch Class" template and choose **UIViewController** as its subclass, name it as "MainViewController". We will use it to manage the SDK Registration and production connection works. Next, create another new file, choose the same template and subclass, name it as "DefaultLayoutViewController".

Once you finish the steps above, let's open the "Main.storyboard". Set the existing View Controller's "Class" value as **MainViewController** as shown below and embed it in a Navigation Controller:

  ![freeform](../images/tutorials-and-samples/iOS/UILibraryDemo/mainViewController.png)
  
Similarly, drag and drop a new View Controller object from the Object Library and set its "Class" value as **DefaultLayoutViewController**.

Furthermore, let's drag and drop three UILabel objects and one UIButton object from the Object Library on the **MainViewController** and setup the segue, layout and text contents as shown below:

  ![freeform](../images/tutorials-and-samples/iOS/UILibraryDemo/storyboard.png)
  
For more details of the storyboard settings, please check the tutorial's Github Sample Project.

**2**. Once that's done, let's open the **MainViewController.m** file and import the "DemoUtility.h" header file, which has the **DJISDK.h** header file imported and define several class methods to fetch DJIComponents. For more details, please check the tutorial's Github Sample Project.

Next, implement the `DJISDKManagerDelegate` protocol and create IBOutlet properties, IBAction method in the class extension part as shown below:

~~~
#import "MainViewController.h"
#import "DemoUtility.h"

@interface MainViewController ()<DJISDKManagerDelegate>
@property(nonatomic, weak) DJIBaseProduct* product;
@property (weak, nonatomic) IBOutlet UILabel *connectStatusLabel;
@property (weak, nonatomic) IBOutlet UILabel *modelNameLabel;
@property (weak, nonatomic) IBOutlet UIButton *connectButton;

- (IBAction)onConnectButtonClicked:(id)sender;

@end
~~~

Furthermore, set the above IBOutlets and IBAction in the storyboard, and replace the @implementation part of MainViewController with the followings:

~~~
@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //Please enter your App Key in the info.plist file.
    [DJISDKManager registerAppWithDelegate:self];
    [self initUI];
    if(self.product){
        [self updateStatusBasedOn:self.product];
    }
}


- (void)initUI
{
    self.title = @"DJI GEO Demo";
    self.modelNameLabel.hidden = YES;
    //Disable the connect button by default
    [self.connectButton setEnabled:NO];
}

- (IBAction)onConnectButtonClicked:(id)sender {
    
}

-(void) updateStatusBasedOn:(DJIBaseProduct* )newConnectedProduct {
    if (newConnectedProduct){
        self.connectStatusLabel.text = NSLocalizedString(@"Status: Product Connected", @"");
        self.modelNameLabel.text = [NSString stringWithFormat:NSLocalizedString(@"Model: \%@", @""),newConnectedProduct.model];
        self.modelNameLabel.hidden = NO;
        
    }else {
        self.connectStatusLabel.text = NSLocalizedString(@"Status: Product Not Connected", @"");
        self.modelNameLabel.text = NSLocalizedString(@"Model: Unknown", @"");
    }
}

#pragma mark - DJISDKManager Delegate Methods
- (void)appRegisteredWithError:(NSError *)error
{
    if (!error) {
        ShowResult(@"Registration Success");
        [DJISDKManager startConnectionToProduct];       
    }else
    {
        ShowResult([NSString stringWithFormat:@"Registration Error:%@", error]);
        [self.connectButton setEnabled:NO];
    }
}

- (void)productConnected:(DJIBaseProduct *)product
{
    if (product) {
        self.product = product;
        [self.connectButton setEnabled:YES];
    }
    
    [self updateStatusBasedOn:product];
}

- (void)productDisconnected
{
    NSString* message = [NSString stringWithFormat:@"Connection lost. Back to root. "];
    
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil];
    UIAlertAction *backAction = [UIAlertAction actionWithTitle:@"Back" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        if (![self.navigationController.topViewController isKindOfClass:[MainViewController class]]) {
            [self.navigationController popToRootViewControllerAnimated:YES];
        }
    }];
    
    UIAlertController* alertViewController = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
    [alertViewController addAction:cancelAction];
    [alertViewController addAction:backAction];
    
    UINavigationController* navController = (UINavigationController*)[[UIApplication sharedApplication] keyWindow].rootViewController;
    [navController presentViewController:alertViewController animated:YES completion:nil];
    
    [self.connectButton setEnabled:NO];
    self.product = nil;
    [self updateStatusBasedOn:self.product];
    
}
~~~

In the code above, we have implemented the following logics:

1. In the `viewDidLoad` method, we invoke the `initUI` and `updateStatusBasedOn` methods to initialize the UIButton state and UILabel text contents. For more details of registering the application, please check this tutorial: [Importing and Activating DJI SDK in Xcode Project](../application-development-workflow/workflow-integrate.html#Xcode-Project-Integration) for details.

2. Implement the delegate method `- (void)appRegisteredWithError:(NSError *)error` of **DJISDKManagerDelegate** to connect the application to DJI Product by invoking the `startConnectionToProduct` method of **DJISDKManager** when register successfully, if register failed, show an alert view and disable the `connectButton`.

3. Similarly, implement the delegate methods: `- (void)productConnected:(DJIBaseProduct *)product` and `- (void)productDisconnected` of **DJISDKManagerDelegate** to show alert view and update the status of the UILabel objects and `connectButton` when the connection between DJI product and the application changes.

**3**. Lastly, let's open the **DefaultLayoutViewController.h** file, import the **DJIUILibrary** header file and change the subclass to `DULDefaultLayoutViewController` as shown below:

```
#import <DJIUILibrary/DJIUILibrary.h>

@interface DefaultLayoutViewController : DULDefaultLayoutViewController

@end
```

The **DULDefaultLayoutViewController** is a viewController designed around 5 childViewController, and it's a fully functioning mini-DJI Go. It uses all the elements of the UILibrary to give you the foundation of your app. It includes status bar, take off, go home, camera actions buttons and camera settings, OSD dashboard, FPV live vide feed view, etc. The default layout is easily changeable and configurable.

## Connecting to the Aircraft and Run the Project

Now, please check this [Connect Mobile Device and Run Application](../application-development-workflow/workflow-run.html#connect-mobile-device-and-run-application) guide to run the application and try the mini-DJI Go features of UILibrary based on what we've finished of the application so far!
  
If you can see the live video feed and test the features like this, congratulations! Using the DJI UI Library is that easy.

![freeform](../images/tutorials-and-samples/iOS/UILibraryDemo/connectToAircraft.gif)

### Summary

In this tutorial, you have learned how to use the DJI iOS UI Library and DJI iOS SDK to create a fully functioning mini-DJI Go app easily, with standard DJI Go UIs and functionalities. You also learned how to enter camera playback mode to edit media files, download and save photos to the iOS Photo Album. Hope you enjoy it!

