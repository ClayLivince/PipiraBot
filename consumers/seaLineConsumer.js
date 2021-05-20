var Consumer = require('../consumers/Consumer');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var createSeaFishingInfomation = require('../stdFunc/seaFishing').createSeaFishingInfomation;
class seaLineConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && ( validMessage == '海钓航线' || validMessage == '海钓航班' || validMessage == '/海钓航线' || validMessage == '/海钓航班')
    }
    work(){
        this.message[0] = createSeaFishingInfomation();
        this.log = {
            "group":this.ctx.request.body.group_id,
            "id":this.ctx.request.body.user_id,
            "type":"seaLine",
            "date":Date.now(),
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = seaLineConsumerClass;