const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId:Number,
    welcomeMsg:{type:String,default:`欢迎新人入群！`},
    alarmLists:[String],
    functionLists:{type:[Number],default:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]},
    gameServer:String
})

const groupModel = mongoose.model("group",groupSchema);

module.exports = groupModel;