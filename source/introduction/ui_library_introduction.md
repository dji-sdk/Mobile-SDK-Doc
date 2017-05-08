---
title: UI Library Introduction
date: 2017-05-08
keywords: [ui library introduction, UILibrary, widget, panel, default layout, asset swap, widget customization, panles customization]
---

The DJI UILibrary is a suite of product agnostic UI objects that fast tracks the development of iOS applications using the [DJI Mobile SDK](./mobile_sdk_introduction.html). It helps you simplify the creation of DJI Mobile SDK based apps in iOS. With similar design to DJI Go,UI Elements allow you to create consistent UX between your apps and DJI apps. Moreover, with the ease of use, UILibrary let you focus more on business and application logic. The DJI UILibrary is implemented using “subscription keys” (DJIKey ) feature of DJI SDK Mobile 4.0.

The UILibrary includes:

* a library/framework that can be imported into an Android or iOS app that give access to the DJI UI Elements
* sample code and tutorials
* this developer guide and API documentation

This introduction will describe what functionality the UILibrary provides, and the basic concepts of it.

## Concepts Overview

UILibrary was designed around core concepts that help categorize the kind of UI elements available and their expectable behavior both at runtime and while being customized.

### Widgets

Widget represents the major part of the UI. They are small view which display a specific piece of information.

They may also offer a precise control point to a specific action - for instance, take off.

Widgets offer many different customization angle. You may simply edit the image assets provided inside the UILibrary framework, change the visual rendering of the information consumed or provide your own information logic and reuse the existing rendering.

See below for examples of Widgets:

<html>
<table class="table-pictures" border="1">
<tbody>
  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>Aircraft Battery Percentage </p></td>
    <td><font style="font-weight:bold" align="center"><p>Flight Mode </p></td>
    <td><font style="font-weight:bold" align="center"><p>Video Signal Strength </p></td>
    <td><font style="font-weight:bold" align="center"><p>Return to Home Button </p></td>
  </tr>

  <tr>
    <td align="center"><img src="../images/ui-library-introduction/battery.png"></td>
    <td align="center"><img src="../images/ui-library-introduction/flyingMode.png"></td>
    <td align="center"><img src="../images/ui-library-introduction/videoSignal.png"></td>
    <td align="center"><img src="../images/ui-library-introduction/returnHome.png"></td>
  </tr>
</tbody>
</table>
</html>

These Widgets have already been linked to relevant DJIKeys. They require from very little time for setting up. Once added to the screen, Widgets will automatically update according to information changes.

### Widget Collections

Widget Collections are grouping objects which allow the developer to easily display a set of widgets in an orderly fashion without the hassle of building the organization mechanism.

They also provide structure for the widgets to look alike each other while inside the same collection and apply an interaction level to all as to offer potential customization points in behavior.

You can also create your own collections and add pre-existing widgets to them.

### Widget Customization

Depends on your need of modifying UI Widgets, you can customize the widgets in two ways: **Asset Swap** and **Subclassing**.

#### Asset Swap

- iOS

  You can replace image assets inside the library with your own custom assets.

- Android

  Asset Swap can keep the Widget’s original behavior and overall look, only change some assets. Here are the steps:

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

- iOS

  You can subclass widgets to override initialize and view update methods to customize the look. For easy customization, each widget exposes the underlying data as property. Please refer to API documentation for more details.

- Android
  
  Subclassing can completely change the behavior and the look of Widgets. Here are the steps:

  1. Override `void initView(Context var1, AttributeSet var2, int var3)` and inflate/initialize your custom layout in there. Remember to **not call super.initView()**.

  2. To get updated with information changes, override methods with the name follow `onXXXChange` pattern. Ex: `onBatteryPercentageChange(int percentage)` in `BatteryWidget` . This method will be called everytime battery percentage changes. Overriding this method will give you integer value of battery percentage. Remember to **not call super.onXXXChange()**.

  3. To perform some actions to aircraft, use(call) methods with the name follow `performXXXAction` pattern.

### Panels

Panels are more complex control elements. Normally, they are complex menus and setting views. They are usually a lot more enclosed because they handle very complex logics. They can be placed in your app's UI using native methods. See below examples:

<html>

<table class="table-pictures">

  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>Camera Settings Panel </p></td>
    <td><font style="font-weight:bold" align="center"><p>Camera Exposure Settings Panel </p></td>
    <td><font style="font-weight:bold" align="center"><p>Preflight Checklist </p></td>
  </tr>

  <tr>
    <td align="center"><img src="../images/ui-library-introduction/cameraSettingsPanel.png" width=80%></td>
    <td align="center"><img src="../images/ui-library-introduction/exposureSettingsPanel.png" width=80%></td>
    <td align="center"><img src="../images/ui-library-introduction/preflightChecklistPanel.png" width=80%></td>
  </tr>

</table>
</html>

### Panels Customization

Due to Panel’s complex nature, DJI does not offer a way to customize their looks and functionalities currenlty.

### Contents

Contents represent the element that usually populates the background of the UI. FPV is the most commonly used today. They come ready to use and may have direct interactions with other widgets/panels.

### Default Layout

The default layout is a fully functioning mini-DJI Go. It uses all the elements of the UILibrary to give you the foundation of your app. The default layout is easily changeable and configurable.

### Model

Finally, the Model is a high level data accessor living inside the UILibrary and directly built on top of the [DJI Mobile SDK](./mobile_sdk_introduction.html). It registers intentions from UILibrary objects and provides the data to them while handling most of the SDK's life cycle events. It is heavily used by widgets today and we recommend you using it in your custom work in the future.






