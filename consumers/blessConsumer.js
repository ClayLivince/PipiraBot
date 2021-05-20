const Consumer = require("./Consumer");
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const createBlessInfomation = require('../stdFunc/seaFishing').createBlessInfomation;
class blessConsumerClass extends Consumer{ //新类
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5700';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage == "祈福" || validMessage == "欺负" || validMessage == "祈祷";
    }
    work(){ //直接开干！
        let id = this.ctx.request.body.user_id;
        let result = createBlessInfomation(id);
        this.message[0] = result.messages;
        this.log = {
            "id":id,
            "type":"bless",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                "repeat":result.repeat,
                "luck":result.luck,
                "sail":result.bless,
                "game":result.game,
            }
        };
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = blessConsumerClass;