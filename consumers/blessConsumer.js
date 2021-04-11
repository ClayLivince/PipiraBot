const Consumer = require("./Consumer");

var createBlessInfomation = require('../stdFunc/seaFishing').createBlessInfomation;
var blessConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return message == "祈福";
}

var blessConsumerGetParams = function(){
    return [];
}

var blessConsumerCreateMessage = function(){
    let messages = [];
    messages[0] = createBlessInfomation();
    return messages;
}

var blessConsumerName = "bless";

var blessConsumer = new Consumer(blessConsumerValid,blessConsumerGetParams,blessConsumerCreateMessage,blessConsumerName);

module.exports = blessConsumer;