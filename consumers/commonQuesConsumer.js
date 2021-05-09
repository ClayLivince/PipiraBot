const Consumer = require("./Consumer");
const commonQues = require('../resources/commonQues');
class commonQuesClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage == "常见问题" || validMessage == "[CQ:at,qq=1497015422]"|| validMessage == "/常见问题"; 
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        var dealtMessage = contentMessage.trim().split(/\s+/);
        dealtMessage.shift();
        console.log(dealtMessage);
        if(dealtMessage.length==0){
            this.message[0] = `[CQ:image,file=https://z3.ax1x.com/2021/05/09/gYcWHe.png]`;
        }
        else if(dealtMessage.length==1){
            if(commonQues[dealtMessage[0]]){
                this.message[0] = `[CQ:at,qq=${ctx.request.body.user_id}] ${commonQues[dealtMessage[0]]}`;
            }
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
    }
}
module.exports = commonQuesClass;