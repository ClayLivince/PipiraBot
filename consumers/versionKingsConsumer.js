var Consumer = require('../consumers/Consumer');
const versionKings = require('../resources/versionKings');
const fs = require('fs');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
class versionKingsConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
        this.work();
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && validMessage.slice(3,validMessage.length) == ("鱼王");
    }
    work(){
        this.message[0] = "";
        let contentMessage = this.ctx.request.body.message;
        let version = contentMessage.slice(0,3);
        let nameList = [];
        if(versionKings[version]){
            nameList = versionKings[version];
            nameList.forEach((name)=>{
                var results = fishCauculation(name);
                this.message[0] += results2cdmessages(results,1); 
            })   
        }
        else{
            this.message[0] = null;
        }
        this.log = {
            "group":this.ctx.request.body.group_id,
            "id":this.ctx.request.body.user_id,
            "version":version,
            "type":"versionKing",
            "date":Date.now(),
        }
        sendGroupMessage(this.port,this.ctx.request.body.group_id,this.message[0]); //直接发送消息
        fs.appendFile('../log/log.txt',JSON.stringify(this.log)+'\n',()=>{});
    }
}
module.exports = versionKingsConsumerClass;