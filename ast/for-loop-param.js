const Variable = require("../ast/variable");

module.exports = class ForParam {
    constructor(type, id, expression) {
        Object.assign(this, { type, id, expression});
    }

    analyze(context) {
        if (this.type === undefined) {//If there was no type given (no declaration)
            context.lookup(this.id);//Check that id has been declared
            let currFuncParams = context.currentFunction.function.params;
            let isFuncParam = false;
            currFuncParams.forEach(p => {//Check if id is a param to curr function
                if (p.id === this.id) {
                    isFuncParam = true;
                    this.type = p.type;
                }
            });
            if (!isFuncParam) {//otherwise we can safely assume it was declared locally
                this.type = this.id.referent.type;
                this.expresson = this.id.referent;
            }
        } else {//Otherwise we are declaring a new value
            this.type.analyze(context);
            this.expression.analyze(context);
            this.value = new Variable(this.type, this.id, this.expression);
            context.add(this.value);
        }
    }
};
