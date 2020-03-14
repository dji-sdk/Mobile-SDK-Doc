---
title: UX SDK 简介
date: 2020-03-14
keywords: [UX SDK introduction, UX SDK, widget, panel, default layout, asset swap, widget customization, panel customization]
---

许多使用DJI Mobile SDK来控制DJI产品的应用程序都具有相似的核心功能。它们通常有：

* 显示摄像机的实时图传画面
* 显示产品状态信息（飞行器遥测，电池电量，信号强度等）
* 允许用户查看和更改产品设置
* 具有自动起飞，降落，返航等基本功能。

为了开发应用程序，开发者通常不得不在实现一些独特的应用功能之前，重复开发提供这些通用核心功能模块。

DJI UX SDK提供了具有这些核心功能的UI组件，因此可以加快开发者的开发时间。实际上，如果使用默认的UX SDK组件，开发者可以在不添加额外代码行的情况下，快速创建出类似以下应用程序效果：

![DefaultScreen](../../images/product-introduction/defaultScreen.png)

开发人员可以自由地选择要加入，剔除或者自定义的UX SDK部分。

UX SDK目前支持DJI Mobile SDK v4.0及更高版本。

## 概念概述

UX SDK具有三种主要的UI类型：

* **部件** : 独立的UI元素，可提供状态信息或简单的控制（例如电池电量信息或自动起飞按钮）
* **部件集合** :（仅适用于iOS）彼此相关的小部件的有组织的集合（例如，相机曝光状态）
* **面板** : 具有丰富UI元素（例如相机设置）的复杂菜单和设置视图

所有UI元素无需额外维护就可以简单地在应用程序中实现出来。这些UI元素已经和DJI Mobile SDK绑定在了一起，并且在实例化后更新相关信息。

