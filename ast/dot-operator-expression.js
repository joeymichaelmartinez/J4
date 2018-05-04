module.exports = class DotOperatorExpression {
    constructor(variable, id, args) {
        Object.assign(this, { variable, id, args });
    }

    analyze(context) {
        this.variable.analyze(context);
        this.id.analyze(context);
        this.args.analyze(context);
        //*** TODO:implement objects
    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.id = this.id.optimize();
    //     this.args = this.args.optimize();
    //     return this;
    // }
};
