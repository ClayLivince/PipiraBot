const cdConsumer = require('../consumers/cdConsumer');
const fourKingsConsumer = require('../consumers/fourKingsConsumer');
const helpConsumer = require('../consumers/helpConsumer');
const raiderConsumer = require('../consumers/raiderConsumer');
const seaLineConsumer = require('../consumers/seaLineConsumer');
const versionKingsConsumer = require('../consumers/versionKingsConsumer');
const welcomeMessageConsumer = require('../consumers/welcomeMessageConsumer');
const blessConsumer = require('../consumers/blessConsumer');
const randomConsumer = require('../consumers/randomConsumer');
let consumerList = [welcomeMessageConsumer,versionKingsConsumer,seaLineConsumer,raiderConsumer,helpConsumer,fourKingsConsumer,cdConsumer,blessConsumer,randomConsumer];
function cmd2func(ctx){
    /**
     * @param ctx : the ctx come from the input message.
     * @return return the messages array.
     */
    let messages = [];
    let name = "";
    consumerList.forEach(consumer => {
        if(consumer.valid(ctx)){
            let params = consumer.getParams(ctx);
            name = consumer.name;
            messages = consumer.createMessage(...params);
        }
    });
    return {'messages':messages,'consumer':name}
}
module.exports = cmd2func;