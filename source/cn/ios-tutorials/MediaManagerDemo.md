---
title: Creating a Media Manager Application
version: v4.2.2
date: 2017-08-08
github: https://github.com/DJI-Mobile-SDK-Tutorials/iOS-PlaybackDemo
keywords: [iOS mediaManager demo, mediaManager application, media download, download photos and videos, delete photos and videos]

---

*If you come across any mistakes or bugs in this tutorial, please let us know using a Github issue, a post on the DJI forum. Please feel free to send us Github pull request and help us fix any issues.*

---

In this tutorial, you will learn how to use DJI Mobile SDK to interact with the file system on the SD card of the aircraft's camera by using `DJIMediaManager`. By the end of this tutorial you will have an app that you can use to preview photos, play videos, download or delete files and so on.

In order for our app to manage photos and videos, however, it must first be able to take and record them. Fortunately, by using DJI iOS UI Library, you can implement shooting photos and recording videos functionalities easily with standard DJI Go UIs.

You can download the tutorial's final sample code project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/iOS-MediaManagerDemo).

We use Mavic Pro and iPad Air as an example to make this demo. For more details of customizing the layouts for iPhone devices, please check the tutorial's Github Sample Project. Let's get started!

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile application used in China, it's required to activate the application and bind the aircraft to the user's DJI account. 

 If an application is not activated, the aircraft not bound (if required), or a legacy version of the SDK (< 4.1) is being used, all **camera live streams** will be disabled, and flight will be limited to a cylinder of 100m diameter and 30m height to ensure the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

## Implementing DJI Go Style Default Layout

### Importing DJI SDK and UILibrary with CocoaPods

Now, let's create a new project in Xcode, choose **Single View Application** template for your project and press "Next", then enter "MediaManagerDemo" in the **Product Name** field and keep the other default settings. Once the project is created, let's import the DJI SDK and DJI UI Library. 

You can check [Getting Started with DJI UI Library](./UILibraryDemo.html#importing-dji-sdk-and-uilibrary-with-cocoapods) tutorial to learn how to import the **DJISDK.framework** and **UILibrary.framework** into your Xcode project.

### Importing the VideoPreviewer

You can check [Creating a Camera Application](./index.html) tutorial to learn how to download and import the **VideoPreviewer** into your Xcode project.
 
### Working on the MainViewController and DefaultlayoutViewController
  
You can check this tutorial's Github Sample Code to learn how to implement the **MainViewController** to do SDK registration and update UIs and show alert views to inform users when DJI product is connected and disconnected. Also, you can learn how to implement shooting photos and recording videos functionalities with standard DJI Go UIs by using **DULDefaultLayoutViewController** of DJI UI Library from the [Getting Started with DJI UI Library](./UILibraryDemo.html#working-on-the-mainviewcontroller-and-defaultlayoutviewcontroller) tutorial.

If everything goes well, you can see the live video feed and test the shoot photo and record video features like this:

//TODO: Update this gif animation.
![freeform](../images/tutorials-and-samples/iOS/MediaManagerDemo/connectToAircraft.gif1)

Congratulations! Let's move forward.

## Working on the UI of the Application

Now, let's create a new file, choose the "Cocoa Touch Class" template and choose **UIViewController** as its subclass, name it as "MediaManagerViewController". We will use it to implement the Media Manager features. 

Next, open the **Main.storyboard** file and drag and drop a new "View Controller" object from the Object Library and set its "Class" value as **MediaManagerViewController**. Moreover, drag and drop a new "Container View" object in the **MediaManagerViewController** and set its ViewController's "Class" value as **DULFPVViewController**, which contains a `DULFPVView` and will show the video playback. Furthermore, drag and drop a UIImageView object on top of the "Container View" and hide it as default, we will use it to show the downloaded photo. Moreover, drag and drop eleven UIButton objects, one UITextField, one UITableView and a UIActivityIndicatorView, place them in the following postions:

![mediaManagerVCUI](../images/tutorials-and-samples/iOS/MediaManagerDemo/mediaManagerVCUI.png)

For more details of the configuration for the UI elements, please check the **Main.storyboard** in this tutorial's Github Sample Project.

Lastly, let's drag and place a UIButton on the bottom right corner of the **DefaultLayoutViewController** view and create a segue to show the **PlaybackViewController** when the user press the button.

If everything goes well, you should see the storyboard layout like this:

![mediaManagerVCUI](../images/tutorials-and-samples/iOS/MediaManagerDemo/storyboardUI.png)

Once you finish the above steps, let's open the "DefaultLayoutViewController.m" file and replace the content with the followings:

~~~
#import "DefaultLayoutViewController.h"
#import "DemoUtility.h"

@interface DefaultLayoutViewController ()
@property (weak, nonatomic) IBOutlet UIButton *playbackBtn;

@end

@implementation DefaultLayoutViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self.playbackBtn setImage:[UIImage imageNamed:@"playback_icon_iPad"] forState:UIControlStateNormal];

}

