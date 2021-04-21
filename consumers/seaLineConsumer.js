var Consumer = require('../consumers/Consumer');
var createSeaFishingInfomation = require('../stdFunc/seaFishing').createSeaFishingInfomation;
class seaLineConsumerClass extends Consumer{
    constructor(ctx){
        super(ctx);
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && ( validMessage == '海钓航线' || validMessage == '海钓航班' || validMessage == '/海钓航线' || validMessage == '/海钓航班')
    }
    work(){
        this.message[0] = createSeaFishingInfomation();
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"seaLine",
            "date":Date.now(),
        }
    }
}
module.exports = seaLineConsumerClass;