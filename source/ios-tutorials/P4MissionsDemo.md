---
title: Creating a TapFly and ActiveTrack Missions Application
version: v4.3.2
date: 2017-10-17
github: https://github.com/DJI-Mobile-SDK-Tutorials/iOS-Phantom4Missions
keywords: [TapFly mission demo, ActiveTrack mission demo]
---

In this tutorial, you will learn how to use the TapFly and ActiveTrack Missions of DJI iOS SDK to create a cool application for DJI Mavic Pro. Also, you will get familiar with `DJITapFlyMissionOperator`, `DJIActiveTrackMissionOperator` and using the Simulator of DJI Assistant 2 for testing, which is convenient for you to test the missions indoor. So let's get started!

You can download the tutorial's final sample project from this [Github Page](https://github.com/DJI-Mobile-SDK-Tutorials/iOS-Phantom4Missions).
   
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

## Implementing the UI of Application

### Importing SDK and Register Application

Now, let's create a new project in Xcode, choose **Single View Application** template for your project and press "Next", then enter "P4Missions" in the **Product Name** field and keep the other default settings.

Once the project is created, let's delete the **ViewController.h** and **ViewController.m** files, which are created by Xcode when you create the project. Then create a UIViewController named **RootViewController** and set the class of original ViewController object to "RootViewController" and make the ViewController embed in a Navigation Controller and set it as the Storyboard Entry Point in **Main.storyboard**. 

Next, let's import the **DJISDK.framework** to the project and implement the registration process in the **RootViewController**. If you are not familiar with the process of importing and activating DJI SDK, please check this tutorial: [Importing and Activating DJI SDK in Xcode Project](../application-development-workflow/workflow-integrate.html#Xcode-Project-Integration) for details.

### Importing the VideoPreviewer

You can check the [Creating a Camera Application](./index.html) tutorial to learn how to download and import the **VideoPreviewer** into your Xcode project.

## Application Activation and Aircraft Binding in China

 For DJI SDK mobile application used in China, it's required to activate the application and bind the aircraft to the user's DJI account. 

 If an application is not activated, the aircraft not bound (if required), or a legacy version of the SDK (< 4.1) is being used, all **camera live streams** will be disabled, and flight will be limited to a zone of 100m diameter and 30m height to ensure the aircraft stays within line of sight.

 To learn how to implement this feature, please check this tutorial [Application Activation and Aircraft Binding](./ActivationAndBinding.html).

### Setup the Storyboard

#### 1. Creating UIButtons

   Drag and drop two UIButton objects to the RootViewController and named them as "TapFly Mission" and "ActiveTrack Mission". Remember to add Auto Layout constraints to the two buttons. Moreover, drag and drop two UIViewController objects from the Object library and place them on the right of the RootViewController.

#### 2. Adding Two ViewControllers

   Control drag from the two buttons to the two new UIViewController objects separately and choose the "Show" action segue. Here we create two UIViewController classes and named them as "ActiveTrackViewController" and "TapFlyViewController". Then set the class of the two new UIViewController objects in storyboard as these two classes.

   Next, drag two Bar Button items(Name them both as "Status") from Object Library and place them on the right side of navigation bar of "ActiveTrackViewController" and "TapFlyViewController" objects in the storyboard.

Now, let's check the screenshot of the current storyboard UI:

![storyboardUI](../images/tutorials-and-samples/iOS/Phantom4Missions/storyboardUI.png)

It looks pretty simple and clear, this will be the workflow of our demo application. 

## Coordinate Transformations for Missions

Before we dive into the implementation of two missions, let's learn something about the special coordinate transformations of them.

### TapFly Mission Coordinate Transformation

If we check the **DJITapFlyMission.h** file, you can see the following two properties:

~~~objc
@property(nonatomic, readonly) DJISDKVector3D *direction;
@property(nonatomic, readonly) CGPoint imageLocation;
~~~

**1.** The `direction` property is a `DJISDKVector3D` object, which represents a cartesian vector in 3D space. You can get the actual flying direction of the aircraft using the N-E-D(North-East-Down) coordinate system when the aircraft is executing a TapFly mission.

**2.** The `imageLocation` property is the image point from the live video stream where the vision system should calculate the flight direction from. The image point is normalized to [0,1] where (0,0) is the top left corner and (1,1) is the bottom right.

Here is a diagram to show the coordinate transformation of the mission:

![tapFlyMissionCoordinate](../images/tutorials-and-samples/iOS/Phantom4Missions/tapFlyMissionCoordinates.png)

As the diagram shown above, you can see the process of transformation.

- The `imageLocationToCalculateDirection` property shown above is transformed from TouchPoint (CGPoint) to a Video Stream Coordinate System CGPoint.

- The `direction` property shown above belongs to the **N-E-D (North-East-Down) Coordinate System** and will be sent to you by the SDK.

- The `imageLocation` property shown above belongs to the **Video Stream Coordinate System** and will be sent to you by the SDK.

So in our demo application, in order to implement the TapFly mission, we should transform the user's touch location (A CGPoint object) of UIView Coordinate System into the image location (A CGPoint object) of Video Stream Coordination System and pass it to the following `imageLocationToCalculateDirection` property of DJITapFlyMission:

~~~objc
@property(nonatomic, assign) CGPoint imageLocationToCalculateDirection;
~~~

### ActiveTrack Mission Coordinate Transformation

Next, let's check the **DJIActiveTrackMission.h** file, you may see the following two properties.

- DJIActiveTrackMission Interface

~~~objc
@property (nonatomic, readwrite) CGRect targetRect;
~~~

- DJIActiveTrackTrackingState Interface

~~~objc
@property (nonatomic, readonly) CGRect targetRect;
~~~

**1.** The `targetRect` property in the `DJIActiveTrackMission` interface is a bounding box for the target. The rectangle is normalized to [0,1] where (0,0) is 
the top left of the video preview and (1,1) is the bottom right. 

The `size` parameter of `CGRect` can be set to 0 to initialize the mission with a point instead of a rectangle. If the mission is initialized with a point, the vision system will try to recognize the object around the point and return the  representative rect in the status delegate.

**2.** Another `targetRect` property in the `DJIActiveTrackTrackingState` interface is a rectangle in the live video view image that represents the target being tracked. The rectangle is normalized to [0,1] where (0,0) is the top left of the video preview and (1,1) is the bottom right.
   
Here is a diagram to show the coordinate transformation of the ActiveTrack mission:

![tapFlyMissionCoordinate](../images/tutorials-and-samples/iOS/Phantom4Missions/activeTrackMissionCoordinates.png)

As the diagram shown above, you can see the process of transformation. 

- The two `targetRect` properties shown above belongs to the **Video Stream Coordinate System**.

So in order to implement the ActiveTrack Mission, we should transform the user's touch rect (A CGRect object) of UIView Coordinate System into the tracking rect (A CGRect object) of Video Stream Coordination System and pass it to the `targetRect` property of `DJIActiveTrackMission` interface. The SDK will send you the `targetRect` property of `DJIActiveTrackTrackingState` interface to update the rectangle on your screen.

## Implementing the TapFly Mission

### Working on the UI of TapFlyViewController

Now let's create a new UIView class and name it as "PointingTouchView". We use this UIView to update and draw the tapping point of the direction which you want the aircraft to fly towards on the screen.

Go back to the TapFlyViewController object in the storyboard. Drag and drop two UIView objects to the view controller and adjust their size to be full screen. Create two IBOutlets for them in the class extension part of TapFlyViewController.m file and connect them between Storyboard and the .m file as shown below:

~~~objc
@property (weak, nonatomic) IBOutlet UIView *fpvView;
@property (weak, nonatomic) IBOutlet PointingTouchView *touchView;
~~~

Remember to place the fpvView at the bottom, and change the top UIView object's class to "PointingTouchView".

Next, Drag and drop two UILabel objects, two UIButton objects, a UISwitch object and a UISlider object on top of the View of Tap Fly View Controller and place them at the positions as shown below:

<img src="../images/tutorials-and-samples/iOS/Phantom4Missions/tapFlyUI.png" width=70%>

For more details of the UI customization, please check the Github source code of this demo project. Lastly, create six IBOutlet properties and five IBActions methods for them in the TapFlyViewController.m file as shown below:

