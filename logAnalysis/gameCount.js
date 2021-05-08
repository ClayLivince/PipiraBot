
const fs = require('fs');
const readline = require('readline');
const rd = readline.createInterface({
    input:fs.createReadStream('./log.txt'),
})
var counts = {};
var countsArray = [];
var compare = function(obj1,obj2){
    var count1= obj1.amount;
    var count2 = obj2.amount;
    if(count1>count2){return -1}
    else if(count1<count2){return 1}
    else{return 0}
}
rd.on('line',(ln)=>{
    try{
        var content = JSON.parse(ln);
        if(content.type == 'bless' && content.content.game){
            if(content.content.game.game){content.content.game = content.content.game.game}
            if(counts[content.id]&&counts[content.id].indexOf(content.content.game)==-1){counts[content.id].push( content.content.game)}
            else{counts[content.id] = [content.content.game]}
        }
    }
    catch(e){
        
    }
}).on('close',()=>{
    for(key in counts){
        try{countsArray.push({id:key,games:counts[key],amount:counts[key].length})}
        catch(e){}
    }
    var sortedArray = countsArray.sort(compare);
    console.log(sortedArray);
})