const Consumer = require("./Consumer");
var randomConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return message.indexOf("随机") == 0 || message.indexOf("选") == 0 || message.indexOf("帮我选") == 0 ||  message.indexOf("/随机") == 0 || message.indexOf("/选") == 0 || message.indexOf("/帮我选") == 0
}

var randomConsumerGetParams = function(ctx){
    message = ctx.request.body.message;
    dealtMessage = message.trim().split(/\s+/);
    dealtMessage.shift();
    var randomIndex = Math.floor((Math.random()*(dealtMessage.length)));
    return [dealtMessage[randomIndex]];
}

var randomConsumerCreateMessage = function(user_id){
    let messages = [];
    messages[0] = `你的脑海里传来了一个模糊的声音:"我是皮皮拉鱼神，帮助纠结的你做出选择——${user_id}"`;
    return messages;
}

var randomConsumerName = "random";

var randomConsumer = new Consumer(randomConsumerValid,randomConsumerGetParams,randomConsumerCreateMessage,randomConsumerName);

module.exports = randomConsumer;