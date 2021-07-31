const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
var fourkings = function(info){
    let nameList = ["红龙","云海蝴蝶螺","沙里贝涅","雕塑家"];
    let message = [];
    message[0] = ""; //No undefined!
    nameList.forEach((name)=>{
        var results = fishCauculation(name);
        message[0] += results2cdmessages(results,1);
    })
    message[0] += "四大天王只有四个才是常识啊!"
    sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
}
module.exports = fourkings;