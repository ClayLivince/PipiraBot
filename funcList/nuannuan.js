const axios = require('axios').default;
const sendGroupMessage = require('../stdFunc/sendGroupMessage');

var nuannuan = function(info){
    axios.get("http://localhost:1200/bilibili/user/article/15503317").then(function(response){
    let indexStart = response.data.indexOf("<item>");
    let indexEnd = response.data.indexOf("</item>");
    let slicedData = response.data.slice(indexStart,indexEnd);
    let linkStart = slicedData.indexOf(`<guid isPermaLink="false">`);
    let linkEnd = slicedData.indexOf(`</guid>`);
    let urlData =  slicedData.slice(linkStart+`<guid isPermaLink="false">`.length,linkEnd);
    sendGroupMessage('5701',info.group_id,urlData);
})
}
// save the xml after modifications 
module.exports = nuannuan;
