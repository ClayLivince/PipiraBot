const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const setuPic = require('../resources/setu.js');
var setu = function (info) {
    let seTulength = setuPic.length;
    var randomIndex = Math.floor((Math.random() * (seTulength)));
    let message = `[CQ:image,file=${setuPic[randomIndex]}]`;
    sendGroupMessage('5701', info.group_id, message); //直接发送消息
}
module.exports = setu;