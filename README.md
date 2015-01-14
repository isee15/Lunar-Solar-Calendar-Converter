# Lunar-Solar-Calendar-Converter
公历(阳历)农历(阴历)转换，支持时间段从1900-2100
支持各种编程语言 C#,Objective-C,php 等

### 基本原理
* 查表。有2个数据表，对于每一年，一张表存着X年正月初一对应的公历年月日，另一张表存着X年农历每个月的天数以及闰月的月份。
然后根据这两张表进行日期的偏移。
* 所有数据通过了微软ChineseLunisolarCalendar类的比对。比对程序在C#版本中。



##API For C#
```
/**
*农历转公历
*/
public static Solar LunarToSolar(Lunar lunar)

/**
*公历转农历
*/
public static Lunar SolarToLunar(Solar solar)
```

##API For Objective-C
```
/**
*农历转公历
*/
+ (Solar *)lunarToSolar:(Lunar *)lunar;

/**
*公历转农历
*/
+ (Lunar *)solarToLunar:(Solar *)solar;
```

##API For php
```
/**
*农历转公历
*/
public static function LunarToSolar($lunar)

/**
*公历转农历
*/
public static function SolarToLunar($solar)
```