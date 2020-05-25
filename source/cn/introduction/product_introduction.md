---
title: 硬件介绍
date: 2020-05-23
keywords: [component, propellor, sensor, product comparison]
---

DJI不仅制造小型，高性能的可遥控飞行器，还制造手持摄像机和云台增稳设备，非常适合消费和商业级应用。这些产品易于操控使用，用户体验良好，并且价格适中，具有行业内无与伦比的高品质和强大功能。

### 飞行器

DJI拥有一系列可通过Mobile SDK实现自动化控制的多旋翼飞行器，包括Mavic 2 系列，Phantom 4系列， Mavic Pro，Mavic Air，Inspire系列，Matrice 200 v2系列，Matrice 200系列，Matrice 600 和 Matrice 100。

DJI飞行器的其中一个核心功能是无论飞行器以何种姿态飞行，相机都能保持水平。相机安装在云台上，云台主要通过传感器感知机身的动作，通过三轴电机驱动让相机保持原来的位置，抵消机身晃动或者震动的影响，从而可以拍摄出清晰的照片和无抖动的视频。

DJI提供了多款飞行器给开发者选择，它们都具备不同的功能，性能，尺寸和价格。开发人员和用户在考虑飞行器时应注意以下几点指标：

* 飞行续航时间
* 尺寸和重量
* 相机参数（照片质量和参数设置）
* 可替换的相机
* 避障功能
* 可定制化的负载设备
* 最大的飞行高度
* 支持的配件设备
* 遥控器的功能
* 价格

### 手持相机

DJI的手持相机OSMO系列产品通过将DJI飞行器的云台增稳技术集成到易于携带的手持设备上，让用户可以拍摄出流程，专业的视频。

### 独立组件

飞行器上的的两个组件（飞行控制器，无线链路）可用于DJI产品或第三方飞行器的机身上。其中的某些组件在DJI Mobile SDK中可以获得有限的支持。

### 配件

DJI飞行器和手持相机与许多DJI配件兼容。DJI Mobile SDK也支持其中一些配件，这意味着移动设备能够在一定程度上和配件进行交互。

## 产品组件

在进行详细的产品比较之前，我们先了解下产品组件及其功能会很有帮助。

所有产品均包含提供重要功能或者特性的组件模块。 以下是一些典型组件的介绍，您可以在[产品组件介绍](./component-guide-flightController.html)中获得更多详细信息。

![ComponentsAircraft](../../images/product-introduction/ComponentsAircraft.png)

#### 推进力

电机上安装的螺旋桨为飞行器提供垂直推力。通过电子调速器，每个电机可以调节垂直推力，让飞行器能够水平悬停，旋转，上升，下降或者水平飞行。

#### 传感器

DJI 飞行器上安装有大量的传感器，包括加速计，陀螺仪，指南针，气压计，超声波传感器，相机和卫星定位系统。这些传感器用于确定飞行器当前的状态，并可以预测飞行器及其周围环境的未来状态变化。

#### 飞行控制器

飞行控制器是一台机载计算机，它将操控者的控制信息与传感器信息相结合，以调节每个螺旋桨的推力，控制飞行器飞行。

#### 相机

相机可以在本地记录图像和视频数据，也可以将其无线传输到Android或者iOS移动设备上。无线传输包括来自摄像机的实时视频流。相机的曝光，快门，ISO等参数也可以进行自定义设置，让拍摄完美照片成为可能。

#### 云台

云台将相机固定住，让它可以围绕三个轴旋转。旋转可用于控制相机指向的方向，并在飞行器不水平时提供旋转增稳。另外，云台是安装在减震板上的，这样相机就不会受到横向振动和旋转运动的影响了。

#### 视觉避障和定位

先进的传感器可以帮助飞行器感知周围的现实环境。前视视觉系统用于检测飞行器附近的障碍物。下视视觉系统和超声波传感器用于确定相对地面的位置，从而在无GPS环境（如室内）中提供精确的速度估算和稳定的悬停位置。

#### 智能电池

智能电池为飞行器提供运行系统所需的能量。与飞行控制器一起，智能电池可以评估剩余的飞行时间，并在低电量时，提供警告提示。另外，电池的拆卸很简单，可以很方便地在两次飞行任务之间进行更换，大大延长了产品的使用时间。

#### 遥控器

遥控器提供控制手柄，按钮和拨轮，以操控飞行器的飞行，相机和云台。遥控器与飞行器保持无线连接，在理想环境下，部分产品的控制距离可达5公里以上。遥控器上的**飞行模式开关**可用于在手动和自动飞行模式之间切换。

![ComponentsRemoteController](../../images/product-introduction/ComponentsRemoteController.png)

#### 移动设备

使用USB或WiFi，可以将Android或iOS设备连接到遥控器上，以提供更好的飞行体验，如显示实时视频图传并展示飞行器的状态信息。使用Mobile SDK，移动设备还可以用来控制飞行器飞行。

#### 手持控制器

手持控制器提供操纵杆和按钮，用于控制相机和云台。手持控制器还可以通过手柄内的WiFi接入点连接到移动设备上。

![ComponentsHandheld](../../images/product-introduction/ComponentsHandheld.png)

## 支持的产品

以下表格列出了DJI Mobile SDK支持的飞行器，手持相机和独立组件设备。

