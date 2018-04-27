module.exports = class Parameter {
    constructor(id, type) {
        Object.assign(this, { id, type });
    }

    analyze(context) {
        context.add(this);
    }

    // optimize() {
    //     this.defaultExpression = this.defaultExpression.optimize();
    //     return this;
    // }
};
