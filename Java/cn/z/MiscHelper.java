package cn.z;

class MiscHelper
{

    private static final String[] Gan = { "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸" };
    private static final String[] Zhi = {"子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"};

    /**
	 * 
	 * @param lunarYear 农历年份
	 * @return String of Ganzhi: 甲子年
	 * Tiangan:甲乙丙丁戊己庚辛壬癸<br/>Dizhi: 子丑寅卯辰巳无为申酉戌亥
	 */
    public static String lunarYearToGanZhi(int lunarYear)
    {
        int ganZhiIndex = lunarYear - 4;
        if (ganZhiIndex < 0) {
            ganZhiIndex += 60;
        }  
        String ganZhi = Gan[ganZhiIndex % 10] + Zhi[ganZhiIndex % 12];
        return ganZhi;
    }

    /**
        *
        * @param lunarYear 农历年份
        * @return String of Animal: 鼠牛虎兔龙蛇马羊猴鸡狗猪
        */
    public static String lunarYearToAnimal(int lunarYear)
    {
        int animalIndex = (lunarYear - 4) % 12;
        String animal = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        return animal.substring(animalIndex, animalIndex + 1);
    }

    /**
        *
        * @param month 公历月份
        * @param day 公历日期
        * @return String of constellation: 星座
        */
    public static String constellation(int month, int day)
    {
        String[] constellationArr = {  "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座","摩羯座", "水瓶座", "双鱼座" };
        int mmdd = month * 100 + day;
        if (mmdd >= 321 && mmdd <= 419) {
            return constellationArr[0];
        }
        if (mmdd >= 420 && mmdd <= 520) {
            return constellationArr[1];
        }
        if (mmdd >= 521 && mmdd <= 620) {
            return constellationArr[2];
        }
        if (mmdd >= 621 && mmdd <= 722) {
            return constellationArr[3];
        }
        if (mmdd >= 723 && mmdd <= 822) {
            return constellationArr[4];
        }
        if (mmdd >= 823 && mmdd <= 922) {
            return constellationArr[5];
        }
        if (mmdd >= 923 && mmdd <= 1022) {
            return constellationArr[6];
        }
        if (mmdd >= 1023 && mmdd <= 1121) {
            return constellationArr[7];
        }
        if (mmdd >= 1122 && mmdd <= 1221) {
            return constellationArr[8];
        }
        if (mmdd >= 1222 || mmdd <= 119) {
            return constellationArr[9];
        }
        if (
            mmdd >= 120 && mmdd <= 218) {
            return constellationArr[10];
        }
        if (mmdd >= 219 && mmdd <= 320) {
            return constellationArr[11];
        }
        return "";
    }

}
