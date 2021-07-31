var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var axios = require('axios');
//var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;
var fishCauculation = require('../stdFunc/fishCauculation');
var checkCommand = require('./checkCommand');
var groupModel = require('../mongo/groupModel');
const nickName = require('../resources/nickName');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const results2cdmessages = require('../stdFunc/results2cdmessages');
/*

const weiboInfoConsumer = require('../consumers/weiboInfoConsumer');
const broadcastConsumerClass = require('../consumers/broadCastConsumer');
const cdConsumerClass = require('../consumers/cdConsumer');
const fourKingsConsumerClass = require('../consumers/fourKingsConsumer');
const helpConsumerClass = require('../consumers/helpConsumer');
const raiderConsumerClass = require('../consumers/raiderConsumer');
const seaLineConsumerClass = require('../consumers/seaLineConsumer');
const versionKingsConsumerClass = require('../consumers/versionKingsConsumer');
const welcomeMessageConsumerClass = require('../consumers/welcomeMessageConsumer');
const blessConsumerClass = require('../consumers/blessConsumer');
const randomConsumerClass = require('../consumers/randomConsumer');
const luckConsumerClass = require('../consumers/luckConsumer');
const famousConsumerClass = require('../consumers/famousConsumer');
const commonQuesClass = require('../consumers/commonQuesConsumer');
const priceConsumerClass = require('../consumers/priceConsumer');
const scoreRaiderConsumer = require('../consumers/scoreRaiderConsumer');
const achieveRaiderConsumer = require('../consumers/achieveRaiderCosumer');*/

//启动之前先加载群列表
fullCaculation(); //Cauculation the fullResults
var app = new Koa();
app.use(bodyParser());
mongoose.connect('mongodb://localhost:27017/fengyubot', {useNewUrlParser: true});
axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
    res.data.data.forEach((group_msg)=>{
        var group_id = group_msg.group_id;//.group_id;
        groupModel.find({'groupId':group_id},(err,docs)=>{
            if(err){console.log(err)}
            console.log(docs);
            if(docs && docs.length==0){
                groupModel.create({'groupId': group_id},(err,docs)=>{
                    if(docs.length!=0){
                        sendGroupMessage(5701,group_id,"皮皮拉鱼bot已经准备就绪！bot的具体使用方式可以输入help指令进行查看");
                    }
                });
            }
        })
    })
})

app.use(ctx =>{ //receive message or group_increase
    console.log(ctx.request.body);
    if(ctx.request.body.message_type && ctx.request.body.message_type == "group"){ //**群指令处理方式 //
    var group_id = ctx.request.body.group_id; //get the group_id
    var command = ctx.request.body.message.split(/[ ]+/)[0]; //get the command
    var params = ctx.request.body.message.split(/[ ]+/).splice(1); //get the params
    var user_id = ctx.request.body.user_id;//get the user_id
    var role = ctx.request.body.sender.role; //"owner admin member"
    checkCommand({group_id,command,params,user_id,role}); //检查群聊消息以及相关功能的鉴权 
    }
    else if(ctx.request.body.notice_type && ctx.request.body.notice_type == "group_increase"){//**群员增加处理方式 */
        increaseMessage(ctx.request.body);
    }
    else if(ctx.request.body.message_type && ctx.request.body.message_type == "private" && ctx.request.body.user_id == 360354542){
        broadcast(ctx.request.body) //随便写一下
    }
})

//主函数每十分钟查看一次群列表,出现新群就初始化mongo的document

app.listen(5702); //服务器启动

setInterval(function(){ //定时广播
    axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
        res.data.data.forEach((group_msg)=>{
            var group_id = group_msg.group_id;
            groupModel.find({'groupId':group_id},(err,docs)=>{
                if(docs.length==0){
                    groupModel.create({'groupId': group_id},(err,docs)=>{
                        if(docs.length!=0){
                            sendGroupMessage(5701,group_id,"皮皮拉鱼bot已经准备就绪！bot的具体使用方式可以输入help指令进行查看");
                        }
                    });
                }
                else{ //如果找到了
                    let alarmLists = docs[0].alarmLists; //获取报时鱼的列表
                    if(alarmLists.length!=0){ //不是空列表
                        alarmLists.forEach((fishName)=>{
                            if(nickName[fishName]){fishName = nickName[fishName]}
                            var resultTime = fishCauculation(fishName);
                            if(resultTime && resultTime.time.realBeginTimes[0]-Date.now()>600000 && resultTime.time.realBeginTimes[0]-Date.now()<660000){
                                message = `${fishName}还有十分钟进入cd\n:${results2cdmessages(resultTime,1)}`
                            }
                        })
                    }
                }
            })
        })
    })
},60000);

//server.js中需要持久化一个变量
function broadcast(info){
    axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
        res.data.data.forEach((group_msg)=>{
            var group_id = group_msg.group_id;
            sendGroupMessage("5701",group_id,info.message)
        })
    })
}
function increaseMessage(info){
    groupModel.find({'groupId':info.group_id},(err,docs)=>{
        if(docs.length==0){
            sendGroupMessage('5701',info.group_id,"皮皮拉鱼正在蓄力！还无法发送欢迎消息哦！")
        }
        else{
            sendGroupMessage('5701',info.group_id,`[CQ:at,qq=${info.user_id}],${docs[0].welcomeMsg}`)
        }
    })
}