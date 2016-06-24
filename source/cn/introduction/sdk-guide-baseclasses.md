---
title: Base Product
date: 2016-06-24
---

## Introduction

## Base Product 

### Components

Each DJI Product has various components. In case of aircraft, it can has flight controller, remote controller, camera, gimbal, battery components. For an handheld device, it can also has a handheld controller component too. Each component inherites from the **DJIBaseComponent** class.
It uses an array to store different components of DJI Product.

### Model Names

Each DJIBaseProduct has its model Name, it can be "Inspire 1", "Osmo", "Phantom 3 Professional", etc. You can check the name of the current connected DJI Product by accessing the model name. In case of iOS, you can get the model names list in **DJIAircraft.h** and **DJIHandheld.h** files. In case of Android, you can get the model names list in **DJIBaseProduct.Model** enum. 

### Connectivity Status

In case of aircraft, if the aircraft is out of range or turned off, the connectivity status will change to NOT connected. 

In case of handheld device, if the handheld device's Wi-Fi signal is lost or turn off, or the mobile device disconnected with the handheld device's Wi-Fi, the connectivity status will chagne to NOT connected.

### Firmware Package Version

Get the product's firmware package version. For products except Phantom 4, Internet connection is required and the execution time for this method highly depends on the Internet Status.

## SDK Errors

DJI SDK Errors includes SDK Registration errors, camera errors, flight controller errors, mission errors, etc. Developers can get helps from these error infos when using the SDK.

## DJI Completion Blocks

Every SDK function you call requires a completion block as a parameter, which will be carried out after the aircraft executes the given command(s) or finish the related actions. For some special actions (Like take off, retract landing gear), which will take a peroid of time to finish, the completion block will be called once the actions finish.