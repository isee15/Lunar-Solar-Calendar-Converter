# Lunar-Solar-Calendar-Converter
公历(阳历)农历(阴历)转换，支持时间段从1900-2100
支持各种编程语言

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