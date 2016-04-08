# -*- coding: utf-8 -*-
# latest version in https://github.com/isee15/Lunar-Solar-Calendar-Converter
__author__ = 'isee15'

from pprint import pprint

from LunarSolarConverter import LunarSolarConverter

converter = LunarSolarConverter.LunarSolarConverter()

solar = LunarSolarConverter.Solar(2016, 4, 8)
pprint(vars(solar))

lunar = converter.SolarToLunar(solar)
pprint(vars(lunar))

solar = converter.LunarToSolar(lunar)
pprint(vars(solar))