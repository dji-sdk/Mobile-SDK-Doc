---
title: Hardware Introduction
date: 2016-06-24
keywords: [component, propellor, sensor, product comparison]
---

DJI produces small, highly capable, remotely controlled aircraft as well as hand held cameras and stabilizers perfect for both consumer and commercial applications. The products are very accessible being easy to use and affordable, and have a quality and feature set unmatched in the industry.

### Aircraft

DJI has a range of multi-rotor aircraft that can be automated with the Mobile SDK including the <a href="http://www.dji.com/products/phantom" target="_blank">Phantom series</a>, <a href="http://www.dji.com/products/inspire" target="_blank">Inspire series</a>, <a href="http://www.dji.com/product/matrice100" target="_blank">Matrice 100</a> and <a href="http://www.dji.com/product/matrice600" target="_blank">Matrice 600</a>.

One of the key features of DJI aircraft is the camera's ability to stay horizontal no matter how the aircraft is flying. The camera is mounted on a gimbal, which actively compensates for any aircraft rotation, producing clear, beautiful images and videos.

There are many DJI aircraft to choose from that provide a range of features, performance, size and price. Specific metrics developers and users should be aware of when they consider an aircraft include:

* Flight time
* Size and weight
* Camera specifications (image quality and movement control)
* Swappable cameras
* Obstacle avoidance
* Customizable payloads
* Maximum service ceiling
* Available accessories
* Remote controller features
* Price

### Handheld Camera

DJI's handheld camera <a href="http://www.dji.com/product/osmo" target="_blank"> Osmo </a> allows users to take smooth, professional videos when the user is moving by integrating DJI's aircraft camera stabilization gimbal technology onto an easy to carry handle.

### Stand Alone Components

Two components of the aircraft (flight controller, wireless link) can be used on DJI or third party airframes. Some of these components are supported to a limited degree in the DJI Mobile SDK.

### Accessories

DJI aircraft and handheld cameras are compatible with a number of DJI accessories. Some of these accessories are also supported by the DJI Mobile SDK, meaning the mobile device will be able to interact with the accessory to some degree.

## Components

Before doing a detailed product comparison it is useful to understand the components of a product and their function.

All products comprise component modules that provide an important feature or function. An introduction to typical components is below with more details in the [Component Guide](./component-guide-flightController.html).

![ComponentsAircraft](../../images/product-introduction/ComponentsAircraft.png)

#### Propulsion

Motor mounted propellors provide vertical thrust. The vertical thrust can be adjusted at each motor to allow the aircraft to hover, rotate, ascend, descend or fly horizontally.

#### Sensors

DJI aircraft have a large number of sensors including accelerometers, gyroscopes, compasses, barometers, ultrasonic sensors, cameras and satellite positioning systems. These sensors are used to determine the current and predict the future state of the aircraft and the environment around it.

#### Flight Controller

The Flight Controller is an onboard computer that couples control information from the pilot with sensor information to adjust the thrust at each propellor and fly the aircraft as desired.

#### Camera

The camera can record image and video data locally or transfer it wirelessly to an Android or iOS mobile device. Wireless transfer includes the option of a live video stream from the camera. Camera exposure and settings are highly customizable allowing capture of the perfect shot.

#### Gimbal

The gimbal holds the camera and can rotate it around three axes. The rotation can be used to both control the direction the camera points, and provide rotational stabilization when the aircraft is not horizontal. The gimbal is mounted on a damped plate, meaning the camera is both stabilized from lateral vibrations and rotational movement.

#### Vision Obstacle Avoidance & Positioning

Advanced sensors help the aircraft perceive the world around it. Stereo cameras are used to detect obstacles near the product. Downward facing cameras and ultrasonic sensors are used to determine relative ground position providing accurate velocity estimates and stable hover position in GPS denied environments (like indoors).

#### Smart Battery

Smart batteries provide the energy required to run the system. Together with the flight controller, the smart battery can estimate remaining flight time and provide warnings when low battery thresholds are crossed. Batteries are easily swapped between flights, extending product use considerably.

#### Remote Controller

