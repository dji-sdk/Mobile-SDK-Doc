---
title: Camera
date: 2016-06-24
keywords:[Thermal camera]
---

## Introduction

Similar to visible light cameras, thermal cameras can capture photos and videos of a scene. 

## Thermal

  The following features supported only by thermal imaging cameras.

#### Scene Modes

  Using scene option to instantly enhance the image. In all modes except Manual and User modes, the DDE, ACE, SSO, brightness and contrast are set automatically to obtain the best result.
  In User modes, the DDE, brightness and contrast are set automatically to obtain the best results. Any settings that are made in these modes are retained if the scene is changed.
  In Manual mode, DDE, ACE, SSO, brightness and contrast are set manually.

#### Isotherms

  Isotherms can be used to highlight specific temperature rages. When it's enabled, only 128 values (0-127) are mapped linearly to temperature. Then three bands 128-175, 176-223 and 224-255 can be mapped to user defined temperatures to highlight them to the user. Using some of the false colour palettes (like RainbowIso) results in a thermal image that is grey scale except for three specific bands highlighted by either reds, blues or greens.
  
  Setting the **unit** of the Isotherm ranges is also available, it could be either Celsius or percent. Different units results in different value ranges for Isotherms. 
  
  Lastly, developers can set the **lower**, **middle** and **upper** threshold values for Isotherm. 
  
  All temperature values above the upper threshold value will use colors 224-255 from the palatte. Temperature values between the middle and upper Isotherm threshold will be displayed with colors 176-223 from the palette. Temperature values between the lower and middle Isotherm threshold will be displayed with colors 128-175 from the palette.

#### Gain Mode

There are three gain modes for Thermal: **Auto**, **Low** and **High**.

For **Auto** gain mode, the camera will automatically select the optimal gain mode according to the temperature range of the image.

For **Low** gain mode, the camera covers a wider temperature range but is less sensitive to temperature differences.

For **High** gain mode, the camera covers a smaller temperature range but is more sensitive to temperature differences.

Low gain mode can be used for scenes with temperatures ranging from -40 to 550 degrees Celsius. For higher contrast, the high gain mode can be used by for temperatures between -25 to 135 degrees Celsius for the 640x512 camera and -25 to 100 degrees Celsius for 324 x 256 camera.

#### TemperatureData

  For the XT, the temperature measurement data is the average of the center four pixels of the image. The thermal imaging camera will only update the temperature if the temperature data is enabled.

#### Digital Zoom Scale

  Thermal imaging camera is available to adjust the digital zoom. 

#### Palletes

Each palette is a unique look-up table that maps 8-bit temperature values to different colors. Different palettes can be used to help the user better visualize temperature contrast or specific temperature bands.

The different colors are used to show various temperatures in the thermal imagery image. The colors are not actually related to wavelengths of light, but rather the grayscale intensity. There are different Palette types for Thermal. It could be WhiteHot, BlackHot, RedHot, GreenHot, etc.

