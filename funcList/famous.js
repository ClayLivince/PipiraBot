    const famousData = require('../resources/famousData');
    const nickName = require('../resources/nickName');
    const sendGroupMessage = require('../stdFunc/sendGroupMessage');
    var famous = function(info){
        let message = [];
        let name = info.params[0]
        if(nickName[name]){name = nickName[name]}
        if(famousData[dealtMessage[0]]){
            message[0] = famousData[dealtMessage[0]]
        }
        else{
            message[0] = "目前传说中无此词条，投稿请私聊梦洄子时";
        }
        sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
    }
    module.exports = famous;