The remote controller provides control sticks, buttons, and wheels that give control of the aircraft flight, camera and gimbal. The remote controller maintains a wireless link with the aircraft with some products having up to a 5km range in ideal environments. The **Flight Mode Switch** on the remote controller can be used to switch between manual and automated flight.

![ComponentsRemoteController](../../images/product-introduction/ComponentsRemoteController.png)

#### Mobile Device

An Android or iOS device can be connected to the remote controller through either USB or WiFi to give an augmented flight experience showing the live camera feed, and showing aircraft state information. Using the Mobile SDK, the mobile device can also be used to control the aircraft.

#### Handheld Controller

The handheld controller provides a joystick and buttons for that give control of the camera and gimbal. The handheld controller connects to the mobile device through a WiFi access point inside the handle.

![ComponentsHandheld](../../images/product-introduction/ComponentsHandheld.png)

## Supported Products

Below is a table listing the aircraft, handheld cameras and stand alone components supported by the DJI Mobile SDK.

<html><table class="table-product-accessories">
  <thead>
    <tr>
      <th colspan="4">Products and Accessories</th>
    </tr>
    <tr>
      <th>Category</th>
      <th>Product</th>
      <th>Cameras</th>
      <th>SDK Supported Accessories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="9">Aircraft</th>
      <td>Phantom 4</td>
      <td>Fixed</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Professional</td>
      <td>Fixed</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 4K</td>
      <td>Fixed</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Advanced</td>
      <td>Fixed</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Standard</td>
      <td>Fixed</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Inspire 1</td>
      <td>X3, X5, X5R, XT</td>        
      <td> Focus </td>
    </tr>
    <tr>
      <td>Inspire 1 Pro/Raw</td>
      <td>X3, X5, X5R, XT</td>        
      <td> Focus </td>
    </tr>
    <tr>
      <td>Matrice 100</td>
      <td>X3, X5, X5R, XT</td>        
      <td> N1 Video Encoder, Focus </td>
    </tr>
    <tr>
      <td>Matrice 600</td>
      <td>X3, X5, X5R, XT</td>        
      <td> DRTK, Ronin MX, N1 Video Encoder, Focus </td>
    </tr>
    <tr>
      <td>Handheld Camera</th>
      <td>Osmo</td>
      <td>X3, X5</td>        
      <td> — </td>
    </tr>
    <tr>
      <td rowspan="1">Components</th>
      <td>Lightbridge 2 with A2</td>
      <td> — </td>        
      <td> — </td>
    </tr>
  </tbody>
</table></html>

Detailed specifications are listed on each product's webpage **specs** section at <a href="http://www.dji.com" target="_blank">www.dji.com</a>.

## Product Comparison

### Aircraft Comparison

Some defining product features that distinguish aircraft series are:

### Phantom

* Small and portable
* Easiest to use
* Phantom 4 includes:
    * Built in obstacle avoidance
    * Advanced vision features like being able to track a moving target selected by the user.
    * A **sport flight mode** for a more dynamic flying experience

### Inspire

* Swappable cameras
* Cameras with larger sensors, aperture and focus control
* Thermal camera available
* Gimbal can rotate camera completely through the horizontal (640&deg;)
* Landing gear can raise out of the camera's field of view
 ![InspireRaised](../../images/product-introduction/inspire_landingGearRaised.gif)
* Remote controller has embedded GPS

### Matrice

* Industrial and developer platform
* Highly customizable, with up to 6 kg payloads supported
* Payloads can communicate with the flight controller directly through a serial port and the DJI Onboard SDK
* Mechanical mounting features
* Can use same cameras as Inspire series
* Additional accessories including

    * <a href="http://www.dji.com/product/matrice600" target="_blank"> DRTK </a> - cm precision positioning
    * <a href="http://www.dji.com/product/guidance" target="_blank"> Guidance </a> - 5 direction stereo camera and ultrasonic sensor module
    * <a href="http://www.dji.com/product/ronin-mx" target="_blank"> Ronin MX </a> - Gimbal that can support custom payloads up to 4.5 kg

Aircraft comparison can be difficult due to the large selection of products, features and functionality. A summarized product comparison table is below to introduce the differences between products.

