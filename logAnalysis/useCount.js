const fs = require('fs');
const readline = require('readline');
const rd = readline.createInterface({
    input:fs.createReadStream('./log.txt'),
})
var counts = {};
var countsArray = [];
var compare = function(obj1,obj2){
    var count1 = obj1.count;
    var count2 = obj2.count;
    if(count1>count2){return -1}
    else if(count1<count2){return 1}
    else{return 0}
}
rd.on('line',(ln)=>{
    try{
        var content = JSON.parse(ln);
        if(counts[content.id]){counts[content.id]++}
        else{counts[content.id] = 1}
    }
    catch(e){
        
    }
}).on('close',()=>{
    for(key in counts){
        countsArray.push({id:key,count:counts[key]})
    }
    console.log(countsArray.sort(compare))
})