<html><table class="table-product-accessories">
  <thead>
    <tr>
      <th colspan="4">产品和组件</th>
    </tr>
    <tr>
      <th>分类</th>
      <th>产品</th>
      <th>相机</th>
      <th>SDK支持的组件</th>
    </tr>
  </thead>
  <tbody>
	  <tr>
      <td rowspan="27">飞行器</th>
      <td>Mavic 2 Enterprise Dual</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Mavic 2 Enterprise</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Mavic 2 Pro</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Mavic 2 Zoom</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Mavic Air</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Spark</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Mavic Pro</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 4</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 4 Advanced</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
     <tr>
      <td>Phantom 4 Professional</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
     <tr>
      <td>Phantom 4 Professional V2</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 4 RTK</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Professional</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 4K</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Advanced</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Phantom 3 Standard</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Inspire 1</td>
      <td>X3, X5, X5R, XT, Z3</td>        
      <td> Focus* </td>
    </tr>
    <tr>
      <td>Inspire 2</td>
      <td>X4S, X5S, X7</td>        
      <td> CineSSD, Focus* </td>
    </tr>
    <tr>
      <td>Matrice 100</td>
      <td>X3, X5, X5R, XT, Z3, Z30</td>        
      <td> N1 Video Encoder, Focus* </td>
    </tr>
    <tr>
      <td>Matrice 300 RTK</td>
      <td>XTS, XT2, Z30, H20, H20T</td>        
      <td> - </td>
    </tr>
    <tr>
      <td>Matrice 200 V2</td>
      <td>X4S, X5S, XT, XT2, X7, Z30</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Matrice 210 V2</td>
      <td>X4S, X5S, XT, XT2, X7, Z30</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Matrice 210 RTK V2</td>
      <td>X4S, X5S, XT, XT2, X7, Z30</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Matrice 200</td>
      <td>X4S, X5S, XT, XT2, Z30</td>        
      <td> Focus </td>
    </tr>
    <tr>
      <td>Matrice 210</td>
      <td>X4S, X5S, XT, XT2, Z30</td>        
      <td> Focus </td>
    </tr>
    <tr>
      <td>Matrice 210 RTK</td>
      <td>X4S, X5S, XT, XT2, Z30</td>        
      <td> Focus </td>
    </tr>
    <tr>
      <td>Matrice 600</td>
      <td>X3, X5, X5R, XT, Z3, Z30</td>        
      <td> DRTK, Ronin MX, Focus* </td>
    </tr>
    <tr>
      <td>Matrice 600 Pro</td>
      <td>X3, X5, X5R, XT, XT2, Z3, Z30</td>        
      <td> DRTK, Ronin MX, Focus* </td>
    </tr>
    <tr>
      <td rowspan="4">手持设备</th>
      <td>Osmo</td>
      <td>X3, X5, X5R, Z3</td>        
      <td> — </td>
    </tr>
    <tr>
      <td>Osmo Pro</td>
      <td>固定</td>        
      <td> — </td>
    </tr>
    <tr>
       <td>Osmo Mobile</td>
      <td> — </td>        
      <td> — </td>
    </tr>
    <tr>
       <td>Osmo Mobile 2</td>
      <td> — </td>        
      <td> — </td>
    </tr>
    <tr>
      <td rowspan="3">组件</th>
      <td>Lightbridge 2 搭配 A2</td>
      <td> — </td>        
      <td> — </td>
    </tr>
      <tr>
      <td>Lightbridge 2 搭配 A3</td>
      <td> X3, X5, X5R, XT, Z3, Z30 </td>        
      <td> DRTK, Ronin MX, Focus* </td>
    </tr>
    </tr>
      <tr>
      <td>Lightbridge 2 搭配 N3</td>
      <td> X3, X5, X5R, XT, Z3, Z30 </td>        
      <td> DRTK, Ronin MX, Focus* </td>
    </tr>
  </tbody>
</table></html>

> Note: DJI Focus 仅与DJI相机兼容。

详细规格参数列在每个产品的网页**技术参数**部分，您可以查看以下网址 <a href="http://www.dji.com" target="_blank">www.dji.com</a>.

## 产品对比

### 飞行器对比

一些可以区分飞行器系列产品特性的功能包括：

### Phantom 和 Mavic Pro 机型

* 小巧便携
* 易于使用
* Phantom 4 和 Mavic Pro包含以下功能：
    * 内置避障
    * 高级视觉功能，例如能够跟踪用户选择的移动目标
    * **运动档飞行模式**，带来更加有动感的飞行体验
* Mavic Pro 还包含以下功能：
    * 可以通过遥控器或直接使用移动设备进行控制
    * 有一个小型便携式遥控器

### Spark

* 体积超小，成本很低
* 很容易使用
* 手势控制
* 内置避障
* 可以通过遥控器或直接使用移动设备进行控制
* 不支持航点任务
* 支持1080p视频分辨率（其他产品支持高达4K的分辨率）

### Inspire

* 可更换相机
* 相机具有更大传感器，光圈和对焦控制
* 提供热成像相机
* 云台可以使相机完全水平旋转（640&deg;）
* 起落架可以升起，不遮挡相机的视野
 ![InspireRaised](../../images/product-introduction/inspire_landingGearRaised.gif)
* 遥控器内置GPS
* Inspire 2还具有：
    * 可选的机载SSD存储
    * 可选的遥控器GPS配件
    * 上视避障
    * 第一人称视角（FPV）相机

### Matrice

* 行业与开发者平台
* 高度可定制，最多支持6公斤有效负载
* 有效负载可以直接通过串行端口和DJI Onboard SDK与飞行控制器通信
* 机械安装功能
* 可以使用和Inspire系列相同的相机
* 其他配件包括

    * <a href="http://www.dji.com/product/matrice600" target="_blank"> DRTK </a> - 厘米级精度定位
    * <a href="http://www.dji.com/product/guidance" target="_blank"> Guidance </a> - 5向立体相机和超声波传感器模块
    * <a href="http://www.dji.com/product/ronin-mx" target="_blank"> Ronin MX </a> - 云台可支持高达4.5公斤的自定义有效负载

