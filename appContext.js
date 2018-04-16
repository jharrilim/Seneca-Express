class Context {
    constructor(seneca) {
        this.seneca = seneca;
    }
};

module.exports.define = (seneca) => {
    module.exports.context = new Context(seneca);
    console.log(context);
};
