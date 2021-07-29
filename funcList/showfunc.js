const commands = require('../server/commands');
const groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var showfunc = function (info) {
    let message;
    let funcList;
    let funNameLists;
    groupModel.find({"groupId":info.group_id}, (err , doc)=>{
        if(doc.length!=0){
            funcList = doc[0].functionLists;
            funcList.forEach(element => {
                commands.forEach((command)=>{
                    if(command.func == element){
                        funNameLists.push(command.command);
                    }
                })
            });
            funNameLists.forEach((name)=>{
                message += `${name}\n`;
            })
            sendGroupMessage('5701',info.group_id,message);
        }
        else{
            sendGroupMessage('5701',info.group_id,"皮皮拉鱼还未完成蓄力，请耐心等待")
        }
    })
}
module.exports = showfunc;