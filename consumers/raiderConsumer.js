const nickName = require('../resources/nickName');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
const raider = require('../resources/raider');
const Consumer = require('../consumers/Consumer');
class raiderConsumerClass extends Consumer{
    constructor(ctx){
        super(ctx);
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && (validMessage.slice(validMessage.length-2)=="攻略")
    }
    work(){
        let contentMessage = ctx.request.body.message;
        var fishName = contentMessage.slice(0,contentMessage.length-2);
        fishName = fishName.replace(/\ +/g,"").replace(/[\r\n]/g,""); // 去掉空格和回车
        if(fishName[0] == '/'){fishName = fishName.slice(1)}
        if(nickName[fishName]){fishName = nickName[fishName];}
        let results = fishCauculation(fishName);
        this.message[1] = results2cdmessages(results,2);
        if(this.message[1]!=null){this.messages[1]+="(*╹▽╹*)"}
        this.messages[0] = (raider[fishName]?raider[fishName]:null);
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"raider",
            "date":Date.now(),
            "content":{
                "fishName":fishName,
            }
        }
    }
}
module.exports = raiderConsumerClass;