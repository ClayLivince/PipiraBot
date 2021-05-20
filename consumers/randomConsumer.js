const Consumer = require("./Consumer");
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class randomConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5700';
        this.work();
    }
    static valid(ctx){
        var validMessage = ctx.request.body.message;
        return validMessage&&(validMessage.indexOf("随机") == 0 || validMessage.indexOf("选") == 0 || validMessage.indexOf("帮我选") == 0 ||  validMessage.indexOf("/随机") == 0 || validMessage.indexOf("/选") == 0 || validMessage.indexOf("/帮我选") == 0)
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        var dealtMessage = contentMessage.trim().split(/\s+/);
        dealtMessage.shift();
        var randomIndex = Math.floor((Math.random()*(dealtMessage.length)));
        if(dealtMessage[randomIndex]){
            this.message[0] = `你的脑海里传来了一个模糊的声音:我是皮皮拉鱼神，帮助纠结的[CQ:at,qq=${this.ctx.request.body.user_id}]做出选择——${dealtMessage[randomIndex]}`
        }
        this.log = {
            "id": this.ctx.request.body.user_id,
            "type": "random",
            "date": Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                "options":dealtMessage,
                "choosen":dealtMessage[randomIndex]
            }
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = randomConsumerClass;