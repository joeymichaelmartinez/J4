module.exports = class DotOperatorExpression {
    constructor(variable, id, args) {
        Object.assign(this, { variable, id, args });
    }

    analyze(context) {
        this.referent = context.lookup(this.id);
        this.type = this.referent.type;
        if (this.variable.id === "self") {
            context.assertInObject("self dot operation outside of object");
            if (this.args.length !== 0) {
                throw new Error("self dot operation contains arguments");
            }
        } else {
            this.variable.analyze(context);
            this.args.analyze(context);
        }
    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.id = this.id.optimize();
    //     this.args = this.args.optimize();
    //     return this;
    // }
};
