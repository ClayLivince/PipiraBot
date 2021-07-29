var createBlessInfomation = require('../stdFunc/seaFishing').createBlessInfomation;
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var bless = function (info) {
    let message = [];
    let id = info.user_id;
    let result = createBlessInfomation(id);
    message[0] = result.messages;
    sendGroupMessage('5701', info.group_id, message[0]); //直接发送消息
}
module.exports = bless;