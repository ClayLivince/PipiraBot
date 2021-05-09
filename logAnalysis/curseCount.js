
const fs = require('fs');
const readline = require('readline');
const rd = readline.createInterface({
    input:fs.createReadStream('./log.txt'),
})
var counts = {};
var countsArray = [];
var compare = function(obj1,obj2){
    var count1= obj1.count;
    var count2 = obj2.count;
    if(count1>count2){return -1}
    else if(count1<count2){return 1}
    else{return 0}
}
rd.on('line',(ln)=>{
    try{
        var content = JSON.parse(ln);
        if(content.type == 'bless' && content.content.luck<3){
            if(counts[content.id]){counts[content.id].count++;if(counts[content.id].seaLineName.indexOf(content.content.sail)==-1){counts[content.id].seaLineName.push(content.content.sail)}}
            else{counts[content.id] = {count:1,seaLineName:[content.content.sail]}}
        }
    }
    catch(e){
        
    }
}).on('close',()=>{
    for(key in counts){
        countsArray.push({id:key,count:counts[key].count,sailLength:counts[key].seaLineName.length})
    }
    var sortedArray = countsArray.sort(compare);
    console.log(sortedArray);
})