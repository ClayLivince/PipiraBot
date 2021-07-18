//This Function has an Time Consumer,They will exec with the time passing.
const fishCauculation = require('../stdFunc/fishCauculation');
var fishAlarm = function(){
    let messages = [];
    let nameList = ["红龙", "苦尔鳗","万事通鲈", "暮辉鱼", "众神之爱", "莫古尔古球球", "云海蝴蝶螺", "雕塑家", "沙里贝涅", "元首的军扇", "能言者", "车轴鱼", "阔面鱼", "书记官杀手", "大祭司鱼", "水天一碧", "头领薄饼章鱼" ,"深泳的古书", "鳍人之敌", "猴面雀杀手", "千鳍", "雷鳞蝾螈", "兰代勒翼龙","旋齿鲨"];
    nameList.forEach((name)=>{
        var results = fishCauculation(name).time;
        if(results.realBeginTimes[0]-Date.now()>600000 && results.realBeginTimes[0]-Date.now()<660000){
            messages.push(`${name}还有十分钟左右进入CD，想钓的朋友抓紧啦。`)
        }
    })
    return messages;
}

module.exports = fishAlarm;