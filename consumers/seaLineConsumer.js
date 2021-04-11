var Consumer = require('../consumers/Consumer');
var createSeaFishingInfomation = require('../stdFunc/seaFishing').createSeaFishingInfomation;
var seaLineConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return ( message == '海钓航线' || message == '海钓航班' || message == '/海钓航线' || message == '/海钓航班')
}

var seaLineConsumerGetParams = function(){
    return [];
}

var seaLineConsumerCreateMessage = function(){
    let messages = [];
    messages[0] = createSeaFishingInfomation();
    return messages;
}

var seaLineConsumerName = "seaLine";

var sealLineConsumer = new Consumer(seaLineConsumerValid,seaLineConsumerGetParams,seaLineConsumerCreateMessage,seaLineConsumerName);

module.exports = sealLineConsumer;