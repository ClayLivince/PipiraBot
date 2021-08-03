const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const helpJson = require('../resources/helpJson');
var help = function(info){
    let message = "";
    if(info.params.length == 0){ //只有hrlp
        message = `[CQ:image,file=https://z3.ax1x.com/2021/08/03/fP2Uu6.png]`;
        sendGroupMessage('5701',info.group_id,message);
    }
    else{
        if(helpJson[info.params[0]]){
            message = helpJson[info.params[0]];
            sendGroupMessage('5701',info.group_id,message);
        }
        else{
            sendGroupMessage('5701',info.group_id,`指令参数错误，请输入help或帮助查看指令列表`);
        }
    }
}
module.exports = help;