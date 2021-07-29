const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var commonQues = function(info){
    let message = [];
    var params = info.params;
    if(params.length==0){
        message[0] = `[CQ:image,file=https://z3.ax1x.com/2021/05/09/gYcWHe.png]`;
    }
    else{
        if(commonQues[dealtMessage[0]]){
                message[0] = `[CQ:at,qq=${ctx.request.body.user_id}] ${commonQues[dealtMessage[0]]}`;
        }
        else{
            message[0] = "未找到相关常见问题，请@红豆年糕或者请寻求群友的帮助";
        }
    }
    sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
}

module.exports = commonQues;