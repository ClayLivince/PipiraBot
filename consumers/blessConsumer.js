const Consumer = require("./Consumer");
var createBlessInfomation = require('../stdFunc/seaFishing').createBlessInfomation;
class blessConsumerClass extends Consumer{ //新类
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5700';
        this.work(); //构造函数就开干!
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
    }
}
module.exports = blessConsumerClass;