const Consumer = require('../consumers/Consumer');
const welcomeMessages = require('../resources/welcomeMessages');
class welconeConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        return ctx.request.body.notice_type &&  ctx.request.body.notice_type == 'group_increase';
    }
    work(){
        this.message[0] = `[CQ:at,qq=${this.ctx.request.body.user_id}]`+welcomeMessages[this.serverName];
        this.log = {
            "group":this.ctx.request.body.group_id,
            "type":"welocome",
            "date":Date.now(),
        }
    }
}
module.exports = welconeConsumerClass;