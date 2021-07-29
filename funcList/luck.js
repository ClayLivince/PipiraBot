const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const createLuckInformation = require('../stdFunc/createLuckInformation');
var luck = function(info){
    let message = [];
    let id = info.user_id;
    let result = createLuckInformation(id);
    message[0] = result.messages;
    sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
    fs.appendFile('../log/log.txt',JSON.stringify(log)+'\n',()=>{});
}
module.exports = luck;