由于产品，特性和功能的选择范围很大，对飞行器进行比较选择会很困难。以下提供三个汇总的飞行器比较表，介绍各飞行器和功能上的差异。

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="10">飞行器比较: <b>飞行器</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th width = 10%><p>最大飞行时间</br><font color="#BBBBBB" size=1 style="font-weight:bold">min</p></th>
<th><p>最大飞行速度</br><font color="#BBBBBB" size=1 style="font-weight:bold">m/s</p></th>
<th><p>最大上升速度</br><font color="#BBBBBB" size=1 style="font-weight:bold">m/s</p></th>
<th><p>最大下降速度</br><font color="#BBBBBB" size=1 style="font-weight:bold">m/s</p></th>
<th><p>最大起飞高度</br><font color="#BBBBBB" size=1 style="font-weight:bold">m</p></th>
<th><p>桨叶</p></th>
<th width = 10%><p>质量</br><font color="#BBBBBB" size=1 style="font-weight:bold">g</p></th>
<th width = 15%><p>最大尺寸</br><font color="#BBBBBB" size=1.7 style="font-weight:normal">不含桨叶</br><font color="#BBBBBB" size=1 style="font-weight:bold">mm</p></th>
</tr>
<tr>
<td>Inspire 1</td><td>18</td><td>22</td><td>5</td><td>4</td><td>4500</td><td>4</td><td>2935</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 X3相机</p></td><td>581</td></tr>
<tr>
<td>Inspire 1 Pro/Raw</td><td>15</td><td>18</td><td>5</td><td>4</td><td>4500</td><td>4</td><td>3396</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 X5相机</p></td><td>581</td></tr>
<tr>
<td>Inspire 2</td><td>27</td><td>26</td><td>6</td><td>9</td><td>2500</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">5000 搭配特殊桨叶</p></td><td>4</td><td>3543</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x 电池, X4S 相机</p></td><td>605</td></tr>
<tr>
<td>Matrice 100</td><td>16-40*</td><td>18</td><td>5</td><td>4</td><td>4500</td><td>4</td><td>2355</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 TB47 电池</p></td><td>650</td></tr>
<tr>
<td>Matrice 300 RTK</td><td>55</td><td>23</td><td>6</td><td>5</td><td>7000</td><td>4</td><td>6300</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB60 电池</p></td><td>810</td></tr>
<tr>
<td>Matrice 200 V2</td><td>24-38*</td><td>22.5</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>4690</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB5S 电池</p></td><td>722</td></tr>
<tr>
<td>Matrice 210 V2</td><td>24-34*</td><td>22.5</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>4800</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB5S 电池</p></td><td>722</td></tr>
<tr>
<td>Matrice 210 RTK V2</td><td>24-33*</td><td>22.5</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>4910</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB5S 电池</p></td><td>722</td></tr>
<tr>
<td>Matrice 200</td><td>13-38*</td><td>23</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>3800</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB50 电池</p></td><td>716</td></tr>
<tr>
<td>Matrice 210</td><td>13-38*</td><td>23</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>3800</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB50 电池</p></td><td>716</td></tr>
<tr>
<td>Matrice 210 RTK</td><td>13-38*</td><td>23</td><td>5</td><td>3</td><td>3000</td><td>4</td><td>3800</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 2x TB50 电池</p></td><td>716</td></tr>
<tr>
<td>Matrice 600</td><td>18-40*</td><td>18</td><td>5</td><td>3</td><td>2500</td><td>6</td><td>9100</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 6x TB47 电池</p></td><td>1133</td></tr>
<tr>
<td>Matrice 600 Professional</td><td>18-40*</td><td>18</td><td>5</td><td>3</td><td>2500</td><td>6</td><td>9500</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配 6x TB47S 电池</p></td><td>1133</td></tr>
<tr>
<td>Mavic Air</td><td>21</td><td>19</td><td>4</td><td>3</td><td>5000</td><td>4</td><td>430</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>213</td></tr>
<tr>
<td>Mavic Pro</td><td>27</td><td>18</td><td>5</td><td>3</td><td>5000</td><td>4</td><td>743</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>335</td></tr>
<tr>
<td>Mavic 2 Pro</td><td>31</td><td>20</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>907</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>354</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>31</td><td>20</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>905</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>354</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>31</td><td>20</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>905</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>354</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>31</td><td>20</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>899</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">搭配云台保护罩</p></td><td>354</td></tr>
<tr>
<td>Phantom 3 4K</td><td>25</td><td>16</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>1280</td><td>350</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>23</td><td>16</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>1280</td><td>350</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>23</td><td>16</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>1280</td><td>350</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>25</td><td>16</td><td>5</td><td>3</td><td>6000</td><td>4</td><td>1216</td><td>350</td></tr>
<tr>
<td>Phantom 4</td><td>28</td><td>20</td><td>6</td><td>4</td><td>6000</td><td>4</td><td>1380</td><td>350</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>30</td><td>20</td><td>6</td><td>4</td><td>6000</td><td>4</td><td>1368</td><td>350</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>30</td><td>20</td><td>6</td><td>4</td><td>6000</td><td>4</td><td>1388</td><td>350</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>30</td><td>20</td><td>6</td><td>4</td><td>6000</td><td>4</td><td>1375</td><td>350</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>30</td><td>16</td><td>6</td><td>3</td><td>6000</td><td>4</td><td>1391</td><td>350</td></tr>
<tr>
<td>Spark</td><td>16</td><td>13.9</td><td>3</td><td>3</td><td>4000</td><td>4</td><td>300</td><td>170</td></tr>
</tbody></table></html>