@end
~~~

In the code above, we create an IBOutlet property for the `playbackBtn` and set its image in the `viewDidLoad` method. You can get the "playback_icon_iPad.png" file from this tutorial's Github Sample Project.

Next, open the "PlaybackViewController.m" file and replace the content with the followings:

~~~
#import "PlaybackViewController.h"
#import "DemoUtility.h"

@interface PlaybackViewController ()
@property (weak, nonatomic) IBOutlet UIView *fpvPreviewView;
- (IBAction)backBtnClickAction:(id)sender;

@end

@implementation PlaybackViewController

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    DJICamera *camera = [DemoUtility fetchCamera];
    
    if (camera != nil) {
        [camera setMode:DJICameraModePlayback withCompletion:^(NSError * _Nullable error) {
            if (error) {
                ShowResult(@"Set CameraWorkModePlayback Failed, %@", error.description);
            }
        }];
    }
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
    DJICamera *camera = [DemoUtility fetchCamera];
    [camera setMode:DJICameraModeShootPhoto withCompletion:^(NSError * _Nullable error) {
        if (error) {
            ShowResult(@"Set CameraWorkModeShootPhoto Failed, %@", error.description);
        }
    }];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - IBAction Methods

- (IBAction)backBtnClickAction:(id)sender {
    [self.navigationController popViewControllerAnimated:YES];
}
~~~

In the code above, we implement the following things:

1. In the `viewWillAppear` method, we firstly invoke the `fetchCamera` method of **DemoUtility** class to fetch the DJICamera object. Then invoke the `setMode:withCompletion:` method of **DJICamera** and pass the `DJICameraModePlayback` param to switch the camera mode to playback.

2. Similarly, in the `viewWillDisappear` method, we also invoke the `setMode:withCompletion:` method of **DJICamera** and pass the `DJICameraModeShootPhoto` param to switch the camera mode to shoot photo mode.

So when the user enter the **PlaybackViewController**, the DJICamera will switch to playback mode automatically, when user exit back to the **DefaultLayoutViewController**, the DJICamera will switch to shoot photo mode.

## Switching to Media Download Mode

In order to preview, edit or download the photos or videos files from the DJICamera, you need to use the `DJIPlaybackManager` or `DJIMediaManager` of DJICamera. Here, we use `DJIMediaManager` to demonstrate how to implement it. 

## Refresh File List

- Update TableView with Media File list
- Reload Data

## Fetch and Edit File Data

- Download Photos and Videos
- Show Full resolution photo
- Delete Files

## Working on Video Playback

- Play Video
- Pause Video
- Resume Video
- Stop Video
- Move to Video Position
- Show Video Playback State

### Summary

In this tutorial, you have learned how to use DJI iOS SDK to preview photos and videos in Single Preview Mode and Multiple Preview Mode, how to enter multiple edit mode and select files for deleting. You also learned how to download and save photos to the iOS Photo Album. Hope you enjoy it!
   
