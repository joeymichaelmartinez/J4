const Variable = require("./variable");

// A VariableDeclaration declares one or more variables. The variable objects
// will be created during semantic analysis.
module.exports = class VariableDeclaration {
    // During syntax analysis (parsing), all we do is collect the variable names.
    // We will make the variable objects later, because we have to add them to a
    // semantic analysis context.
    constructor(type, ids, initializers) {
        Object.assign(this, { type, ids, initializers });
    // *initializers can be undefined for declaration
    }

    analyze(context) {
        if (this.ids.length !== this.initializers.length) {
            throw new Error("The number of variables does not equal the number of initializers.");
        }

        // We don't want the declared variables to come into scope until after the
        // declaration line, so we will analyze all the initializing expressions
        // first.
        this.initializers.forEach(e => e.analyze(context));

        // Now we can create actual variable objects and add to the current context.
        this.variables = [];
        for (let i = 0; i < this.ids.length; i++) {
            this.variables.push(new Variable(this.type, this.ids[i], this.initializers[i]));
        }
    }

    optimize() {
        return this;
    }
};
