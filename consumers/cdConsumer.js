const nickName = require('../resources/nickName');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
const Consumer = require('../consumers/Consumer');
class cdConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && (validMessage.slice(validMessage.length-2) == "CD" || validMessage.slice(validMessage.length-2)=="cd");
    }
    work(){
        let contentMessage = this.ctx.request.body.message;
        let fishName = contentMessage.slice(0,contentMessage.length-2);
        fishName = fishName.trim(); //处理空格
        if(fishName[0] == '/'){fishName = fishName.slice(1)};
        if(nickName[fishName]){fishName = nickName[fishName]};
        let results = fishCauculation(fishName);
        this.message[0] = results2cdmessages(results,5);
        if(this.message[0]!=null){this.message[0]+="(*╹▽╹*)"}
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"cd",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                "fishName":fishName,
            }
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
    
}
module.exports = cdConsumerClass;