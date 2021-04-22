var Consumer = require('../consumers/Consumer');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
class versionKingsConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && ((validMessage == "5.4鱼王")||(validMessage=="/5.4鱼王"))
    }
    work(){
        this.message = [""];
        let nameList = ["鳍人之敌","深泳的古书","月光虹鳉","珍珠皮皮拉鱼","元首的军扇","战盾剑齿龙鳖"];
        nameList.forEach((name)=>{
            var results = fishCauculation(name);
            this.message[0] += results2cdmessages(results,1); 
        })
        this.message[0] += "5.4鱼王获得力最低要求：1950。\n 5.5鱼王获得力最低要求：2150。";
        this.log = {
            "group":this.ctx.request.body.group_id,
            "id":this.ctx.request.body.user_id,
            "type":"versionKing",
            "date":Date.now(),
        }
    }
}
module.exports = versionKingsConsumerClass;