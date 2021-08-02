    const famousData = require('../resources/famousData');
    const sizeFamous = require('../resources/sizeFamous');
    const nickName = require('../resources/nickName');
    const sendGroupMessage = require('../stdFunc/sendGroupMessage');
    var famous = function(info){
        let message = [null,null];
        let name = info.params[0]
        if(nickName[name]){name = nickName[name]}
        if(famousData[name]){
            message[0] = famousData[name]
        }
        else{
            message[0] = "目前传说中无此词条，投稿请私聊梦洄子时";
        }
        if(sizeFamous[name]){
            message[1] = sizeFamous[name];
        }
        sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
        sendGroupMessage('5701',info.group_id,message[1]);
    }
    module.exports = famous;