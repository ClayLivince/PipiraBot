class Consumer {
     //规定了consumer的形式
    constructor(ctx){
        this.ctx = ctx;
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