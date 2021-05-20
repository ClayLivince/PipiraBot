const Consumer = require('./Consumer');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var createLuckInformation = require('../stdFunc/createLuckInformation');
class luckConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5700';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage == '占卜' || validMessage == '今日运势' || validMessage == '/luck'||validMessage == '/占卜'||validMessage == 'luck';
    }
    work(){
        let id = this.ctx.request.body.user_id;
        let result = createLuckInformation(id);
        this.message[0] = result.messages;
        this.log = {
            "id": id,
            "type": "luck",
            "date": Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                "luck":result.luck,
                "luckyFood":result.luckyFood,
                "luckyPlace":result.luckyPlace,
                "luckyPet":result.luckyPet,
                "luckyPoem":result.luckyPoem,
                "luckyColor":result.luckyColor,
            }
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = luckConsumerClass;