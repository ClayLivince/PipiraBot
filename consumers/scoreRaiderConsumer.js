const Consumer = require('./Consumer');
const createSeaFishingPic = require('../stdFunc/seaFishing').createSeaFishingPic;
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class scoreRaiderConsumer extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && validMessage == "冲分攻略";
    }
    work(){
        let result = createSeaFishingPic().score;
        let message = `感谢鱼糕桌面版提供的攻略！\n[CQ:image,file=${result}]`;
        sendGroupMessage(this.port,this.ctx.request.body.group_id,message);
    }
}
module.exports = scoreRaiderConsumer;