> 注意：
>
> 1. 更多信息，请参考 “负载和飞行时间” 表
> 2. Inspire与Inspire Pro机型之间的区别：
>  - Inspire 1 Pro具有更强大的推进力，使其能够举起更重的负载
>  - Inspire 1 Pro带有一个云台安装支架，支持安X5和X5R相机
>  - Inspire 1 Pro随附X5相机作为默认配件
>

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9">飞行器对比: <b>特性</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>相机</p></th>
<th><p>FPV 相机</p></th>
<th><p>无线距离</br><font color="#BBBBBB" size=1.7 style="font-weight:normal">US / EU</br><font color="#BBBBBB" size=1 style="font-weight:bold">km</p></th>
<th><p>电池</p></th>
<th><p>云台</p></th>
<th><p>起落架</p></th>
<th><p>自定义负载</br><font color="#BBBBBB" size=1 style="font-weight:bold">g</p></th>
<th><p>兼容配件</p></th>
</tr>
<tr>
<td>Inspire 1</td><td>X3, Z3, XT</td><td>-</td><td>5 / 3.1</td><td>1</td><td>1</td><td>可移动</td><td>-</td><td>Focus</td></tr>
<tr>
<td>Inspire 1 Pro/Raw</td><td>X3, Z3, XT, X5, X5R</td><td>-</td><td>5 / 3.1</td><td>1</td><td>1</td><td>可移动</td><td>-</td><td>-</td></tr>
<tr>
<td>Inspire 2</td><td>X4S, X5S, X7</td><td>有</td><td>7 / 3.5</td><td>2</td><td>1</td><td>可移动</td><td>-</td><td>Focus, CineSSD</td></tr>
<tr>
<td>Matrice 100</td><td>X3, Z3, X5, X5R, XT, Z30</td><td>-</td><td>5 / 3.5</td><td>1-2</td><td>1</td><td>固定</td><td>1000</td><td>Guidance, Manifold, Focus</td></tr>
<tr>
<td>Matrice 300 RTK</td><td>XTS, XT2, Z30, H20, H20T</td><td>有</td><td>15 / 8</td><td>2</td><td>3</td><td>固定</td><td>2700</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于电池型号</p></td><td>-</td></tr>
<tr>
<td>Matrice 200 V2</td><td>X4S, X5S, Z30, XT, X7, XT2</td><td>有</td><td>8 / 5</td><td>2</td><td>1</td><td>固定</td><td>1450</br></td><td>-</td></tr>
<tr>
<td>Matrice 210 V2</td><td>X4S, X5S, Z30, XT, X7, XT2</td><td>有</td><td>8 / 5</td><td>2</td><td>2</td><td>固定</td><td>1340</br></td><td>-</td></tr>
<tr>
<td>Matrice 210 RTK V2</td><td>X4S, X5S, Z30, XT, X7, XT2</td><td>有</td><td>8 / 5</td><td>2</td><td>2</td><td>固定</td><td>1230</br></td><td>-</td></tr>
<tr>
<td>Matrice 200</td><td>X4S, X5S, Z30, XT, XT2</td><td>有</td><td>7 / 3.5</td><td>2</td><td>1</td><td>固定</td><td>1601-2340</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于电池型号</p></td><td>Focus</td></tr>
<tr>
<td>Matrice 210</td><td>X4S, X5S, Z30, XT, XT2</td><td>有</td><td>7 / 3.5</td><td>2</td><td>2</td><td>固定</td><td>1601-2340</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于电池型号</p></td><td>Focus</td></tr>
<tr>
<td>Matrice 210 RTK</td><td>X4S, X5S, Z30, XT, XT2</td><td>有</td><td>7 / 3.5</td><td>2</td><td>2</td><td>固定</td><td>1601-2340</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于电池型号</p></td><td>Focus</td></tr>
<tr>
<td>Matrice 600</td><td>X3, Z3, X5, X5R, XT, 可以和Ronin MX搭配</td><td>-</td><td>5 / 3.1</td><td>6</td><td>1</td><td>可移动</td><td>6000</td><td>Manifold, DRTK, Ronin MX</td></tr>
<tr>
<td>Matrice 600 Professional</td><td>X3, Z3, X5, X5R, XT, XT2, 可以和Ronin MX搭配, Z30</td><td>-</td><td>5 / 3.1</td><td>6</td><td>1</td><td>可移动</td><td>6000</td><td>Manifold, DRTK, Ronin MX</td></tr>
<tr>
<td>Mavic Air</td><td>固定</td><td>-</td><td>7 / 4</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Mavic Pro</td><td>固定</td><td>-</td><td>7 / 4</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Mavic 2 Pro</td><td>固定</td><td>-</td><td>8 / 4</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>固定</td><td>-</td><td>8 / 4</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>固定</td><td>-</td><td>8 / 4</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>M2E SPOTLIGHT, M2E BEACON, M2E SPEAKER</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>固定</td><td>-</td><td>8 / 5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>M2E SPOTLIGHT, M2E BEACON, M2E SPEAKER</td></tr>
<tr>
<td>Phantom 3 4K</td><td>固定</td><td>-</td><td>1.2 / 0.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>固定</td><td>-</td><td>5 / 3.1</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>固定</td><td>-</td><td>1 / 0.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>固定</td><td>-</td><td>1 / 0.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4</td><td>固定</td><td>-</td><td>5 / 3.1</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>固定</td><td>-</td><td>7 / 3.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>固定</td><td>-</td><td>7 / 3.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4 Professional v2</td><td>固定</td><td>-</td><td>7 / 3.5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>固定</td><td>-</td><td>7 / 5</td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
<tr>
<td>Spark</td><td>固定</td><td>-</td><td>2 / 0.5</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1 不带遥控器</p></td><td>1</td><td>1</td><td>固定</td><td>-</td><td>-</td></tr>
</tbody></table></html>

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9">飞行器对比: <b>视觉系统和智能任务</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>避障</p></th>
<th><p>红外感知</p></th>
<th><p>视觉定位</p></th>
<th><p>航点任务</p></th>
<th><p>热点环绕</p></th>
<th><p>Follow Me</p></th>
<th><p>智能跟随</p></th>
<th><p>指点飞行</p></th>
</tr>
<tr>
<td>Inspire 1</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Inspire 1 Pro/Raw</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Inspire 2</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>Top</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Matrice 100</td><td>搭配 Guidance</td><td>-</td><td>搭配 Guidance</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Matrice 300 RTK</td><td>前置,后置,侧面 / 下置, 上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-40m/0.6-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td><td>没有</td></tr>
<tr>
<td>Matrice 200 V2</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>Top</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>没有</td><td>-</td><td>-</td><td>没有</td></tr>
<tr>
<td>Matrice 210 V2</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>没有</td><td>-</td><td>-</td><td>没有</td></tr>
<tr>
<td>Matrice 210 RTK V2</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>没有</td><td>-</td><td>-</td><td>没有</td></tr>
<tr>
<td>Matrice 200</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Matrice 210</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Matrice 210 RTK</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>上置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0-5m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Matrice 600</td><td>-</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Matrice 600 Professional</td><td>-</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Mavic Air</td><td>前置, 后置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.5-12m, 0.5-10m, 0.1-8m</p></td><td>Bottom</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1-8 m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Mavic Pro</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30m</p></td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Mavic 2 Pro</td><td>前置, 后置, 下置, 侧面</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.5-20m, 0.5-16m, 0.5-11m, 0.5-10m</p></td><td>上置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1-8m, 0.5-11m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>前置, 后置, 下置, 侧面</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.5-20m, 0.5-16m, 0.5-11m, 0.5-10m</p></td><td>上置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1-8m, 0.5-11m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>前置, 后置, 下置, 侧面</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.5-20m, 0.5-16m, 0.5-11m, 0.5-10m</p></td><td>上置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1-8m, 0.5-11m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>前置, 后置, 下置, 侧面</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.5-20m, 0.5-16m, 0.5-11m, 0.5-10m</p></td><td>上置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.1-8m, 0.5-11m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Phantom 3 4K</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>-</td><td>-</td><td>-</td><td>有</td><td>有</td><td>有</td><td>-</td><td>-</td></tr>
<tr>
<td>Phantom 4</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-15m</p></td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>前置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30 m</p></td><td>-</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>前置, 后置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30 m</p></td><td>左侧，右侧</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.2-7 m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>前置, 后置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30 m</p></td><td>左侧，右侧</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.2-7 m</p></td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td><td>有</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>前置, 后置, 下置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.7-30 m</p></td><td>左侧，右侧</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.2-7 m</p></td><td>有</td><td>有</td><td>没有</td><td>没有</td><td>没有</td><td>没有</td></tr>
<tr>
<td>Spark</td><td>前置</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">0.2-5m</p></td><td>-</td><td>有</td><td>没有</td><td>没有</td><td>没有</td><td>有</td><td>有</td></tr>
</tbody></table></html>

