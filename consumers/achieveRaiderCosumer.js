const Consumer = require('./Consumer');
const createSeaFishingPic = require('../stdFunc/seaFishing').createSeaFishingPic;
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class achieveRaiderConsumer extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && validMessage == "成就攻略";
    }
    work(){
        let result = createSeaFishingPic().achieve;
        let message;
        if(!result){
            message = "此航班无明显可做成就！";
            sendGroupMessage(this.port,this.ctx.request.body.group_id,message);
        }
        else{
            result.forEach((name,index)=>{
                message = `感谢鱼糕桌面版提供的攻略！\n[CQ:image,file=${name}.jpg]`;
                sendGroupMessage(this.port,this.ctx.request.body.group_id,message);
            })
        }
    }
}
module.exports = achieveRaiderConsumer;