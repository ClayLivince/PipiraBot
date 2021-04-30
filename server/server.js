const address = 'http://localhost:5700'; //祈福相关的放在5700，其他攻略内容是5701
var fs = require('fs');
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var axios = require('axios');
var birdCmd2func = require('../cmd2func/birdCmd2func');
var pigCmd2func = require('../cmd2func/pigCmd2func');
var catCmd2func = require('../cmd2func/catCmd2func');
var defaultCmd2func = require('../cmd2func/defaultCmd2func');
var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;
var groupLists = { //This is the groupList and default is bird
    614011147:"bird",
    122745078:"pig",
    937306333:"cat",
}
var cmd2func = {
    "bird":birdCmd2func,
    "pig":pigCmd2func,
    "cat":catCmd2func,
    "default":defaultCmd2func,
}
var app = new Koa();
app.use(bodyParser());
fullCaculation(); //Cauculation the fullResults
function sendGroupMessage(port,group_id,message){
    let url = 'http://localhost:'+port+'/send_group_msg';
    console.log(url);
    axios.post(url,{group_id,message},{headers:{'Content-Type':'application/json'}}).then((response)=>{
        // console.log(response); if no error occures dont need to deal with respose.
    }).catch((err)=>{
        console.log(`error occured with send message: ${message} , the error info: ${err}`); //deal with error if error occured. may create an error log?
    })
}

app.use(async ctx =>{
    //现在需要先判断然后传递不同的参数
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
    //record data to files by consumer.
})

var groupList = [];
axios.post('http://localhost:5700'+'/get_group_list',{},{headers:{'Content-Type':'application/json'}}).then((res)=>{
    res.data.data.forEach((group_msg)=>{
        groupList.push(group_msg.group_id)
    })
})
console.log(groupList);
app.listen(5702); //服务器启动
setInterval(function(){ //定时广播
    let messages = fishAlarm();
    messages.forEach((message)=>{
        groupList.forEach((group)=>{
            sendGroupMessage('5701',group,message);
        })
    })
},60000);

//server.js中需要持久化一个变量