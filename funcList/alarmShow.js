var groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var alarmShow = function(info){
    if(info.role!='member'){
            groupModel.find({"groupId":info.group_id},(err,docs)=>{
                if(docs.length==0){
                    sendGroupMessage('5701',info.group_id,"请等待皮皮拉鱼蓄力完成哦")
                }
                else{
                    let alarmLists = docs[0].alarmLists;
                    if(alarmLists.length == 0){
                        sendGroupMessage('5701',info.group_id,"本群的监视列表为空，请使用报时添加指令添加想要监视的鱼哦");
                    }
                    else{
                        let alarmMessage = "";
                        alarmLists.forEach((fishName)=>{
                            alarmMessage+=`${fishName}***`;
                        })
                        sendGroupMessage('5701',info.group_id,alarmMessage);
                    }
                }
            })

    }
    else{
        sendGroupMessage('5701',info.group_id,"您不是群主或管理员,无法使用该功能"); 
    }
}
module.exports = alarmShow;