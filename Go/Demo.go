// code by isee15
// from https://github.com/isee15/Lunar-Solar-Calendar-Converter
//
package main

import (
    "./lunarsolar"
    "fmt"
    "net/http"
    "io/ioutil"
    "time"
)

func getResult(param string) string{
    checkurl := fmt.Sprintf("http://localhost:1337/?src=%s",param)
    resp, err := http.Get(checkurl)
    if err == nil {
        defer resp.Body.Close()
        body, err := ioutil.ReadAll(resp.Body)
        if err == nil {
            ret := string(body)
            //fmt.Println(param,ret)
            return ret
        }
    }
    return ""
}

func check() {
    var startTime = time.Date(1900, 1, 1, 12, 0, 0, 0, time.UTC)
    var endTime = time.Date(2100, 1, 1, 12, 0, 0, 0, time.UTC)
    for startTime.Before(endTime) {
        y := int(startTime.Year())
        m := int(startTime.Month())
        d := int(startTime.Day())
        var solar = &lunarsolar.Solar{SolarYear:y,SolarMonth:m,SolarDay:d}
        var lunar = lunarsolar.SolarToLunar(*solar)
        solarStr := fmt.Sprintf("%v,%v,%v",y,m,d)
        leap := 0
        if lunar.IsLeap {
            leap = 1
        }
        lunarStr := fmt.Sprintf("%v,%v,%v,%d",lunar.LunarYear,lunar.LunarMonth,lunar.LunarDay,leap)
        if (lunarStr != getResult(solarStr)) {
            fmt.Println(solar)
            fmt.Println(lunar)
        }
        solar = lunarsolar.LunarToSolar(*lunar)
        if (solarStr != getResult(lunarStr)) {
            fmt.Println(solar)
            fmt.Println(lunar)
        }
        startTime = startTime.AddDate(0,0,1)
   } 
}

func main() {
    var solar = &lunarsolar.Solar{SolarYear:2016,SolarMonth:4,SolarDay:8}
    fmt.Println(solar)
    var lunar = lunarsolar.SolarToLunar(*solar)
    fmt.Println(lunar)
    solar = lunarsolar.LunarToSolar(*lunar)
    fmt.Println(solar)
    check();
    fmt.Println("check done")
}