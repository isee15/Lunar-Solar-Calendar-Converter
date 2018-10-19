require "./lunar_solar_converter"

def dump(obj)
  puts "["
  obj.instance_variables.map{ |var| puts [var, obj.instance_variable_get(var)].join(": ") }
	puts "]"
end

converter = LunarSolarConverter.new

solar = Solar.new
solar.solar_year = 2018
solar.solar_month = 1
solar.solar_day = 1

dump(solar)
lunar = converter.solar_to_lunar(solar)

dump(lunar)
solar = converter.lunar_to_solar(lunar)

dump(solar)

solar = Solar.new
solar.solar_year = 2018
solar.solar_month = 12
solar.solar_day = 31

dump(solar)
lunar = converter.solar_to_lunar(solar)

dump(lunar)
solar = converter.lunar_to_solar(lunar)

dump(solar)
