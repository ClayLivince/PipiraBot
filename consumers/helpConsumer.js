const Consumer = require('../consumers/Consumer');
class helpConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage&&(validMessage=="/help"||validMessage=="帮助")
    }
    work(){
        
        this.message[0] = `[CQ:image,file=https://ftp.bmp.ovh/imgs/2021/05/0071695ab6ecf8e5.png,type=show]`;
        this.log = {
            "id":this.ctx.request.body.user_id,
            "type":"help",
            "date":Date.now(),
            "group":this.ctx.request.body.group_id,
        }
    }
}
module.exports = helpConsumerClass;