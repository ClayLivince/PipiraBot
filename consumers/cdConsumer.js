const nickName = require('../resources/nickName');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
var Consumer = require('../consumers/Consumer');
var cdConsumerValid = function(ctx){
    message = ctx.request.body.message;
    if(message && (message.slice(message.length-2)=="cd" || message.slice(message.length-2)=="CD")){
        return true;
    }
    else{
        return false;
    }
}

var cdConsumerGetParams = function(ctx){
    message = ctx.request.body.message;
    var fishName = message.slice(0,message.length-2);
    fishName = fishName.replace(/\ +/g,"").replace(/[\r\n]/g,""); // 去掉空格和回车
    if(fishName[0] == '/'){fishName = fishName.slice(1)} // 处理‘/’
    if(nickName[fishName]){fishName = nickName[fishName];} // 处理别名
    return [fishName]
}

var cdConsumerCreateMessage = function(fishName){
    let messages = [];
    let results = fishCauculation(fishName);
    messages[0] = results2cdmessages(results,5);
    console.log(messages)
    if(messages[0]!=null){messages[0]+="(*╹▽╹*)"}
    return messages;
}

var cdConsumerName = "cd";

var cdConsumer = new Consumer(cdConsumerValid,cdConsumerGetParams,cdConsumerCreateMessage,cdConsumerName);

module.exports = cdConsumer;