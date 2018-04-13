// const ObjectConstructor = require('./object-constructor');

// An object declaration creates an object.
module.exports = class ObjectDeclaration {
    constructor(id, body) {
        this.id = id;
        this.body = body;
    }

    analyze(context) {
    // First put the function in the current context, then analyze it in
    // a new child context.
        context.add(this.function);
        this.function.analyze(context.createChildContextForFunctionBody(this));
    }
};
