---
title: Mobile SDK Introduction
date: 2018-09-04
keywords: [sdk introduction, Kinetic Energy, Share Space, Highly Asynchronous]
---

DJI Mobile SDK是一款软件开发套件，旨在让开发者能够访问DJI无人机和手持相机产品的丰富功能。该SDK通过兼顾更底层的功能，诸如飞行稳定，电池管理，信号传输和通信等，简化了应用程序开发的过程。这样，开发者就不需要具备丰富的机器人或嵌入式系统背景知识，而可以专注于DJI产品相关的行业应用开发。

该SDK包括：

* 可导入Android或iOS应用程序的 库/框架，用于访问DJI产品的功能
* 飞行模拟器和可视化工具
* 适用于iOS的调试工具和远程logger
* 示例代码和教程
* 开发者指南和API文档

本文将介绍SDK如何与DJI产品进行连接，SDK提供的功能以及SDK的入门架构。

## 功能概述

开发者可以通过SDK访问许多DJI产品的功能。开发者可以实现自主飞行，控制相机和云台，接收实时视频图传和传感器数据，下载保存好的媒体文件，以及监听其他组件的状态。

### 飞行控制

DJI Mobile SDK提供三种控制无人机飞行的方式：

* **手动操控**: 用户使用遥控器操控无人机，而SDK支持监控实时视频流和传感器数据。
* **虚拟摇杆命令**: SDK支持产生模拟遥控器摇杆的控制指令。
* **智能任务**: 方便，易于实现无人机的高级控制。例如，可以通过航点任务，让无人机按预定义的飞行路径飞行。

虚拟摇杆命令和智能任务允许对DJI无人机进行简单而功能强大的自主飞行控制。

### 相机

相机和云台的功能都支持编程调用, 例如:

* **相机模式**: 视频和静态图像拍摄
* **曝光**: 快门，ISO，光圈和曝光补偿均支持定制，以实现最大的灵活性
* **图像参数**: 屏幕长宽比，对比度，色相，清晰度，饱和度和滤镜
* **视频参数**: 分辨率和帧频
* **方向**: 使用云台时，相机的朝向和运动可以自动控制

### 实时视频流

开发者可以通过DJI Mobile SDK获取无人机主摄像头的实时视频流。即使摄像头正在将图像或视频捕获到存储介质中，也可以获取实时视频流。

### 传感器数据

开发者可以通过SDK获得丰富的传感器数据。GPS位置，指南针，气压计，飞行速度和海拔高度都是通过Mobile SDK获取的一些传感器数据，频率最高可达10 Hz。

### 下载媒体文件

开发者通过DJI Mobile SDK可以查看和下载保存在相机存储介质（SD卡或固态硬盘）中的照片和视频。预览图和完整的图像数据都可以被访问。

### 遥控器，电池 和 无线链路

遥控器，电池和无线链路都可以通过SDK进行访问。通常，这些组件会提供相关的状态信息，但开发者也可以对它们进行一些控制。

## 与其他SDK的差异

大多数iOS和Android应用程序会对数据进行创建，处理或者可视化。但是，使用DJI Mobile SDK的应用程序可以与用户周围的世界进行交互，因此会有根本性的不同。

* **动能**: 一架质量为几公斤，移动速度可达20 m / s的无人机，尽管可以以编程方式更改其位置的功能非常强大，但这也意味着应用程序有可能会对其控制的产品或产品所处的环境造成损坏。
* **共享空间**: DJI无人机会在与其他人，建筑物以及无人机的共享空间中飞行移动。尽管DJI提供了地理围栏系统，以防止无人机进入敏感区域，开发者和用户仍必须了解无人机所处环境的当地和联邦法规。
* **高度异步**: 在充满挑战的无线环境中，无线连接可能会出现无法预测的情况。有时，传输一条命令可能要花费数百毫秒的时间（假设曾经执行过）。尽管许多开发者都熟悉网络中的异步编程技术，但是当无人机机器系统无法进行命令传输时，它在物理世界中可能会出现出乎意料的行为。

作为开发者，不可能很好对用户进行无人机操控的环境进行预测或者以编程方式评估。一个轻松的操作，在开放环境中很容易，但是在狭窄的环境中会变得很困难。
在开放环境中轻松操作可能会在狭窄的空间中难以实现。周围环境是动态的，有时安全，有时则不是。因此，开发人员和用户都必须了解产品以及控制改产品的应用程序的功能和局限性，这一点很重要。

## 连接应用程序和产品

下图说明了DJI Mobile SDK如何与移动应用程序进行融合以及如何与DJI飞行器进行连接。

 <html><img src="../../images/mobile-sdk-introduction/SDKBlockDiagram.png"></html>

>
> 对于手持摄像机产品，遥控器已替换为手持控制器，并且没有飞行器或其他无线链路。
>

移动应用程序由DJI Mobile SDK，平台SDK（iOS或Android）构建而成，并在移动设备（Apple iPhone，iPad，Nexus手机，Nexus平板电脑等）上运行。

移动设备可以通过WiFi无线连接到DJI产品上，也可以通过USB线缆连接到DJI产品上。对于无人机产品来说，移动设备连接到遥控器上，遥控器再通过另一个无线链路无线连接到无人机上。每款产品的详细连接如下所示。

<html>

<table class="table-pictures">
  <tr>
    <td><img src="../../images/mobile-sdk-introduction/ConnectionUSB.png"></td>
    <td><img src="../../images/mobile-sdk-introduction/ConnectionWiFi.png"></td>
        <td><img src="../../images/mobile-sdk-introduction/ConnectionOsmo.png"></td>
  </tr>
  <tr valign="top">
    <td><font color="#52545A" align="center"><p>Phantom 4 </br>Phantom 4 Professional </br> Phantom 3 Professional </br> Phantom 3 Advanced </br> Inspire 1 </br> Inspire 1 Pro/Raw </br> Inspire 2 </br> Matrice 100 </br> Matrice 600 </br> Matrice 600 Pro </br> Mavic 2 Pro </br> Mavic 2 Zoom </br> Mavic Pro </br> Mavic Air</p></td>
    <td><font color="#52545A" align="center"><p>Phantom 3 4K </br> Phantom 3 Standard <br>Spark</p></td>
    <td><font color="#52545A" align="center"><p>Osmo </br>Osmo Mobile</br>Osmo +</br>Mavic Pro</br>Mavic Air</br>Spark</p></td>
  </tr>

</table>
</html>

因此，根据产品型号的不同，DJI Mobile SDK向无人机发送命令时，该命令可能会经过多个无线链接或者线缆连接。