<html><table class="table-product-comparison">
 <thead>
  <tr>
    <th colspan="10">Product Comparison</th>
  </tr>
 </thead>
 <tbody>
 <tr>
    <td> </th>
   <td rowspan="2" width=12%> Phantom 4</th>
     <td colspan="4">Phantom 3</th>
     <td colspan="2">Inspire 1</th>
     <td colspan="2">Matrice </th>
 </tr>
 <tr>
   <td width=10%> </td>
   <td width=10%> Professional </td>
   <td width=10%> 4K </td>
   <td width=10%> Advanced </td>
   <td width=10%> Standard </td>
   <td width=10%> Standard </td>
   <td width=10%>  Pro/RAW </td>
   <td width=10%> 100 </td>
   <td width=10%> 600 </td>
</tr>
<tr>
   <td> <p> Propellors </p></td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>4 </td>
   <td>6 </td>
</tr>
<tr>
   <td> <p> Flight Time </br><font color="#BBBBBB" size=1>s </p></td> </td>
   <td>28 </td>
   <td>23 </td>
   <td>25 </td>
   <td>23 </td>
   <td>25 </td>
   <td>18* </td>
   <td>15* </td>
   <td>16-40* </td>
   <td>18-40* </td>
</tr>
<tr>
   <td> <p> Max Speed </br><font color="#BBBBBB" size=1>m/s </p></td> </td>
   <td>20 </td>
   <td>16 </td>
   <td>16 </td>
   <td>16 </td>
   <td>16 </td>
   <td>22 </td>
   <td>18 </td>
   <td>22 </td>
   <td>18 </td>
</tr>
<tr>
   <td> <p> Camera </p></td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>X3, X5, X5R, XT </td>
   <td>X3, X5, X5R, XT </td>
   <td>X3, X5, X5R, XT </td>
   <td>X3, X5, X5R, XT, Custom with Ronin MX </td>
</tr>
<tr>
   <td> <p> Wireless Range </br> US / EU </br><font color="#BBBBBB" size=1>km </p></td> </td>
   <td>5 / 3.1 </td>
   <td>5 / 3.1 </td>
   <td>1.2 / 0.5 </td>
   <td>5 / 3.1 </td>
   <td>1 / 0.5 </td>
   <td>5 / 3.1 </td>
   <td>5 / 3.1 </td>
   <td>5 / 3.1 </td>
   <td>5 / 3.1 </td>
</tr>
<tr>
   <td> <p> Obstacle Avoidance </p> </td>
   <td>Front </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>With Guidance </td>
   <td>With Guidance </td>
</tr>
<tr>
   <td> <p> Vision Positioning </p> </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>- </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>With Guidance </td>
   <td>With Guidance </td>
</tr>
<tr>
   <td> <p> Max Take-off Mass </br><font color="#BBBBBB" size=1>g</p></td> </td>
   <td>1380 </td>
   <td>1280 </td>
   <td>1280 </td>
   <td>1280 </td>
   <td>1216 </td>
   <td>3000 </td>
   <td>3500 </td>
   <td>3600 </td>
   <td>15100 </td>
</tr>
<tr>
   <td> <p> Max Dimension(Without Propellor) </br><font color="#BBBBBB" size=1>mm </p></td> </td>
   <td>350 </td>
   <td>350 </td>
   <td>350 </td>
   <td>350 </td>
   <td>350 </td>
   <td>581 </td>
   <td>581 </td>
   <td>650 </td>
   <td>1133 </td>
</tr>
<tr>
   <td> <p> Max Service Ceiling </br><font color="#BBBBBB" size=1>m </p></td> </td>
   <td>6000 </td>
   <td>6000 </td>
   <td>6000 </td>
   <td>6000 </td>
   <td>6000 </td>
   <td>4500 </td>
   <td>4500 </td>
   <td>4500 </td>
   <td>2500 </td>
</tr>
<tr>
   <td> <p> Landing Gear </p></td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Fixed </td>
   <td>Moveable </td>
   <td>Moveable </td>
   <td>Fixed </td>
   <td>Moveable </td>
</tr>
<tr>
   <td> <p> Max Batteries </p></td>
   <td>1 </td>
   <td>1 </td>
   <td>1 </td>
   <td>1 </td>
   <td>1 </td>
   <td>1 </td>
   <td>1 </td>
   <td>2 </td>
   <td>6 </td>
