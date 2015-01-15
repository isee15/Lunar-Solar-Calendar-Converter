/**
 * Created by isee15 on 15/1/15.
 */
var http = require('http');
var net = require('net');
var url = require('url');
//var querystring = require('querystring');
var lsconverter = require('./LunarSolarConverter.io.js');

// Create an HTTP server
var proxy = http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var converter = new lsconverter.LunarSolarConverter();
    var queryParam = String(query['src']);
    var params = queryParam.split(",");
    console.log(params);
    var contents = queryParam + " format is not correct,try http://localhost:1337/?src=2015,1,15 or http://localhost:1337/?src=2015,1,15,0";
    if (params.length == 3) {
        var solar = new lsconverter.Solar();
        solar.solarYear = parseInt(params[0]);
        solar.solarMonth = parseInt(params[1]);
        solar.solarDay = parseInt(params[2]);
        var lunar = converter.SolarToLunar(solar);
        console.log(lunar);
        contents = "" + lunar.lunarYear + "," + lunar.lunarMonth + "," + lunar.lunarDay + "," + (lunar.isleap ? 1 : 0) + "";
    } else if (params.length == 4) {
        var lunar = new lsconverter.Lunar();
        lunar.lunarYear = parseInt(params[0]);
        lunar.lunarMonth = parseInt(params[1]);
        lunar.lunarDay = parseInt(params[2]);
        lunar.isleap = (params[3] == 1);
        var solar = converter.LunarToSolar(lunar);
        console.log(solar);
        contents = "" + solar.solarYear + "," + solar.solarMonth + "," + solar.solarDay + "";
    }
    console.log(contents);
    res.end(contents);
});

// now that proxy is running
proxy.listen(1337, '127.0.0.1', function () {

});