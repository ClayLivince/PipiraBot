var commands = require('./commands');
var groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
var funcList = require('../')

var checkCommand = function (info) {
    /**
    *
    * check the command if valid , true => do the function, false => nothing
    * @param {*} info group_id => 群号 command => 指令 params => 参数数组 user_id => 发送人QQ号 role => 身份 用于鉴权
    */    
    commands.forEach((command) => {
        if (info.command == command.command) {
            let index = command.func; //get the index in the function list.
            groupModel.find({'groupId':info.group_id},(err,doc)=>{
                if(doc.length!==0){
                    if(doc.functionLists.indexOf(index) == -1){
                        sendGroupMessage(5701,info.group_id,"该功能在该群已被关闭，请联系管理员或群主使用开启指令开启功能。")
                    }
                    else{
                        funcList[info.group_id](info); //开始运行代码
                    }
                }
                else{
                    sendGroupMessage(5701,info.group_id,"皮皮拉正在蓄力中！蓄力将会在10分钟内完成，请稍事等待。")
                }
            })
        }
    })
}

module.exports =  checkCommand ;
//checkAuth