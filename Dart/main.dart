import 'lunar.dart';
import 'solar.dart';
import 'lunar_solar_converter.dart';

main(List<String> arguments) {
  Lunar lunar = Lunar(lunarYear: 2020, lunarMonth: 4, lunarDay: 1, isLeap: true);
  var result = LunarSolarConverter.lunarToSolar(lunar);
  print("$lunar -> $result");

  Solar solar = Solar(solarYear: 2020, solarMonth: 5, solarDay: 23);
  result = LunarSolarConverter.solarToLunar(solar);
  print("$solar -> $result");
}