~~~objc
@property (weak, nonatomic) IBOutlet UIButton* startMissionBtn;
@property (weak, nonatomic) IBOutlet UIButton* stopMissionBtn;
@property (weak, nonatomic) IBOutlet UILabel* speedLabel;
@property (weak, nonatomic) IBOutlet UILabel *horiObstacleAvoidLabel;
@property (weak, nonatomic) IBOutlet UISwitch *bypassSwitcher;
@property (weak, nonatomic) IBOutlet UISlider *speedSlider;
~~~

~~~objc
- (IBAction)showStatusButtonAction:(id)sender {
}

-(IBAction) onSliderValueChanged:(UISlider*)slider
{
}

-(IBAction) onSwitchValueChanged:(UISwitch*)sender
{
}

-(IBAction) onStartMissionButtonAction:(UIButton*)sender
{
}

-(IBAction) onStopMissionButtonAction:(UIButton*)sender
{
}
~~~

### Implementing the Coordinate Transformation Methods

  Let's create a useful NSObject class named "DemoUtility", it contains some useful Macros and Class methods for the demo project. Here is the interface of it:

~~~objc
#import <Foundation/Foundation.h>
#import <DJISDK/DJISDK.h>
#import <VideoPreviewer/VideoPreviewer.h>

#define weakSelf(__TARGET__) __weak typeof(self) __TARGET__=self
#define weakReturn(__TARGET__) if(__TARGET__==nil)return;
#define INVALID_POINT CGPointMake(CGFLOAT_MAX, CGFLOAT_MAX)

extern void ShowResult(NSString *format, ...);

@interface DemoUtility : NSObject

/**
 *  Fetch DJI Project's component Objects.
 */
+ (DJICamera*) fetchCamera;
+ (DJIGimbal*) fetchGimbal;
+ (DJIFlightController *) fetchFlightController;

/**
 *  Help to do the coordinate transformations.
 */
+ (CGPoint) pointFromStreamSpace:(CGPoint)point;
+ (CGPoint) pointToStreamSpace:(CGPoint)point withView:(UIView *)view;
+ (CGPoint) pointFromStreamSpace:(CGPoint)point withView:(UIView *)view;
+ (CGSize) sizeToStreamSpace:(CGSize)size;
+ (CGSize) sizeFromStreamSpace:(CGSize)size;
+ (CGRect) rectFromStreamSpace:(CGRect)rect;
+ (CGRect) rectToStreamSpace:(CGRect)rect withView:(UIView *)view;
+ (CGRect) rectFromStreamSpace:(CGRect)rect withView:(UIView *)view;
+ (CGRect) rectWithPoint:(CGPoint)point1 andPoint:(CGPoint)point2;

/**
 *  Returns the string object from related enum values.
 */
+ (NSString*) stringFromByPassDirection:(DJIBypassDirection)direction;
+ (NSString *) stringFromActiveTrackState:(DJIActiveTrackMissionState)state;
+ (NSString *) stringFromTargetState:(DJIActiveTrackTargetState)state;
+ (NSString *) stringFromCannotConfirmReason:(DJIActiveTrackCannotConfirmReason)reason;
+ (NSString *) stringFromTapFlyState:(DJITapFlyMissionState)state;

@end
~~~

It firstly imports the DJISDK and VideoPreviewer header files, then defines several methods to do the mission coordinate transformations.

Moreover, here are the coordinate transformations class methods' implementations:

~~~objc
+ (CGPoint) pointToStreamSpace:(CGPoint)point withView:(UIView *)view
{
    VideoPreviewer* previewer = [VideoPreviewer instance];
    CGRect videoFrame = [previewer frame];
    CGPoint videoPoint = [previewer convertPoint:point toVideoViewFromView:view];
    CGPoint normalized = CGPointMake(videoPoint.x/videoFrame.size.width, videoPoint.y/videoFrame.size.height);
    return normalized;
}

+ (CGPoint) pointFromStreamSpace:(CGPoint)point{
    VideoPreviewer* previewer = [VideoPreviewer instance];
    CGRect videoFrame = [previewer frame];
    CGPoint videoPoint = CGPointMake(point.x*videoFrame.size.width,
                                     point.y*videoFrame.size.height);
    return videoPoint;
}

+ (CGPoint) pointFromStreamSpace:(CGPoint)point withView:(UIView *)view{
    VideoPreviewer* previewer = [VideoPreviewer instance];
    CGRect videoFrame = [previewer frame];
    CGPoint videoPoint = CGPointMake(point.x*videoFrame.size.width, point.y*videoFrame.size.height);
    return [previewer convertPoint:videoPoint fromVideoViewToView:view];
}

+ (CGSize) sizeToStreamSpace:(CGSize)size{
    VideoPreviewer* previewer = [VideoPreviewer instance];
    CGRect videoFrame = [previewer frame];
    return CGSizeMake(size.width/videoFrame.size.width, size.height/videoFrame.size.height);
}

+ (CGSize) sizeFromStreamSpace:(CGSize)size{
    VideoPreviewer* previewer = [VideoPreviewer instance];
    CGRect videoFrame = [previewer frame];
    return CGSizeMake(size.width*videoFrame.size.width, size.height*videoFrame.size.height);
}

+ (CGRect) rectFromStreamSpace:(CGRect)rect
{
    CGPoint origin = [DemoUtility pointFromStreamSpace:rect.origin];
    CGSize size = [DemoUtility sizeFromStreamSpace:rect.size];
    return CGRectMake(origin.x, origin.y, size.width, size.height);
}

+ (CGRect) rectToStreamSpace:(CGRect)rect withView:(UIView *)view
{
    CGPoint origin = [DemoUtility pointToStreamSpace:rect.origin withView:view];
    CGSize size = [DemoUtility sizeToStreamSpace:rect.size];
    return CGRectMake(origin.x, origin.y, size.width, size.height);
}

+ (CGRect) rectFromStreamSpace:(CGRect)rect withView:(UIView *)view
{
    CGPoint origin = [DemoUtility pointFromStreamSpace:rect.origin withView:view];
    CGSize size = [DemoUtility sizeFromStreamSpace:rect.size];
    return CGRectMake(origin.x, origin.y, size.width, size.height);
}

+ (CGRect) rectWithPoint:(CGPoint)point1 andPoint:(CGPoint)point2
{
    CGFloat origin_x = MIN(point1.x, point2.x);
    CGFloat origin_y = MIN(point1.y, point2.y);
    CGFloat width = fabs(point1.x - point2.x);
    CGFloat height = fabs(point1.y - point2.y);
    CGRect rect = CGRectMake(origin_x, origin_y, width, height);
    return rect;
}
~~~

The "StreamSpace" in the above method names means the video stream coordinate system. Those methods include transformations of CGPoint, CGSize and CGRect, we will use them frequently later. For the remaining implementation of this class, please check this tutorial's Github sample project.

### Working on the PointingTouchView

Now let's go to PointingTouchView.h file and replace it with the following codes:

~~~objc
#import <UIKit/UIKit.h>

@interface PointingTouchView : UIView
-(void) updatePoint:(CGPoint)point;
-(void) updatePoint:(CGPoint)point andColor:(UIColor*)color;
@end
~~~

Here, we create two methods to update the touching point and its color. 

Next, go to the PointingTouchView.m file and replace it with the following codes:

~~~objc
#import "PointingTouchView.h"
#import "DemoUtility.h"

@interface PointingTouchView ()

@property(nonatomic, assign) CGPoint point;
@property(nonatomic, strong) UIColor* fillColor;

@end

@implementation PointingTouchView

-(void) awakeFromNib
{
    [super awakeFromNib];
    
    self.point = INVALID_POINT;
    self.fillColor = [[UIColor greenColor] colorWithAlphaComponent:0.5];
}

-(void) updatePoint:(CGPoint)point
{
    if (CGPointEqualToPoint(self.point, point)) {
        return;
    }
    
    self.point = point;
    [self setNeedsDisplay];
}

-(void) updatePoint:(CGPoint)point andColor:(UIColor*)color
{
    if (CGPointEqualToPoint(self.point, point) && [self.fillColor isEqual:color]) {
        return;
    }
    
    self.point = point;
    self.fillColor = color;
    [self setNeedsDisplay];
}

