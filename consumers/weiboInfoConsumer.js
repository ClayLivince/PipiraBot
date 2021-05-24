var Consumer = require('./Consumer');
const fishCauculation = require('./fishCauculation');
const fullCaculation = require('./fullCauculation').fullCaculation;
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
class weiboInfoConsumer extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage &&  validMessage == '微博消息';
    }
    work(){
        var nameLists = ["内角石","大泷太郎","旋齿鲨","马哈尔","加诺","涅普特龙","沙里贝涅","云海蝴蝶螺","欧巴宾海蝎","莫名熔岩鱼","铠鱼","兰代勒翼龙","异刺鲨","镰甲鱼","雕塑家","红龙","绿彩鱼","众神之爱"];
        nameLists.forEach((name)=>{
            var message = "";
            fullCaculation();
            var results = fishCauculation(name);
            message+=name;
            message+="\n";
            results.time.realBeginTimes.forEach((time,index)=>{
            const start = new Date(new Date().toLocaleDateString());
            start.setTime(start.getTime() + 3600 * 1000 * 24);
                if(time-start<24*1000*3600 && time - start>0){
                    message+=`${results.time.beginTimes[index]}\n`;
                }
            })
            sendGroupMessage(this.port,817114817,message);
        })
    }
}
module.exports = weiboInfoConsumer;