</tr>
<tr>
   <td> <p> Custom Payload </br><font color="#BBBBBB" size=1>g </p></td> </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>1000 </td>
   <td>6000 </td>
</tr>
<tr>
   <td><p> Compatible Accessories </p></td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>Guidance, Manifold </td>
   <td>Guidance, Manifold, DRTK, Ronin MX </td>
</tr>
</table>
</html>

> Note:
>
> 1. See **Payload** and **Flight Time** table for more information
> 2. Difference between Inspire vs Inspire Pro:
>  - Inspire Pro has more powerful propulsion making it able to lift heavier loads
>  - Inspire Pro comes with a gimbal mounting bracket able to support the X5 and X5R
>  - Inspire Pro comes with the X5 as default configuration
>

### Flight Time

Product flight time is determined by total aircraft mass and the available stored (battery) energy on the aircraft. The available energy is determined by the number of batteries, the battery energy density and the maximum mass the propulsion system can support.

#### Battery Energy Density

DJI provides two series of batteries for the Inspire and Matrice product lines. The TB47 series is the default 99 Wh battery that comes with all aircraft. The TB48 series is a 130 Wh battery. While the TB48 battery has a 10-15% higher energy density, it is less practical as batteries >100 Wh often have transport restrictions.

Using a battery with a higher energy density will always translate to longer flight time if all else is kept constant. However, as the TB48 battery is a little heavier than the TB47 battery, it is important to remember that its use will restrict the maximum custom payload. This is particularly noticeable on the Matrice series of products when using more than one battery.

#### Using More Batteries

Increasing the number of batteries on a product will:

* Increase the available energy for flight (increasing flight time)
* Increase the aircraft mass and therefore:
     * Decrease flight time
     * Decrease the allowable additional payload

#### Flight Time Comparison

To help understand the potential functionality and flight time of different aircraft configurations, a detailed summary of payload and flight times is below:

