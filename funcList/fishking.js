const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const versionKings = require('../resources/versionKings');
const fishCauculation = require('../stdFunc/fishCauculation');
var fishking = function(info){
    let message = [];
    message[0] = "";
    let version = info.params[0];
    let nameList = [];
    if(versionKings[version]){
        nameList = versionKings[version];
        nameList.forEach((name)=>{
            var results = fishCauculation(name);
            message[0] += results2cdmessages(results,1); 
        })   
    }
    else{
        message[0] = '无对应版本鱼王，请检查您的输入';
    }
    sendGroupMessage('5701',info.group_id,message[0]); //直接发送消息
}

module.exports = fishking;