> 注意: 有关智能任务的说明，请参考 **产品组件介绍** 中的 [任务](./component-guide-missions.html).
>

### 飞行时间

产品飞行时间取决于飞行器的总质量以及可用的电池能量。可用能量取决于电池数量，电池能量密度和推进系统可支持的最大质量。

#### 电池能量密度

DJI为 Inspire和 Matrice产品线提供了两个系列的电池。TB47系列是所有飞行器随附的默认99 Wh电池。 TB48系列是130 Wh电池。尽管TB48有更高的10-15％电池能量密度，但实用性较差，因为> 100 Wh的电池通常有运输限制。

假设其他所有条件保持不变，使用具有较高能量密度的电池将可以转换为更长的飞行时间。但是，由于TB48电池比TB47电池重一些，请务必记住，使用它会限制最大的自定义有效负载。Matrice系列产品在使用多块电池时尤其明显。

#### 使用更多电池

增加产品上的电池数量将会：

* 增加飞行可用能量（增加飞行时间）
* 增加飞行器质量，因此：
     * 减少飞行时间
     * 减少额外的有效负载

#### 飞行时间对比

为了帮助理解不同飞行器配置的潜在功能和飞行时间，以下表格提供了有效负载和飞行时间的详细摘要：

<html><table class="table-flight-time" id="t03">
 <thead>
  <tr>
    <th colspan="9">负载 & 飞行时间</th>
  </tr>
  <tr>
    <td width=20%>产品</td>
    <td width=10%>相机</td>
    <td width=10%>电池配置</td>
    <td width=10%>飞行器质量</td>
    <td width=10%>电池质量</td>
    <td width=10%>相机质量</td>
    <td width=10%>负载</td>
    <td width=10%>起飞质量</td>
    <td width=10%>最大飞行时间 (大约.)</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td><p><font size=1 color="#BBBBBB">克</p></td>
    <td><p><font size=1 color="#BBBBBB">克</p></td>
    <td><p><font size=1 color="#BBBBBB">克</p></td>
    <td><p><font size=1 color="#BBBBBB">克</p></td>
    <td><p><font size=1 color="#BBBBBB">克</p></td>
    <td><p><font size=1 color="#BBBBBB">分钟</p></td>
  </tr>
 </thead>
 <tbody>
  <tr>
    <td rowspan="3">
    Inspire 1
    <p><font size="1">最大起飞质量: 3000g </br>配备 XT, X3</p>
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
    <p><font size="1">最大起飞质量: 3500g</br>配备 XT, X3, X5, X5R</p>
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
    <p><font size="1">最大起飞质量: 3600g</br>配备 XT, X3, X5, X5R, Guidance, Manifold</p>
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
    Matrice 200
    <p><font size="1">最大起飞质量: 6140g</br>配备 XT, X4S, X5S, Z3</p>
    </td>
    <td align= "center">-</td>
    <td>2x TB50</td>        
    <td>2760</td>        
    <td>1040</td>        
    <td>0</td>        
    <td>0</td>        
    <td>3800</td>        
    <td>27</td>        
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>2x TB50</td>        
    <td>2760</td>        
    <td>2040</td>        
    <td>0</td>        
    <td>2340</td>        
    <td>6140</td>        
    <td>13</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>2x TB55</td>        
    <td>2760</td>        
    <td>1770</td>        
    <td>0</td>        
    <td>0</td>        
    <td>4530</td>        
    <td>38</td>
  </tr>
    <tr>
    <td align= "center">-</td>
    <td>2x TB55</td>        
    <td>2760</td>        
    <td>1770</td>        
    <td>0</td>        
    <td>1610</td>        
    <td>6140</td>        
    <td>24</td>
  </tr>

  <tr>
    <td rowspan="4">
    Matrice 600
    <p><font size="1">最大起飞质量: 15100g</br>配备 XT, X3, X5, X5R, Guidance, Ronin MX, DRTK, Manifold</p>
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

