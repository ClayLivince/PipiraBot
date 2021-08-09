var groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const versionKings = require('../resources/versionKings');
var alarmAdd = function(info){
    if(info.role!='member'){
        var fishNameList = info.params;
        if(fishNameList.length == 1 && versionKings[fishNameList[0]]){
            fishNameList = versionKings[fishNameList[0]]
        }
        if(fishNameList.length){
            groupModel.find({"groupId":info.group_id},(err,docs)=>{
                if(docs.length==0){
                    sendGroupMessage('5701',info.group_id,"请等待皮皮拉鱼蓄力完成哦")
                }
                else{
                    let alarmLists = docs[0].alarmLists;
                    fishNameList.forEach(fishName => {
                        if(alarmLists.indexOf(fishName)==-1){
                            alarmLists.push(fishName);
                        }
                    });
                    groupModel.updateOne({"groupId":info.group_id},{'alarmLists':alarmLists},()=>{
                        sendGroupMessage('5701',info.group_id,`监视列表更新完成`);
                    })
                }
            })
        }
    }
    else{
        sendGroupMessage('5701',info.group_id,"您不是群主或管理员,无法使用该功能"); 
    }
}
module.exports = alarmAdd;