const nickName = require('../resources/nickName');
const famousData = require('../resources/famousData');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
const raider = require('../resources/raider');
const Consumer = require('../consumers/Consumer');
class raiderConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && (validMessage.slice(validMessage.length-2)=="攻略")
    }
    work(){
        let contentMessage = this.ctx.request.body.message;
        var fishName = contentMessage.slice(0,contentMessage.length-2);
        fishName = fishName.replace(/\ +/g,"").replace(/[\r\n]/g,""); // 去掉空格和回车
        if(fishName[0] == '/'){fishName = fishName.slice(1)}
        if(nickName[fishName]){fishName = nickName[fishName];}
        let results = fishCauculation(fishName);
        this.message[1] = results2cdmessages(results,2);
        if(this.message[1]!=null){this.message[1]+="(*╹▽╹*)"}
        this.message[0] = (raider[fishName]?raider[fishName]:null);
        if(this.message[0]!=null){this.message[0] += (famousData[fishName]?`\n想查看前辈们与这条鱼奋斗的光荣历史吗？输入“传说 ${fishName}”领略钓鱼名人的风姿！`:'');}
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"raider",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
            "content":{
                "fishName":fishName,
            }
        }
    }
}
module.exports = raiderConsumerClass;