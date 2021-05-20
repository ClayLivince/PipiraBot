const Consumer = require('../consumers/Consumer');
const welcomeMessages = require('../resources/welcomeMessages');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class welcomeConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        return ctx.request.body.notice_type &&  ctx.request.body.notice_type == 'group_increase';
    }
    work(){
        console.log("group_increase works");
        this.message[0] = `[CQ:at,qq=${this.ctx.request.body.user_id}]`+welcomeMessages[this.serverName];
        this.log = {
            "group":this.ctx.request.body.group_id,
            "type":"welcome",
            "date":Date.now(),
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = welcomeConsumerClass;