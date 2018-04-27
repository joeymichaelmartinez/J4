module.exports = class ReturnStatement {
    constructor(returnValue) {
        this.returnValue = returnValue;
    }

    analyze(context) {
        context.assertInFunction("return statement outside function");
        if (this.returnValue === null) {
            return;
        }
        this.returnValue.analyze(context);
        if (this.returnValue.id) {
            context.currentFunction.function.type = this.returnValue.referent.type;
        } else {
            if (this.returnValue.type.toString() !== "Nothing") {
                context.currentFunction.function.type = this.returnValue.type;
            }
        }
    }

    // optimize() {
    //     if (this.returnValue) {
    //         this.returnValue = this.returnValue.optimize();
    //     }
    //     return this;
    // }
};