-(void) drawRect:(CGRect)rect
{
    [super drawRect:rect];
    if (!CGPointEqualToPoint(self.point, INVALID_POINT)) {
        CGContextRef context = UIGraphicsGetCurrentContext();
        UIColor* strokeColor = [UIColor grayColor];
        CGContextSetStrokeColorWithColor(context, strokeColor.CGColor);
        UIColor* fillColor = self.fillColor;
        CGContextSetFillColorWithColor(context, fillColor.CGColor); // Fill Color
        CGContextSetLineWidth(context, 2.5);// Line width
        CGContextAddArc(context, self.point.x, self.point.y, 40, 0, 2*M_PI, 0); // Draw a circle with radius 40
        CGContextDrawPath(context, kCGPathFillStroke);
    }
}
@end
~~~

In the code above, we implement the `updatePoint:` and `updatePoint:andColor:` methods to update the `point` and `fillColor` instance variables. Moreover, we implement the `-(void)drawRect:(CGRect)rect` method to draw a circle and fill it with color for the touching point on the PointingTouchView. 

### Implementing the TapFlyViewController

#### Showing Live Video Stream
   
   In order to show the live video stream in the TapFlyViewController, we should import the following headers and implement the protocols of `DJIVideoFeedListener` firstly:

~~~objc
#import "TapFlyViewController.h"
#import "PointingTouchView.h"
#import "DemoUtility.h"
#import "StatusViewController.h"

@interface TapFlyViewController () <DJIVideoFeedListener>

@end
~~~
Then, invoke the `start` instance method of VideoPreviewer, set its view as `fpvView` property object and invoke the `addListener` method of `DJIVideoFeeder` to add `TapFlyViewController` as the listener. We should also set DJICamera's delegate as TapFlyViewController in the `viewWillAppear` method as shown below:

~~~objc
-(void) viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];

    [[VideoPreviewer instance] setView:self.fpvView];
    [[DJISDKManager videoFeeder].primaryVideoFeed addListener:self withQueue:nil];
    [[VideoPreviewer instance] start];
}
~~~

Remember to invoke the `unSetView` method of VideoPreviewer and set its view to nil in the `viewWillDisappear` method to remove the previous glView. Also, invoke the `removeListener` method of `DJIVideoFeeder` to remove the listener:

~~~objc
-(void) viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];

    [[VideoPreviewer instance] unSetView];
    [[DJISDKManager videoFeeder].primaryVideoFeed removeListener:self];
}
~~~

Finally, let's implement the DJIVideoFeedListener's delegate method to show the live video stream on the `fpvView`:

~~~objc
#pragma mark - DJIVideoFeedListener

-(void)videoFeed:(DJIVideoFeed *)videoFeed didUpdateVideoData:(NSData *)videoData {
    [[VideoPreviewer instance] push:(uint8_t *)videoData.bytes length:(int)videoData.length];
}
~~~

#### Working on the TapFly Mission

##### Setup UITapGestureRecognizer

   If we want to recognize the user's tap gesture on the screen, we need to create a UITapGestureRecognizer instance object in the `viewDidLoad` method and implement its action selector method as shown below:
   
~~~objc
- (void)viewDidLoad {
    [super viewDidLoad];

    self.title = @"TapFly Mission";
    UITapGestureRecognizer* tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onScreenTouched:)];
    [self.touchView addGestureRecognizer:tapGesture];    
}
~~~

~~~objc
-(void) onScreenTouched:(UIGestureRecognizer*)recognizer
{
    CGPoint point = [recognizer locationInView:self.touchView];
    [self.touchView updatePoint:point andColor:[[UIColor greenColor] colorWithAlphaComponent:0.5]];
    
    point = [DemoUtility pointToStreamSpace:point withView:self.touchView];
    [self startTapFlyMissionWithPoint:point];
}
~~~

In the `onScreenTouched:` method, we firstly get the CGPoint of touch event by invoking the `locationInView:` method of UIGestureRecognizer. Then we invoke the `updatePoint:andColor:` method of PointingTouchView to draw the point with green color on the screen. 

Lastly, we call the `pointToStreamSpace:withView:` method of DemoUtility to transform the touch point to a Video Stream Coordinate CGPoint object and pass it to the `startTapFlyMissionWithPoint:` method to configure the TapFly mission. We will implement this method later.

##### Configure the Mission

Before we start the DJITapFlyMission, let's use the `DJITapFlyMissionOperator` to configure the following settings:

**1.** AutoFlightSpeed

You can set the aircraft's auto flight speed during the mission by invoking the `setAutoFlightSpeed:withCompletion:` method of `DJITapFlyMissionOperator`. The range for it is [1, 10] m/s.

**2.** HorizontalObstacleBypassEnabled

If you want to allow the aircraft to bypass or move around an obstacle by going to the left or right of the obstacle when executing TapFly mission, you can invoke the `setHorizontalObstacleBypassEnabled:withCompletion:` method of `DJITapFlyMissionOperator` and pass `YES` as the parameter. Otherwise, the aircraft will only go over an obstacle to avoid it.

Now, let's implement the above settings in source code. Create the `isMissionRunning` and `speed` properties in the class extension and then implement the the following methods:

~~~objc
- (DJITapFlyMissionOperator *) missionOperator {
    return [DJISDKManager missionControl].tapFlyMissionOperator;
}

- (BOOL)isExecutingState:(DJITapFlyMissionState)state {
    return (state == DJITapFlyMissionStateExecutionResetting ||
            state == DJITapFlyMissionStateExecutionPaused ||
            state == DJITapFlyMissionStateExecuting);
}

- (BOOL)isMissionRunning {
    return [self isExecutingState:[self missionOperator].currentState];
}

-(void)updateBypassStatus {
    weakSelf(target);
    [[self missionOperator] getHorizontalObstacleBypassEnabledWithCompletion:^(BOOL boolean, NSError * _Nullable error) {
        weakReturn(target);
        if (error) {
            ShowResult(@"Get Horizontal Bypass failed: %@", error.description);
        }
        else {
            target.bypassSwitcher.on = boolean;
        }
    }];
}

-(void)updateSpeedSlider {
    weakSelf(target);
    [[self missionOperator] getAutoFlightSpeedWithCompletion:^(float floatValue, NSError * _Nullable error) {
        weakReturn(target);
        if (error) {
            ShowResult(@"Get Auto flight speed failed: %@", error.description);
        }
        else {
            target.speedLabel.text = [NSString stringWithFormat:@"%0.1fm/s", floatValue];
            target.speedSlider.value = floatValue / 10.0;
        }
    }];
}

-(IBAction) onSliderValueChanged:(UISlider*)slider
{
    float speed = slider.value * 10;
    self.speed = speed;
    self.speedLabel.text = [NSString stringWithFormat:@"%0.1fm/s", speed];
    if (self.isMissionRunning) {
        
        weakSelf(target);
        [[self missionOperator] setAutoFlightSpeed:self.speed withCompletion:^(NSError * _Nullable error) {
            weakReturn(target);
            if (error) {
                NSLog(@"Set TapFly Auto Flight Speed:%0.1f Error:%@", speed, error.localizedDescription);
            }
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [target updateSpeedSlider];
            });

        }];
    }
}

-(IBAction) onSwitchValueChanged:(UISwitch*)sender
{
    weakSelf(target);
    [[self missionOperator] setHorizontalObstacleBypassEnabled:sender.isOn withCompletion:^(NSError * _Nullable error) {
        if (error) {
            ShowResult(@"Set Horizontal Obstacle Bypass Enabled failed: %@", error.description);
        }
        [target updateBypassStatus];
    }];
}
~~~

In the code above, we implement the following things:

1. First, we create the `missionOperator` method to fetch the `DJITapFlyMissionOperator` object from `DJIMissionControl`. 

2. Next, in the `isExecutingState:` method, we check the enum values of the `DJITapFlyMissionState` and return a BOOL value. Moreover, in the `isMissionRunning` method, we fetch the `currentState` object from the `DJITapFlyMissionOperator`, invoke the `isExecutingState` method and return a BOOL value to identify if the TapFlyMission is executing.

3. In the `updateBypassStatus` method, we invoke the `getHorizontalObstacleBypassEnabledWithCompletion` method of `DJITapFlyMissionOperator` and update the `bypassSwitcher` value in the completion block.

4. Similarly, in the `updateSpeedSlider` method, we invoke the `getAutoFlightSpeedWithCompletion:` method of `DJITapFlyMissionOperator` and update the `speedLabel`'s text value and the `speedSlider`'s value in the completion block.

