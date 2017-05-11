---
title: UI Library Introduction
date: 2017-05-11
keywords: [ui library introduction, UI Library, widget, panel, default layout, asset swap, widget customization, panel customization]
---

Many applications that control DJI products using the DJI Mobile SDK share similar core functionalities. They will typically:

* Show a live view of the camera feed
* Show product state (aircraft telemetry, battery level, signal strength, etc.)
* Allow the user to review and change product settings
* Have basic functionalities such as automatic take off, land, go home.

To make an application, a developer typically has to provide this set of core functionalities before adding some unique ones.

The DJI UI Library provides UI elements that have these core functionalities, hence can be used to speed up development time. In fact, by using the default UI Library, an application can be created with no additional lines of code. It looks like:

![DefaultScreen](../../images/product-introduction/defaultScreen.png)

Developers can pick and choose which parts of the UI Library they want to include, exclude and customize. 

UI Library is available in the DJI Mobile SDK v4.0 and later. 

## Concepts Overview

UI Library has three main UI categories:

* **Widget**: An independent UI element that gives state or simple control (e.g.  battery indicator, or automatic take-off button)
* **Collection**: (iOS only) An organized collection of widgets that are related to each other (e.g. camera exposure state)
* **Panel**: Complex menus and settings views with rich UI elements (e.g. camera settings)

All UI elements can simply be included in an application without extra maintenance. They are already tied to the DJI Mobile SDK, and will start updating themselves after instantiation.

The [Android](http://developer.dji.com/api-reference/android-uilib-api/index.html) and [iOS](http://developer.dji.com/api-reference/ios-uilib-api/index.html) UI Library API reference has the complete list of UI elements available.

## Widget

A widget is the simplest component of the UI Library. It typically represents a simple state element or gives a simple control. Some examples of widgets include:
<html>
<table class="table-pictures">
<tbody>
  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>Aircraft Battery Percentage </p></td>
    <td><font style="font-weight:bold" align="center"><p>Flight Mode </p></td>
    <td><font style="font-weight:bold" align="center"><p>Video Signal Strength </p></td>
    <td><font style="font-weight:bold" align="center"><p>Return to Home Button </p></td>
  </tr>

  <tr>
    <td align="center"><img src="../../images/ui-library-introduction/battery.png"></td>
    <td align="center"><img src="../../images/ui-library-introduction/flyingMode.png"></td>
    <td align="center"><img src="../../images/ui-library-introduction/videoSignal.png"></td>
    <td align="center"><img src="../../images/ui-library-introduction/returnHome.png"></td>
  </tr>
</tbody>
</table>
</html>

### Customization

Widgets can be customized by either swapping the asset, or subclassing the widget.

#### Asset Swap

Swapping the asset keeps the widget's behavior and logic, but changes its look.

##### iOS

  1. Open the **DJIUILibrary.framework**
  2. Replace assets in the "DJIUILibrary.framework/Assets/"" directory
  3. Replace the orignal **DJIUILibrary.framework** file in the Xcode project

> Note: The image assets are required to be of the same names and pixel dimensions as the original ones.

##### Android

  1. Rename AAR file to have a zip extension
  2. Unzip AAR file
  3. Replace assets in the following directories:
    - res/drawable
    - res/drawable-hdpi-v4
    - res/drawable-mdpi-v4
    - res/drawable-xhdpi-v4
    - res/drawable-xxhdpi-v4
    - res/drawable-xxxhdpi-v4
  4. Zip file and rename to replace the original AAR file 

> Note: The image assets are required to be of the same pixel dimensions as the original ones.

#### Subclassing

##### iOS

  Widgets can be subclassed to override initialize and view update methods to customize the look. For easy customization, each widget exposes the underlying data it is using as properties. Please refer to the [API documentation](http://developer.dji.com/api-reference/ios-uilib-api/Widgets/AutoExposureLockWidget.html) for more details.

##### Android
  
  In Android, subclassing can completely change the behavior and the look of Widgets. The steps are:

  1. Override `void initView(Context var1, AttributeSet var2, int var3)` and inflate/initialize the custom layout. Remember, **do not call** `super.initView()`.

  2. To get updated with information changes, override methods with the name following the `onXXXChange` pattern (for example, the `onBatteryPercentageChange(int percentage)` in `BatteryWidget`). This method will be called every time battery percentage changes. Overriding this method will give you the integer value of battery percentage. Remember, **do not call** `super.initView()`.              

  3. To perform actions, use methods that follow the naming pattern `performXXXAction`.

## Collection

A widget collection groups multiple, often related widgets together in an organized way. It controls the layout of the widgets relative to each other.

Collections can also be created and used to organize pre-existing widgets.

Widget collections are used in iOS Only.

## Panels

Panels are more complex elements with rich information and control, such as settings menus or the pre-flight checklist. 

Examples of panels include:

<html>

<table class="table-pictures">

  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>Camera Settings Panel </p></td>
    <td><font style="font-weight:bold" align="center"><p>Camera Exposure Settings Panel </p></td>
    <td><font style="font-weight:bold" align="center"><p>Preflight Checklist </p></td>
  </tr>

  <tr>
    <td align="center"><img src="../../images/ui-library-introduction/cameraSettingsPanel.png" width=90%></td>
    <td align="center"><img src="../../images/ui-library-introduction/exposureSettingsPanel.png" width=90%></td>
    <td align="center"><img src="../../images/ui-library-introduction/preflightChecklistPanel.png" width=90%></td>
  </tr>

</table>
</html>

### Customization

Due to the complexity of panels, customization is not currently provided.

## Samples & Tutorials

Sample projects are provided for the DJI UI Library:

- [iOS UI Library Github Sample](https://github.com/dji-sdk/Mobile-UILibrary-iOS)

- [Android UI Library Github Sample](https://github.com/dji-sdk/Mobile-UILibrary-Android)

<!-- An iOS UI Library tutorial is provided as an example on how to use the iOS UI Library.

- [Creating a Simplified DJI Go app using DJI Mobile UI Library](TODO)
  -->
