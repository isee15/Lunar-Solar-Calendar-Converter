import 'lunar_solar_converter.dart';

main(List<String> arguments) {
  Lunar lunar = Lunar(lunarYear: 2020, lunarMonth: 4, lunarDay: 4, isLeap: true);
  var result1 = LunarSolarConverter.lunarToSolar(lunar);
  var dateTime = result1.dateTime;
  print("$lunar -> $result1 / $dateTime");

  Solar solar = Solar(solarYear: 2020, solarMonth: 5, solarDay: 26);
  Lunar result2 = LunarSolarConverter.solarToLunar(solar);
  print("$solar -> $result2");
}