### 相机

DJI提供了几种相机配置。对于 Phantom和 Mavic系列产品，相机是固定在产品上的。对于 Inspire和 Matrice系列产品，支持更换相机（禅思 X3，X5，X5R，Z3，XT，Z30，X4S，X5S），但是并非所有相机都与所有Inspire和 Matrice系列机型兼容。本文上面提到的 **产品和组件** 表详细介绍了相机和飞行器的兼容性组合。

禅思 XT是一台热成像相机。有关禅思 XT相机规格的更多详细信息，请参考<a href="http://www.dji.com/product/zenmuse-xt/info#specs" target="_blank">此处</a>。

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9">相机对比: <b>传感器</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>传感器尺寸</p></th>
<th><p>图片像素</br><font color="#BBBBBB" size=1 style="font-weight:bold">百万像素</p></th>
<th><p>最大视频分辨率</p></th>
<th><p>感光度</p></th>
<th><p>机械快门</p></th>
<th><p>快门速度</br><font color="#BBBBBB" size=1 style="font-weight:bold">秒</p></th>
</tr>
<tr>
<td>Mavic Air</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-3200</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Mavic Pro</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Mavic 2 Pro</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-3200</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-3200</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>可见光 1/2.3"<br>红外 非制冷氧化钒微测辐射热计</td><td>可见光 12</td><td>可见光 4K<br>红外 640×360</td><td>可见光 100-3200</td><td>-</td><td>-</td></tr>
<tr>
<td>Osmo</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr>
<td>Osmo +</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 3 4K</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>1/2.3"</td><td>12</td><td>2.7K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>1/2.3"</td><td>12</td><td>2.7K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 4</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>有</td><td>机械快门 8-1/2000<br>电子快门 8-1/8000</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>有</td><td>机械快门 8-1/2000<br>电子快门 8-1/8000</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>有</td><td>机械快门 8-1/2000<br>电子快门 8-1/8000</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>有</td><td>机械快门 8-1/2000<br>电子快门 8-1/8000</td></tr>
<tr>
<td>Spark</td><td>1/2.3"</td><td>12</td><td>FHD</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">1920 x 1080</p></td><td>100-1600</td><td>-</td><td>2-1/8000</td></tr>
<tr>
<td>Zenmuse X3</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse X4S</td><td>1"</td><td>20</td><td>4K</td><td>100-12800</td><td>有</td><td>机械快门 8-1/2000<br>电子快门 1/2000-1/8000</td></tr>
<tr>
<td>Zenmuse X5</td><td>4/3"</td><td>16</td><td>4K</td><td>100-25600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse X5R</td><td>4/3"</td><td>16</td><td>4K</td><td>100-25600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse X5S</td><td>4/3"</td><td>20.8</td><td>5.2K</td><td>100-25600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse X7</td><td>APS-C</td><td>24</td><td>5.2K</td><td>100-25600</td><td>8-1/1000</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse XT</td><td>NA</td><td>0.32</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于型号</p></td><td>640 x 512</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于型号</p></td><td>NA</td><td>-</td><td>NA</td></tr>
<tr>
<td>Zenmuse XT 2</td><td>1/1.7"</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">可见光相机</p></td><td>12</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">可见光相机</p></td><td>4K</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">可见光相机</p></td><td>NA</td><td>-</td><td>NA</td></tr>
<tr>
<td>Zenmuse Z3</td><td>1/2.3"</td><td>12</td><td>4K</td><td>100-1600</td><td>-</td><td>8-1/8000</td></tr>
<tr>
<td>Zenmuse Z30</td><td>1/2.3"</td><td>2.13</td><td>1080p</td><td>1600</td><td>-</td><td>1-1/6000</td></tr>
<tr>
<td>Zenmuse H20</td><td>广角 1/2.3", 变焦 1/1.7"</td><td>Wide 12, 变焦 20</td><td>广角 1080p, 变焦 4K</td><td>100-25600</td><td>-</td><td>1-1/8000</td></tr>
<tr>
<td>Zenmuse H20T</td><td>广角 1/2.3", 变焦 1/1.7", 红外 非制冷氧化钒微测辐射热计</td><td>广角 12, 变焦 20</td><td>广角 1080p, 变焦 4K, 红外 512p</td><td>100-25600(广角 & 变焦)</td><td>-</td><td>1-1/8000(广角 & 变焦)</td></tr>
</tbody></table></html>

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9">相机对比: <b>镜头</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>可更换镜头</p></th>
<th><p>FOV</br><font color="#BBBBBB" size=1 style="font-weight:bold">度</p></th>
<th><p>焦距</p></th>
<th><p>光圈</p></th>
<th><p>对焦点</br><font color="#BBBBBB" size=1 style="font-weight:bold">米</p></th>
</tr>
<tr>
<td>Mavic 2 Pro</td><td>-</td><td>77</td><td>35</td><td>f/2.8–f/11</td><td>1 - &#8734</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>-</td><td>83</td><td>24-48</td><td> f/2.8(24mm)–f/3.8(48mm)</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>-</td><td>82.6</td><td>24-48</td><td> f/2.8(24mm)–f/3.8(48mm)</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>-</td><td>可见光 85</td><td>可见光 24</td><td>可见光 f/2.8(24mm)<br>红外 f/1.1</td><td>可见光 0.5 - &#8734</td></tr>
<tr>
<td>Mavic Air</td><td>-</td><td>85</td><td>35</td><td>f/2.8</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Mavic Pro</td><td>-</td><td>78.8</td><td>28</td><td>f/2.2</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Osmo</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr>
<td>Osmo +</td><td>-</td><td>92-35</td><td>22-77</td><td>f/2.8 - f/5.2</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Phantom 3 4K</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Phantom 4</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>-</td><td>84</td><td>24</td><td>f/2.8 - f/11</td><td>1 - &#8734</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>-</td><td>84</td><td>24</td><td>f/2.8 - f/11</td><td>1 - &#8734</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>-</td><td>84</td><td>24</td><td>f/2.8 - f/11</td><td>1 - &#8734</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>-</td><td>84</td><td>24</td><td>f/2.8 - f/11</td><td>1 - &#8734</td></tr>
<tr>
<td>Spark</td><td>-</td><td>81.9</td><td>25</td><td>f/2.6</td><td>2 - &#8734</td></tr>
<tr>
<td>Zenmuse X3</td><td>-</td><td>94</td><td>20</td><td>f/2.8</td><td>&#8734</td></tr>
<tr>
<td>Zenmuse X4S</td><td>-</td><td>84</td><td>24</td><td>f/2.8-f/11</td><td>1-&#8734</td></tr>
<tr>
<td>Zenmuse X5</td><td>有</td><td>72</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>30</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>f/1.7 - f/16</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>0.2 - &#8734</td></tr>
<tr>
<td>Zenmuse X5R</td><td>有</td><td>72</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>30</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>f/1.7 - f/16</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>0.2 - &#8734</td></tr>
<tr>
<td>Zenmuse X5S</td><td>有</td><td>72</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>30</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>f/1.7 - f/16</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">标准镜头</p></td><td>0.2 - &#8734</td></tr>
<tr>
<td>Zenmuse X7</td><td>有</td><td>54</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">DL 24mm F2.8 LS ASPH</p></td><td>36</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">DL 24mm F2.8 LS ASPH</p></td><td>f/2.8-f/16</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">DL 24mm F2.8 LS ASPH</p></td><td>0.2 - &#8734</td></tr>
<tr>
<td>Zenmuse XT</td><td>-</td><td>13-90</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于镜头</p></td><td>NA</td><td>f/1.25 - f/1.4</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">固定 - 数值取决于镜头</p></td><td>NA</td></tr>
<tr>
<td>Zenmuse XT 2</td><td>-</td><td>13-90</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">取决于镜头</p></td><td>NA</td><td>f/1.25 - f/1.4</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">固定 - 数值取决于镜头</p></td><td>NA</td></tr>
<tr>
<td>Zenmuse Z3</td><td>-</td><td>92-35</td><td>22-77</td><td>f/2.8 - f/5.2</td><td>0.5 - &#8734</td></tr>
<tr>
<td>Zenmuse Z30</td><td>-</td><td>63.7-2.3</td><td>22-77</td><td>f/1.6 (广角) - f/4.7 (长焦)</td><td>0.1 - &#8734 (广角)<br>1.2 to &#8734 (长焦)</td></tr>
<tr>
<td>Zenmuse H20</td><td>-</td><td>广角 82.9, 变焦 66.6-4</td><td>广角 24, 变焦 31.7-556.2</td><td>广角 f/2.8, 变焦 f/2.8-f/11</td><td>广角: 1 - &#8734, 变焦: 1 - &#8734(广角), 8 - &#8734(长焦)</td></tr>
<tr>
<td>Zenmuse H20T</td><td>-</td><td>广角 82.9, 变焦 66.6-4, 红外 40.6</td><td>广角 24, 变焦 31.7-556.2, 红外 58</td><td>广角 f/2.8, 变焦 f/2.8-f/11, 红外 f/1.0</td><td>广角: 1 - &#8734, 变焦: 1 - &#8734(广角), 8 - &#8734(长焦), 变焦: 5 - &#8734</td></tr>
</tbody></table></html>

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9">相机对比: <b>云台, 存储介质 和 质量</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>可控云台 俯仰</br><font color="#BBBBBB" size=1 style="font-weight:bold">度</p></th>
<th><p>增稳轴</p></th>
<th><p>可控云台 偏航</br><font color="#BBBBBB" size=1 style="font-weight:bold">度</p></th>
<th><p>存储介质</p></th>
<th><p>质量</br><font color="#BBBBBB" size=1.7 style="font-weight:normal">配置云台</br><font color="#BBBBBB" size=1 style="font-weight:bold">克</p></th>
</tr>
<tr>
<td>Mavic 2 Pro</td><td>+/-75</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡和飞行器内部存储器</td><td>-</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>+/-75</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡和飞行器内部存储器</td><td>-</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>+/-75</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡和飞行器内部存储器</td><td>-</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>+/-75</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡和飞行器内部存储器</td><td>-</td></tr>
<tr>
<td>Mavic Air</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-100 to 22</td><td>SD存储卡和飞行器内部存储器</td><td>-</td></tr>
<tr>
<td>Mavic Pro</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Osmo</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr>
<td>Osmo +</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>262</td></tr>
<tr>
<td>Phantom 3 4K</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>-</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 4</td><td>+/- 15</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>+/- 15</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>+/- 15</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>+/- 15</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>+/- 15</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Spark</td><td>-</td><td>横滚轴, 俯仰轴</td><td>-85 to 0</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Zenmuse X3</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>247</td></tr>
<tr>
<td>Zenmuse X4S</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>CineSSD 和 SD存储卡</td><td>253</td></tr>
<tr>
<td>Zenmuse X5</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>526</td></tr>
<tr>
<td>Zenmuse X5R</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡, SSD</td><td>583</td></tr>
<tr>
<td>Zenmuse X5S</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>CineSSD 和 SD存储卡</td><td>461</td></tr>
<tr>
<td>Zenmuse X7</td><td>+/- 300</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-125 to 40</td><td>CineSSD 和 SD存储卡</td><td>628</br><p style="line-height:90%"><font color="#BBBBBB" size=1 style="font-weight:normal">DL 24mm F2.8 LS ASPH</p></td></tr>
<tr>
<td>Zenmuse XT</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>270</td></tr>
<tr>
<td>Zenmuse XT S</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-120 to 30</td><td>SD存储卡</td><td>387</td></tr>
<tr>
<td>Zenmuse XT 2</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>-</td></tr>
<tr>
<td>Zenmuse Z3</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>262</td></tr>
<tr>
<td>Zenmuse Z30</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-90 to 30</td><td>SD存储卡</td><td>556</td></tr>
<tr>
<td>Zenmuse H20</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-120 to 30</td><td>SD存储卡</td><td>678</td></tr>
<tr>
<td>Zenmuse H20T</td><td>+/- 320</td><td>横滚轴, 俯仰轴，偏航轴</td><td>-120 to 30</td><td>SD存储卡</td><td>828</td></tr>
</tbody></table></html>

