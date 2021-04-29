var Consumer = require('../consumers/Consumer');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
class fourKingsConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return (validMessage&&(validMessage=="四大天王"||validMessage == "/四大天王"))
    }
    work(){
        let nameList = ["红龙","云海蝴蝶螺","沙里贝涅","胸脊鲨","雕塑家"];
        this.message[0] = ""; //No undefined!
        nameList.forEach((name)=>{
            var results = fishCauculation(name);
            this.message[0] += results2cdmessages(results,1);
        })
        this.message[0] += "四大天王有五个可是常识啊!"
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"fourKings",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
        }
    }
}
module.exports = fourKingsConsumerClass;