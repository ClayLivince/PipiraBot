const groupModel = require('../mongo/groupModel');
const sendGroupMessage = require('../stdFunc/sendGroupMessage');
const ItemJson = require('../resources/item');
const axios = require('axios');
var price = function (info) {
    if(info.params.length!=0){
    let serverJson = {
        "鸟": "陆行鸟",
        "猫": "猫小胖",
        "猪": "莫古力",
        "狗": "豆豆柴",
    }
    let serverName;
    groupModel.find({ "groupId": info.group_id }, (err, doc) => {
        if (doc.length == 0) {
            if (!info.params[1]) {
                sendGroupMessage('5701', info.group_id, "没有输入服务器参数，请输入参数`鸟`,`猫`或者`猪`或者联系群主或者管理员绑定服务器");
            }
            else {
                if (serverJson[info.params[1]]) {
                    serverName = serverJson[info.params[1]];
                }
                else {
                    sendGroupMessage('5701', info.group_id, "服务器名称参数错误!");
                }
            }
        }
        else {
            if(!info.params[1]){
                if (doc[0].gameServer) { serverName = info.gameServer }
                else{sendGroupMessage('没有输入服务器参数，请输入参数`鸟`,`猫`或者`猪`或者联系群主或者管理员绑定服务器')}
            }
            else {
                if (serverJson[info.params[1]]) {
                    serverName = serverJson[info.params[1]];
                }
                else {
                    sendGroupMessage('5701', info.group_id, "服务器名称参数错误");
                }
            }
        }
    let isHQ = false;
    let item = info.params[0];
    if (item.slice(item.length - 2, item.length) == "HQ" || item.slice(item.length - 2, item.length) == "Hq" || item.slice(item.length - 2, item.length) == "hq" || item.slice(item.length - 2, item.length) == "hQ") {
        item = item.slice(0, item.length - 2);
        isHQ = true;
    }
    var itemID = ItemJson[item];
    if(serverName){
    if (itemID) {
        var priceUrl = `https://universalis.app/api/${serverName}/${itemID}`;
        priceUrl = encodeURI(priceUrl);
        axios.get(priceUrl).then((res) => {
            if (res.data.listings != []) {
                var updateDate = res.data.lastUploadTime;
                var data = res.data.listings;
                var priceMessage = `${info.params[0]}在市场中的价格是：\n`;
                var filterList = [];
                for (let j = 0; j < data.length && filterList.length <= 5; j++) {
                    if (isHQ) {
                        if (data[j].hq) { filterList.push(data[j]) }
                    }
                    else { filterList.push(data[j]) }
                }
                if (filterList.length == 0) { priceMessage = "未查询到相关商品信息，若查询的内容为HQ，可以尝试查询NQ\n"; }
                for (let i = 0; i < filterList.length; i++) {
                    priceMessage += (`${filterList[i].pricePerUnit}*${filterList[i].quantity} ${(filterList[i].hq ? "HQ" : '')} 服务器：${filterList[i].worldName}\n`)
                }
                priceMessage += `数据更新时间：${new Date(updateDate).getFullYear()}年${new Date(updateDate).getMonth() + 1}月${new Date(updateDate).getDate()}日 ${new Date(updateDate).getHours()}时${new Date(updateDate).getMinutes()}分`;
                console.log(priceMessage)
                sendGroupMessage('5701', info.group_id, priceMessage)
            }
        })
    }
    else {
        var errorMessage = `物品名称有误，请检查您搜索的物品名！`;
        sendGroupMessage('5701', info.group_id, errorMessage)
    }
    }
    })
}
else{
    sendGroupMessage('5701',info.group_id,"请输入参数！查价指令的使用方法请查看help")
}
}
module.exports = price;