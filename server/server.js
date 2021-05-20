const address = 'http://localhost:5700'; //祈福相关的放在5700，其他攻略内容是5701
var fs = require('fs');
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var axios = require('axios');

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

var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;
const { request } = require('http');
var defaultConsumerList = [welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass];
var groupServerConsumers = { //This is the groupList and default is bird
    614011147:{
        'name':'bird',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    },
    122745078:{
        'name':'pig',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    },
    937306333:{
        'name':'cat',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    },
    1153646847:{
        'name':'redFish',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    },
    00000000:{
        'name':'private',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    },
    88888888:{
        'name':'default',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass]
    }
}

var app = new Koa();
app.use(bodyParser());
fullCaculation(); //Cauculation the fullResults

app.use(async ctx =>{
    console.log(ctx.request.href);
    var group_id = ctx.request.body.group_id;
    if(!group_id){group_id = 00000000} //Private Message
    var nameAndConsumers = groupServerConsumers[group_id];
    if(!nameAndConsumers){nameAndConsumers = groupServerConsumers[88888888];} //Default
    for(let index = 0; index<nameAndConsumers['consumers'].length;index++){
        if(nameAndConsumers['consumers'][index].valid(ctx)){
            var consumer = new nameAndConsumers['consumers'][index](ctx,nameAndConsumers['name']);
            consumer.work(); //工作
        }
    }
})

//这就是Bot的核心函数


/*app.use(async ctx =>{
    //现在需要先判断然后传递不同的参数
    if(ctx.request.body.message_type == 'group'||ctx.request.body.notice_type == 'group_increase'){
        var serverName = groupLists[ctx.request.body.group_id];
        if(!serverName){serverName = "default"};
        let func = cmd2func[serverName];
        let results = func(ctx);
        let messages = results.message;
        let log = results.log;
        let port = results.port;
        messages.forEach((message,index)=>{
            if(message){
            sendGroupMessage(port,ctx.request.body.group_id,message);
            fs.appendFile('../log/log.txt',JSON.stringify(log[index])+'\n',()=>{})
            }
        })
    }
    else if(ctx.request.body.message_type == 'private'){
        if(ctx.request.body.user_id == 360354542){
            axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
                var groupList = [];
                res.data.data.forEach((group_msg)=>{
                    groupList.push(group_msg.group_id)
                })
                message = ctx.request.body.message;
                groupList.forEach((group)=>{
                    sendGroupMessage('5701',group,message,true);
                })
            })
        }
    }
    //record data to files by consumer.
})*/

app.listen(5702); //服务器启动

setInterval(function(){ //定时广播
    axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
        var groupList = [];
        var validGroups = [614011147,122745078,937306333,729794406,878312744];
        res.data.data.forEach((group_msg)=>{
            groupList.push(group_msg.group_id)
        })
        let messages = fishAlarm();
        messages.forEach((message)=>{
            groupList.forEach((group)=>{
                if(validGroups.indexOf(group)!=-1 || (new Date().getHours()>=8 && new Date().getHours()<23)){
                    sendGroupMessage('5701',group,message);
                }
            })
        })
    })
},60000);

//server.js中需要持久化一个变量