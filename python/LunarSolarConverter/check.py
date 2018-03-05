# -*- coding: utf-8 -*-
__author__ = 'isee15'

import urllib2
import datetime
from pprint import pprint

from LunarSolarConverter import LunarSolarConverter, Solar


startDateStr = '01/01/1900'
startDate = datetime.datetime.strptime(startDateStr, "%m/%d/%Y")
endDateStr = '12/31/2099'
endDate = datetime.datetime.strptime(endDateStr, "%m/%d/%Y")
curDate = startDate;
converter = LunarSolarConverter()
while curDate < endDate:
    solar = Solar(curDate.year, curDate.month, curDate.day)
    # pprint(vars(solar))
    ret = urllib2.urlopen(
        'http://localhost:1337/?src={},{},{}'.format(solar.solarYear, solar.solarMonth, solar.solarDay)).read();
    lunar = converter.SolarToLunar(solar)
    if ret != '{},{},{},{:d}'.format(lunar.lunarYear, lunar.lunarMonth, lunar.lunarDay, lunar.isleap):
        pprint(vars(lunar))
        print(ret)
    solar = converter.LunarToSolar(lunar)

    ret = urllib2.urlopen(
        'http://localhost:1337/?src={},{},{},{:d}'.format(lunar.lunarYear, lunar.lunarMonth, lunar.lunarDay,
                                                          lunar.isleap)).read();
    if ret != '{},{},{}'.format(solar.solarYear, solar.solarMonth, solar.solarDay):
        pprint(vars(solar))
        print(ret)

    curDate = curDate + datetime.timedelta(days=1)

print("Check Done")