<html><table class="table-flight-time" id="t03">
 <thead>
  <tr>
    <th colspan="9">Payload & Flight Time</th>
  </tr>
  <tr>
    <td width=20%>Product</td>
    <td width=10%>Camera</td>
    <td width=10%>Battery Configuration</td>
    <td width=10%>Aircraft Mass</td>
    <td width=10%>Battery Mass</td>
    <td width=10%>Camera Mass</td>
    <td width=10%>Payload</td>
    <td width=10%>Take-off Mass</td>
    <td width=10%>Flight Time</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td><p><font size=1 color="#BBBBBB">grams</p></td>
    <td><p><font size=1 color="#BBBBBB">grams</p></td>
    <td><p><font size=1 color="#BBBBBB">grams</p></td>
    <td><p><font size=1 color="#BBBBBB">grams</p></td>
    <td><p><font size=1 color="#BBBBBB">grams</p></td>
    <td><p><font size=1 color="#BBBBBB">min</p></td>
  </tr>
 </thead>
 <tbody>
  <tr>
    <td rowspan="3">
    Inspire 1
    <p><font size="1">Max Take-off Mass: 3000g </br>Compatible with XT, X3</p>
    </td>
    <td >X3</td>
    <td>TB47</td>        
    <td>2118</td>        
    <td>570</td>        
    <td>247</td>        
    <td>0</td>        
    <td>2935</td>        
    <td>18</td>        
  </tr>
  <tr>
    <td>X3</td>        
    <td>TB48</td>        
    <td>2118</td>        
    <td>670</td>        
    <td>247</td>        
    <td>0</td>        
    <td>3035</td>        
    <td>21</td>            
  </tr>
  <tr>
    <td>XT</td>
    <td>TB48</td>        
    <td>2118</td>        
    <td>670</td>        
    <td>270</td>        
    <td>0</td>        
    <td>3058</td>        
    <td>21</td>            
  </tr>
  <tr>
    <td rowspan="4">
    Inspire 1 Pro/Raw
    <p><font size="1">Max Take-off Mass: 3500g</br>Compatible with XT, X3, X5, X5R</p>
    </td>
    <td>X5</td>
    <td>TB47</td>        
    <td>2300</td>        
    <td>570</td>        
    <td>526</td>        
    <td>0</td>        
    <td>3396</td>        
    <td>15</td>        
  </tr>
  <tr>
    <td>X5</td>
    <td>TB48</td>        
    <td>2300</td>        
    <td>670</td>        
    <td>526</td>        
    <td>0</td>        
    <td>3496</td>        
    <td>18</td>        
  </tr>
  <tr>
    <td>X5R</td>
    <td>TB48</td>        
    <td>2300</td>        
    <td>670</td>        
    <td>583</td>        
    <td>0</td>        
    <td>3553</td>        
    <td>18</td>        
  </tr>
  <tr>
    <td>XT</td>
    <td>TB48</td>        
    <td>2300</td>        
    <td>670</td>        
    <td>270</td>        
    <td>0</td>        
    <td>3240</td>        
    <td>20</td>        
  </tr>
  <tr>
    <td rowspan="11">
    Matrice 100
    <p><font size="1">Max Take-off Mass: 3600g</br>Compatible with XT, X3, X5, X5R, Guidance, Manifold</p>
    </td>
    <td align= "center">-</td>
    <td>TB47D</td>        
    <td>1755</td>        
    <td>600</td>        
    <td>0</td>        
    <td>0</td>        
    <td>2355</td>        
    <td>22</td>        
  </tr>
  <tr>
    <td align= "center">-</td>
    <td>TB47D</td>        
    <td>1755</td>        
    <td>600</td>        
    <td>0</td>        
    <td>500</td>        
    <td>2855</td>        
    <td>17</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>TB47D</td>        
    <td>1755</td>        
    <td>600</td>        
    <td>0</td>        
    <td>1000</td>        
    <td>3355</td>        
    <td>13</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>TB48D</td>        
    <td>1755</td>        
    <td>676</td>        
    <td>0</td>        
    <td>0</td>        
    <td>2431</td>        
    <td>28</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>TB48D</td>        
    <td>1755</td>        
    <td>676</td>        
    <td>0</td>        
    <td>500</td>        
    <td>2931</td>        
    <td>20</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>TB48D</td>        
    <td>1755</td>        
    <td>676</td>        
    <td>0</td>        
    <td>1000</td>        
    <td>3431</td>        
    <td>16</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>2x TB47D</td>        
    <td>1915</td>        
    <td>1200</td>        
    <td>0</td>        
    <td>0</td>        
    <td>3115</td>        
    <td>33</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>2x TB48D</td>        
    <td>1915</td>        
    <td>1352</td>        
    <td>0</td>        
    <td>0</td>        
    <td>3267</td>        
    <td>40</td>
  </tr>
    <tr>
    <td>X3</td>
    <td>TB47D</td>        
    <td>1755</td>        
    <td>600</td>        
    <td>247</td>        
    <td>0</td>        
    <td>2602</td>        
    <td>19</td>
  </tr>
    <tr>
    <td>X3</td>
    <td>TB48D</td>        
    <td>1755</td>        
    <td>676</td>        
    <td>247</td>        
    <td>0</td>        
    <td>2678</td>        
    <td>23</td>
  </tr>
    <tr>
    <td>X3</td>
    <td>2x TB48D</td>        
    <td>1915</td>        
    <td>1352</td>        
    <td>247</td>        
    <td>0</td>        
    <td>3514</td>        
    <td>33</td>
  </tr>
  <tr>
    <td rowspan="4">
    Matrice 600
    <p><font size="1">Max Take-off Mass: 15100g</br>Compatible with XT, X3, X5, X5R, Guidance, Ronin MX, DRTK, Manifold</p>
    </td>
    <td align= "center">-</td>
    <td>6x TB47S</td>        
    <td>5530</td>        
    <td>3570</td>        
    <td>0</td>        
    <td>0</td>        
    <td>9100</td>        
    <td>35</td>        
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>6x TB47S</td>        
    <td>5530</td>        
    <td>3570</td>        
    <td>0</td>        
    <td>6000</td>        
    <td>15100</td>        
    <td>16</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>6x TB48S</td>        
    <td>5530</td>        
    <td>4080</td>        
    <td>0</td>        
    <td>0</td>        
    <td>9610</td>        
    <td>40</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>6x TB48S</td>        
    <td>5530</td>        
    <td>4080</td>        
    <td>0</td>        
    <td>5500</td>        
    <td>15110</td>        
    <td>18</td>
  </tr>
 </tbody>
