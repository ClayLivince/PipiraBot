var lang = require("../resources/zh-CN");
var strftime = require("strftime");
var W = require("../resources/weather/Weather");
var {DATA} = require("../resources/data");
const ET = 180000 //*毫秒*
var {FISH,FISHING_SPOTS,ITEMS,WEATHER_RATES,WEATHER_TYPES,ZONES} = DATA;
function findKey (data,value,compare = (a, b) => a === b) { //由value找key
    return Object.keys(data).find(k => compare(data[k], value))
}
var fullResults = {}; //!这里存放所有结果,格式为{"鱼ID","鱼名":{鱼近10次的时间:[],"是否需要鱼眼","鱼饵","钓场","最佳钓鱼路线","轻杆重杆","前置"的格式存储,每当有请求的时候就根据ID更新对应鱼的时间}}
var fullCaculation = function(){ //*每次Bot启动的时候执行一次
    for (let id in FISH) {
        var information = FISH[id];
        var zone;
        var location = null; //默认值为null
        var zone_en;
        var realendtimes = [];
        var endtimes = []; //*时间数组,用于存放结束时间
        var realtimes = [];;
        var times = []; //*时间数组,用于存放开始时间
        var paths = ""; //*路线数组,用于存放路线
        var type = ""; //*轻杆，中杆，鱼王杆
        var startHourLeft = 0;
        var endHourLeft = 0;
        //*合适路线的处理过程
        information.bestCatchPath.forEach((value,index)=>{
            if(index!==0){paths+="-->"}
            paths+=ITEMS[value].name_en;
        })
        if(information.tug == "light"){
            type = "轻杆";
        }
        else if(information.tug == "medium"){
            type = "中杆";
        }
        else{
            type = "鱼王杆";
        }
        //*存放时间的处理过程
        if(information.location){
            //首先不能是多钓场的鱼
            if(FISHING_SPOTS[FISH[id].location]){
                zone = ZONES[WEATHER_RATES[FISHING_SPOTS[FISH[id].location].territory_id].zone_id].name_en
            }
            else{
                zone = null;
            }
            if(zone=="利姆萨·罗敏萨下层甲板"||zone=="利姆萨·罗敏萨上层甲板"){zone="海都"} //*海都单独处理
            if(zone=="格里达尼亚新街"||zone=="格里达尼亚旧街"){zone="森都"} //*森都单独处理
            if(zone!=null){zone_en = findKey(lang.default,zone);location = FISHING_SPOTS[FISH[id].location].name_en}else{zone_en = null;}
            if(information.weatherSet.length == 0 && information.previousWeatherSet.length == 0 && information.startHour == 0 && information.endHour ==24){
                    for(let i=0;i<10;i++){
                    times.push("常驻");
                }
            }
            else{
                //TODO 处理一下information.startHour以及information.endHour
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
                    times.push(strftime('%m/%d-%H:%M:%S', x.begin))
                    realendtimes.push(x.end.getTime())
                    endtimes.push(strftime('%m/%d-%H:%M:%S', x.end))
                }
            }
        }
            var result = {} //*临时存放信息的对象
            result["id"] = id;
            result["beginTimes"] = times;
            result["realBeginTimes"] = realtimes;
            result["endTimes"] = endtimes;
            result["realEndTimes"] = realendtimes;
            result["location"] = zone&&location?zone + "--" + location:null;
            result["path"] = paths;
            result["type"] = type;
            fullResults[ITEMS[id].name_en] = result;
        }
    }
}
module.exports = {
    fullResults,
    fullCaculation
}