const Consumer = require("./Consumer");
const ItemJson = ('../resources/item.js');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const axios = require("axios");
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
                var item = dealtMessage[0];
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
                            var count = (data.length<=5?data.length:5);
                            for(let i = 0; i<count; i++){
                                priceMessage+=(`${data[i].pricePerUnit}*${data[i].quantity} ${(data[i].hq?"HQ":'')} 服务器：${data[i].worldName}\n`)
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