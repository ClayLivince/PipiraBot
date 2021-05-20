const Consumer = require("./Consumer");
const commonQues = require('../resources/commonQues');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class commonQuesClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && (validMessage.indexOf("常见问题") == 0 || validMessage == "[CQ:at,qq=1497015422]"|| validMessage.indexOf("/常见问题") == 0 ); 
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        var dealtMessage = contentMessage.trim().split(/\s+/);
        if(dealtMessage[0] == "常见问题" || dealtMessage[0] == "/常见问题"){
            dealtMessage.shift();
            if(dealtMessage.length==0){
                this.message[0] = `[CQ:image,file=https://z3.ax1x.com/2021/05/09/gYcWHe.png]`;
            }
            else if(dealtMessage.length==1){
                if(commonQues[dealtMessage[0]]){
                    this.message[0] = `[CQ:at,qq=${this.ctx.request.body.user_id}] ${commonQues[dealtMessage[0]]}`;
                }
            }
        }
        else{
            this.message[0] = null;
        }
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"help",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                question:dealtMessage[0]?dealtMessage[0]:null
            }
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = commonQuesClass;