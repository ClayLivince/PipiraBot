const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
var cd = function(info){
    let message = [];
    let fishName = info.params[0];
    if(nickName[fishName]){fishName = nickName[fishName]};
    let results = fishCauculation(fishName);
    message[0] = results2cdmessages(results,5);
    if(message[0]!=null){message[0]+="(*╹▽╹*)"}
    sendGroupMessage(5701,info.group_id,message[0]); //直接发送消息
}
module.exports = cd;