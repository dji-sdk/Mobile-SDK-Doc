---
title: SDK Manager
date: 2016-06-24
keywords: [SDK Manager, registration]
---

## Introduction

Application registration to use the DJI Mobile SDK, product connection, debugging and logging services are handled through the SDK manager class `DJISDKManager`.

The class also provides the instance of the product connected to the mobile device, from which control, state and components can be accessed.

## Registration

Applications need permission to initialize the DJI Mobile SDK. During application development, a unique application key (App Key) needs to be [generated](../quick-start/index.html#generate-an-app-key) and included in the source code. When the application is first run, this key will be sent to a DJI server to validate the application can use the SDK. If successful, the result will be locally cached on the mobile device. Every subsequent initialization of the application on the mobile device will check the local cache if there is no connection to the internet.

Therefore, the first time an application is run on a mobile device, the mobile device will need to have an internet connection. After that, an internet connection will not be required to initialize the DJI Mobile SDK, but connectivity will be used when available to confirm the application still has authorization to control DJI products.

This process is called registration, and is made available through the SDK Manager. 

> **Note**: Some DJI products use WiFi as the connection between the mobile device and the product. The product is the access point and the mobile device is the client, which means no internet connectivity will exist through the WiFi connection for the mobile device. If using such a product, the first time the application is run should either be when the product is not connected to the mobile device, or the mobile device will need to have a cellular data connection. After the first successful registration, connectivity is not a requirement.

## Product Connection

Once registered, the application can be connected to the product. The class method `startConnectionToProduct` can be used to initiate the connection between application and product assuming the mobile device is already physically connected to the product (through either USB or WiFi). 

The SDK manager can close the connection when desired. For iOS, the SDK manager can automatically close the connection when the application enters the background if desired.

Once connected, the SDK manager provides an instance to the connected product. The product instance can be used to control and receive state information about the components of the product.

## Debug Mode and Bridge App

iOS development requires the mobile device be connected to Xcode directly through USB to use native debugging and profiling tools. As some DJI products use the USB port to connect to the remote controller, this can make application development difficult.

DJI provides a Bridge App to resolve this. Debug mode can be turned on in the SDK Manager which will reroute all USB communication to WiFi. A second mobile device running the bridge app connects to the remote controller and relays WiFi communication. Alternatively, the iOS simulator can connect to the Bridge App over WiFi if only one mobile device is available.

The Bridge App is available to download <a href="https://github.com/dji-sdk/iOS-Bridge-App" target="_blank">here</a> and a tutorial for using the Bridge App is [here](../ios-tutorials/BridgeAppDemo.html).

## Remote Logging

The SDK Manager also allows iOS applications to log remotely. Field testing is critical in application development, and remote logging allows simple ways to log events in real time to a remote server.

A tutorial for using remote logging can be found [here](../ios-tutorials/RemoteLoggerDemo.html).