5. Furthermore, in the `onSliderValueChanged:` IBAction method, we invoke the `setAutoFlightSpeed:withCompletion:` method of `DJITapFlyMissionOperator` to dynamically set the flight speed for the tap fly mission. In the completion block, we invoke the `updateSpeedSlider` method to update the values of `speedLabel` and `speedSlider`.

6. Lastly, in the `onSwitchValueChanged:` IBAction method, we invoke the `setHorizontalObstacleBypassEnabled:withCompletion:` method of `DJITapFlyMissionOperator` to enable or disable the horizontal obstacle bypass feature of tap fly mission.

##### Start the Mission

Now, let's implement the following methods to start the tap fly mission:

~~~objc
-(void) startTapFlyMissionWithPoint:(CGPoint)point
{
    if (!self.tapFlyMission) {
        self.tapFlyMission = [[DJITapFlyMission alloc] init];
    }
    self.tapFlyMission.imageLocationToCalculateDirection = point;
    self.tapFlyMission.tapFlyMode = DJITapFlyModeForward;
    [self shouldShowStartMissionButton:YES];
}

- (void) shouldShowStartMissionButton:(BOOL)show
{
    if (show) {
        self.startMissionBtn.hidden = NO;
        self.stopMissionBtn.hidden = YES;
    }else
    {
        self.startMissionBtn.hidden = YES;
        self.stopMissionBtn.hidden = NO;
    }
}
~~~

In the `startTapFlyMissionWithPoint:` method, we firstly initialize the `tapFlyMission` object and then set the `imageLocationToCalculateDirection` value of `DJITapFlyMission` as the CGPoint `point`. This `imageLocationToCalculateDirection` property is where we should pass the coordinate transformation CGPoint to do the coordinate transformation. It is also the image point from the video feed where the vision system should calculate the flight direction from.

Next, set the `tapFlyMode` property of `DJITapFlyMission` as `DJITapFlyModeForward` enum value, for more details, please check the `DJITapFlyMode` enum in `DJITapFlyMissionTypes.h` header file. Lastly, invoke the `shouldShowStartMissionButton` method to show the start mission button.

Let's continue to implement the `onStartMissionButtonAction:` IBAction method as shown below:

~~~objc
-(IBAction) onStartMissionButtonAction:(UIButton*)sender
{
    weakSelf(target);
    
    [[self missionOperator] startMission:self.tapFlyMission withCompletion:^(NSError * _Nullable error) {
        ShowResult(@"Start Mission:%@", error.localizedDescription);
        weakReturn(target);
        if (!error) {
            [target shouldShowStartMissionButton:NO];
        }else
        {
            [target.touchView updatePoint:INVALID_POINT];
            ShowResult(@"StartMission Failed: %@", error.description);
        }
    }];
}
~~~

Here, we invoke the `startMission:withCompletion:` method of `DJITapFlyMissionOperator` to start the tap fly mission. If we start the tap fly mission successfully, invoke the `shouldShowStartMissionButton:` method to hide the startMissionBtn and show the stopMissionBtn. Otherwise, invoke the `updatePoint:` method of `PointingTouchView` to reset the touch point circle.

##### Add Listener to Receive Mission Events

During the TapFly mission execution, we can add a listener to receive the mission events for status infos. You can use this status infos to inform users or update the UI interface. 

Now, let's import the `DJIScrollView` class and xib files to the project, create the following properties in the class extension:

~~~objc
@property (weak, nonatomic) DJIScrollView* statusView;
@property (nonatomic, strong) NSMutableString *logString;
@property (nonatomic, strong) DJITapFlyMission* tapFlyMission;
@property (nonatomic) NSError *previousError;
~~~

Here, we create the `statusView` to show the tap fly mission status infos, and create the `logString` to store the log infos.

Next, let's add the following code at the bottom of the `viewDidLoad` method: 

~~~objc
self.statusView = [DJIScrollView viewWithViewController:self];
self.statusView.fontSize = 18;

weakSelf(target);
[[self missionOperator] addListenerToEvents:self withQueue:dispatch_get_main_queue() andBlock:^(DJITapFlyMissionEvent * _Nonnull event) {
    weakReturn(target);
    [target didReceiveEvent:event];
}];
~~~

In the code above, we initialize the `statusView` firstly, then invoke the `addListenerToEvents:withQueue:andBlock:` method of `DJITapFlyMissionOperator` to add `TapFlyViewController` as the listener to receive the events of the TapFly mission. In the completion block, we invoke the `didReceiveEvent:` method and pass the received `event` variable as the parameter to it.

Furthermore, let's create the following two methods:

~~~objc
-(void)didReceiveEvent:(DJITapFlyMissionEvent *)event {
    
    if ([self isExecutingState:event.currentState]) {
        [self shouldShowStartMissionButton:NO];
    }
    else {
        [self.touchView updatePoint:INVALID_POINT];
        [self hideMissionControlButton];
    }
    
    if ([self isExecutingState:event.previousState] &&
        ![self isExecutingState:event.currentState]) {
        if (event.error) {
            ShowResult(@"Mission interrupted with error:%@", event.error.description);
        }
        else {
            ShowResult(@"Mission Stopped without error. ");
        }
    }
    
    NSMutableString* logString = [[NSMutableString alloc] init];
    [logString appendFormat:@"Previous State:%@\n", [DemoUtility stringFromTapFlyState:event.previousState]];
    [logString appendFormat:@"Current State:%@\n", [DemoUtility stringFromTapFlyState:event.currentState]];
    
    if (event.executionState) {
        DJITapFlyExecutionState* status = event.executionState;
        CGPoint point = status.imageLocation;
        point = [DemoUtility pointFromStreamSpace:point];
        if (CGPointEqualToPoint(point, CGPointZero)) {
            point = INVALID_POINT;
        }
        
        UIColor *color = [UIColor greenColor];
        if (event.currentState == DJITapFlyMissionStateExecuting) {
            color = [[UIColor greenColor] colorWithAlphaComponent:0.5];
        }
        else if (event.currentState == DJITapFlyMissionStateExecutionResetting)
        {
            color = [[UIColor redColor] colorWithAlphaComponent:0.5];
        }
        else if (event.currentState == DJITapFlyMissionStateExecutionPaused) {
            color = [[UIColor yellowColor] colorWithAlphaComponent:0.5];
        }
        else {
            color = [[UIColor grayColor] colorWithAlphaComponent:0.5];
        }
        
        [self.touchView updatePoint:point andColor:color];
        [logString appendFormat:@"Speed:%f\n", event.executionState.speed],
        [logString appendFormat:@"ByPass Direction:%@\n", [DemoUtility stringFromByPassDirection:event.executionState.bypassDirection]];
        [logString appendFormat:@"Direction:{%f, %f, %f}\n",
         event.executionState.direction.x,
         event.executionState.direction.y,
         event.executionState.direction.z];
        [logString appendFormat:@"View Point:{%f, %f}\n", point.x, point.y];
        [logString appendFormat:@"Heading:%f", event.executionState.relativeHeading];
    }
    
    if (event.error) {
        self.previousError = event.error;
    }
    if (self.previousError) {
        [logString appendFormat:@"Error:%@\n", self.previousError.localizedDescription];
    }
    if ([self missionOperator].persistentError) {
        [logString appendFormat:@"Persistent Error:%@\n", [self missionOperator].persistentError.localizedDescription];
    }
    [self.statusView writeStatus:logString];
}
~~~

The `didReceiveEvent:` method is a bit more complicated. Let's explain it step by step:

1. We invoke the `isExecutingState:` method to check if the TapFly mission is either "Resetting", "Paused" or "Executing", if so, we show the `stopMissionBtn`, otherwise, we reset the `point` property in the `PointingTouchView` and hide both the `startMissionBtn` and `stopMissionBtn`. Next, check if the TapFly mission is stopped and show alert view to inform users with errors if they exist.

2. Furthermore, check if the `executionState` exists, then get the image point from the video feed and invoke the `pointFromStreamSpace:` method of `DemoUtility` to convert it to the iOS UIView coordinate system. Then with the `point` object, we can update the circle's position and color drawing on the screen based on the `executionState`. 

3. Store the TapFly execution state infos into the `logString` and show it in the `statusView`. 

##### Stop Mission

Finally, let's implement the `onStopMissionButtonAction:` IBAction method to stop the TapFly mission:

