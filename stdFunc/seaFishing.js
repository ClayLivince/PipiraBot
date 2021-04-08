//infos
var line1 = {
    "goals":['水母(成就)','冲分'],
    "name":"罗塔诺海航线",
    "stations":["加拉迪翁湾外海(白天)","梅尔托尔海峡南(黄昏)","罗塔诺海海面(夜晚)"]
}
var line2 = {
    "goals":['螃蟹(成就)','海洋蟾蜍(蓝鱼)'],
    "name":"绯汐海航线",
    "stations":["谢尔达莱群岛近海(黄昏)","梅尔托尔海峡北(夜晚)","绯汐海近海(白天)"]
}
var line3 = {
    "goals":['气鲀(成就)','瑶鱼(成就)'],
    "name":"罗斯利特湾航线",
    "stations":["谢尔达莱群岛近海(黄昏)","罗塔诺海海面(夜晚)","罗斯利特湾近海(白天)"]
}
var line4 = {
    "goals":['索蒂斯(蓝鱼)','依拉丝莫龙(蓝鱼)'],
    "name":"梅尔托尔海峡北航线",
    "stations":["梅尔托尔海峡南(黄昏)","加拉迪翁湾外海(夜晚)","梅尔托尔海峡北(白天)"]
}
var line5 = {
    "goals":['鲨鱼(成就)','冲分','珊瑚蝠鲼(蓝鱼)'],
    "name":"罗塔诺海航线",
    "stations":["加拉迪翁湾外海(黄昏)","梅尔托尔海峡南(夜晚)","罗塔诺海海面(白天)"]
}
var line6 = {
    "goals":['哈弗古法(蓝鱼)','依拉丝莫龙(蓝鱼)'],
    "name":"绯汐海航线",
    "stations":["谢尔达莱群岛近海(夜晚)","梅尔托尔海峡北(白天)","绯汐海近海(黄昏)"]
}
var line7 = {
    "goals":['哈弗古法(蓝鱼)','盾齿龙(蓝鱼)'],
    "name":"罗斯利特湾航线",
    "stations":["谢尔达莱群岛近海(夜晚)","罗塔诺海海面(白天)","罗斯利特湾近海(黄昏)"]
}
var line8 = {
    "goals":['海马(成就)','珊瑚蝠鲼(蓝鱼)'],
    "name":"梅尔托尔海峡北航线",
    "stations":["梅尔托尔海峡南(夜晚)","加拉迪翁湾外海(白天)","梅尔托尔海峡北(黄昏)"]
}
var line9 = {
    "goals":['索蒂斯(蓝鱼)','石骨鱼(蓝鱼)'],
    "name":"罗塔诺海航线",
    "stations":["加拉迪翁湾外海(夜晚)","梅尔托尔海峡南(白天)","罗塔诺海海面(黄昏)"]
}
var line10 = {
    "goals":['鳐鱼(成就)'],
    "name":"绯汐海航线",
    "stations":["谢尔达莱群岛近海(白天)","梅尔托尔海峡北(黄昏)","绯汐海近海(夜晚)"]
}
var line11 = {
    "goals":['气鲀(成就)','石骨鱼(蓝鱼)'],
    "name":"罗斯利特湾航线",
    "stations":["谢尔达莱群岛近海(白天)","罗塔诺海海面(黄昏)","罗斯利特湾近海(夜晚)"]
}
var line12 = {
    "goals":['章鱼(成就)'],
    "name":"梅尔托尔海峡北航线",
    "stations":["梅尔托尔海峡南(白天)","加拉迪翁湾外海(黄昏)","梅尔托尔海峡北(夜晚)"]
}
var linesList = [line1,line2,line3,line4,line5,line6,line7,line8,line9,line10,line11,line12];
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
            messages+=`${line.name}进行中,当前可以报名参加/n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                (index == line.stations.length-1)?messages+=station:messages+=station+'\n'
            })
        }
        else{
            messages+=`下一条航班为${line.name}\n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                (index == line.stations.length-1)?messages+=station:messages+=station+'\n'
            })
        }
        messages+="\n海钓具体信息可在鱼糕时钟 https://ricecake.traveleorzea.com/#/oceanFishing 查看";
    }
    return messages;
}
module.exports = createSeaFishingInfomation