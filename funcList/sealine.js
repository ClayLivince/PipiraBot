const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var createSeaFishingInfomation = require('../stdFunc/seaFishing').createSeaFishingInfomation;
var sealine = function (info) {
    let message = [];
    message[0] = createSeaFishingInfomation();
    message[0] += "\n想查看海钓过程中令人瞠目结舌的传说记录吗？输入‘传说 海王’即可查询";
    sendGroupMessage('5701', info.group_id, message[0]); //直接发送消息
}
module.exports = sealine;