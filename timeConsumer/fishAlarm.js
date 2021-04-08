//This Function has an Time Consumer,They will exec with the time passing.
const fishCauculation = require('../stdFunc/fishCauculation');
var fishAlarm = function(){
    let messages = [];
    let nameList = ["书记官杀手","水天一碧","暮辉鱼","晨曦旗鱼","莫古尔古球球","千鳍","万事通鲈","红龙","沙里贝涅","云海蝴蝶螺","雕塑家","众神之爱","苦尔鳗","猴面雀杀手","兰代勒翼龙","镰甲鱼","鳍人之敌","深泳的古书","月光虹鳉","珍珠皮皮拉鱼","元首的军扇","战盾剑齿龙鳖"];
    nameList.forEach((name)=>{
        var results = fishCauculation(name).time;
        if(results.realBeginTimes[0]-Date.now()>600000 && results.realBeginTimes[0]-Date.now()<660000){
            messages.push(`${name}还有十分钟左右进入CD，想钓的朋友抓紧啦。`)
        }
    })
    return messages;
}

module.exports = fishAlarm;