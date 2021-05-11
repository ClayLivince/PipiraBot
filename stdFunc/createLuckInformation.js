var standardDate = new Date('2021-4-30').getTime();
var ban = {
    "dayPast":-1,
    "banList":[],
}; 
var luckyFoodList = ["炸蟹饼","乌贼墨汁炒饭","咖啡曲奇","胡椒炒新薯","煎蘑菇","金平糖","长颈骆焗菜","游牧民风味肉饼","煮杂菜","荞麦糊","鲜红罗兰莓派","包心卡贝基","千层长颈驼炖野菜","千层长颈驼焗野菜","菜包肉","菠菜乳蛋饼","泽梅尔加风味焗菜","陷阱草沙拉","番茄派","清炖牛肉","王冠蛋糕","猎人风味水蜥饼","香烩时蔬","酸泡菜","血红奇异果挞","鳄梨色拉","清炖鬼鮟鱇","鳗鱼派","煎菠菜","牧羊人派","清炖羚羊肉","苹果挞","小扁豆煮山栗","烤仙人掌叶","兔形派","杂煮","清炖羊肉"];
var luckyPetsList = ["发条月亮","魔法水桶","手指光标","迷你命名威","小熊猫","青鸟","南方度假獭獭","触手","祭典鲶鱼精","鲨鱼指挥官","巴哈姆特之型","白鼬","蓝闪蝶","小树袋熊","食果花鼠","莫莫拉·莫拉！！！","蝴蝶效应","衣匠猴面雀儿","宝宝箱","虎斑次郎","发条提灯","常风王子","獭獭","小妖狐","","迷你斯卡哈","淘气南加","发条卫月","小脚雪人","喜鹊儿","恩奇都","凯西幼苗","朱孔雀","椒盐海豹","复活小天使","草小人","阿马罗宝宝","水小滴","黄金大河狸","肥肥风筝猫","辅助机316","多玛金鱼儿","狐獴","小刺猬","迷你巨人掌","猪小仙","叮叮摇铃","奇塔利的水蛇？得到宽恕的仇恨","小雪童子","魔法扫帚","企鹅王子","猫头小鹰","萌神乐团","分福","吉吉","浅瞳","白小虎","月读之形","银山雀儿","小小冰海天使","黑豆柴","仙子人偶","亚拉戈西瓜","拉拉鳄","啦哩吼矮人","猫秘玩偶","大哥布林人偶","小鸭嘴兽","泥小点","迷你欧米茄","阳小灵","夺心小魔","魔菇宝"];
var luckyColorsList = ["玉米黄","深林绿","天上蓝","靛青蓝","虚空蓝","蜂鸟粉","日落橙","钴铁棕","口花绿","东洲蓝","风暴蓝","仙子梅","素雪白","煤烟黑","罗兰莓","卫月红","果酒红","南瓜橙","沃土棕","蜂蜜黄","猎人绿","魔花绿","皇室蓝","深渊蓝","莲华粉","帝王紫","宝石红","松石绿","炮铜黑","珍珠白","金属铜","金属橙","金属黄","黑暗红","黑暗棕","黑暗绿","黑暗蓝","黑暗紫","金属蓝","金属紫","无暇白","煤玉黑","闪耀银","闪耀金","柔彩粉","柔彩绿","柔彩蓝","柔彩紫","金属红","金属绿","金属靛","金属紫","丁香紫","珊瑚粉","软木棕","哥布林","黄沙棕","妖精绿","牧草绿","苹果绿","金龟绿","罗海蓝","腐尸蓝","阴影蓝","薰衣草","虹膜紫","卢恩棕","山羊棕","橡果棕","页岩棕","猛豹黄","葡干棕","青柠绿","沼泽绿","仙人掌","绿松蓝","海雾蓝","孔雀蓝","盗龙蓝","醋栗紫","苍白灰","古菩灰","石板灰","木炭灰","玫瑰粉","铁锈红","鲜血红","鲑鱼粉","台地红","树皮棕","巧克力","铁锈棕","奥猴棕","果园棕","山栗棕","鼹鼠棕","骸骨白","沙漠黄","奶油黄","日影黄","泥沼绿","苔藓绿","橄榄绿","地神绿","寒冰蓝","天空蓝","青磷蓝","油墨蓝","午夜蓝","忧郁紫","葡萄紫"];
var luckyPlacesList = [
    "太阳神之扇将出现于广袤湖水中央、熔火烈焰深处",
    "月亮神之瞳将出现于万云翻涌之海、浮城万龙之地",
    "光阴神之斧将出现于千路万桥之上、日月同辉之间",
    "行星神之轮将出现于群星闪耀之夜、浓雾弥漫之地",
    "破坏神之杖将出现于不可言状之岛","暴雨倾盆之地",
    "放浪神之弓将出现于群木拔起之森、洞穴幽冥深处",
    "知识神之书将出现于无尽奔涌之河、狂风怒吼之地",
    "贸易神之币将出现于沙漠广布之地、热浪滔天之地",
    "工匠神之锤将出现于电闪雷鸣之地、高耸繁华之城",
    "大地神之镰将出现于岩石险峻之地、丰饶广袤之原",
    "海洋神之戟将出现于远海群岛之上","近海海洋之都",
    "战争神之盾将出现于冰冻永封之原、光芒万丈之地",
]
var greateLuckPoem = ["万云雷去","赤红之鳞。","王中帝皇","提蒙门前。","闺中怨怼","声声如镰。","雷印咸湖","宛如天工。","七彩虹光","东方宸曜。","苍茫大地","黎明波光。"];
var luckPoem = ["天地易位","子时微萤。","未知其名","熔火诡影。","雷鸣连天","难言其形。","清澈如冰","恶臭袭心。","浮之离岛","实之吾幸。","惋惜苍风","暗流涌动。"];
var smallLuckPoem = ["斩铁陨落","恩惠沉浮。","妖歌迷雾","吞天巨口。","灯下巨剑","喜怒无常。","落魔云崖","震天动地。","热浪滔天","巨牙忽现。","泼天之雨","挥杆降龙。"];
var badLuckPoem = ["眼中珍珠","满湖皆是。","空中骑士","迅捷如风。","为何纯白","七彩之中。","苦纹之豹","无尽轮回。","星空如花","此等幸运。","油嘴滑腔","贪吃无比。"];

