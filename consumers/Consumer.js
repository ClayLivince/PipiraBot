class Consumer { //规定了consumer的形式
    constructor(valid,getParams,createMessage,name){
        this.valid = valid;
        this.getParams = getParams;
        this.createMessage = createMessage;
        this.name = name;
    }
}

module.exports = Consumer;