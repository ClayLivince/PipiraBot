const Consumer = require('./Consumer');
var createLuckInformation = require('../stdFunc/createLuckInformation');
class luckConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5700';
        this.work();
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
    }
}
module.exports = luckConsumerClass;