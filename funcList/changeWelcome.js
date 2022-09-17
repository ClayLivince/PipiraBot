var groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var changeWelcome = function (info) {
    if (info.role != 'member') {
        var welcomeMsg = "";
        info.params.forEach((text) => {
            welcomeMsg += text;
        })
        if (welcomeMsg !== "") {
            groupModel.find({ "groupId": info.group_id }, (err, docs) => {
                if (docs.length == 0) {
                    sendGroupMessage('5701', info.group_id, "请等待皮皮拉鱼蓄力完成哦")
                }
                else {
                    groupModel.updateOne({ "groupId": info.group_id }, { 'welcomeMsg': welcomeMsg }, () => {
                        sendGroupMessage("5701", info.group_id, "欢迎消息已修改完成")
                    })
                }
            })
        }
        else {
            sendGroupMessage("5701", info.group_id, "未指定参数!")
        }
    }
    else {
        sendGroupMessage('5701', info.group_id, "您不是群主或管理员,无法使用该功能");
    }
}
module.exports = changeWelcome;