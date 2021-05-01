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
let consumerList = [welcomeMessageConsumerClass,versionKingsConsumerClass,seaLineConsumerClass,raiderConsumerClass,helpConsumerClass,fourKingsConsumerClass,cdConsumerClass,blessConsumerClass,randomConsumerClass,luckConsumerClass];
const parameter = "default";
function cmd2func(ctx){
    var message = [];
    var log = [];
    var port = '0';
    /**
     * @param ctx : the ctx come from the input message.
     * @return return the messages array.
     */
    for(var i = 0; i<consumerList.length;i++){
        if(consumerList[i].valid(ctx)){
            var consum = new consumerList[i](ctx,parameter);
            message.push(...consum.message);
            log.push(consum.log); // TODO:Log 不能解引用，所以一个Consumer不能生成两份Log！！
            port = consum.port;
        }
    }
    return {message,log,port}
}
module.exports = cmd2func;