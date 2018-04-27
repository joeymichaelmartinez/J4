module.exports = class SubscriptedExpression {
    constructor(variable, subscript) {
        Object.assign(this, { variable, subscript });
    }

    analyze(context) {
        this.variable.analyze(context);
        this.subscript.analyze(context);

        let subscriptType = (this.subscript.id)? this.subscript.referent.type : this.subscript.type;

        if (subscriptType.toString() !== "Number"){
            throw new Error(`the subscript is of type ${this.test.type} but a number is required`);
        }

    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.subscript = this.subscript.optimize();
    //     return this;
    // }
};
