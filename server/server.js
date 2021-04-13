const address = 'http://localhost:5700';
var fs = require('fs');
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var axios = require('axios');
var cmd2func = require('../cmd2func/cmd2func');
var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;

var app = new Koa();
app.use(bodyParser());
fullCaculation(); //Cauculation the fullResults

function sendGroupMessage(address,group_id,message){
    let url = address+'/send_group_msg';
    axios.post(url,{group_id,message},{headers:{'Content-Type':'application/json'}}).then((response)=>{
        // console.log(response); if no error occures dont need to deal with respose.
    }).catch((err)=>{
        console.log(`error occured with send message: ${message} , the error info: ${err}`); //deal with error if error occured. may create an error log?
    })
}

app.use(async ctx =>{
    let results = cmd2func(ctx);
    let messages = results.messages;
    let consumer = results.consumer;
    messages.forEach((message,index)=>{
        console.log(message);
        if(message){
        sendGroupMessage(address,ctx.request.body.group_id,message);
        fs.appendFile('../log/log.txt',JSON.stringify({ //TODO: Set the static object.
            "consumerName":consumer,
            "id":ctx.request.body.user_id,
            "message":message,
        }),()=>{})
        }
    })
    //record data to files by consumer.

})

var groupList = [];
axios.post(address+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
    res.data.data.forEach((group_msg)=>{
        groupList.push(group_msg.group_id)
    })
})

app.listen(5701); //服务器启动
setInterval(function(){ //定时广播
    let messages = fishAlarm();
    messages.forEach((message)=>{
        groupList.forEach((group)=>{
            sendGroupMessage(address,group,message);
        })
    })
},60000);

//server.js中需要持久化一个变量