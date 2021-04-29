const address = 'http://localhost:5700';
var fs = require('fs');
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var axios = require('axios');

var birdCmd2func = require('../cmd2func/birdCmd2func');
var pigCmd2func = require('../cmd2func/pigCmd2func');
var catCmd2func = require('../cmd2func/catCmd2func');

var fishAlarm = require('../timeConsumer/fishAlarm');
var fullCaculation = require('../stdFunc/fullCauculation').fullCaculation;
var groupLists = { //This is the groupList and default is bird
    878312744:"bird",
    614011147:"bird",
    122745078:"pig",
    937306333:"cat",
    389851635:"pig",
}
var cmd2func = {
    "bird":birdCmd2func,
    "pig":pigCmd2func,
    "cat":catCmd2func,
}
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
    //现在需要先判断然后传递不同的参数
    var serverName = groupLists[ctx.request.body.group_id];
    if(!serverName){serverName = "default"};
    let func = cmd2func[serverName];
    let results = func(ctx);
    console.log(results);
    let messages = results.message;
    let log = results.log;
    messages.forEach((message,index)=>{
        if(message){
        sendGroupMessage(address,ctx.request.body.group_id,message);
        fs.appendFile('../log/log.txt',JSON.stringify(log[index])+'\n',()=>{})
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