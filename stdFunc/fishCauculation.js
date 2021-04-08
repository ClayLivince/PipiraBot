//This is the standard function in this bot!!! Dont change it if you want to change the whole bot!!!
var W = require("../resources/weather/Weather");
var lang = require("../resources/zh-CN");
var strftime = require("strftime");
var {DATA} = require("../resources/data");
var {FISH,FISHING_SPOTS,WEATHER_RATES,WEATHER_TYPES,ZONES} = DATA;
const ET = 180000 //*毫秒*
var fullResults = require("../stdFunc/fullCauculation").fullResults;

function findKey (data,value,compare = (a, b) => a === b) { //由value找key
    return Object.keys(data).find(k => compare(data[k], value))
}

var fishCauculation = function(name){ //*每次Bot有攻略查询的时候执行,参数为鱼的名字
    if(!fullResults[name]){return null}
    var FISHID = fullResults[name]["id"];
    var information = FISH[FISHID];
    var zone;
    var zone_en;
    var realendtimes = [];
    var endtimes = []; //*时间数组,用于存放时间
    var realtimes = [];
    var times = []; //*时间数组,用于存放时间
    var startHourLeft = 0;
    var endHourLeft = 0;
    //*存放时间的处理过程
    if(information.location){
        //首先不能是多钓场的鱼
        if(FISHING_SPOTS[FISH[FISHID].location]){
            zone = ZONES[WEATHER_RATES[FISHING_SPOTS[FISH[FISHID].location].territory_id].zone_id].name_en
        }
        else{
            zone = null;
        }
        if(zone=="利姆萨·罗敏萨下层甲板"||zone=="利姆萨·罗敏萨上层甲板"){zone="海都"} //*海都单独处理
        if(zone=="格里达尼亚新街"||zone=="格里达尼亚旧街"){zone="森都"} //*森都单独处理
        if(zone!=null){zone_en = findKey(lang.default,zone);}else{zone_en = null;}
        if(information.weatherSet.length == 0 && information.previousWeatherSet.length == 0 && information.startHour == 0 && information.endHour ==24){
                for(let i=0;i<10;i++){
                times.push("常驻");
            }
        }
        else{
            startHourLeft = (information.startHour - Math.floor(information.startHour))*ET; //单位是毫秒
            endHourLeft = (information.endHour - Math.floor(information.endHour))*ET; //单位是毫秒
            if(zone_en!=null){
            //计算weatherSet
            var desiredWeathers = [];
            var previousWeathers = [];
            if(information.weatherSet.length!==0){
            information.weatherSet.forEach((value)=>{
                var name_index = W.zoneWeathers[zone_en].indexOf(findKey(lang.default,WEATHER_TYPES[value].name_en));
                desiredWeathers.push(name_index)
            })}
            if(information.previousWeatherSet.length!==0){
            information.previousWeatherSet.forEach((value)=>{
                var name_index = W.zoneWeathers[zone_en].indexOf(findKey(lang.default,WEATHER_TYPES[value].name_en));
                previousWeathers.push(name_index)
            })}
            var matches = W.find({ zone: zone_en, desiredWeathers: desiredWeathers, previousWeathers: previousWeathers, beginHour: Math.floor(information.startHour), endHour: Math.floor(information.endHour-1) });
            for(let i=0;i<matches.length;i++){
                var x = matches[i]();
                x.begin.setTime(x.begin.getTime()+startHourLeft)
                x.end.setTime(x.end.getTime()+endHourLeft)
                if(x.end<Date.now()){
                    continue;
                }
                realtimes.push(x.begin.getTime())
                times.push(strftime('%m月%d日 %H:%M:%S', x.begin))
                realendtimes.push(x.end.getTime())
                endtimes.push(strftime('%m月%d日 %H:%M:%S', x.end))
            }
        }
    }
    }
    fullResults[name]['realBeginTimes'] = realtimes;
    fullResults[name]['beginTimes'] = times;
    fullResults[name]['realEndTimes'] = realendtimes;
    fullResults[name]['endTimes'] = endtimes;
    return {'time':fullResults[name],'name':name};
}

module.exports = fishCauculation;
