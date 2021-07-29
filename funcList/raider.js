const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const nickName = require('../resources/nickName');
var raider = function(info){
    let message = [];
    var fishName = info.params[0];
    if(nickName[fishName]){fishName = nickName[fishName];}
    let results = fishCauculation(fishName);
    message[1] = results2cdmessages(results,2);
    if(message[1]!=null){message[1]+="(*╹▽╹*)"}
    message[0] = (raider[fishName]?raider[fishName]:null);
    if(message[0]!=null){message[0] += (famousData[fishName]?`\n想查看前辈们与这条鱼奋斗的光荣历史吗？输入“传说 ${fishName}”领略钓鱼名人的风姿！`:'');}
    sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
    sendGroupMessage('5701',info.group_id,message[1]); //直接发送消息
}
module.exports = raider;