var Consumer = require('../consumers/Consumer');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
var fourKingsConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return ((message == "四大天王")||(message == "/四大天王"))
}

var fourKingsConsumerGetParams = function(){
    return [];
}

var fourKingsConsumerCreateMessage = function(){
    let messages = [""]; //数组的默认成员必须是"",否则会undefined
    let nameList = ["红龙","云海蝴蝶螺","沙里贝涅","胸脊鲨","雕塑家"];
    nameList.forEach((name)=>{
        var results = fishCauculation(name);
        messages[0] += results2cdmessages(results,1);
    })
    messages[0] += "四大天王有五个可是常识啊!"
    return messages;
}

var fourKingsConsumerName = "fourKings";

var fourKingsConsumer = new Consumer(fourKingsConsumerValid,fourKingsConsumerGetParams,fourKingsConsumerCreateMessage,fourKingsConsumerName);

module.exports = fourKingsConsumer;