module.exports = class WhileStatement {
    constructor(test, body) {
        Object.assign(this, { test, body });
    }

    analyze(context) {
        this.test.analyze(context);

        const bodyContext = context.createChildContextForLoop();

        this.body.forEach(s => s.analyze(bodyContext));

        let testType = (this.test.id)? this.test.referent.type : this.test.type;

        if (testType.toString() !== "Boolean"){
            throw new Error(`the test is of type ${this.test.type} and cannot be evaluated`);
        }
    }
};
