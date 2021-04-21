const Consumer = require("./Consumer");
class randomConsumerClass extends Consumer{
    constructor(ctx){
        super(ctx);
        this.work();
    }
    static valid(ctx){
        var validMessage = ctx.request.body.message;
        return validMessage&&(validMessage.indexOf("随机") == 0 || validMessage.indexOf("选") == 0 || validMessage.indexOf("帮我选") == 0 ||  validMessage.indexOf("/随机") == 0 || validMessage.indexOf("/选") == 0 || validMessage.indexOf("/帮我选") == 0)
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        dealtMessage = contentMessage.trim().split(/\s+/);
        dealtMessage.shift();
        var randomIndex = Math.floor((Math.random()*(dealtMessage.length)));
        if(dealtMessage[randomIndex]){
            this.message[0] = `你的脑海里传来了一个模糊的声音:"我是皮皮拉鱼神，帮助纠结的[CQ:at,qq=${this.ctx.request.body.user_id}]做出选择——${dealtMessage[randomIndex]}"`
        }
        this.log = {
            "id": this.ctx.request.body.user_id,
            "type": "random",
            "date": Date.now(),
            "content":{
                "options":dealtMessage,
                "choosen":dealtMessage[randomIndex]
            }
        }
    }
}
module.exports = randomConsumerClass;