~~~objc
-(IBAction) onStopMissionButtonAction:(UIButton*)sender
{
    
    weakSelf(target);
    
    [[self missionOperator] stopMissionWtihCompletion:^(NSError * _Nullable error) {
        ShowResult(@"Stop Mission:%@", error.localizedDescription);
        if (!error) {
            weakReturn(target);
            [self.touchView updatePoint:INVALID_POINT];
            [target hideMissionControlButton];
        }else
        {
            ShowResult(@"StopMission Failed: %@", error.description);
        }
    }];
}
~~~

In order to show the status log, let's implement the `showStatusButtonAction:` IBAction method as shown below:

~~~objc
- (IBAction)showStatusButtonAction:(id)sender {
    [self.statusView setHidden:NO];
    [self.statusView show];
}
~~~

For more implementation details of the TapFlyViewController file, please check the Github source code. 

Now let's build and run the project, if everything goes well, you should be able to use the TapFly mission now.

>**Important**: Remember to switch the remote controller to **P** mode before you test the TapFly mission.

Here is a gif animation for you to get a better understanding of using the TapFly mission feature:

![tapFlyMissionHoriGif](../images/tutorials-and-samples/iOS/Phantom4Missions/tapFlyMission.gif)

In the animation, when you tap on the screen, a green circle appears, which is the direction you want Mavic Pro fly towards. Press the **GO** button on the right side, Mavic Pro will start to execute the TapFly mission and fly. When you want to stop the mission, just press the **X** button, Mavic Pro will stop immediately and hover there.

## Implementing ActiveTrack Mission

### Working on the UI of ActiveTrackViewController

**1.** Now let's create a new UIView class and name it as "TrackingRenderView". We use this UIView to track the user's UITouch Event and draw the tracking rectangle of the object on it.

**2.** Let's go back to the ActiveTrackViewController object in the storyboard. Drag and drop two UIView objects to the view controller and adjust their size to be full screen. Create two IBOutlets for them in the class extension part of ActiveTrackViewController.m file and connect them between Storyboard and the .m file as shown below:

~~~objc
@property (weak, nonatomic) IBOutlet UIView *fpvView;
@property (weak, nonatomic) IBOutlet TrackingRenderView *renderView;
~~~

Remember to place the `fpvView` at the bottom, and change the top UIView object's class to "TrackingRenderView".

**3.** Drag and drop two UILabel objects, four UIButton objects and two UISwitch objects on top of the View of Active Track View Controller and place them on the right positions as shown below:

<img src="../images/tutorials-and-samples/iOS/Phantom4Missions/activeTrackUI.png" width=70%>

For more details of the UI customization, please check the Github source code of this demo project. Lastly, create seven IBOutlet properties and four IBAction methods for them in the ActiveTrackViewController.m file as shown below:

~~~objc
@property (weak, nonatomic) IBOutlet UIButton *acceptButton;
@property (weak, nonatomic) IBOutlet UIButton *stopButton;
@property (weak, nonatomic) IBOutlet UIButton *rejectButton;
@property (weak, nonatomic) IBOutlet UILabel *retreatEnabledLabel;
@property (weak, nonatomic) IBOutlet UILabel *gestureEnabledLabel;
@property (weak, nonatomic) IBOutlet UISwitch *retreatSwitch;
@property (weak, nonatomic) IBOutlet UISwitch *gestureSwitch;
~~~

~~~objc
- (IBAction) onStopButtonClicked:(id)sender
{
}

- (IBAction)onAcceptButtonClicked:(id)sender
{
}

- (IBAction)onRejectButtonClicked:(id)sender
{
}

- (IBAction)onGestureEnabledSwitchValueChanged:(UISwitch*)sender
{
}

- (IBAction)onRetreatEnabledSwitchValueChanged:(UISwitch*)sender
{
}

- (IBAction)onSetRecommendedConfigurationClicked:(id)sender
{
}
~~~

### Implementing the TrackingRenderView

Let's go to TrackingRenderView.h file and replace it with the following codes:

~~~objc
#import <UIKit/UIKit.h>

@protocol TrackingRenderViewDelegate <NSObject>

@optional

-(void) renderViewDidTouchAtPoint:(CGPoint)point;

-(void) renderViewDidMoveToPoint:(CGPoint)endPoint fromPoint:(CGPoint)startPoint isFinished:(BOOL)finished;

@end

@interface TrackingRenderView : UIView

@property(nonatomic, weak) id<TrackingRenderViewDelegate> delegate;

@property(nonatomic, assign) CGRect trackingRect;

@property(nonatomic, assign) BOOL isDottedLine;

@property(nonatomic, strong) NSString* text;

-(void) updateRect:(CGRect)rect fillColor:(UIColor*)fillColor;

@end
~~~

You can see a few things are happening here:

**1.** Firstly, we create two TrackingRenderViewDelegate methods, they are used to track your single touch event and drawing rectangle touch event. 

**2.** We use the `trackingRect` property to store the updated tracking CGRect of moveing subject and draw it on the TrackingRenderView. The `isDottedLine` BOOL value is used for drawing dotted line. The `text` NSString property is used to store and draw text on the TrackingRenderView.

**3.** Lastly, we create the `updateRect:fillColor:` method to update the tracking rect and fill its color.

Next, let's come to the TrackingRenderView.m file and replace it with the following codes:

~~~objc
#import "TrackingRenderView.h"
#define TEXT_RECT_WIDTH (40)
#define TEXT_RECT_HEIGHT (40)

@interface TrackingRenderView ()
@property(nonatomic, strong) UIColor* fillColor;
@property(nonatomic, assign) CGPoint startPoint;
@property(nonatomic, assign) CGPoint endPoint;
@property(nonatomic, assign) BOOL isMoved;
@end

@implementation TrackingRenderView

#pragma mark - UIResponder Methods

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(nullable UIEvent *)event
{
    self.isMoved = NO;
    self.startPoint = [[touches anyObject] locationInView:self];
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(nullable UIEvent *)event
{
    self.isMoved = YES;
    self.endPoint = [[touches anyObject] locationInView:self];
    if (self.delegate && [self.delegate respondsToSelector:@selector(renderViewDidMoveToPoint:fromPoint:isFinished:)]) {
        [self.delegate renderViewDidMoveToPoint:self.endPoint fromPoint:self.startPoint isFinished:NO];
    }
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(nullable UIEvent *)event
{
    self.endPoint = [[touches anyObject] locationInView:self];
    if (self.isMoved) {
        if (self.delegate && [self.delegate respondsToSelector:@selector(renderViewDidMoveToPoint:fromPoint:isFinished:)]) {
            [self.delegate renderViewDidMoveToPoint:self.endPoint fromPoint:self.startPoint isFinished:YES];
        }
    }
    else
    {
        if (self.delegate && [self.delegate respondsToSelector:@selector(renderViewDidTouchAtPoint:)]) {
            [self.delegate renderViewDidTouchAtPoint:self.startPoint];
        }
    }
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    self.endPoint = [[touches anyObject] locationInView:self];
    if (self.isMoved) {
        if (self.delegate && [self.delegate respondsToSelector:@selector(renderViewDidMoveToPoint:fromPoint:isFinished:)]) {
            [self.delegate renderViewDidMoveToPoint:self.endPoint fromPoint:self.startPoint isFinished:YES];
        }
    }
}

-(void) updateRect:(CGRect)rect fillColor:(UIColor*)fillColor
{
    if (CGRectEqualToRect(rect, self.trackingRect)) {
        return;
    }
    
    self.fillColor = fillColor;
    self.trackingRect = rect;
    [self setNeedsDisplay];
}

-(void) setText:(NSString *)text
{
    if ([_text isEqualToString:text]) {
        return;
    }
    _text = text;
    [self setNeedsDisplay];
}

-(void) drawRect:(CGRect)rect
{
    [super drawRect:rect];

    if (CGRectEqualToRect(self.trackingRect, CGRectNull)) {
        return;
    }
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    UIColor* strokeColor = [UIColor grayColor];
    CGContextSetStrokeColorWithColor(context, strokeColor.CGColor);
    UIColor* fillColor = self.fillColor;
    CGContextSetFillColorWithColor(context, fillColor.CGColor); //Fill Color
    CGContextSetLineWidth(context, 1.8); //Width of line
    
    if (self.isDottedLine) {
        CGFloat lenghts[] = {10, 10};
        CGContextSetLineDash(context, 0, lenghts, 2);
    }

    CGContextAddRect(context, self.trackingRect);
    CGContextDrawPath(context, kCGPathFillStroke);
    
    if (self.text) {
        CGFloat origin_x = self.trackingRect.origin.x + 0.5*self.trackingRect.size.width - 0.5* TEXT_RECT_WIDTH;
        CGFloat origin_y = self.trackingRect.origin.y + 0.5*self.trackingRect.size.height - 0.5* TEXT_RECT_HEIGHT;
        CGRect textRect = CGRectMake(origin_x , origin_y, TEXT_RECT_WIDTH, TEXT_RECT_HEIGHT);
        NSMutableParagraphStyle* paragraphStyle = [[NSParagraphStyle defaultParagraphStyle] mutableCopy];
        paragraphStyle.lineBreakMode = NSLineBreakByCharWrapping;
        paragraphStyle.alignment = NSTextAlignmentCenter;
        UIFont* font = [UIFont boldSystemFontOfSize:35];
        NSDictionary* dic = @{NSFontAttributeName:font,NSParagraphStyleAttributeName:paragraphStyle,NSForegroundColorAttributeName:[UIColor whiteColor]};
        [self.text drawInRect:textRect withAttributes:dic];
    }
}

@end
~~~

Here, we implement the four event-handling methods for touches to track user's multi touch and invoke the related `TrackingRenderViewDelegate` methods. Also, we implement the `-(void)drawRect:(CGRect)rect` method to draw the tracking rectangle, dotted line and text on the TrackingRenderView.

### Implementing the ActiveTrackViewController

#### Showing Live Video Stream
   
   In order to show the live video stream of Mavic Pro's camera on the app, let's come to ActiveTrackViewController.m file and implement its class extension part firstly. Import the following headers and implement the protocols of `DJIVideoFeedListener` and `TrackingRenderViewDelegate`:

~~~objc
#import "ActiveTrackViewController.h"
#import "TrackingRenderView.h"
#import "DemoUtility.h"
#import "DJIScrollView.h"

@interface ActiveTrackViewController () <DJIVideoFeedListener, TrackingRenderViewDelegate>

@end
~~~

Then, in the `viewWillAppear:` method, invoke the `start` instance method of VideoPreviewer, set its view as `fpvView` property object and invoke the `addListener` method of `DJIVideoFeeder` to add `ActiveTrackViewController` as the listener. We should also set DJICamera's delegate as ActiveTrackViewController as shown below:

~~~objc
-(void) viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];

    [[VideoPreviewer instance] setView:self.fpvView];
    [[DJISDKManager videoFeeder].primaryVideoFeed addListener:self withQueue:nil];
    [[VideoPreviewer instance] start];
}
~~~

