const Consumer = require('../consumers/Consumer');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class helpConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage&&(validMessage=="/help"||validMessage=="帮助")
    }
    work(){
        this.message[0] = `[CQ:image,file=https://ftp.bmp.ovh/imgs/2021/05/0071695ab6ecf8e5.png]`;
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"help",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = helpConsumerClass;