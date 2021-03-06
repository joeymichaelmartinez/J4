const FunctionObject = require("./function-object");

// A function declaration binds a function object to a name.
module.exports = class FunctionDeclaration {
    constructor(id, params, returntype, body) {
        this.id = id;
        this.function = new FunctionObject(id, params, returntype, body);
    }

    analyze(context, object) {
        // First put the function in the current context, then analyze it in
        // a new child context.
        context.add(this.function);
        let functionContext = context.createChildContextForFunctionBody(this, context.isInObject());
        this.function.analyze(functionContext);
        if (object) {
            object.methods.push(this.function);
        }
    }
};