Remember to invoke the `unSetView` method of VideoPreviewer and set its view to nil in the `viewWillDisappear` method to remove the previous glView. Also, invoke the `removeListener` method of `DJIVideoFeeder` to remove the listener:

~~~objc
-(void) viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [[VideoPreviewer instance] unSetView];
    [[DJISDKManager videoFeeder].primaryVideoFeed removeListener:self];
}
~~~

Lastly, let's implement the DJIVideoFeedListener's delegate method to show the live video stream on the `fpvView`:

~~~objc
#pragma mark - DJIVideoFeedListener
-(void)videoFeed:(DJIVideoFeed *)videoFeed didUpdateVideoData:(NSData *)videoData {
    [[VideoPreviewer instance] push:(uint8_t *)videoData.bytes length:(int)videoData.length];
}
~~~

#### Setup ActiveTrack Mission

##### Configure the Mission

Before we start the DJIActiveTrackMission, let's use the `DJIActiveTrackMissionOperator` to configure the following settings:

- Enable/Disable Gesture Mode

Gesture mode allows the subject to confirm tracking as well as take pictures using gestures. Raise your arms in a **V**, the human subject can accept the confirmation to track them. Gesture mode can only be enabled when the aircraft is flying but not tracking a target. If the aircraft is already tracking a target, disabling gesture mode will stop the ActiveTrack mission.

You can check this [video](https://www.djivideos.com/watch/b45aa08d-0bd3-46df-a89e-e36f94dffbe9) to get a better understanding of the Gesture Mode.

Now let's implement the `onGestureEnabledSwitchValueChanged:` IBAction method as shown below:

~~~objc
- (IBAction)onGestureEnabledSwitchValueChanged:(UISwitch*)sender {
  
    weakSelf(target);
    [[self missionOperator] setGestureModeEnabled:sender.isOn withCompletion:^(NSError * _Nullable error) {
        weakReturn(target);
        if (error != nil) {
            NSLog(@"Set Gesture Mode Enabled failed.");
        }else{
            NSLog(@"Set Gesture Mode Enabled success.");
            [target updateGestureEnabled];
        }
    }];
    
}

-(void)updateGestureEnabled {
    
    self.gestureSwitch.on = [[self missionOperator] isGestureModeEnabled];
}
~~~

In the code above, we invoke the `setGestureModeEnabled:withCompletion:` method of `DJIActiveTrackMissionOperator` to set the gesture mode, and invoke `updateGestureEnabled` method to update the `gestureSwitch` value in the completion block if set geature mode successfully.

- Enable/Disable Retreat

When retreat is enabled, the aircraft will retreat (fly backwards) when the target comes toward it. When it is disabled, the aircraft will not retreat and instead rotate the gimbal pitch down to track the target as it goes underneath. If the target goes beyond the gimbal's pitch stop, the target will be lost and the mission will stop.

Here, let's implement the `onRetreatEnabledSwitchValueChanged:` IBAction method as shown below:

~~~objc
- (IBAction) onRetreatEnabledSwitchValueChanged:(UISwitch*)sender
{
    weakSelf(target);
    [[self missionOperator] setRetreatEnabled:sender.isOn withCompletion:^(NSError * _Nullable error) {
        weakReturn(target);
        if (error != nil) {
            NSLog(@"Set Retreat Enabled failed.");
        }else{
            NSLog(@"Set Retreat Enabled success.");
            [target updateRetreatEnabled];
        }
    }];
    
}

-(void)updateRetreatEnabled {
    weakSelf(target);
    [[self missionOperator] getRetreatEnabledWithCompletion:^(BOOL boolean, NSError * _Nullable error) {
        weakReturn(target);
        if (!error) {
            target.retreatSwitch.on = boolean;
        }
    }];
}
~~~

As you see the code above, we invoke the `setRetreatEnabled:withCompletion:` method of `DJIActiveTrackMissionOperator` to enable the retreat feature. Also, in the completion block, if set retreat enable successfully, we invoke the `updateRetreatEnabled` method to update the `retreatSwitch`'s "on" value.

- Set Recommended Configuration

Using this feature, we can set the recommended camera and gimbal configuration that optimizes performance for the ActiveTrack Mission in most environments.

Let's implement the `onSetRecommendedConfigurationClicked:` IBAction method as shown below:

~~~objc
- (IBAction)onSetRecommendedConfigurationClicked:(id)sender {
    
    [[self missionOperator] setRecommendedConfigurationWithCompletion:^(NSError * _Nullable error) {
        if (error) {
            ShowResult(@"Set Recommended Camera and Gimbal Configuration Failed: %@", error.localizedDescription);
        }else{
            ShowResult(@"Set Recommended Camera and Gimbal Configuration Success.");
        }
        
    }];
}
~~~

Here, we can invoke the `setRecommendedConfigurationWithCompletion:` method of `DJIActiveTrackMissionOperator` to set the recommended camera and gimbal configuration. Then show alert views to inform users in the completion block.

##### Start the Mission

**1.** The ActiveTrack Mission can track both moving subjects and humans.
  
- Track Moving Subjects

For moving subjests, you need to provide a CGRect struct of tracking rectangle to the DJIActiveTrackMission object's `rect` property.
  
~~~objc
DJIActiveTrackMission* mission = [[DJIActiveTrackMission alloc] init];
mission.targetRect = CGRectMake(10, 20, 50, 100);   
~~~
  
- Track Humans

For humans, you can either provide a CGRect struct of tracking rectangle or a CGRect struct with just CGPoint. Like you can tap on the human on your iPhone's screen.
  
~~~objc
DJIActiveTrackMission* mission = [[DJIActiveTrackMission alloc] init];
mission.targetRect = CGRectMake(10, 20, 0, 0);   
~~~
  
**2.** Now, let's set the TrackingRenderView's delegate as ActiveTrackViewController in the `viewDidLoad` method and implement the delegate methods as shown below:
  
~~~objc
- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = @"ActiveTrack Mission";
  self.renderView.delegate = self;
}
~~~

