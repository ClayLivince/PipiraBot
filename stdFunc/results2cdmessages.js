//This is also an important function providing the messages by using the results.
var results2cdmessages = function(results,times){
    if(results){
        let name = results.name;
        let result = results.time;
        var messages = `${name}：`;
        //console.log(results)
        console.log(result.beginTimes[0]);
        if(result.beginTimes[0] == "常驻"){
            messages+="此鱼为常驻鱼。\n"
        }
        else{
        //要对时间进行处理
            for(let i = 0; i<times; i++){
                var left;
                var now = Date.now();
                var begin = result.realBeginTimes[i];
                var end = result.realEndTimes[i];
                if(now<begin){
                    left = begin - now;
                    var day = parseInt(left/86400000);
                    left = left-day*86400000;
                    var hour = parseInt(left/3600000);
                    left = left-hour*3600000;
                    var minute = parseInt(left/60000);
                    left = left-minute*60000;
                    var second = parseInt(left/1000);
                    messages+= `休眠中：${day==0?'':`${day}天`}${hour==0?'':`${hour}小时`}${minute==0?'':`${minute}分`}${second==0?'':`${second}秒后进入CD`}-> ${result.beginTimes[i]}\n`
                }else{
                    left = end - now;
                    var day = parseInt(left/86400000);
                    left = left-day*86400000;
                    var hour = parseInt(left/3600000);
                    left = left-hour*3600000;
                    var minute = parseInt(left/60000);
                    left = left-minute*60000;
                    var second = parseInt(left/1000);
                    messages+= `进行中：${day==0?'':`${day}天`}${hour==0?'':`${hour}小时`}${minute==0?'':`${minute}分`}${second==0?'':`${second}秒`}后CD结束-> ${result.endTimes[i]}\n`
                }
            }
        }
    }
    else{
        messages = null;
    }
    console.log(messages);
    return messages;
}
module.exports = results2cdmessages;