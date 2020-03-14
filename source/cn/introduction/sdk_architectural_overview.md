---
title: SDK 架构体系概览
date: 2020-03-14
keywords: [sdk architecture, hierarchy]
---

MSDK的体系结构被设计为高度可扩展的，其中使用了抽象产品类和组件类，以便应用程序可以使用相同的代码控制不同的产品。对于一些没法在不同产品中保持一致性的功能可以在运行时被查询调用，对于一些能保持一致性的功能则直接可以工作了。

例如，Phantom和Inspire系列产品的绝大多数功能是一致的。因此，为适配Phantom 4而编写的应用程序，除Inspire 1的一些独特功能外，将可以直接在Inspire 1机型上使用。

这也意味着当新产品发布时，就已经可以与现有的应用程序一起使用了（需要使用支持该新产品的最新SDK）。新产品中的任何新功能都需要添加到应用程序中，但是所有现有功能都不需要做修改了。

## 层级架构

移动应用程序一般通过下图所示的几个主要类来访问DJI Mobile SDK：

<html><img src="../../images/sdk-architectural-overview/Architecture.png"></html>

* **SDK Manager**: 管理SDK的注册，产品连接并提供对产品的访问权限。
* **Product**: 飞行器或者手持产品类具有基本的产品属性，并包含了主要的产品组件。
* **Component**: 组件类描述了云台，相机，飞行控制器，遥控器和无线链路等。这些类提供了组件控制，状态信息并且包含子组件。
* **Mission**: 任务类描述了不同智能任务（例如Waypoint和ActiveTrack任务）并且保留了它们的设置属性以及状态信息。
* **Mission Control**: 任务控制负责执行智能任务。单个智能任务可以通过专门的mission operator来运行，一系列的任务和动作还可以使用Timeline来连续运行。

## 飞行器类产品

关于飞行器产品类的详细说明如下。飞行器产品包含许多组件，而该组件又包含许多子组件，当移动设备通过遥控器连接到飞行器时（如果SDK注册成功), 所有这些组件都可以访问了。如果遥控器和飞行器之间的连接丢失了，那么遥控器对象还会保留（如果移动设备仍连接着遥控器），而飞行器产品和它上面的所有剩余组件将会被置为空。

<html><img src="../../images/sdk-architectural-overview/SDKAircraftArchitecture.png"></html>

## 手持类产品

与飞行器相比，手持相机产品更简单并且包含更少的组件。共享组件的处理方式与在飞行器上相同，因此用来控制摄像机的任何代码都可以在飞行器和手持产品上使用。

<html><img src="../../images/sdk-architectural-overview/SDKHandheldArchitecture.png"></html>

## 智能任务

智能任务可以用于轻松实现飞行自动化。有关更多详细信息，请查看 [智能任务](./component-guide-missions.html) 部分。所有智能任务都继承自DJIMission，因此都可以由Mission Control来执行处理。

<html><img src="../../images/sdk-architectural-overview/SDKMissionArchitecture.png"></html>
