const Consumer = require("./Consumer");
const ItemJson = require('../resources/item.js');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const axios = require("axios");
const worldName = {
    "HongYuHai":"红玉海",
    "ShenYiZhiDi":"神意之地",
    "LaNuoXiYa":"拉诺西亚",
    "HuanYingQunDao":"幻影群岛",
    "MengYaChi":"萌芽池",
    "YuZhouHeYin":"宇宙和音",
    "WoXianXiRan":"沃仙曦染",
    "ChenXiWangZuo":"晨曦王座",
    "BaiYinXiang":"白银乡",
    "BaiJinHuanXiang":"白金幻象",
    "ShenQuanHen":"神拳痕",
    "ChaoFengTing":"潮风亭",
    "LvRenZhanDao":"旅人栈道",
    "FuXiaoZhiJian":"拂晓之间",
    "Longchaoshendian":"龙巢神殿",
    "MengYuBaoJing":"梦羽宝境",
    "ZiShuiZhanQiao":"紫水栈桥",
    "YanXia":"延夏",
    "JingYuZhuangYuan":"静语庄园",
    "MoDuNa":"摩杜纳",
    "HaiMaoChaWu":"海猫茶屋",
    "RouFengHaiWan":"柔风海湾",
    "HuPoYuan":"琥珀原"
}
class priceConsumerClass extends Consumer{
    constructor(ctx,serverName){
        super(ctx,serverName);
        this.port = '5701';
    }
    static valid(ctx){
        let validMessage = ctx.request.body.message;
        return validMessage && (validMessage.indexOf("查价") == 0 || validMessage.indexOf("查询价格") == 0);
    }
    work(){
        var contentMessage = this.ctx.request.body.message;
        var dealtMessage = contentMessage.trim().split(/\s+/);
        if(dealtMessage[0] == "查价" || dealtMessage[0] == "查询价格"){
            dealtMessage.shift();
            if(dealtMessage.length!=2){
                //不处理,自生自灭
            }
            else{
                //先处理商品名
                var isHQ = false;
                var item = dealtMessage[0];
                if(item.slice(item.length-2,item.length)=="HQ"||item.slice(item.length-2,item.length)=="Hq"||item.slice(item.length-2,item.length)=="hq"||item.slice(item.length-2,item.length)=="hQ"){
                    item = item.slice(0,item.length-2);
                    isHQ = true;
                }
                var server = dealtMessage[1];
                if(server == "鸟"){
                    server = "陆行鸟";
                }
                else if(server == "猪"){
                    server = "莫古力";
                }
                else if(server == "猫"){
                    server = "猫小胖";
                }
                var itemID = ItemJson[item];
                if(itemID){
                    var priceUrl = `https://universalis.app/api/${server}/${itemID}`;
                    priceUrl = encodeURI(priceUrl);
                    axios.get(priceUrl).then((res)=>{
                        console.log("priceGotten!")
                        if(res.data.listings != []){
                            var updateDate = res.data.lastUploadTime;
                            var data = res.data.listings;
                            var priceMessage = `${dealtMessage[0]} ${server}的价格是：\n`;
                            var filterList = [];
                            for(let j = 0; j<data.length||filterList.length<=5;j++){
                                if(isHQ){
                                    if(data[j].hq){filterList.push(data[j])}
                                }
                                else{filterList.push(data[j])}
                            }
                            if(filterList.length==0){priceMessage = "未查询到相关商品信息，若查询的内容为HQ，可以尝试查询NQ\n";}
                            for(let i = 0; i<filterList.length; i++){
                                priceMessage+=(`${data[i].pricePerUnit}*${data[i].quantity} ${(data[i].hq?"HQ":'')} 服务器：${worldName[data[i].worldName]}\n`)
                            }
                            priceMessage+=`数据更新时间：${new Date(updateDate).getFullYear()}年${new Date(updateDate).getMonth()+1}月${new Date(updateDate).getDate()}日 ${new Date(updateDate).getHours()}时${new Date(updateDate).getMinutes()}分`;
                            console.log(priceMessage)
                            sendGroupMessage(this.port,this.ctx.request.body.group_id,priceMessage)
                        }
                    })
                }
                else{
                    var errorMessage = `找不到查询的物品，请检查您搜索的物品名！`;
                    sendGroupMessage(this.port,this.ctx.request.body.group_id,errorMessage)
                }
            }
        }
    }
}
module.exports = priceConsumerClass;