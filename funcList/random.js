const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var random = function (info) {
    let message = [];
    var randomIndex = Math.floor((Math.random() * (info.params.length)));
    if (info.params[randomIndex]) {
        message[0] = `你的脑海里传来了一个模糊的声音:我是皮皮拉鱼神，帮助纠结的[CQ:at,qq=${info.user_id}]做出选择——${dealtMessage[randomIndex]}`
    }
    sendGroupMessage('5701', info.group_id, message[0]); //直接发送消息
}
module.exports = random;