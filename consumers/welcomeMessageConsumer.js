var Consumer = require('../consumers/Consumer');
var welcomeMessageConsumerValid = function(ctx){
    notice_type = ctx.request.body.notice_type;
    return notice_type == "group_increase";
}

var welcomeMessageConsumerGetParams = function(){
    return [];
}

var welcomeMessageConsumerCreateMessage = function(){
    let messages = [];
    messages[0] = "欢迎加入本群~请及时修改您的群名片为指定格式。\n本群的时钟Bot提供时钟报时以及钓鱼攻略的服务，具体使用方法可输入‘帮助’或者‘/help’进行查看。\n您可能有以下常见的问题,Bot在此帮您解答：\n- 5.4鱼王获得力为1950。\n- 钓鱼收藏品没有改动，仍然可以卡收藏品，例如雕塑家。\n- 渔人的直感1.381可以在5.4使用。\n海钓群参见群公告\n钓鱼时钟推荐使用鱼糕时钟： https://ricecake.traveleorzea.com/#/ 以及鱼糕时钟桌面版，桌面版下载链接在网页版中。\n钓鱼辅助工具见群文件，最后希望您在本群玩的开心"
    return messages;
}

var welcomeMessageConsumerName = "welcomeMessage";

var welcomeMessageConsumer = new Consumer(welcomeMessageConsumerValid,welcomeMessageConsumerGetParams,welcomeMessageConsumerCreateMessage,welcomeMessageConsumerName);

module.exports = welcomeMessageConsumer;