~~~objc
-(DJIActiveTrackMissionOperator *) missionOperator {
    return [DJISDKManager missionControl].activeTrackMissionOperator;
}

#pragma mark TrackingRenderView Delegate Methods
-(void) renderViewDidTouchAtPoint:(CGPoint)point
{
    if (self.isTrackingMissionRunning && !self.isNeedConfirm) {
        return;
    }
    
    if (self.isNeedConfirm) {
        CGRect largeRect = CGRectInset(self.currentTrackingRect, -10, -10);
        if (CGRectContainsPoint(largeRect, point)) {
            [[self missionOperator] acceptConfirmationWithCompletion:^(NSError * _Nullable error) {
                ShowResult(@"Confirm Tracking:%@", error.localizedDescription);
            }];
        }
        else
        {
            [[self missionOperator] stopMissionWithCompletion:^(NSError * _Nullable error) {
                ShowResult(@"Cancel Tracking:%@", error.localizedDescription);
            }];
        }
    }
    else
    {
        weakSelf(target);
        point = [DemoUtility pointToStreamSpace:point withView:self.renderView];
        DJIActiveTrackMission* mission = [[DJIActiveTrackMission alloc] init];
        mission.targetRect = CGRectMake(point.x, point.y, 0, 0);
        mission.mode = DJIActiveTrackModeTrace;
        [[self missionOperator] startMission:mission withCompletion:^(NSError * _Nullable error) {
            if (error) {
                ShowResult(@"Start Mission Error:%@", error.localizedDescription);
                if (error) {
                    weakReturn(target);
                    target.renderView.isDottedLine = NO;
                    [target.renderView updateRect:CGRectNull fillColor:nil];
                }
            }
            else
            {
                ShowResult(@"Start Mission Success");
            }

        }];
        
    }
}

-(void) renderViewDidMoveToPoint:(CGPoint)endPoint fromPoint:(CGPoint)startPoint isFinished:(BOOL)finished
{

    self.renderView.isDottedLine = YES;
    self.renderView.text = nil;
    CGRect rect = [DemoUtility rectWithPoint:startPoint andPoint:endPoint];
    [self.renderView updateRect:rect fillColor:[[UIColor greenColor] colorWithAlphaComponent:0.5]];
    if (finished) {
        CGRect rect = [DemoUtility rectWithPoint:startPoint andPoint:endPoint];
        [self startMissionWithRect:rect];
    }
}
~~~
  
The `renderViewDidTouchAtPoint:` delegate method get invoked when you do single touch on the screen, there are two situations for it:
  
- If you draw a tracking rectangle on a moving subject, and the vision system need to confirm it, you can touch the rectangle and invoke the `acceptConfirmationWithCompletion:` method of the `DJIActiveTrackMissionOperator`, if you want to cancel the tracking, you can touch outside the rectangle, and invoke the `stopMissionWithCompletion:` method. 

- If you want to track a human, you can touch the human on the screen. By doing that, you will get a CGPoint from the delegate method and invoke the DemoUtility's `pointToStreamSpace:withView:` method to transform the touch CGPoint to a Video Stream Coordinate CGPoint object. Then pass it to the `targetRect` property of `DJIActiveTrackMissionOperator` and invoke the following method of DJIActiveTrackMissionOperator to start the ActiveTrack mission:

~~~objc
-(void)startMission:(DJIActiveTrackMission *)mission withCompletion:(DJICompletionBlock)completion;
~~~

Moreover, the `renderViewDidMoveToPoint:fromPoint:isFinished:` delegate method get invoked when user try to draw a rectangle on the screen to track moving subject. You can get the startPoint and endPoint from the delegate method and invoke the DemoUtility's `rectWithPoint:andPoint:` method to convert them to a CGRect object. When you finish drawing the rectangle, invoke the `startMissionWithRect:` method to start the mission.  
   
Furthermore, let's implement the `startMissionWithRect:` method here:
   
~~~objc
-(void) startMissionWithRect:(CGRect)rect
{
    CGRect normalizedRect = [DemoUtility rectToStreamSpace:rect withView:self.renderView];
    DJIActiveTrackMission* trackMission = [[DJIActiveTrackMission alloc] init];
    trackMission.targetRect = normalizedRect;
    trackMission.mode = DJIActiveTrackModeTrace;
    
    weakSelf(target);
    [[self missionOperator] startMission:trackMission withCompletion:^(NSError * _Nullable error) {
        if (error) {
            weakReturn(target);
            target.renderView.isDottedLine = NO;
            [target.renderView updateRect:CGRectNull fillColor:nil];
            ShowResult(@"Start Mission Error:%@", error.localizedDescription);
        }
        else
        {
            ShowResult(@"Start Mission Success");
        }

    }];
}
~~~

In the code above, we firstly invoke the `rectToStreamSpace:withView:` method of DemoUtility to transform the drawing rectangle to a Video Stream coordinate rectangle, call it `normalizedRect`. Then create the DJIActiveTrackMission instance object and pass the `normalizedRect` to its `targetRect` property. If start mission failed, we reset the drawing rect in the `renderView` and show alert view to inform users.

##### Accept and Reject Confirmation

When the vision system is not sure if the tracking rectangle is around the user's desired target, it will need confirmation before starting to fly relative to the target. Let's implement the `onAcceptButtonClicked:` IBAction method as shown below:

~~~objc
- (IBAction)onAcceptButtonClicked:(id)sender {
    
    [[self missionOperator] acceptConfirmationWithCompletion:^(NSError * _Nullable error) {
        if (error) {
            ShowResult(@"Accept Confirmation Failed: %@", error.description);
        }
    }];
}
~~~

If you want to stop the aircraft from following the target, and ask for user's confirmation again, you can invoke the `stopAircraftFollowingWithCompletion:` method of `DJIActiveTrackMissionOperator` as shown below:

~~~objc
- (IBAction)onRejectButtonClicked:(id)sender {
   
    [[self missionOperator] stopAircraftFollowingWithCompletion:^(NSError * _Nullable error) {
            ShowResult(@"Stop Aircraft Following Failed: %@", error.description);
    }];
    
}
~~~

##### Add Listener to Receive Mission Events

When the active track mission is executing, we can add a listener to receive the mission events for status infos. You can use this status infos to inform users or update the UI interface. Now, let's add the following code at the bottom of the `viewDidLoad` method: 

~~~objc
self.statusView = [DJIScrollView viewWithViewController:self];
self.statusView.fontSize = 18;

weakSelf(target);
[[self missionOperator] addListenerToEvents:self withQueue:dispatch_get_main_queue() andBlock:^(DJIActiveTrackMissionEvent * _Nonnull event) {
    weakReturn(target);
    [target didUpdateEvent:event];
}];
~~~

In the code above, we initialize the `statusView` firstly, then invoke the `addListenerToEvents:withQueue:andBlock:` method of `DJIActiveTrackMissionOperator` to add `ActiveTrackViewController` as the listener to receive the events of the ActiveTrack mission. In the completion block, we invoke the `didUpdateEvent:` method and pass the received `event` variable as the parameter to it.

Furthermore, let's create the following two methods:

