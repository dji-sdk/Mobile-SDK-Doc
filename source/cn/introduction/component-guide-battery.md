---
title: Smart Battery
date: 2017-03-07
keywords: [smart battery, lifetime, battery aggregation, multiple batteries]
---

## Introduction

Smart batteries provide the energy required to run the products. Together with the flight controller, the smart battery can estimate remaining flight time and provide warnings when low battery thresholds are crossed. Batteries are easily swapped between flights, extending product use considerably.

## Battery Parameters

Two important battery parameters are the amount of energy it can store when fully charged, and the amount of energy it currently has remaining. The remaining energy changes as energy is drawn from the battery during product operation and can be considered an instantaneous parameter. The amount of energy it can store when fully charged can be considered a lifetime parameter and due to battery chemistry reduces over time as the battery is cycled (discharged then charged). 

Therefore as the battery ages, it will store less energy and hence total expected product use time (e.g. flight time) is reduced. Battery **lifetime** is typically defined as the number of cycles it can experience before its full charge energy is 80% of its full charge energy when new. 

### Instantaneous Parameters

Instantaneous battery parameters such as remaining energy, voltage and current can be used to predict remaining flight time or product use. Remaining energy is described in milliamp hours. A battery with 1000 mAh remaining will be able to provide 1000 mA for one hour before running out of energy. Examining the instantaneous current being drawn from the battery can be a predictor for how long a battery will last.

### Lifetime Parameters

Lifetime parameters such as total number of cycles (or discharges), full charge energy and remaining life time can be used to determine when a battery should be replaced. Applications often require a minimum amount of flight time to be economically efficient, a keeping track of battery lifetime parameters can help determine when to replace batteries.

## Battery Aggregation

Products requiring multiple batteries such as the M600 provide both parameters for single batteries, as well as for the aggregation. This aggregation is useful as a summary for how the multi-battery system is performing.

A multi-battery system is as strong as its weakest link. Therefore for most efficiency, it's important to make sure all batteries in the system are performing similarly. 

# Extreme Weather Durability

 Self-heating technology is built into Inspire 2's Intelligent Flight Batteries, allowing it to fly in temperatures as low as -4°F (-20°C).
