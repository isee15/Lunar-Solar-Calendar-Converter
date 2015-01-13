//
//  LunarSolarConverter.h
//
//
//  Created by isee15 on 15/1/13.
//  Copyright (c) 2015年 isee15. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Lunar : NSObject
/**
*是否闰月
*/
@property(assign) BOOL isleap;
/**
*农历 日
*/
@property(assign) int lunarDay;
/**
*农历 月
*/
@property(assign) int lunarMonth;
/**
*农历 年
*/
@property(assign) int lunarYear;

@end

@interface Solar : NSObject
/**
*公历 日
*/
@property(assign) int solarDay;
/**
*公历 月
*/
@property(assign) int solarMonth;
/**
*公历 年
*/
@property(assign) int solarYear;
@end


@interface LunarSolarConverter : NSObject
/**
*农历转公历
*/
+ (Solar *)lunarToSolar:(Lunar *)lunar;

/**
*公历转农历
*/
+ (Lunar *)solarToLunar:(Solar *)solar;
@end
