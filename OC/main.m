//
//  main.m
//  LunarSolarConverter
//
//  Created by isee15 on 15/12/10.
//  Copyright (c) 2015 isee15. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LunarSolarConverter.h"


NSString *getResult(NSString *str) {
    NSString *url = [NSString stringWithFormat:@"http://localhost:1337/?src=%@", str];
    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:url]];
    NSURLResponse *response = nil;
    NSError *error = nil;
    NSData *data = [NSURLConnection sendSynchronousRequest:urlRequest returningResponse:&response error:&error];
    return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
}

NSDate *createDate(int year, int month, int day) {
    NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
    NSDateComponents *components = [[NSDateComponents alloc] init];
    [components setYear:year];
    [components setMonth:month];
    [components setDay:day];
    return [calendar dateFromComponents:components];
}

void unitTest() {
    NSDate *dt = createDate(1900, 1, 1);
    NSDate *endTime = createDate(2099, 12, 31);
    while ([dt compare:endTime] == NSOrderedAscending) {
        NSDateComponents *components = [[NSCalendar currentCalendar] components:NSCalendarUnitDay | NSCalendarUnitMonth | NSCalendarUnitYear fromDate:dt];
        int year = (int) [components year];
        int month = (int) [components month];
        int day = (int) [components day];
        Solar *sd = [[Solar alloc] init];
        sd.solarYear = year;
        sd.solarMonth = month;
        sd.solarDay = day;
        Lunar *ld = [LunarSolarConverter solarToLunar:sd];
        NSString *solarString = [NSString stringWithFormat:@"%d,%d,%d", year, month, day];
        NSString *lunarString = getResult(solarString);
        NSString *solar2String = getResult(lunarString);
        if (![lunarString isEqualToString:[NSString stringWithFormat:@"%d,%d,%d,%d", ld.lunarYear, ld.lunarMonth, ld.lunarDay, (ld.isleap ? 1 : 0)]]) {
            NSLog(@"lunar error: %@", lunarString);
        }
        if (![solarString isEqualToString:solar2String]) {
            NSLog(@"solar error: %@", solarString);
        }
        dt = [dt dateByAddingTimeInterval:60 * 60 * 24];
    }
    NSLog(@"check done");
}

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        unitTest();
    }

    return 0;
}