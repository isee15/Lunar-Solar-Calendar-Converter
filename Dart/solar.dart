part of lunar_calendar_converter;

class Solar {
  int _solarYear;
  int solarMonth;
  int solarDay;

  Solar({int solarYear, int solarMonth, int solarDay}) {
    this.solarYear = solarYear;
    this.solarMonth = solarMonth;
    this.solarDay = solarDay;
  }

  set solarYear(int v) {
    if (v == 0) {
      //规定公元 0 年即公元前 1 年
      v = -1;
    }
    _solarYear = v;
  }

  get solarYear => _solarYear;

  get dateTime => DateTime(_solarYear, solarMonth, solarDay);

  toString() {
    String result = "";
    if (solarYear != null) {
      int absYear = solarYear.abs();
      String prefix = (solarYear < 0 ? "公元前" : "公元");
      result += "$prefix$absYear年";
    }
    if (solarMonth != null) {
      if (solarMonth < 1 || solarMonth > 12) {
        return "非法日期";
      }
      result += "$solarMonth月";

      if (solarDay != null) {
        if (solarDay < 1 || solarDay > 31) {
          return "非法日期";
        }
        result += "$solarDay日";
      }
    }
    return result.length < 1 ? "非法日期" : result;
  }
}