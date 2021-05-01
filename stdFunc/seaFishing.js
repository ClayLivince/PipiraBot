//infos
var linesList = require('../resources/seaLine');
var gameLists = require('../resources/gameLists');
var standardDay = new Date('2021-4-6 22:15:00').getTime();
var ban = {
    "blessName":"",
    "banList":[]
}
var special = ["时间神：“时光流转，岁月年轮如白驹过隙，没有人能逃过时间的制裁。祈祷吧，天地万物，我是时间的管理者——光阴神梦洄子时，接受我的祝福吧。”得到了传说中神明的回应。你感到有大量好运离你而去，仿佛身体被掏空。下次出海，你的时间总会缺少一些。",
"祝祷神：“世间表里如一者能有几何，我的言语能够赐予你无上幸运。起舞吧，鲶鱼们，我是赞美与箴言的化身——祝祷神宓汐妍，接受我的祝福吧。”得到了传说中神明的回应。你感到有大量好运离你而去，仿佛身体被掏空。下次出海，你的好运会分给船上的其他人。",
"绝一神：“每个人心中都有一个遗憾，没有谁是完美的，就算神也不可以，奏乐吧，世间诸神。我是完美的象征——绝一神梁一帆，接受我的祝福吧。”得到了传说中神明的回应。你感到有大量好运离你而去，仿佛身体被掏空。下次出海，你的海鱼数量总会差1。","阳寿神：“生命的尽头就是死亡！我愿献祭我全部的生命，成就你的伟大！欢呼吧！虫群！”我是生命永恒之律——阳寿神綠，接受我的祝福吧。”得到了传说中神明的回应。你感到有大量好运离你而去，仿佛身体被掏空。下次出海，你的GP回复速度会被献祭，分享给所有人。"]
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
            messages+=`${line.name}进行中,当前可以报名参加\n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                messages+=station+'\n'
            })
            messages+=`该航班由十二神之一的${line.blessName}守护，想要获得好运，就输入‘祈福’向其索求庇护吧。`
            messages+="\n海钓具体信息可在鱼糕时钟 https://ricecake.traveleorzea.com/#/oceanFishing 查看";
        }
        else{
            messages+=`下一条航班为${line.name}\n目标:`;
            line.goals.forEach((goal,index)=>{
                (index == line.goals.length-1)?messages+=goal+'。'+'\n':messages+=goal+','
            })
            messages+="途经海域：\n"
            line.stations.forEach((station,index)=>{
                messages+=station+'\n'
            })
            messages+=`该航班由十二神之一的${line.blessName}守护，想要获得好运，就输入‘祈福’向其索求庇护吧。`
            messages+="\n海钓具体信息可在鱼糕时钟 https://ricecake.traveleorzea.com/#/oceanFishing 查看";
        }
    }
    return messages;
}
function createBlessInfomation(user_id){
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
        if(ban.blessName == line.blessName){
            //如果现在还在banList的时间内
            if(ban.banList.indexOf(user_id)!=-1){
                //禁止重复祈福！
                messages = `[CQ:at,qq=${user_id}],人无法两次踏入同一条河流，渔夫也无法两次对同一位神明索取祝福。`
            }
            else{
                //39%,60%,1%
                ban.banList.push(user_id); //添加一下banList
                var luck = Math.floor(Math.random()*100); //0-99生成
                if(luck == 0){
                    var specialIndex = Math.floor(Math.random()*(special.length));
                    messages = `[CQ:at,qq=${user_id}],`;
                    messages+= special[specialIndex];
                }
                else if(luck<3&&luck!=0){
                    messages = `${line.curseContent}不知为何，[CQ:at,qq=${user_id}]，你似乎触怒了这位神灵，下次出海恐怕是凶多吉少，只能祝你好自为之了。`
                }
                else if(luck>=3&&luck<=43){
                    var gameIndex = Math.floor((Math.random()*gameLists.length))
                    messages = `在祈福之后，[CQ:at,qq=${user_id}]没有得到任何回应。神明是忙碌的，他们可能在忙着筹划一场战争，亦或是${gameLists[gameIndex].details}一款叫《${gameLists[gameIndex].game}》的游戏。看来下次出海只能靠你自己了。`
                }
                else{
                    //好运哦
                    if(luck>43&&luck<=73){ //little luck
                        messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有一丝好运伴随在身旁，下次出海一定会略有收获。`
                    }
                    else if(luck>73&&luck<=90){
                        messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有大量好运伴随在身旁，下次出海一定会肯定会大有收获。`
                    }
                    else{
                        messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有无尽的好运伴随在身旁，下次出海一定会肯定会无比顺利，心想事成。`
                    }
                }
            }
        }
        else{
            ban.blessName = line.blessName; //重置
            ban.banList = []; //空了
            ban.banList.push(user_id); //添加一下banList
            var luck = Math.floor(Math.random()*100); //0-99生成
            if(luck == 0){
                var specialIndex = Math.floor(Math.random()*(special.length));
                messages = `[CQ:at,qq=${user_id}],`;
                messages+= special[specialIndex];
            }
            else if(luck<3){
                messages = `${line.curseContent}不知为何，[CQ:at,qq=${user_id}]，你似乎触怒了这位神灵，下次出海恐怕是凶多吉少，只能祝你好自为之了。`
            }
            else if(luck>=3&&luck<=43){
                var gameIndex = Math.floor((Math.random()*gameLists.length))
                messages = `在祈福之后，[CQ:at,qq=${user_id}]没有得到任何回应。神明是忙碌的，他们可能在忙着筹划一场战争，亦或是${gameLists[gameIndex].details}在玩一款叫《${gameLists[gameIndex].game}》的游戏。看来下次出海只能靠你自己了。`
            }
            else{
                //好运哦
                if(luck>43&&luck<=73){ //little luck
                    messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有一丝好运伴随在身旁，下次出海一定会略有收获。`
                }
                else if(luck>73&&luck<=90){
                    messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有大量好运伴随在身旁，下次出海一定会肯定会大有收获。`
                }
                else{
                    messages = `${line.blessContent}虔诚的渔夫[CQ:at,qq=${user_id}]得到了神明的回应。你感到有无尽的好运伴随在身旁，下次出海一定会肯定会无比顺利，心想事成。`
                }
            }
        }
    }
    return {messages,luck,'bless':line.blessName,'game':gameLists[gameIndex]};
}
module.exports = {createSeaFishingInfomation,createBlessInfomation}