using System;
using System.Globalization;
using System.IO;
using System.Net;
using System.Text;
using Cn.Z;

namespace Util
{
    internal class Check
    {
        private static readonly ChineseLunisolarCalendar cnCalendar = new ChineseLunisolarCalendar();
        private static string GetResult(string src)
        {
            try
            {
                string url = "http://localhost:1337/?src=" + src;
                System.Net.WebRequest wReq = System.Net.WebRequest.Create(url);
                // Get the response instance.
                System.Net.WebResponse wResp = wReq.GetResponse();
                System.IO.Stream respStream = wResp.GetResponseStream();
                using (System.IO.StreamReader reader = new System.IO.StreamReader(respStream, Encoding.GetEncoding("UTF-8")))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (System.Exception ex)
            {
                //errorMsg = ex.Message;
            }
            return "";
        }
        public static void Verify()
        {
            DateTime endDt = cnCalendar.MaxSupportedDateTime;
            for (DateTime dt = cnCalendar.MinSupportedDateTime; dt < endDt; dt = dt.AddDays(1))
            {
                Solar sd = new Solar();
                sd.solarYear = dt.Year;
                sd.solarMonth = dt.Month;
                sd.solarDay = dt.Day;
                Lunar ld = LunarSolarConverter.SolarToLunar(sd);
                string solarString = dt.Year + "," + dt.Month + "," + dt.Day;
                string lunarString = GetResult(solarString);
                string solar2String = GetResult(lunarString);
                if (lunarString != (ld.lunarYear + "," + ld.lunarMonth + "," + ld.lunarDay + "," + (ld.isleap ? 1 : 0)))
                {
                    Console.WriteLine("lunar error:" + lunarString);
                }
                if (solarString != solar2String)
                {
                    Console.WriteLine("solar error:" + solarString);
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