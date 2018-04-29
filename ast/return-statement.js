module.exports = class ReturnStatement {
    constructor(returnValue) {
        this.returnValue = returnValue;
    }

    analyze(context) {
        context.assertInFunction("return statement outside function");
        let currFunc = context.currentFunction.function;
        if (this.returnValue === null) {
            return;
        }
        this.returnValue.analyze(context);
        if (this.returnValue.id) {
            currFunc.returnStmtType = this.returnValue.referent.type;
        } else {
            if (this.returnValue.type.toString() !== "Nothing") {
                currFunc.returnStmtType = this.returnValue.type;
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
