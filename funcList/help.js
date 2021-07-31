const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var help = function(info){
    let message = "";
    if(info.params.length == 0){ //只有hrlp
        message = `[CQ:image,file=https://z3.ax1x.com/2021/07/31/WjG1yQ.png]`;
        sendGroupMessage('5701',info.group_id,message);
    }
}
module.exports = help;