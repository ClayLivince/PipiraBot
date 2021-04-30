var standardDate = new Date('2021-4-30').getTime();
var ban = {
    "dayPast":-1,
    "banList":[],
}; 
var luckyFoodList = ["炸蟹饼","胡椒炒新薯","咖啡曲奇"];
var luckyPetsList = ["发条月亮","魔法水桶","手指光标","迷你命名威","小熊猫","青鸟","南方度假獭獭","触手","祭典鲶鱼精","鲨鱼指挥官","巴哈姆特之型","白鼬","蓝闪蝶","小树袋熊","猫小胖"];
var luckyPlacesList = [
    "太阳神之扇将出现于广袤湖水中央、熔火烈焰深处",
    "月亮神之瞳将出现于万云翻涌之海、浮城万龙之地",
    "光阴神之斧将出现于千路万桥之上、日月同辉之间",
    "行星神之轮将出现于群星闪耀之夜、浓雾弥漫之地",
    "破坏神之杖将出现于不可言状之岛，暴雨倾盆之地",
    "放浪神之弓将出现于群木拔起之森、洞穴幽冥深处",
    "知识神之书将出现于无尽奔涌之河、狂风怒吼之地",
    "贸易神之币将出现于沙漠广布之地、热浪滔天之地",
    "工匠神之锤将出现于电闪雷鸣之地、高耸繁华之城",
    "大地神之镰将出现于岩石险峻之地、丰饶广袤之原",
    "海洋神之戟将出现于远海群岛之上，近海海洋之都",
    "战争神之盾将出现于冰冻永封之原、光芒万丈之地",
]
var greateLuckPoem = ["万云雷去，赤红之鳞。","王中帝皇，提蒙门前。","闺中怨怼，声声如镰。","雷印咸湖，宛如天工。","七彩虹光，东方宸曜。","苍茫大地，黎明波光。"];
var luckPoem = ["天地易位，子时微萤。","未知其名，熔火诡影。","雷鸣连天，难言其形。","清澈如冰，恶臭袭心。","浮之离岛，实之吾幸。","惋惜苍风，暗流涌动。"];
var smallLuckPoem = ["斩铁陨落，恩惠沉浮。","妖歌迷雾，吞天巨口。","灯下巨剑，喜怒无常。","落魔云崖，震天动地。","热浪滔天，巨牙忽现。","泼天之雨，挥杆降龙。"];
var badLuckPoem = ["眼中珍珠，满湖皆是。","空中骑士，迅捷如风。","为何纯白，七彩之中。","苦纹之豹，无尽轮回。","星空如花，此等幸运。","油嘴滑腔，贪吃无比。"];

function createLuckInfomation(user_id){
    var messages = '';
    var luckyFood = "";
    var luckyPlace = "";
    var luckyPet = "";
    var luckyPoem = "";
    var days;
    var hours;
    var minus = Date.now() - standardDate;
    if(minus>=0){
        days = Math.floor(minus/86400000);
        hours = Math.floor((minus - 86400000 * days)/3600000);
    }
    if(ban.dayPast == days){
        //不需要更新banlist
        if(ban.banList.indexOf(user_id)!=-1){
            //祈福过了
            messages = `[CQ:at,qq=${user_id}]，皮皮拉鱼神的神力有限，每天只能占卜一次哦`
            return {messages};
        }
        else{
            var luckName = "";
            var luck = Math.floor(Math.random()*100); //0-99生成
            var foodIndex = Math.floor((Math.random()*luckyFoodList.length));
            var placeIndex = Math.floor((hours/2));
            var petIndex = Math.floor((Math.random()*luckyPetsList.length));
            var poemList = [];
            if(luck<=24){
                luckName = "凶";
                poemList = badLuckPoem;
            }
            else if(luck<=49 && luck>24){
                luckName = "小吉";
                poemList = smallLuckPoem;
            }
            else if(luck<=74 && luck>49){
                luckName = "吉";
                poemList = luckPoem;
            }
            else{
                luckName = "大吉";
                poemList = greateLuckPoem;
            }
            var poemIndex = Math.floor((Math.random()*poemList.length));
            luckyFood = luckyFoodList[foodIndex];
            luckyPlace = luckyPlacesList[placeIndex];
            luckyPet = luckyPetsList[petIndex];
            luckyPoem = poemList[poemIndex];
            messages = `[CQ:at,qq=${user_id}]的今日运势为：${luck}——${luckName}\n
            幸运宠物：${luckyPet}\n
            幸运料理：${luckyFood}\n
            ${luckyPlace}\n
            你仿佛听到皮皮拉鱼神在远处低语:"${luckyPoem}"
            `
            ban.banList.push(user_id);
            return{messages,luck,luckyFood,luckyPet,luckyPlace,luckyPoem}
        }
    }
    else{
        //需要更新banlist
        ban.banList = []; //empty the list
        ban.dayPast = days;
        var luckName = "";
        var luck = Math.floor(Math.random()*100); //0-99生成
        var foodIndex = Math.floor((Math.random()*luckyFoodList.length));
        var placeIndex = Math.floor((hours/2));
        var petIndex = Math.floor((Math.random()*luckyPetsList.length));
        var poemList = [];
        if(luck<=24){
            luckName = "凶";
            poemList = badLuckPoem;
        }
        else if(luck<=49 && luck>24){
            luckName = "小吉";
            poemList = smallLuckPoem;
        }
        else if(luck<=74 && luck>49){
            luckName = "吉";
            poemList = luckPoem;
        }
        else{
            luckName = "大吉";
            poemList = greateLuckPoem;
        }
        var poemIndex = Math.floor((Math.random()*poemList.length));
        luckyFood = luckyFoodList[foodIndex];
        luckyPlace = luckyPlacesList[placeIndex];
        luckyPet = luckyPetsList[petIndex];
        luckyPoem = poemList[poemIndex];
        messages = `[CQ:at,qq=${user_id}]的今日运势为：${luck}——${luckName}\n
        幸运宠物：${luckyPet}\n
        幸运料理：${luckyFood}\n
        ${luckyPlace}\n
        你仿佛听到皮皮拉鱼神在远处低语:"${luckyPoem}"
        `
        ban.banList.push(user_id);
        return{messages,luck,luckyFood,luckyPet,luckyPlace,luckyPoem}
    }
}
module.exports = createLuckInfomation