### 遥控器

遥控器有以下几方面的不同点:

* 如何连接到移动设备
* 使用什么无线技术与飞机连接
* 是否内置GPS
* 是否可以输出第二路视频流
* 是否可以在双控配置中使用（一个人控制无人机，另一个人控制云台和相机）

使用WiFi连接到移动设备的遥控器将充当WiFi接入点，并且需要授权允许才能加入。

<html><table class="table-aircraft-comparison">
<thead><tr><th colspan="9"><b>遥控器对比</th></tr></thead>
<tbody>
<tr>
<th width = 20%><p>产品</p></th>
<th><p>遥控器</p></th>
<th><p>连接移动设备的方式</p></th>
<th><p>连接飞机的方式</p></th>
<th><p>支持双遥控器</p></th>
<th><p>内置GPS</p></th>
<th><p>第二路视频流输出</p></th>
<th><p>飞行模式切换</br><font color="#BBBBBB" size=1.7 style="font-weight:normal">使用SDK</p></th>
</tr>
<tr>
<td>Inspire 1</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>是</td><td>Mini HDMI</td><td>F</td></tr>
<tr>
<td>Inspire 1 Pro/Raw</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>是</td><td>Mini HDMI</td><td>F</td></tr>
<tr>
<td>Inspire 2</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 100</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>是</td><td>Mini HDMI</td><td>F</td></tr>
<tr>
<td>Matrice 300 RTK</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 200 V2</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 210 V2</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 210 RTK V2</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 200</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 210</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 210 RTK</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>-</td><td>Mini HDMI</td><td>P</td></tr>
<tr>
<td>Matrice 600</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>是</td><td>Mini HDMI, SDI</td><td>所有模式</td></tr>
<tr>
<td>Matrice 600 Professional</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>是</td><td>是</td><td>Mini HDMI, SDI</td><td>所有模式</td></tr>
<tr>
<td>Mavic 2 Pro</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Mavic 2 Zoom</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Mavic 2 Enterprise</td><td>需要</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Mavic 2 Enterprise Dual</td><td>需要 (不搭配内置屏幕)</td><td>USB</td><td>OcuSync 2</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Mavic Pro</td><td>可选</td><td>USB</td><td>OcuSync</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Mavic Air</td><td>可选</td><td>USB</td><td>WiFi</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Phantom 3 4K</td><td>需要</td><td>WiFi</td><td>WiFi, Aux</td><td>-</td><td>-</td><td>-</td><td>F</td></tr>
<tr>
<td>Phantom 3 Advanced</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>-</td><td>-</td><td>-</td><td>F</td></tr>
<tr>
<td>Phantom 3 Professional</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>-</td><td>-</td><td>-</td><td>F</td></tr>
<tr>
<td>Phantom 3 Standard</td><td>需要</td><td>WiFi</td><td>WiFi, Aux</td><td>-</td><td>-</td><td>-</td><td>F</td></tr>
<tr>
<td>Phantom 4</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Phantom 4 Advanced</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Phantom 4 Professional</td><td>需要</td><td>USB</td><td>Lightbridge</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Phantom 4 Professional V2</td><td>需要</td><td>USB</td><td>OcuSync</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Phantom 4 RTK</td><td>需要</td><td>USB</td><td>OcuSync</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
<tr>
<td>Spark</td><td>可选</td><td>WiFi</td><td>WiFi</td><td>-</td><td>-</td><td>-</td><td>P</td></tr>
</tbody></table></html>
