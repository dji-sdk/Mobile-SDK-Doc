---
title: Flight Controller
date: 2016-12-13
keywords: [flight controller, motor control, flight control, flight orientation, course lock, home lock, aircraft heading, flight limitation, GEO, compass, IMU, RTK, DRTK, Vision System, Obstacle Avoidance, Intelligent Flight Assistant, landing gear, transport mode, battery threshold, Smart RTH, Failsafe RTH, Low Battery RTH, virtual stick, roll pitch control mode, yaw control mode, vertical throttle control mode]
---

## Introduction

The flight controller is an onboard computer that combines control information from the pilot with sensor information to adjust the thrust at each propellor and fly the aircraft as desired.

The flight controller is responsible for:

* Flight control including motor control, taking off and landing, manual flight modes
* Aircraft state information such as attitude, position, speed
* Sensor sub components such as compasses, IMUs, and positioning systems.
* Aircraft sub components such as the landing gear
* Flight limitation systems such as No Fly Zones and the GEO System
* Aircraft flight simulation for testing and debugging

A general description of fundamental flight control concepts can be found [here](./flightController_concepts.html).

## State

The flight controller provides detailed state information at up to 10 Hz including:
 
* Aircraft position, velocity and altitude
* Remaining Battery and Flight time information
* Home location
* Sensor information (compass, IMU, Satellite positioning)
* Return home status
* Whether motors are on and aircraft is flying or not
* Flight limitation and GEO system information

## Flying

### Motor Control