</table></html>

### Camera

DJI provides several camera configurations. For the Phantom line of products, the cameras are fixed to the product. For the Inspire and Matrice line of products, cameras can be interchanged (Zenmuse X3, X5, X5R, XT).

The Zenmuse XT is a thermal camera. It's specifications are difficult to compare directly to other cameras, however it is included in the comparison for it's mass for payload calculation. More details on the specifications of the Zenmuse XT can be found <a href="http://www.dji.com/product/zenmuse-xt/info#specs" target="_blank"> here </a>.

<html><table class="table-camera-comparison">
 <thead>
  <tr>
    <th colspan="10">Camera Comparison</th>
  </tr>
 </thead>
 <tbody>
 <tr>
    <td> </th>
   <td rowspan="2" width=12%> Phantom 4</th>
     <td colspan="4">Phantom 3</th>
     <td colspan="4">Zenmuse</th>
 </tr>
 <tr>
   <td width=12%> </td>
   <td width=8%> Professional </td>
   <td width=9%> 4K </td>
   <td width=8%> Advanced </td>
   <td width=8%> Standard </td>
   <td width=8%> X3 </td>
   <td width=8%>  X5 </td>
   <td width=8%> X5R </td>
   <td width=15%> XT </td>
</tr>
<tr>
   <td><p> Sensor Size </p></td>
   <td>1/2.3" </td>
   <td>1/2.3" </td>
   <td>1/2.3" </td>
   <td>1/2.3" </td>
   <td>1/2.3" </td>
   <td>1/2.3" </td>
   <td>4/3" </td>
   <td>4/3" </td>
   <td>NA </td>
</tr>
<tr>
   <td><p> Image Pixels </p></td>
   <td>12 </td>
   <td>12 </td>
   <td>12 </td>
   <td>12 </td>
   <td>12 </td>
   <td>12 </td>
   <td>16 </td>
   <td>16 </td>
   <td>0.32 <p><font color="#BBBBBB" size=1>Depending on Model </p></td> </td>
</tr>
<tr>
   <td><p> Max Video Resolution </p></td>
   <td>4K </td>
   <td>4K </td>
   <td>4K </td>
   <td>2.7K </td>
   <td>2.7K </td>
   <td>4K </td>
   <td>4K </td>
   <td>4K </td>
   <td>640x512 <p><font color="#BBBBBB" size=1>Depending on Model </p></td> </td>
</tr>
<tr>
   <td><p> ISO </p></td>
   <td>100-1600 </td>
   <td>100-1600 </td>
   <td>100-1600 </td>
   <td>100-1600 </td>
   <td>100-1600 </td>
   <td>100-1600 </td>
   <td>100-25600 </td>
   <td>100-25600 </td>
   <td>NA </td>
</tr>
<tr>
   <td><p> Swappable Lens </p></td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>- </td>
</tr>
<tr>
   <td> <p> FOV </br><font color="#BBBBBB" size=1>degrees </p></td> </td>
   <td>94 </td>
   <td>94 </td>
   <td>94 </td>
   <td>94 </td>
   <td>94 </td>
   <td>94 </td>
   <td>72 </td>
   <td>72 </td>
   <td>13-90 <p><font color="#BBBBBB" size=1>Fixed. Depending on lens </p></td> </td>
</tr>
<tr>
   <td> <p> Focal Length </br><font color="#BBBBBB" size=1>mm relative to 35mm sensor </p></td> </td>
   <td>20 </td>
   <td>20 </td>
   <td>20 </td>
   <td>20 </td>
   <td>20 </td>
   <td>20 </td>
   <td>30 </td>
   <td>30 </td>
   <td>NA </td>
