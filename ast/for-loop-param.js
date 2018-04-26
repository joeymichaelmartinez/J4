const Variable = require("../ast/variable");

module.exports = class ForParam {
    constructor(type, id, expression) {
        Object.assign(this, { type, id, expression});
    }

    analyze(context) {
        if (this.type === undefined) {//If there was no type given (no declaration)
            context.lookup(this.id);//Check that id has been declared
            this.type = this.id.referent.type;
        } else {//Otherwise we are declaring a new value
            this.type.analyze();
            this.expression.analyze();
            context.add(new Variable(this.type, this.id, this.expression));
        }
    }
};