function createLuckInfomation(user_id){
    var messages = '';
    var luckyFood = "";
    var luckyPlace = "";
    var luckyPet = "";
    var luckyPoem = "";
    var luckyColor = "";
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
            messages = `[CQ:at,qq=${user_id}]","皮皮拉鱼神的神力有限","每天只能占卜一次哦`
            return {messages};
        }
        else{
            var luckName = "";
            var luck = Math.floor(Math.random()*100); //0-99生成
            var foodIndex = Math.floor((Math.random()*luckyFoodList.length));
            var placeIndex = Math.floor((Math.random()*luckyPlacesList.length));
            var petIndex = Math.floor((Math.random()*luckyPetsList.length));
            var colorIndex = Math.floor((Math.random()*luckyColorsList.length));
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
            luckyColor = luckyColorsList[colorIndex];
            messages = `[CQ:at,qq=${user_id}]的今日运势为：${luck}—${luckName}。你仿佛听到皮皮拉鱼神在远处低语:"${luckyPoem}"\n幸运宠物：${luckyPet}\n幸运颜色：${luckyColor}\n幸运料理：${luckyFood}\n众神庇佑的钓场：${luckyPlace}`
            ban.banList.push(user_id);
            return{messages,luck,luckyFood,luckyPet,luckyPlace,luckyPoem,luckyColor}
        }
    }
    else{
        //需要更新banlist
        ban.banList = []; //empty the list
        ban.dayPast = days;
        var luckName = "";
        var luck = Math.floor(Math.random()*100); //0-99生成
        var foodIndex = Math.floor((Math.random()*luckyFoodList.length));
        var placeIndex = Math.floor((Math.random()*luckyPlacesList.length));
        var petIndex = Math.floor((Math.random()*luckyPetsList.length));
        var colorIndex = Math.floor((Math.random()*luckyColorsList.length));
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
        luckyColor = luckyColorsList[colorIndex];
        messages = `[CQ:at,qq=${user_id}]的今日运势为：${luck}—${luckName}。你仿佛听到皮皮拉鱼神在远处低语:"${luckyPoem}"\n幸运宠物：${luckyPet}\n幸运颜色：${luckyColor}\n幸运料理：${luckyFood}\n众神庇佑的钓场：${luckyPlace}`
        ban.banList.push(user_id);
        return{messages,luck,luckyFood,luckyPet,luckyPlace,luckyPoem,luckyColor}
    }
}
module.exports = createLuckInfomation