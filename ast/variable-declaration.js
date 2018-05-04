const Variable = require("./variable");

// A VariableDeclaration declares one or more variables. The variable objects
// will be created during semantic analysis.
module.exports = class VariableDeclaration {
    // During syntax analysis (parsing), all we do is collect the variable names.
    // We will make the variable objects later, because we have to add them to a
    // semantic analysis context.
    constructor(type, ids, initializers) {
        Object.assign(this, { type, ids, initializers });
    // initializers can be undefined for declaration
    }

    analyze(context, object) {
        if (this.initializers === undefined) {
            throw new Error("variable not initialized in declaration");
        }
        if (this.ids.length !== this.initializers.length) {
            throw new Error("wrong number of declarations");
        }

        // We don't want the declared variables to come into scope until after the
        // declaration line, so we will analyze all the initializing expressions
        // first.
        this.initializers.forEach(e => e.analyze(context));

        // Now we can create actual variable objects and add to the current context.
        this.variables = [];
        for (let i = 0; i < this.ids.length; i++) {
            let newVar = new Variable(this.type, this.ids[i], this.initializers[i]);
            this.variables.push(newVar);
            this.variables[i].analyze();
            context.add(this.variables[i]);
            if (context.isInObject() && !context.isInFunction()) {
                object.fields.push(newVar);
            }
        }
    }

    optimize() {
        return this;
    }
};
