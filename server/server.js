const address = 'http://localhost:5700'; //祈福相关的放在5700，其他攻略内容是5701
var fs = require('fs');
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var axios = require('axios');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');

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
const achieveRaiderConsumer = require('../consumers/achieveRaiderCosumer');

var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;
var groupServerConsumers = { //This is the groupList and default is bird
    614011147:{
        'name':'bird',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass,priceConsumerClass,scoreRaiderConsumer,achieveRaiderConsumer]
    },
    122745078:{
        'name':'pig',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass,priceConsumerClass,scoreRaiderConsumer,achieveRaiderConsumer]
    },
    937306333:{
        'name':'cat',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass,priceConsumerClass,scoreRaiderConsumer,achieveRaiderConsumer]
    },
    1153646847:{
        'name':'redFish',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass,priceConsumerClass,scoreRaiderConsumer,achieveRaiderConsumer]
    },
    00000000:{
        'name':'private',
        'consumers':[broadcastConsumerClass]
    },
    88888888:{
        'name':'default',
        'consumers':[welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass,famousConsumerClass,commonQuesClass,priceConsumerClass,scoreRaiderConsumer,achieveRaiderConsumer]
    }
}

var app = new Koa();
app.use(bodyParser());
fullCaculation(); //Cauculation the fullResults

app.use(async ctx =>{
    var group_id = ctx.request.body.group_id;
    if(!group_id){group_id = 00000000} //Private Message
    var nameAndConsumers = groupServerConsumers[group_id];
    if(!nameAndConsumers){nameAndConsumers = groupServerConsumers[88888888];} //Default
    for(let index = 0; index<nameAndConsumers['consumers'].length;index++){
        if(nameAndConsumers['consumers'][index].valid(ctx)){
            console.log(nameAndConsumers['consumers'][index]);
            var consumer = new nameAndConsumers['consumers'][index](ctx,nameAndConsumers['name']);
            consumer.work(); //工作
        }
    }
})

app.listen(5702); //服务器启动

setInterval(function(){ //定时广播
    axios.post('http://localhost:5701'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
        var groupList = [];
        var banGroups = [1029728129];
        res.data.data.forEach((group_msg)=>{
            groupList.push(group_msg.group_id)
        })
        groupList = Array.from(new Set(groupList));
        console.log(groupList);
        let messages = fishAlarm();
        messages.forEach((message)=>{
            groupList.forEach((group)=>{
                if((validGroups.indexOf(group)!=-1 || (new Date().getHours()>=8 && new Date().getHours()<23)) && banGroups.indexOf(group) == -1){
                    sendGroupMessage('5701',group,message);
                }
            })
        })
    })
},60000);
setInterval(function(){ //一次性广播
        //https://z3.ax1x.com/2021/05/23/gOaO9P.jpg
        var messages1 = "何为捕鱼人？\n是领略云海的缥缈，还是感受熔火的热烈。\n是身处盐湖的孤独，还是回望浮岛的永恒。\n一位真正的捕鱼人，敢于面对真正的巨浪，敢于追逐不朽的传说！\n第三届艾欧泽亚光之渔夫钓鱼大赛诚邀你的参与！\n详情请阅览群公告！规则和赛程安排见https://docs.qq.com/doc/DTHFXZ0VBVlF3d291";
        var messages2 = `[CQ:at,qq=all]\n[CQ:image,file=https://z3.ax1x.com/2021/05/23/gOaO9P.jpg]`;
        var validGroups = [614011147,122745078,937306333,878312744];
        validGroups.forEach((group)=>{
            if(new Date().getHours() == 11 && new Date().getMinutes() == 5){
                sendGroupMessage('5701',group,messages1);
                sendGroupMessage('5701',group,messages2);
            }
        })

    },60000);

//server.js中需要持久化一个变量