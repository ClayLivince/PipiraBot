var Consumer = require('../consumers/Consumer');
const fishCauculation = require('../stdFunc/fishCauculation');
const results2cdmessages = require('../stdFunc/results2cdmessages');
var versionKingsConsumerValid = function(ctx){
    message = ctx.request.body.message;
    return((message == "5.4鱼王")||(message=="/5.4鱼王"))
}

var versionKingsConsumerGetParams = function(){
    return [];
}

var versionKingConsumerCreateMessgae = function(){
    let messages = [""];
    let nameList = ["鳍人之敌","深泳的古书","月光虹鳉","珍珠皮皮拉鱼","元首的军扇","战盾剑齿龙鳖"];
    nameList.forEach((name)=>{
        var results = fishCauculation(name);
        messages[0] += results2cdmessages(results,1);
    })
    messages[0] += "5.4鱼王获得力最低要求:1950。";
    return messages;
}

var versionKingsConsumerName = "versionKings" 

var versionKingsConsumer = new Consumer(versionKingsConsumerValid,versionKingsConsumerGetParams,versionKingConsumerCreateMessgae,versionKingsConsumerName);

module.exports = versionKingsConsumer;