~~~objc
-(void)didUpdateEvent:(DJIActiveTrackMissionEvent *)event {

  DJIActiveTrackMissionState prevState = event.previousState;
  DJIActiveTrackMissionState curState = event.currentState;
  if ([self isTrackingState:prevState] &&
      ![self isTrackingState:curState]) {
      if (event.error) {
          ShowResult(@"Mission Interrupted: %@", event.error.description);
      }
  }
  
  if (event.trackingState) {
      DJIActiveTrackTrackingState *state = event.trackingState;
      CGRect rect = [DemoUtility rectFromStreamSpace:state.targetRect];
      self.currentTrackingRect = rect;
      if (event.trackingState.state == DJIActiveTrackTargetStateWaitingForConfirmation) {
          self.isNeedConfirm = YES;
          self.renderView.text = @"?";
      }
      else {
          self.isNeedConfirm = NO;
          self.renderView.text = nil;
      }
      UIColor *color = nil;
      switch (state.state) {
          case DJIActiveTrackTargetStateWaitingForConfirmation:
              color = [[UIColor orangeColor] colorWithAlphaComponent:0.5];
              break;
          case DJIActiveTrackTargetStateCannotConfirm:
              color = [[UIColor redColor] colorWithAlphaComponent:0.5];
              break;
          case DJIActiveTrackTargetStateTrackingWithHighConfidence:
              color = [[UIColor greenColor] colorWithAlphaComponent:0.5];
              break;
          case DJIActiveTrackTargetStateTrackingWithLowConfidence:
              color = [[UIColor yellowColor]colorWithAlphaComponent:0.5];
              break;
          case DJIActiveTrackTargetStateUnknown:
              color = [[UIColor grayColor] colorWithAlphaComponent:0.5];
              break;
          default:
              break;
      }
      [self.renderView updateRect:rect fillColor:color];
  }
  else {
      self.renderView.isDottedLine = NO;
      self.renderView.text = nil;
      self.isNeedConfirm = NO;
      [self.renderView updateRect:CGRectNull fillColor:nil];
  }
  
  NSMutableString* logString = [[NSMutableString alloc] init];
  [logString appendFormat:@"From State:%@\n", [DemoUtility stringFromActiveTrackState:prevState]];
  [logString appendFormat:@"To State:%@\n", [DemoUtility stringFromActiveTrackState:curState]];
  [logString appendFormat:@"Tracking State:%@\n", event.trackingState ? [DemoUtility stringFromTargetState:event.trackingState.state] : nil];
  [logString appendFormat:@"Cannot Confirm Reason:%@\n", event.trackingState ? [DemoUtility stringFromCannotConfirmReason:event.trackingState.cannotConfirmReason] : nil];
  [logString appendFormat:@"Error:%@\n", event.error.localizedDescription];
  [logString appendFormat:@"PersistentError:%@", [self missionOperator].persistentError.localizedDescription];
  [logString appendFormat:@"QuickMoive Progress:%tu", event.trackingState.progress];
  
  [self.statusView writeStatus:logString];
  [self updateButtons];
    
}
~~~

In the code above, we implement the following features:

1. We get the `previousState` and `currentState` properties from the received `DJIActiveTrackMissionEvent`, then use them to check if the mission is interrupted and shows alert view to inform users with related errors.

2. Next, we get the `targetRect` in the live video feed from `DJIActiveTrackTrackingState` object and invoke the `rectFromStreamSpace:` method to transform it to the tracking rectangle (A CGRect object) of UIView Coordinate System. If the target state is `DJIActiveTrackTargetStateWaitingForConfirmation`, we show the "?" text to inform users to confirm the tracking subject. 

3. Moreover, use different color to represent different `DJIActiveTrackTargetState` and invoke the `updateRect:fillColor:` method of `TrackingRenderView` to update the TrackingRenderView's rectangle drawing and filling color.

4. Lastly, we store different mission state infos in the `logString` object and show them in the `statusView`.
   
##### Stop Mission

Finally, let's implement the `stopMissionWithCompletion:` method of `DJIActiveTrackMissionOperator` to stop the ActiveTrack Mission. Update content of the `onStopButtonClicked:` IBAction method as shown below:

~~~objc
- (IBAction) onStopButtonClicked:(id)sender
{
    [[self missionOperator] stopMissionWithCompletion:^(NSError * _Nullable error) {
        if (error) {
            ShowResult(@"Stop Mission Failed: %@", error.description);
        }
    }];
}
~~~

In order to show the status log, let's implement the `showStatusButtonAction:` IBAction method as shown below:

~~~objc
- (IBAction)showStatusButtonAction:(id)sender {
    [self.statusView setHidden:NO];
    [self.statusView show];
}
~~~

For more implementation details of the ActiveTrackViewController.m file, please check the Github source code. 

Now let's build and run the project, if everything goes well, you should be able to use the ActiveTrack mission of Mavic Pro now. 

>**Important**: Remember to switch the remote controller to **P** mode before you test the ActiveTrack mission.

Here is a gif animation for you to get a better understanding of using the ActiveTrack mission:

![ActiveTrackMissionGif](../images/tutorials-and-samples/iOS/Phantom4Missions/ActiveTrackMission.gif)

In the animation, you can see there is a person standing there, you can touch the screen to draw a green rectangle on him. Then the rectangle will turn orange and a question mark will appear to ask you for confirmation. You can press the **A** button on the right side to accept the confirmation.

After the confirmation, the ActiveTrack mission starts. The person walks around and the green rectangle will follow it to track its movement. This means that Mavic Pro is now tracking you automatically!

You can press the **R** button to stop the aircraft from following you and ask for your confirmation again. Also, press the **S** button if you want to stop the ActiveTrack mission. 

Moreover, if you switch on the **GestureEnabled** switcher at the bottom of the screen, you will enable the gesture mode of Mavic Pro. Raise your arms in a **V**, Mavic Pro will recognize you and start to track you automatically.

Lastly, you can try to switch on the **RetreatEnabled** switcher at the bottom right corner of the screen to enable the **Retreat** feature. Once you go towards the Mavic Pro, it will fly backwards.

### Using the DJI Assistant 2 for Mission Testing

Since most of our developers don't have a perfect testing environment, like a big indoor space, wide backyard, etc. If we need to go outdoors and bring our laptop to debug and test our application everytime, it's time consuming and not efficient. 

Luckily, we have a new DJI Assistant 2 (Includes the 3D Simulator) for you to test the mission easily on your Mac. The simulator creates a virtual 3D environment from flight data transmitted to the Mac.

You can check the [Using DJI Assistant 2 Simulator](../application-development-workflow/workflow-testing.html#DJI-Assistant-2-Simulator) for its basic usage.

Now you can connect your iPhone which is running the demo application to the remote controller, and start to test the **TapFly** and **ActiveTrack** missions on the simulator of the DJI Assistant 2.  

Moreover, another good news is you can use the DJI Bridge App to test the application directly on the iOS Simulator! If you are not familiar with the DJI Bridge App, please check the [DJI Bridge App Tutorial](./BridgeAppDemo.html). 
   
Let's go to RootViewController.m file and add a Macro on top of the class extension part as shown below:
   
~~~objc
#define ENTER_DEBUG_MODE 0

@interface RootViewController ()<DJISDKManagerDelegate>
@property (weak, nonatomic) IBOutlet UIButton *tapFlyMissionButton;
@property (weak, nonatomic) IBOutlet UIButton *activeTrackMissionButton;
@end
~~~

Then modify the DJISDKManagerDelegate method as shown below:
  
~~~objc
- (void)appRegisteredWithError:(NSError *)error
{
    if (error) {
        NSString* message = @"Register App Failed! Please enter your App Key and check the network.";
        [self.tapFlyMissionButton setEnabled:NO];
        [self.activeTrackMissionButton setEnabled:NO];
        [self showAlertViewWithTitle:@"Register App" withMessage:message];

    }else
    {
        NSLog(@"registerAppSuccess");
#if ENTER_DEBUG_MODE
        [DJISDKManager enableBridgeModeWithBridgeAppIP:@"172.20.10.0"];
#else
        [DJISDKManager startConnectionToProduct];
#endif
    }
}
~~~

Now, make sure your Mac and your iPhone(Running DJI Bridge App) connect to the same WiFi network, pass the **Debug ID** on the DJI Bridge App to the `enableBridgeModeWithBridgeAppIP:` method. Build and run the app on the iOS Simulator with Xcode, control the remote controller to take off the aircraft in the simulator. You can start to test the **TapFly** and **ActiveTrack** mission directly on your Mac now! 
  
Here are two screenshots of testing the two missions on your Mac:
  
  - TapFly Mission Test
  
![setupButton](../images/tutorials-and-samples/iOS/Phantom4Missions/tapFlyTest.png)
  
  - AciveTrack Mission Test

![setupButton](../images/tutorials-and-samples/iOS/Phantom4Missions/activeTrackTest.png)

### Summary

Congratulations! You've finished the demo project and implement the two cool **TapFly** and **ActiveTrack** missions using DJI Mobile SDK. It's easy and straightforward. You've learned how to use the `DJITapFlyMission`, `DJIActiveTrackMission`, `DJITapFlyMissionOperator` and `DJIActiveTrackMissionOperator` to implement the features. Also, you know how to setup and use the simulator of DJI Assistant 2 and DJI Bridge App to test the two missions on your Mac easily. 

But, In order to make a cool **TapFly** and **ActiveTrack** mission application, you still have a long way to go. You can add more necessary features like showing the battery percentage, GPS signal quality, add a checklist like DJI Go app to check the aircraft status before flying, etc. Good luck and hope you enjoy this tutorial!

