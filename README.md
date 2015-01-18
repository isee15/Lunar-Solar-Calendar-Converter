# Lunar Solar Calendar Converter
公历(阳历) 农历(阴历)转换，支持时间段从1900-2100<br>
如果需要更长的时间段，利用generate.htm生成的数据即可。<br>
支持各种编程语言 C#,java,Objective-C,php,Python,javascript(nodejs),C/C++,ruby,swift等<br>
支持Mac，Windows，Android，WP多种平台

###数据验证
```
1.用io.js(nodejs)写了一个httpserver，各种语言可以通过下面的http接口验证不同实现的数据一致性。
在javascript目录下node check.js启动

2.http://localhost:1337/?src=2015,1,15 (公历转农历，返回2014,11,25,0) 或者 
  http://localhost:1337/?src=2014,11,25,0 (农历转公历，返回2015,1,15)

3.比如在C#版本中,Check.cs 实现了C#与nodejs的数据比对
```

### 基本原理
* 查表。有2个数据表，对于每一年，一张表存着X年正月初一对应的公历年月日，另一张表存着X年农历每个月的天数以及闰月的月份。
然后根据这两张表进行日期的偏移。
* 所有数据通过了微软ChineseLunisolarCalendar类的比对。比对程序在C\#版本中。



##API For CSharp or Java
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

##API For python
```
/**
*农历转公历
*/
def LunarToSolar(self, lunar):

/**
*公历转农历
*/
def SolarToLunar(self, solar):
```

##API For javascript
```
/**
*农历转公历
*/
this.LunarToSolar = function (lunar)

/**
*公历转农历
*/
this.SolarToLunar = function (solar)
```

##API For C/C++
```
/**
*农历转公历
*/
Solar LunarToSolar(Lunar lunar);

/**
*公历转农历
*/
Lunar SolarToLunar(Solar solar);
```

##API For ruby
```
/**
*农历转公历
*/
def LunarToSolar(lunar)

/**
*公历转农历
*/
def SolarToLunar(solar)
```

##API For swift
```
/**
*农历转公历
*/
class func LunarToSolar( lunar:Lunar)->Solar

/**
*公历转农历
*/
class func SolarToLunar( solar:Solar)->Lunar
```