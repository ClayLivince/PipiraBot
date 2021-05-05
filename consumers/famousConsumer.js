const Consumer = require('../consumers/Consumer');
const famousData = require('../resources/famousData');
const nickName = require('../resources/nickName');
class famousConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        var validMessage = ctx.request.body.message;
        return validMessage && (validMessage.indexOf("名人堂")==0) 
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        var dealtMessage = contentMessage.trim().split(/\s+/);
        dealtMessage.shift();
        if(nickName[dealtMessage[0]]){dealtMessage[0] = nickName[dealtMessage[0]]}
        if(dealtMessage.length!==1){
            this.message[0] = null;
        }
        else{
            if(famousData[dealtMessage[0]]){
                this.message[0] = famousData[dealtMessage[0]]
                this.log = {
                    "id":this.ctx.request.body.user_id,
                    "type":"famous",
                    "date":Date.now(),
                    "group":this.ctx.request.body.group_id,
                    "content":{
                        "fishName":dealtMessage[0],
                    }
                }
            }
            else{
                this.message[0] = null;
            }
        }
    }
}
module.exports = famousConsumerClass;