[Android](http://developer.dji.com/api-reference/android-uilib-api/index.html) 和 [iOS](http://developer.dji.com/api-reference/ios-uilib-api/index.html) UX SDK 的API文档中包含了可用UI元素的完整列表。

## 部件

部件是UX SDK中最简单的组件。它通常代表一个简单的状态元素或提供一个简单的控件。一些部件的示例如下所示:

<html>
<table class="table-pictures">
<tbody>
  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>无人机电池百分比</p></td>
    <td><font style="font-weight:bold" align="center"><p>飞行模式</p></td>
    <td><font style="font-weight:bold" align="center"><p>图传信号强度</p></td>
    <td><font style="font-weight:bold" align="center"><p>返航按钮</p></td>
  </tr>

  <tr>
    <td align="center"><img src="../../images/ux-sdk-introduction/battery.png"></td>
    <td align="center"><img src="../../images/ux-sdk-introduction/flyingMode.png"></td>
    <td align="center"><img src="../../images/ux-sdk-introduction/videoSignal.png"></td>
    <td align="center"><img src="../../images/ux-sdk-introduction/returnHome.png"></td>
  </tr>
</tbody>
</table>
</html>

### 部件自定义

可以通过替换资源或子类化部件来定制部件。

#### 替换资源

替换资源可保留部件的行为和逻辑不变，但会改变其外观。

您资源尺寸大小和名称必须与现有资源相同，否则UX SDK将无法正确展示出来。如果UXSDK找不到所需的资源，它将在资源的中心位置附近绘制一个小的橙色正方形，以帮助提高可见性。

##### iOS

  1.在[此处](https://github.com/dji-sdk/Mobile-UXSDK-iOS/tree/master/customize-uxsdk-assets) 下载Xcode的asset资源目录（.xcassets）文件
  2.从资源目录文件中删除您要替换的图像文件。请不要删除其他任何文件，包括contents.json。
  3.添加您要使用的图像文件。确保它们具有与原始文件相同的名称 @2x/@3x，位于相同的位置，并且具有相同的大小。
  4.在资源目录文件目录中运行asset-swap.sh脚本。该脚本会输出一个Assets.car文件到执行脚本的文件夹中。
  5.用新生成的Assets.car文件替换DJIUXSDK.framework中的Assets.car文件。
  6.您可能需要清空DerivedData文件夹并重置设备，以使这些更改生效。

  UX SDK将自动获取并使用您的自定义图片文件。

> 注意: 图像文件必须与要替换的原始文件保持相同的名称，大小，@ 2x/@ 3x。 **如果有任何差异, UX SDK可能无法正确绘制出图像。**

<!-- ##### Android

  1. 重命名AAR文件，带zip后缀
  2. 解压AAR文件
  3. 替换以下目录中的资源:
    - res/drawable
    - res/drawable-hdpi-v4
    - res/drawable-mdpi-v4
    - res/drawable-xhdpi-v4
    - res/drawable-xxhdpi-v4
    - res/drawable-xxxhdpi-v4
  4. 压缩该文件，并重命名，替换掉原来的AAR文件
-->

#### 子类化

##### iOS

可以将部件进行子类化，以重写initialize和view update方法进行外观自定义。为了易于定制，每个部件都会将正在使用的基础数据以属性参数的形式公开。
有关更多详细信息，请参考[API 文档](http://developer.dji.com/api-reference/ios-uilib-api/Widgets/AutoExposureLockWidget.html).

##### Android

在Android中，子类化可以完全改变部件的行为和外观。步骤如下：

1.重写`void initView（Context var1，AttributeSet var2，int var3）`并充气/初始化自定义布局。请记住，不要调用 `super.initView()`方法。

2.要获取有关信息更改的更新，请重写命名为 ”onXXXChange” 模式的方法（例如，`BatteryWidget` 中的 `onBatteryPercentageChange(int percentage)` 方法）。每当电池百分比变化时，都会调用此方法。重写此方法将为您提供电池百分比的integer整数值。请记住，**不要调用** `super.initView()` 方法。

3.要执行动作，请使用命名为`performXXXAction`模式的方法。

## 部件集合

部件集合以组织的方式将多个相关的部件组合在一起。它控制部件彼此之间的布局。

开发者也可以创建部件集合，并用于组织已存在的部件。

部件集合目前仅在iOS中使用。一些部件集合的示例如下所示：

<html>
<table class="table-pictures">
<tbody>
  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>状态信息栏部件集合</p></td>
  </tr>

  <tr>
    <td align="center"><img src="../../images/ux-sdk-introduction/statusBarWidgetCollections.png" width=90%></td>
  </tr>
</tbody>
</table>
</html>

## 面板

面板是具有丰富信息和控制能力的更复杂元素集合，例如设置菜单或飞行器状态列表。

面板的示例如下：

<html>

<table class="table-pictures">

  <tr valign="top">
    <td><font style="font-weight:bold" align="center"><p>相机设置面板</p></td>
    <td><font style="font-weight:bold" align="center"><p>相机曝光设置面板</p></td>
    <td><font style="font-weight:bold" align="center"><p>飞行器状态列表</p></td>
  </tr>

  <tr>
    <td align="center"><img src="../../images/ux-sdk-introduction/cameraSettingsPanel.png" width=90%></td>
    <td align="center"><img src="../../images/ux-sdk-introduction/exposureSettingsPanel.png" width=90%></td>
    <td align="center"><img src="../../images/ux-sdk-introduction/preflightChecklistPanel.png" width=90%></td>
  </tr>

</table>
</html>

### 面板自定义

由于面板的复杂性，目前不提供自定义功能。

## 示例代码 & 教程

DJI UX SDK提供了以下示例代码工程:

- [iOS UX SDK Github 示例代码](https://github.com/dji-sdk/Mobile-UXSDK-iOS)

- [Android UX SDK Github 示例代码](https://github.com/dji-sdk/Mobile-UXSDK-Android)

<!-- An iOS UX SDK tutorial is provided as an example on how to use the iOS UX SDK.

- [Creating a Simplified DJI Go app using DJI Mobile UX SDK](TODO)
  -->

## UX SDK 5.0 Public Beta (Github)

- [iOS UX SDK Public Beta](https://github.com/dji-sdk/Mobile-UXSDK-Beta-iOS)

- [Android UX SDK Public Beta](https://github.com/dji-sdk/Mobile-UXSDK-Beta-Android)
