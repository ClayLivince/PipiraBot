var Consumer = require('../consumers/Consumer');
var helpConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return ((message=="/help")||(message=="帮助"))
}

var helpConsumerGetParams = function(){
    return [];
}

var helpConsumerCreateMessage = function(){
    let messages = [];
    messages[0] = "鱼名+攻略：查询某条鱼的攻略，包括鱼王，鱼皇，任务鱼以及蓝鱼攻略并同时显示该鱼的下一次cd信息。例如：红龙攻略。\n 鱼名+cd或鱼名+CD：查询任意鱼某条鱼的下五个cd。例如：胸脊鲨cd或胸脊鲨CD。\n 海钓航线或海钓航班：查询下一条航班的名称目标以及途经海域。\n5.4鱼王：查询所有5.4鱼王的下一个cd。\n四大天王：查询红龙，蝴蝶螺，沙里贝涅，胸脊鲨以及雕塑家的下一个cd。\n出现cd时间不准，指令失效等问题请在群里@ 风屿反馈解决。"
    return messages;
}

var helpConsumerName = "help";

var helpConsumer = new Consumer(helpConsumerValid,helpConsumerGetParams,helpConsumerCreateMessage,helpConsumerName);

module.exports = helpConsumer;