const axios = require('axios');
function sendGroupMessage(port,group_id,message){
    let url = 'http://localhost:'+port+'/send_group_msg';
    if(message){
        axios.post(url,{group_id,message},{headers:{'Content-Type':'application/json'}}).then((response)=>{
            // console.log(response); if no error occures dont need to deal with respose.
        }).catch((err)=>{
            console.log(`error occured with send message: ${message} , the error info: ${err}`); //deal with error if error occured. may create an  error log?
        })
    }
    else{
        return false;
    }
}
module.exports = sendGroupMessage;