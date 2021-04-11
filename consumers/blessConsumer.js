const Consumer = require("./Consumer");

var createBlessInfomation = require('../stdFunc/seaFishing').createBlessInfomation;
var blessConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return message == "祈福";
}

var blessConsumerGetParams = function(){
    return [ctx.request.body.user_id];
}

var blessConsumerCreateMessage = function(user_id){
    let messages = [];
    messages[0] = createBlessInfomation(user_id);
    return messages;
}

var blessConsumerName = "bless";

var blessConsumer = new Consumer(blessConsumerValid,blessConsumerGetParams,blessConsumerCreateMessage,blessConsumerName);

module.exports = blessConsumer;