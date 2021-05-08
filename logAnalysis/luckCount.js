
const fs = require('fs');
const readline = require('readline');
const rd = readline.createInterface({
    input:fs.createReadStream('./log.txt'),
})
var counts = {};
var countsArray = [];
var compare = function(obj1,obj2){
    var count1= obj1.average;
    var count2 = obj2.average;
    if(count1>count2){return 1}
    else if(count1<count2){return -1}
    else{return 0}
}
rd.on('line',(ln)=>{
    try{
        var content = JSON.parse(ln);
        if(content.type == 'bless'){
            if(counts[content.id]){counts[content.id].count++;counts[content.id].luck = counts[content.id].luck+content.content.luck;}
            else{counts[content.id] = {count:1,luck:content.content.luck}}
        }
    }
    catch(e){
        
    }
}).on('close',()=>{
    for(key in counts){
        countsArray.push({id:key,count:counts[key].count,luck:counts[key].luck,average:counts[key].luck/counts[key].count})
    }
    var validSortedArray = [];
    var sortedArray = countsArray.sort(compare);
    sortedArray.forEach((member)=>{
        if(member.count>=5 && !isNaN(member.average)){
            validSortedArray.push(member)
        }
    })
    console.log(validSortedArray.sort(compare));
})