var groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var alarmRemove = function(info){
    if(info.role!='member'){
        var fishName = info.params[0];
        if(fishName){
            groupModel.find({"groupId":info.group_id},(err,docs)=>{
                if(docs.length==0){
                    sendGroupMessage('5701',info.group_id,"请等待皮皮拉鱼蓄力完成哦")
                }
                else{
                    let alarmLists = docs[0].alarmLists;
                    if(alarmLists.indexOf(fishName)!=-1){
                        let removeIndex = alarmLists.indexOf(fishName);
                        alarmLists.splice(removeIndex,1);
                        groupModel.updateOne({"groupId":info.group_id},{'alarmLists':alarmLists},()=>{
                            sendGroupMessage('5701',info.group_id,`${fishNmae}已从监视列表中移除`);
                        })
                    }
                    else{
                        sendGroupMessage('5701',info.group_id,"该鱼不在本群的监视列表当中，请您检查监视列表！"); 
                    }
                }
            })
        }
        else{
            sendGroupMessage("5701",info.group_id,"未指定参数!") 
        }
    }
    else{
        sendGroupMessage('5701',info.group_id,"您不是群主或管理员,无法使用该功能"); 
    }
}
module.exports = alarmRemove;