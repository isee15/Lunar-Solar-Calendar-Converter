part of lunar_calendar_converter;

class Lunar {
  //农历对应的公历年份。如 2018 表示与公历公元 2018 年对应的农历戊戌年；-200 表示与公历公元前 200 年对应的农历辛丑年；0/-1 年均表示公历公元前 1 年，农历庚申年。
  int _lunarYear;
  int lunarMonth;
  int lunarDay;
  bool isLeap;

  static List<String> _lunarMonthList = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  static List<String> _lunarDayList = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
  static List<String> _tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  static List<String> _dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  Lunar({int lunarYear, int lunarMonth, int lunarDay, bool isLeap}) {
    this.lunarYear = lunarYear;
    this.lunarMonth = lunarMonth;
    this.lunarDay = lunarDay;
    this.isLeap = isLeap == null ? false : isLeap;
  }

  set lunarYear(int v) {
    if (v == 0) {
      //规定公元 0 年即公元前 1 年
      v = -1;
    }
    _lunarYear = v;
  }

  int get lunarYear => _lunarYear;

  toString() {
    String result = "";
    if (lunarYear != null) {
      int year = lunarYear;
      if (year < 0) {
        //确保能读到正确的天干地支数据
        year++;
      }
      if (year < 1900) {
        //把远古年代转到近代来计算天干地支
        year += ((2018 - year) / 60).floor() * 60;
      }
      int absYear = lunarYear.abs();
      String prefix = (lunarYear < 0 ? "公元前" : "") + "$absYear";
      result += ((_tiangan[(year - 4) % _tiangan.length]) + (_dizhi[(year - 4) % _dizhi.length]) + "年($prefix)");
    }
    if (lunarMonth != null) {
      if (lunarMonth < 1 || lunarMonth > 12) {
        return "非法日期";
      }
      String month = _lunarMonthList[lunarMonth - 1];
      String leap = isLeap ? "闰" : "";
      result += "$leap$month月";

      if (lunarDay != null) {
        if (lunarDay < 1 || lunarDay > 30) {
          return "非法日期";
        }
        result += _lunarDayList[lunarDay - 1];
      }
    }
    return result.length < 1 ? "非法日期" : result;
  }
}