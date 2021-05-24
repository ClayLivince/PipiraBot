const Consumer = require('./Consumer');
const axios = require('axios');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');

class broadcastConsumerClass extends Consumer{
    constructor(ctx,servername){
        super(ctx,servername);
        this.port = '5701';
    }
    static valid(ctx){
        return  ctx.request.body.message_type == 'private' && ctx.request.body.user_id == 360354542; 
    }
    work(){
        axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
            var groupList = [];
            res.data.data.forEach((group_msg)=>{
                groupList.push(group_msg.group_id)
            })
            groupList = Array.from(new Set(groupList));
            var message = `[CQ:at,qq=all],${this.ctx.request.body.message}`;
            groupList.forEach((group)=>{
                sendGroupMessage('5701',group,message);
            })
        })
    }
}
module.exports = broadcastConsumerClass;
