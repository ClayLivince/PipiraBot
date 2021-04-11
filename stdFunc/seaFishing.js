//infos
var linesList = require('../resources/seaLine');
var standardDay = new Date('2021-4-6 22:15:00').getTime();

function changeOrder(days){
    var orderList = [0,1,2,3,4,5,6,7,8,9,10,11];
    for(let i = 0;i<days;i++){
        let element = orderList.shift();
        orderList.push(element);
    }
    return orderList;
}

function createSeaFishingInfomation(){
    var messages = '';
    var days;
    var minus = Date.now()-standardDay;
    if(minus>=0){
        days = Math.floor(minus/86400000)  //1 day = 86400000ms
        hours = Math.floor((minus - 86400000 * days)/3600000);
        minutes = Math.floor((minus - 86400000 * days - hours * 3600000)/60000);
        var newOrder = changeOrder(days);
        var segment = Math.floor(hours/2);
        var line = linesList[newOrder[segment]];
        if(hours-segment*2 == 1 && minutes >= 45){
            messages+=`${line.name}进行中,当前可以报名参加\n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                messages+=station+'\n'
            })
            messages+=`该航班由十二神之一的${line.blessName}守护，想要获得好运，就输入‘祈福’向其索求庇护吧。`
            messages+="\n海钓具体信息可在鱼糕时钟 https://ricecake.traveleorzea.com/#/oceanFishing 查看";
        }
        else{
            messages+=`下一条航班为${line.name}\n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                messages+=station+'\n'
            })
            messages+=`该航班由十二神之一的${line.blessName}守护，想要获得好运，就输入‘祈福’向其索求庇护吧。`
            messages+="\n海钓具体信息可在鱼糕时钟 https://ricecake.traveleorzea.com/#/oceanFishing 查看";
        }
    }
    return messages;
}
function createBlessInfomation(){
    var messages = '';
    var days;
    var minus = Date.now()-standardDay;
    if(minus>=0){
        days = Math.floor(minus/86400000)  //1 day = 86400000ms
        hours = Math.floor((minus - 86400000 * days)/3600000);
        minutes = Math.floor((minus - 86400000 * days - hours * 3600000)/60000);
        var newOrder = changeOrder(days);
        var segment = Math.floor(hours/2);
        var line = linesList[newOrder[segment]];
        messages = `${line.blessContent}。虔诚的渔夫啊，我在此回应你的祈祷，在你下次出海时赐予你无尽的好运。`
    }
    return messages;
}
module.exports = {createSeaFishingInfomation,createBlessInfomation}