const raider = require('./raider');
const cd = require('./cd');
const bless = require('./bless');
const commonQues = require('./commonQues');
const famous = require('./famous');
const fourkings = require('./fourkings');
const activate = require('./activate');
const deactivate = require('./deactivate');
const luck = require('./luck');
const price = require('./price');
const random = require('./random');
const sealine = require('./sealine');
const fishking = require('./fishking');

let funclist = [raider,cd,bless,commonQues,famous,fourkings,null,luck,price,random,sealine,fishking,activate,deactivate,null,null,null,null];

module.exports = funclist;