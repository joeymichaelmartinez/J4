//const BooleanLiteral = require("./boolean-literal");

module.exports = class ForStatement {
    constructor(forparam, test, iteration, body) {
        Object.assign(this, { forparam, test, iteration, body });
    }

    analyze(context) {
        const bodyContext = context.createChildContextForLoop();
        this.forparam.analyze(bodyContext);//forparam creates needed variable
        this.test.analyze(bodyContext);
        this.iteration.analyze(bodyContext);
        this.body.forEach(s => s.analyze(bodyContext));

        let testType = (this.test.id)? this.test.referent.type : this.test.type;

        if (testType.toString() !== "Boolean"){
            throw new Error(`the test is of type ${this.test.type} and cannot be evaluated`);
        }
    }

    // optimize() {
    //     this.test = this.test.optimize();
    //     if (this.test instanceof BooleanLiteral && this.condition.value === false) {
    //         return null;
    //     }
    //     this.body.map(s => s.optimize()).filter(s => s !== null);
    //     // Suggested: Look for returns/breaks in the middle of the body
    //     return this;
    // }
};
