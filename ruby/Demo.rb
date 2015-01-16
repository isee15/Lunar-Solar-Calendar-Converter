require "./LunarSolarConverter.rb"

def dump(obj)
	puts "["
	obj.instance_variables.map{|var| puts [var, obj.instance_variable_get(var)].join(":")}
	puts "]"
end
converter = LunarSolarConverter.new
solar = Solar.new
solar.solarYear = 2015
solar.solarMonth = 1
solar.solarDay = 15
dump(solar);
lunar = converter.SolarToLunar(solar)
dump(lunar);
solar = converter.LunarToSolar(lunar)
dump(solar);