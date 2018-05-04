module.exports = class DotOperatorExpression {
    constructor(variable, id, args) {
        Object.assign(this, { variable, id, args });
    }

    analyze(context) {
        if (this.variable.id === "self") {
            context.assertInObject("self dot operation outside of object");
            this.referent = context.lookup(this.id);
            this.type = this.referent.type;
            if (this.args) {
                throw new Error("self dot operation contains arguments");
            }
        } else {
            this.variable.analyze(context);
            this.referent = context.lookup(this.variable.id);
            this.type = this.referent.type;
            this.args.forEach(a => {
                a.analyze(context);
            });
        }
        //console.log(this);
    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.id = this.id.optimize();
    //     this.args = this.args.optimize();
    //     return this;
    // }
};
