const commands = require('../server/commands'); //Get the commands
const groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var activate = function (info) {
        if(info.role!='member'){
        var target = info.params[0];
        var index = -1;
        commands.forEach((command)=>{
            if(command.command == target){
                index = command.func;
            }
        })
        if(index==-1){
            sendGroupMessage('5701',info.group_id,"无此项功能，请检查您希望开启的功能名");
        }
        else{
            groupModel.find({"groupId":info.group_id},(err,docs)=>{
                if(docs.length!=0){
                    var funcList = docs[0].functionLists;
                    var funcIndex = funcList.indexOf(index);
                    if(funcIndex==-1){
                        sendGroupMessage("5701",info.group_id,"该功能已开启!")
                    }
                    else{
                        funcList.push(funcIndex);
                        groupModel.updateOne({"groupId":info.group_id},{'functionLists':funcList},()=>{
                            sendGroupMessage("5701",info.group_id,"该功能已开启!") 
                        })
                    }
                }
                else{
                    sendGroupMessage("5701",info.group_id,"皮皮拉鱼尚未蓄力完成,请等待皮皮拉鱼蓄力完成！")
                }
            })
        }
    }
    else{
        sendGroupMessage('5701',info.group_id,"您不是群主或管理员,无法使用该功能");
    }
}
module.exports = activate;