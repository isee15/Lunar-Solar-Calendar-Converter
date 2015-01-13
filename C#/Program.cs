using System;
using System.Globalization;
using Cn.Z;

namespace Util
{
    internal class Program
    {
        private static readonly ChineseLunisolarCalendar cnCalendar = new ChineseLunisolarCalendar();

        public static Lunar DateTimeToLunar(DateTime solar)
        {
            try
            {
                var ld = new Lunar();
                ld.lunarYear = cnCalendar.GetYear(solar);
                ld.lunarMonth = cnCalendar.GetMonth(solar);
                ld.lunarDay = cnCalendar.GetDayOfMonth(solar);
                if ((cnCalendar.GetLeapMonth(ld.lunarYear) > 0 && cnCalendar.GetLeapMonth(ld.lunarYear) <= ld.lunarMonth))
                {
                    if (cnCalendar.IsLeapMonth(ld.lunarYear, ld.lunarMonth))
                        ld.isleap = true;
                    ld.lunarMonth -= 1;
                }
                return ld;
            }
            catch
            {
                return new Lunar();
            }
        }

        public static void Verify()
        {
            DateTime endDt = cnCalendar.MaxSupportedDateTime;
            for (DateTime dt = cnCalendar.MinSupportedDateTime; dt < endDt; dt = dt.AddDays(1))
            {
                Lunar ld =
                    LunarSolarConverter.SolarToLunar(new Solar
                    {
                        solarYear = dt.Year,
                        solarMonth = dt.Month,
                        solarDay = dt.Day
                    });
                Lunar ld2 = DateTimeToLunar(dt);
                Solar sd = LunarSolarConverter.LunarToSolar(ld2);
                if (ld.lunarYear != ld2.lunarYear || ld.lunarMonth != ld2.lunarMonth || ld.lunarDay != ld2.lunarDay ||
                    ld.isleap != ld2.isleap)
                {
                    Console.WriteLine("----" + dt.Year + "/" + dt.Month + "/" + dt.Day);
                    Console.WriteLine("ms----" + ld2.lunarYear + "/" + ld2.lunarMonth + "/" + ld2.lunarDay + "/" +
                                      ld2.isleap);
                    Console.WriteLine("ld----" + ld.lunarYear + "/" + ld.lunarMonth + "/" + ld.lunarDay + "/" +
                                      ld.isleap);
                }
                if (sd.solarYear != dt.Year || sd.solarMonth != dt.Month || sd.solarDay != dt.Day)
                {
                    Console.WriteLine("----" + dt.Year + "/" + dt.Month + "/" + dt.Day);
                    Console.WriteLine("sd----" + sd.solarYear + "/" + sd.solarMonth + "/" + sd.solarDay);
                }
            }
        }

        private static void Main(string[] args)
        {
            Verify();
            Console.WriteLine("Verify Done---------------------------------------");
            Console.Read();
        }
    }
}