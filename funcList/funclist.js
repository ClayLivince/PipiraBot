const raider = require('./raider');
const cd = require('./cd');
const bless = require('./bless');
const commonQues = require('./commonQues');
const help = require('./help');
const famous = require('./famous');
const fourkings = require('./fourkings');
const activate = require('./activate');
const deactivate = require('./deactivate');
const luck = require('./luck');
const price = require('./price');
const random = require('./random');
const sealine = require('./sealine');
const fishking = require('./fishking');
const alarmAdd = require('./alarmAdd');
const alarmRemove = require('./alarmRemove');
const alarmShow = require('./alarmShow');
const changeWelcome = require('./changeWelcome');

let funclist = [raider,cd,bless,commonQues,famous,fourkings,help,luck,price,random,sealine,fishking,activate,deactivate,alarmAdd,alarmRemove,alarmShow,changeWelcome];

module.exports = funclist;