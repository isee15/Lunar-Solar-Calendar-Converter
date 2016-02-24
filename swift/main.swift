//
//  main.swift
//  LunarSolarConverter
//
//  Created by isee15 on 15/1/17.
//  Copyright (c) 2015年 isee15. All rights reserved.
//

import Foundation

func getLunarDate(solarDate: NSDate) -> String {
    let formatter = NSDateFormatter()
    formatter.locale = NSLocale(localeIdentifier: "zh-Tw_POSIX")
    formatter.dateStyle = .MediumStyle
    let Cal = NSCalendar(calendarIdentifier: NSCalendarIdentifierChinese)
    formatter.calendar = Cal
    return formatter.stringFromDate(solarDate)

}

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

//var solar = Solar(solarYear: 2263, solarMonth: 2, solarDay: 7)
//var lunar = LunarSolarConverter.SolarToLunar(solar)
//print("lunar: \(lunar.lunarYear) \(lunar.lunarMonth) \(lunar.lunarDay) \(lunar.isleap)")
//solar = LunarSolarConverter.LunarToSolar(lunar);
//print("solar: \(solar.solarYear) \(solar.solarMonth) \(solar.solarDay)")

func check() -> Void {
    var begin = dateFrom(1900, month: 1, day: 1);
    let end = dateFrom(2300, month: 1, day: 1);

    let calendar = NSCalendar(identifier: NSCalendarIdentifierGregorian)
    let lunarCal = NSCalendar(calendarIdentifier: NSCalendarIdentifierChinese)

    var yy = 0;
    while begin.compare(end) == NSComparisonResult.OrderedAscending {
        let unitFlags: NSCalendarUnit = [.Day, .Month, .Year]
        let swLunar = lunarCal!.components(unitFlags, fromDate: begin)

        let components = calendar?.components(unitFlags, fromDate: begin);
        var solar = Solar(solarYear: (components?.year)!, solarMonth: (components?.month)!, solarDay: (components?.day)!)
        let lunar = LunarSolarConverter.SolarToLunar(solar)
        if (components?.year > yy) {
            yy = (components?.year)!;
            print("year: \(yy)");
        }
        let formatter = NSDateFormatter()
        //formatter.locale = NSLocale(localeIdentifier: "zh-Tw_POSIX")
        formatter.dateStyle = .MediumStyle
        formatter.calendar = lunarCal
        let lunarString = formatter.stringFromDate(begin)
        let lunarYear = lunarString.substringToIndex(lunarString.startIndex.advancedBy(4))
        // swLunar.year is like 甲子
        if (lunar.lunarYear != Int(lunarYear) || lunar.lunarMonth != swLunar.month || lunar.lunarDay != swLunar.day || lunar.isleap != swLunar.leapMonth) {
            print("swlunar: \(lunarYear) \(swLunar.month) \(swLunar.day) \(swLunar.leapMonth)")
            print("lunar: \(lunar.lunarYear) \(lunar.lunarMonth) \(lunar.lunarDay) \(lunar.isleap)")
            solar = LunarSolarConverter.LunarToSolar(lunar);
            print("solar: \(solar.solarYear) \(solar.solarMonth) \(solar.solarDay)")
        }
        begin = begin.dateByAddingTimeInterval(60 * 60 * 24);
    }

    print("done");
}

print(getLunarDate(dateFrom(2097, month: 8, day: 7)))
print(getLunarDate(dateFrom(2057, month: 9, day: 28)))
print(getLunarDate(dateFrom(1900, month: 1, day: 30)))
print(getLunarDate(dateFrom(1900, month: 1, day: 31)))
print(getLunarDate(dateFrom(1901, month: 1, day: 20)))


//generate lunarMonth and solar11 data
let gen = GenSourceData()
gen.genData(1900, endY: 2300);

check()

