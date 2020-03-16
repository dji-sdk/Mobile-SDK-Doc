---
title: 运行示例代码
date: 2020-03-14
keywords: [quick start, generate app key, bundle id, app key, register, run sample code, run sample application, Objective C, Swift, USB connection procedure, WiFi connection procedure]
---

为了更好地学习如何入门DJI iOS Mobile SDK开发，请查看<a href="http://www.djivideos.com/video_play/7fefabf9-b8c6-483c-be3d-de1858c48fe8" class="fancybox fancybox.iframe">入门视频</a>.

## 注册成为DJI开发者

您可以点击<a href="https://account.dji.com/register?appId=dji_sdk&backUrl=https%3A%2F%2Fdeveloper.dji.com%2Fuser&locale=en_US" target="_blank">这里</a>注册成为DJI开发者。

在注册过程中，需要您提供电子邮件信息和信用卡或手机号码用于注册验证。您所提供的任何信用卡信息将仅用于验证，不会收取任何费用。

本指南假定您使用 Xcode 7.3 以及 Android Studio 2.1.1 以上版本。

## 生成 App Key

每个应用程序都需要一个唯一的应用程序密钥(App Key)来初始化SDK。

要创建一个应用程序App Key:

请访问DJI开发者网站的 <a href="http://developer.dji.com/en/user/apps" target="_blank">开发者中心</a>

* 选择左侧栏的 "应用 "。
* 选择右侧的 “创建应用” 按钮。
* 输入应用程序的名称, 开发平台, Package Name, 分类和描述信息。
* 您会收到一封应用程序激活邮件，以完成App Key的生成。
* 您可以在开发者中心中找到App Key，复制粘贴到应用程序配置中。

## iOS 示例代码

### iOS 示例代码配置

下载或者克隆 Github上的 iOS 示例代码工程: <a href="https://github.com/dji-sdk/Mobile-SDK-iOS" target="_blank">https://github.com/dji-sdk/Mobile-SDK-iOS</a>.

该示例代码包含一个 Objective C 示例项目和一个 Swift 示例项目.

该示例代码已整合了 [DJI iOS SDK CocoaPods](https://cocoapods.org/pods/DJI-SDK-iOS) - 下载项目后，请按照以下步骤使用CocoaPods安装好 DJISDK.framework:

**1.** 安装CocoaPods

打开终端并切换到下载项目的目录路径，输入以下命令进行安装：

~~~
sudo gem install cocoapods
~~~

该安装过程可能需要耗时较长时间，请稍候。有关进一步的安装说明，请参阅[本指南](https://guides.cocoapods.org/using/getting-started.html#getting-started).

**2.** 在项目中使用Cocoapods安装SDK

在**ObjcSampleCode** 和 **SwiftSampleCode** 路径下运行以下命令:

~~~
pod install
~~~

如果安装成功，可以看到以下类似信息：

~~~
Analyzing dependencies
Downloading dependencies
Installing DJI-SDK-iOS (4.11.1)
Installing DJIWidget (1.6.1)
Generating Pods project
Integrating client project

[!] Please close any current Xcode sessions and use `DJISdkDemo.xcworkspace` for this project from now on.
Pod installation complete! There is 1 dependency from the Podfile and 1 total pod
installed.
~~~

> **Note**: 如果你在pod install的过程中看到 "Unable to satisfy the following requirements" 提示, 请运行以下命令更新你的pod仓库，然后再次安装pod:
>
~~~
 pod repo update
 pod install
~~~

#### Objective C App Key 配置

导航到 **ObjcSampleCode** 文件夹，然后用Xcode打开 **DJISdkDemo.xcworkspace** 工程.

* 修改 <a href="http://developer.dji.com/en/user/apps/ios-configuration" target="_blank">Bundle Identifier</a> 的值为一个唯一识别码，并用它来生成一个[App Key](#generate-an-app-key)。

* 将生成好的App Key 字符串粘贴到Xcode工程的 **info.plist** 文件下的 `DJISDKAppKey` 字符串:

![appKeyInPlist](../../images/quick-start/appKeyInPlist.png)

#### Swift App Key 配置

导航到 **DJISDKSwiftDemo** 文件夹并用Xcode打开 **DJISDKSwiftDemo.xcodeproj** 工程.

* 修改 <a href="http://developer.dji.com/en/user/apps/ios-configuration" target="_blank">Bundle Identifier</a> 的值为一个唯一识别码，并用它来生成一个[App Key](#generate-an-app-key)。

* 将生成好的 App Key 字符串粘贴到Xcode工程的 **info.plist** 文件下的 `DJISDKAppKey` 字符串，和Objective C App Key配置步骤一样。

## Android 示例代码

Android SDK已经包含在项目中，因此无需下载即可直接运行Android 示例代码工程。

### Android 示例代码配置

下载或者克隆Github上的Android示例代码工程: <a href="https://github.com/dji-sdk/Mobile-SDK-Android" target="_blank">https://github.com/dji-sdk/Mobile-SDK-Android</a>.

在Android Studio中打开项目工程，将生成的[App Key](#generate-an-app-key)字符串粘贴到 "AndroidManifest.xml" 文件中b "com.dji.sdk.API_KEY" meda-data element下的 `android:value`.

~~~xml
<!--
    ADD API_KEY HERE and make sure you
    are connected to the Internet before
    the app is launched
-->
<meta-data
    android:name="com.dji.sdk.API_KEY"
    android:value="" />
~~~

## 运行示例代码

将示例代码编译安装到Android或iOS移动设备中。然后可以将移动设备连接到DJI产品上运行示例应用。

对于使用Lightbridge 作为遥控器和无人机之间无线链接的无人机，移动设备需要通过USB接口连接到产品上。

对于将WiFi用作无线链接的无人机或产品，移动设备需要通过WiFi连接到产品上。

#### USB 连接步骤

_Mavic 2系列, Mavic Pro, Phantom 4, Phantom 4 Professional, Inspire series, Phantom 3 Professional, Phantom 3 Advanced, M100, M600, M600 Pro:_

打开遥控器。

* 打开无人机和遥控器电源，等待它们连接上。
* 使用 **Lightning**（iOS）或 **USB**（Android）线将iOS / Android移动设备连接到遥控器上。
* 在移动设备上运行示例应用。

> **注意:**
>
> 如果您使用的是Android设备，在测试示例应用之前，请确保您的DJI遥控器支持<a href="https://source.android.com/devices/accessories/protocol.html" target="_blank">AOA</a>。您可以将DJI遥控器升级到最新固件, 并检查将Android设备连接到遥控器时，以下类似对话框是否会弹出：
>
> ![dialog](../../images/quick-start/android_dialog.png)
>
> 想了解如何更改USB accessory的默认应用，请查看以下两个常见问题解答：[Android 设备](../faq/index.html#How-do-I-reset-the-default-app-behavior-for-a-USB-Accessory-DJI-Product-on-Android-devices), [Samsung 设备](../faq/index.html#How-do-I-reset-the-default-app-behavior-for-a-USB-Accessory-DJI-Product-on-Samsung-devices).
>

#### WiFi 连接步骤

_Phantom 3 Standard, Phantom 3 4K, Spark:_

启动遥控器。

* 将移动设备连接到由遥控器创建的WiFi网络上。
* 打开无人机电源，然后等待遥控器与无人机连上。
* 运行移动设备上的示例应用。

_Osmo Series, Mavic Pro, Spark:_

启动产品（Osmo 或者 无人机)。

* 将移动设备连接到产品创建的WiFi网络上。
* 运行移动设备上的示例应用。
