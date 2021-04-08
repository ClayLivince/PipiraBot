const nickName = require('../resources/nickName');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
const raider = require('../resources/raider');
var Consumer = require('../consumers/Consumer');
var raiderConsumerValid = function(ctx){
    message = ctx.request.body.message;
    if(message && message.slice(message.length-2)=="攻略"){
        return true;
    }
    else{
        return false;
    }
}

var raiderConsumerGetParams = function(ctx){
    message = ctx.request.body.message;
    var fishName = message.slice(0,message.length-2);
    fishName = fishName.replace(/\ +/g,"").replace(/[\r\n]/g,""); // 去掉空格和回车
    if(fishName[0] == '/'){fishName = fishName.slice(1)} // 处理‘/’
    if(nickName[fishName]){fishName = nickName[fishName];} // 处理别名
    return [fishName]
}

var raiderConsumerCreateMessage = function(fishName){
    let messages = [];
    let results = fishCauculation(fishName); //get results
    messages[1] = results2cdmessages(results,2);
    if(messages[1]!=null){messages[1]+="(*╹▽╹*)"}
    messages[0] = (raider[fishName]?raider[fishName]:null);
    return messages;
}

var raiderConsumerName = "raider";

var raiderConsumer = new Consumer(raiderConsumerValid,raiderConsumerGetParams,raiderConsumerCreateMessage,raiderConsumerName);

module.exports = raiderConsumer;