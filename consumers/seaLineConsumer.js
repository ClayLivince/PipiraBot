var Consumer = require('../consumers/Consumer');
var createSeaFishingInfomation = require('../stdFunc/seaFishing').createSeaFishingInfomation;
class seaLineConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && ( validMessage == '海钓航线' || validMessage == '海钓航班' || validMessage == '/海钓航线' || validMessage == '/海钓航班')
    }
    work(){
        this.message[0] = createSeaFishingInfomation();
        this.message[0] += `\n !!! 警惕斑鸠人（http://guilt.ws/ ）现身海钓努力号，幻登海王虚无王座，快乐海钓请远离。`
        this.log = {
            "group":this.ctx.request.body.group_id,
            "id":this.ctx.request.body.user_id,
            "type":"seaLine",
            "date":Date.now(),
        }
    }
}
module.exports = seaLineConsumerClass;