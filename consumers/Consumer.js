class Consumer {
     //规定了consumer的形式
    constructor(ctx,serverName){ //If the consumer need to know which group is, it will add a param in its constructor.
        this.ctx = ctx;
        this.serverName = serverName;
    }
    message = [];
    log = {};
    static valid(ctx){
        return false;
    }
    work(){

    }
}

module.exports = Consumer;