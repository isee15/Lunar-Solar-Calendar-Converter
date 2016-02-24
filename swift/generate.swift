//
//  main.swift
//  LunarSolarConverter
//
//  Created by isee15 on 15/1/17.
//  Copyright (c) 2015年 isee15. All rights reserved.
//

import Foundation

class GenSourceData {
    let lunarCal = NSCalendar(calendarIdentifier: NSCalendarIdentifierChinese)
    let unitFlags: NSCalendarUnit = [.Day, .Month, .Year]

    func dateFrom(year: Int, month: Int, day: Int) -> NSDate {
        let calendar = NSCalendar(identifier: NSCalendarIdentifierGregorian)
        let components = NSDateComponents()
        components.year = year
        components.month = month
        components.day = day
        components.hour = 12
        components.minute = 0
        components.second = 0
        components.timeZone = NSTimeZone(name: "GMT+0800")

        let swSolar = calendar?.dateFromComponents(components)
        return swSolar!
    }

    func solarToLunar(curD: NSDate) -> NSDateComponents {
        let swLunar = lunarCal!.components(unitFlags, fromDate: curD)

        let formatter = NSDateFormatter()
        formatter.locale = NSLocale(localeIdentifier: "zh-Tw_POSIX")
        formatter.dateStyle = .MediumStyle
        formatter.calendar = lunarCal
        let lunarString = formatter.stringFromDate(curD)
        let lunarYear = lunarString.substringToIndex(lunarString.startIndex.advancedBy(4))

        let ret = NSDateComponents()
        ret.year = Int(lunarYear)!
        ret.month = swLunar.month
        ret.day = swLunar.day
        ret.leapMonth = swLunar.leapMonth
        return ret;
    }

    func lunar11ToSolar(year: Int) -> NSDate {
        var curD = dateFrom(year, month: 1, day: 15)
        while true {
            let lunarComponent = solarToLunar(curD)
            if (lunarComponent.month == 1 && lunarComponent.day == 1) {
                return curD;
            }
            curD = curD.dateByAddingTimeInterval(60 * 60 * 24)
        }
    }

    func lunarMonth1FromSolar(solar11: NSDate) -> Int {
        var curD = solar11;
        //var days: [Int] = []
        var leap = 0;
        var ret = 0;
        let component11 = solarToLunar(curD);
        for index in 1 ... 13 {
            //阴历月份只有30天和29天2种
            curD = curD.dateByAddingTimeInterval(29 * 60 * 60 * 24)
            var component = solarToLunar(curD);
            if (component.day == 1 || component.day == 0) {
                //days.append(0);
                if (component11.year == component.year && component.leapMonth) {
                    leap = index;
                } else if (component.month == 1 && component.day == 1 && component11.year == component.year - 1) {
                    break;
                }

            } else {
                curD = curD.dateByAddingTimeInterval(60 * 60 * 24)
                component = solarToLunar(curD);
                //正常这个地方一定能进去
                if ((component.day == 1 || component.day == 0) && component11.year == component.year) {
                    //days.append(1);
                    ret |= (1 << (13 - index));
                    if (component.leapMonth) {
                        leap = index;
                    }
                } else if (component.month == 1 && component.day == 1 && component11.year == component.year - 1) {
                    ret |= (1 << (13 - index));
                    break;
                } else {
                    print("error-------\(curD)");
                }
            }

        }
        return (leap << 13) | ret;
    }

    func genData(beginY: Int, endY: Int) -> Void {
        let calendar = NSCalendar(identifier: NSCalendarIdentifierGregorian)
        var s1 = "";
        var s2 = "";
        for (var y = beginY - 2; y < endY + 2; y++) {
            let solarDate = lunar11ToSolar(y)
            let solarD = calendar!.components(unitFlags, fromDate: solarDate);
            let solar11 = (y << 9) | (solarD.month << 5) | (solarD.day);
            s1 += "0x" + String(solar11, radix: 16) + ", ";
            let lunarMonth = lunarMonth1FromSolar(solarDate);
            s2 += "0x" + String(lunarMonth, radix: 16) + ", ";
            print("generate year: \(y) \(String(solar11, radix: 16)) \(String(lunarMonth, radix: 16))")
        }
        s1 += "";
        s2 += "";


        print("------------------------------")
        print("lunar_month_days=[\(beginY - 3),\(s2)]");
        print("------------------------------")
        print("solar_1_1=[\(beginY - 3),\(s1)]");
        print("done");

    }

}