</tr>
<tr>
   <td><p> Aperture </p></td>
   <td>f/2.8 </td>
   <td>f/2.8 </td>
   <td>f/2.8 </td>
   <td>f/2.8 </td>
   <td>f/2.8 </td>
   <td>f/2.8 </td>
   <td>f/1.7-f/16 </td>
   <td>f/1.7-f/16 </td>
   <td>f1.25-f/1.4 <p><font color="#BBBBBB" size=1>Fixed. Depending on lens </p></td> </td>
</tr>
<tr>
   <td><p> Focus </p></td>
   <td>&#8734 </td>
   <td>&#8734 </td>
   <td>&#8734 </td>
   <td>&#8734 </td>
   <td>&#8734 </td>
   <td>&#8734 </td>
   <td>Variable </td>
   <td>Variable </td>
   <td>NA </td>
</tr>
<tr>
   <td><p> Controllable Gimbal Pan </br><font color="#BBBBBB" size=1>degrees </p></td> </td>
   <td>+/- 15</td>
   <td>0 </td>
   <td>0 </td>
   <td>0 </td>
   <td>0 </td>
   <td>+/- 180 </td>
   <td>+/- 180 </td>
   <td>+/- 180 </td>
   <td>+/- 180 </td>
</tr>
<tr>
   <td><p> Controllable Gimbal Tilt </br><font color="#BBBBBB" size=1>degrees </p></td> </td>
   <td>-90 ~ 30</td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
   <td>-90 ~ 30 </td>
</tr>
<tr>
   <td><p> Storage Media </p></td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD </td>
   <td>Micro SD, SSD </td>
   <td>Micro SD </td>
</tr>
<tr>
   <td><p> Weight </br><font color="#BBBBBB" size=1>g - with Gimbal </p></td> </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>247 </td>
   <td>526 </td>
   <td>583 </td>
   <td>270 </td>
</tr>
</table></html>

### Remote Controller

Remote controllers will differ in:

* How they connect to a mobile device
* What wireless technology they use to connect with the aircraft
* Whether they have GPS built-in
* If they can output secondary video
* If they can be used in a dual configuration (one flys the aircraft while the other controls the gimbal and camera)

Remote Controllers that use WiFi to connect to the mobile device will act as a WiFi access point and will need to be joined.

<html><table class="table-remote-comparison">
 <thead>
  <tr>
    <th colspan="10">Remote Controller</th>
  </tr>
 </thead>
 <tbody>
 <tr>
    <td> </th>
   <td rowspan="2" width=12%> Phantom 4</th>
     <td colspan="4">Phantom 3</th>
     <td colspan="2">Inspire 1</th>
     <td colspan="2">Matrice </th>
 </tr>
 <tr>
   <td width=10%> </td>
   <td width=10%> Professional </td>
   <td width=10%> 4K </td>
   <td width=10%> Advanced </td>
   <td width=10%> Standard </td>
   <td width=10%> Standard </td>
   <td width=10%>  Pro/RAW </td>
   <td width=10%> 100 </td>
   <td width=10%> 600 </td>
</tr>
<tr>
   <td><p> Connection to Mobile Device </p></td>
   <td>USB </td>
   <td>USB </td>
   <td>WiFi </td>
   <td>USB </td>
   <td>WiFi </td>
   <td>USB </td>
   <td>USB </td>
   <td>USB </td>
   <td>USB </td>
</tr>
<tr>
   <td><p> Wireless Link Technology </p></td>
   <td>Lightbridge </td>
   <td>Lightbridge </td>
   <td>WiFi, Aux </td>
   <td>Lightbridge </td>
   <td>WiFi, Aux </td>
   <td>Lightbridge </td>
   <td>Lightbridge </td>
   <td>Lightbridge </td>
   <td>Lightbridge </td>
</tr>
<tr>
   <td><p> Supports Dual RC </p></td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>YES </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>YES </td>
</tr>
<tr>
   <td><p> Built-In GPS </p></td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>YES </td>
   <td>Yes </td>
   <td>Yes </td>
   <td>YES </td>
</tr>
<tr>
   <td><p> Secondary Video Output </p></td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>- </td>
   <td>Mini HDMI </td>
   <td>Mini HDMI </td>
   <td>Mini HDMI </td>
   <td>HDMI, SDI </td>
</tr>
</table></html>