Motors can be turned on and off through APIs in the DJI Mobile SDK. Motors can only be turned off when the aircraft is not flying. Motors will not turn on if there are [IMU](#IMU-Inertial-Measurement-Unit) or Compass calibration errors, or if the IMU is still pre-heating.

### Beginning and Ending Flights

Aircraft take-off and landing can be automated through APIs in the DJI Mobile SDK. Takeoff is considered complete when the aircraft is hovering 1.2 meters (4 feet) above the ground. Automatic take-off can only be initiated when the motors are off.

When a automated land command is sent, the aircraft will descend at it's current position and land.

### Flight Control

Aircraft flight can be controlled in several ways:

* **Manually**: Remote controller control sticks can be manipulated by the user
* **[Missions](./component-guide-missions.html)**: Simple high level flight automation
* **[Virtual Sticks](#virtual-sticks)**: Stick commands can be sent using DJI Mobile SDK APIs that simulate manual flight. 

### Flight Orientation

The remote controller control sticks can be used to move the aircraft forward, backwards, left and right. However, if the direction of the aircraft isn't obvious, it can be difficult to control the aircraft predictably from pilot's perspective on the ground.

Several flight orientation modes are available to make flying easier:

* **Course Lock**: The aircraft moves relative to a locked course heading.
* **Home Lock**: The aircraft moves relative radially to the Home Point.
* **Aircraft Heading**: The aircraft moves relative to the front of the aircraft.

More details are described in [Flight Control Concepts](./flightController_concepts.html#ioc-intelligent-orientation-control).

### Flight Limitation

Maximum aircraft altitude and distance from home location can be used to limit the area an aircraft can fly in. The DJI Mobile SDK provides APIs that allow developers to query and change these limitations.

### Geospatial Environment Online (GEO)

The <a href="http://www.dji.com/flysafe/geo-system" target="_blank">GEO system</a> is a best-in-class geospatial information system that provides drone operators with information that will help them make smart decisions about where and when to fly. It combines up-to-date airspace information, a warning and flight-restriction system, a mechanism for <a href="http://www.dji.com/flysafe/geo-system/unlock" target="_blank"> unlocking </a> (self-authorizing) drone flights in locations where flight is permitted under certain conditions, and a minimally-invasive accountability mechanism for these decisions.

## Sensors

The Flight controller manages several sub components of the aircraft including sensors and landing gear.

### Compass

The compass measures magnetic field direction and is used to determine the heading of the aircraft relative to North. The compass sometimes needs to be calibrated if flying near magnetic interference. Compass calibration will require the user to rotate the aircraft vertically and horizontally. Products with multiple compasses (like the Phantom 4) will have their compass state fused into one compass class for simplicity.

### IMU - Inertial Measurement Unit

The IMU contains an accelerometer and gyroscope to measure linear acceleration and angular velocity. The IMU is a sensitive system that is dependent on temperature and sometimes requires recalibration. Preheating is done automatically by the aircraft, and its status can be monitored in the flight controller state data. Calibration can be initiated by DJI Mobile SDK APIs when required.

Some products have more than one IMU for redundancy. The Phantom 4 has two IMUs, while the M600 can accommodate up to three.

### RTK Positioning System

DJI Products come with built-in consumer satellite positioning systems that use GPS and GLONASS satellite constellations. Consumer grade satellite positioning can have position errors of several meters.

The DJI DRTK positioning system is an accessory compatible with the M600 and A3 flight controller that allows centimeter level positioning. DRTK is a real time kinetic satellite positioning system that uses GPS+GLONASS or GPS+Beidou constellations (depending on DRTK model).

The system requires both a base station and mobile station receiver, which are connected together through a wireless link. The base station receiver is deployed at a known location on the ground, while the mobile station is deployed on the aircraft. Both base station and mobile station will experience similar satellite signal errors at the same time. As the base station is at a known location, it can send real time correction information to the mobile station, resulting in centimeter accurate positing information for the mobile station relative to the base station.

The mobile station comes with two antennas which can be deployed on opposite sides of the aircraft. As the position of both antennas can be combined into a heading vector that can often be more accurate than compass heading in the environments with high magnetic field interference (like near large metal structures, or high voltage lines).

## Vision System and Intelligent Flight Assistant

Cameras can be used to detect obstacles and accurately determine relative position and velocity. These cameras are typically mounted on the product facing downward for positioning and forward for obstacle detection. They are separate from the main camera used to capture photos and videos.

##### Obstacle Avoidance

Some products have pairs of cameras that use stereo vision to determine the depth of an environment. For instance, the Mavic Pro has a pair of cameras facing to the front of the aircraft, while the Phantom 4 Professional has two pair of cameras facing to the front and rear. This vision system allows the aircraft to either stop in front of or go around obstacles in its flight path. 

The vision system enables users to fly with increased comfort as there is lower probability they will make a mistake and impact an object. However, limitations of the system still need to be understood to fly safely. Objects that are difficult to detect are those that are small, very narrow, too plain in appearance (visual features can't be extracted), not in the field of view of both cameras, or too close or too far from the product (see <a href="http://www.dji.com/product/phantom-4/info#specs" target="_blank"> product page </a>) for specifications). 

##### Positioning

Downward facing cameras can help determine relative position and velocity more accurately than consumer satellite positioning systems. They can also be used to hover in GPS denied environments such as inside buildings.

##### Intelligent Flight Assistant

The DJI Mobile SDK provides an Intelligent Flight Assistant that gives access to state information of the obstacle avoidance and positioning vision systems.

In addition, warning and distance information is available to developers for obstacles in front of the aircraft.

## Landing Gear

Some products have moveable landing gear that are deployed when landing to protect the camera, but can be raised (retracted) when flying to not impede the camera view. 

Landing gear can be deployed or retracted programmatically or automatically. When automatic, the flight controller will determine when to deploy the landing gear and when to retract it. In situations where a fast landing is required, it is better to programmatically deploy the landing gear so the aircraft doesn't have to pause at a height close to the ground to trigger the automatic process.

##### Transport mode

In transport mode, the landing gear will be in the same geometric plane as the aircraft body so it can be easily transported. 

## Flight Time and Battery Thresholds

Aircraft flight time is determined by total aircraft mass, the available stored (battery) energy on the aircraft, the environment the aircraft is flying in, and how the aircraft is being flown. Flying fast against strong wind with a heavy payload will have a shorter flight time than hovering in no wind with a light payload.

During a flight, the flight controller and smart battery will work together to estimate the remaining time of the current flight based on data collected during the flight. It will also provide estimates for the the battery percentage required to return home from the current location, or land immediately.

In addition, two manual battery thresholds can be set that will automate aircraft behavior when the battery is running low. 

* **Return to home**: The threshold is usually set between 25% and 50%, and will automatically initiate a return to home warning if the threshold is crossed. If no action is taken within 10s, then the aircraft will automatically return home. The return home can be cancelled by pressing the **Return Home** button on the remote controller.
* **Land in place**: The threshold is usually set between 10% and 25%, and will immediately land the aircraft if crossed.

## Returning Home

The aircraft can automatically return-to-home (RTH) in a number of scenarios:

* **Smart RTH**: Commanded to by the pilot through the application or the remote controller
* **Failsafe RTH**: If the wireless link is lost between the remote controller and aircraft
* **Low Battery RTH**: If the battery drops below a threshold that is enough to get home, but not enough to require immediate emergency landing

When automatically going home, the aircraft will rise to a minimum altitude, fly to the home location (home point) using GPS positioning, then land.

The home point is automatically set as the location the aircraft first takes off from after power on. After that, the home point can be updated through APIs in the DJI Mobile SDK but is limited to being within 30m of initial take-off location, current aircraft's location, current mobile location, or current remote controller's location (for remote controllers with GPS capability).

> **Note:** If the GPS signal is not sufficient during take-off to record a home location, the home point will be recorded when the GPS signal is strong enough. When taking off in poor satellite signal environments, developers should ensure the home point being set is within the user's expectations.

#### Smart RTH

Press the **Return Home** button on the remote controller to initiate Smart RTH. The aircraft will then automatically return to the last recorded Home Point. 

The remote controller's control sticks can be used to change the aircraft's position to avoid a collision during the Smart RTH process. Press and hold the button once to start the process, and press the button again to terminate the procedure and regain full control of the aircraft.

Smart RTH can also be initiated and cancelled through the DJI Mobile SDK.

#### Failsafe RTH

If the Home Point was successfully recorded and the compass is functioning normally, Failsafe RTH will be automatically activated if the remote controller signal is lost for more than three seconds. The RTH process may be interrupted and the operator may regain control of the aircraft if the remote controller signal connection is re-established.

In some missions, it is not desirable to immediately return home when signal connection is lost. Failsafe behavior can be configured using DJI Mobile SDK APIs.

#### Low Battery RTH

When the battery drops below a certain threshold (typically 25% to 50%), the aircraft will request to come home. When it does so, the DJI Mobile SDK APIs that monitor flight controller state will be updated to include this request, and at the same time the remote controller will start beeping.

The RTH procedure can be cancelled by either pressing the home button on the remote controller, or sending a cancel command through the application using the SDK.

## Loss of Wireless Link

The wireless connection between the remote controller and aircraft can sometimes be lost when the distance is too great, or obstacles impede the link.

If the link is lost for 3 seconds, the aircraft will start performing a failsafe behavior. Behavior options include:

* Automatically returning home (see [Returning Home](#returning-home))
* Hovering in position
* Landing in position

## Onboard SDK Communication

Applications using the DJI Mobile SDK can communicate with DJI Onboard SDK applications deployed on the aircraft over the Lightbridge wireless communication link.

The DJI Mobile SDK gives developers the ability to detect if an Onboard SDK application is connected to the flight controller, and both send and receive data to it. The size of the data cannot be greater than 100 bytes, and will be sent in 40 byte increments every 14ms.

## Simulator

DJI aircraft flight controllers support a simulation mode for faster, safer development of applications. The flight controller accept control commands, and use them to simulate sensor and state information. Applications can be tested in the simulator first before taking the products into the field.

The simulator can be started and stopped using the DJI Mobile SDK. Programatic control of the simulator means continuous integration environments can leverage the simulator to do comprehensive application testing every time an application is built.

A windows application (and for P4 a mac application) can be used to visualize the simulated flight. More details on using the simulator are [here](../application-development-workflow/workflow-testing.html).

## Virtual Sticks

Virtual stick functions in the DJI Mobile SDK simulate the remote controller's joysticks, and therefore an aircraft can be automated to fly in any way a human can manually fly it. Compared to missions, this is a more complicated, but flexible way to automate flight.

The virtual stick APIs have several modes of operation that are important to understand.

### Coordinate System

Either Ground or Body coordinate system can be chosen. All horizontal movement commands (X, Y, pitch, roll) will be relative to the coordinate system.

### Roll Pitch Control Mode

Virtual stick commands to move the aircraft horizontally can either be set with X/Y velocities, or roll/pitch angles. Larger roll and pitch angles result in larger Y and X velocities respectively. Roll and pitch angles are always relative to the horizontal. Roll and pitch directions are dependent on the coordinate system, and can be confusing. For convenience a table detailing how the aircraft moves depending on coordinate system and roll pitch control mode is given below. These can all be calculated using the definition of the coordinate systems.

<table id="t01">
  <thead>
    <tr>
      <th>Coordinate</th>
      <th>RollPitch Control Mode</th>
      <th>Aircraft Heading</th>
      <th>FlightControl Data.Pitch (Positive)</th>
      <th>FlightControl Data.Pitch (Negative)</th>
      <th>FlightControl Data.Roll (Positive)</th>
      <th>FlightControl Data.Roll (Negative)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Ground</th>
      <td>Angle</td>
      <td>North</td>        
      <td>Go South</td>
      <td>Go North</td>
      <td>Go East</td>        
      <td>Go West</td>
    </tr>
    <tr>
      <td>Angle</td>
      <td>East</td>        
      <td>Go South</td>
      <td>Go North</td>
      <td>Go East</td>        
      <td>Go West</td>
    </tr>
    <tr>
      <td rowspan="2">Ground</th>
      <td>Velocity</td>
      <td>North</td>        
      <td>Go East</td>
      <td>Go West</td>
      <td>Go North</td>        
      <td>Go South</td>
    </tr>
    <tr>
      <td>Velocity</td>
      <td>East</td>        
      <td>Go East</td>
      <td>Go West</td>
      <td>Go North</td>        
      <td>Go South</td>
    </tr>
    <tr>
      <td rowspan="2">Body</th>
      <td>Angle</td>
      <td>North</td>        
      <td>Go South</td>
      <td>Go North</td>
      <td>Go East</td>        
      <td>Go West</td>
    </tr>
    <tr>
      <td>Angle</td>
      <td>East</td>        
      <td>Go West</td>
      <td>Go East</td>
      <td>Go South</td>        
      <td>Go North</td>
    </tr>
    <tr>
      <td rowspan="2">Body</th>
      <td>Velocity</td>
      <td>North</td>        
      <td>Go East</td>
      <td>Go West</td>
      <td>Go North</td>        
      <td>Go South</td>
    </tr>
    <tr>
      <td> Velocity </td>
      <td>East</td>        
      <td>Go South</td>
      <td>Go North</td>
      <td>Go East</td>        
      <td>Go West</td>
    </tr>
  </tbody>
</table>

### Yaw Control Mode

Yaw can be changed by either angle or velocity. Yaw settings are independent of the coordinate system. Positive yaw velocity will always rotate clockwise, and yaw angle is always relative to North.

### Vertical Throttle Control Mode: 

Vertical movement can be achieved either using velocity or position. Position is an altitude relative to the take-off location. Velocity is always relative to the aircraft, and does not follow typical coordinate system convention (positive vertical velocity results in the aircraft ascending). 

