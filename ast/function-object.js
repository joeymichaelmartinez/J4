const NamedType = require("../ast/named-type");

module.exports = class FunctionObject {
    constructor(id, params, type, body) {
        Object.assign(this, { id, params, type, body });
        this.returnStmtType = new NamedType("Nothing");
        this.hasParams = true;
    }

    get isExternal() {
        return !this.function.body;
    }

    analyze(context) {
        // Each parameter will be declared in the function's scope, mixed in
        // with the function's local variables. This is by design.

        if (this.params === "Nothing" || this.params.length === 0) {//Check for no params
            this.hasParams = false;
        } else {
            this.params.forEach(p => p.analyze(context));

            // Make sure all required parameters come before optional ones, and
            // gather the names up into sets for quick lookup.

            this.allParameterNames = new Set();
            this.params.forEach((p) => {
                this.allParameterNames.add(p.id);
            });
        }

        // Now we analyze the body with the local context. Note that recursion is
        // allowed, because we've already inserted the function itself into the
        // outer context, so recursive calls will be properly resolved during the
        // usual "outward moving" scope search. Of course, if you declare a local
        // variable with the same name as the function inside the function, you'll
        // shadow it, which would probably be not a good idea.
        if (this.body) {
            this.body[0].forEach(s => s.analyze(context));//I am not sure why this works
        }
        //Return statement in body analyzation changes return type of function object
        // console.log(this);
        // *** IDK what to put here to make built in functions work
        if (this.type.toString() === "Nothing") {
            if (this.returnStmtType.toString() !== "Nothing") {
                throw new Error("return value given to nonreturning function");
            }
        } else {
            if (this.returnStmtType.toString() === "Nothing") {
                throw new Error("no return value given");
            }
            if (this.returnStmtType.toString() !== this.type.toString()) {
                throw new Error("return value does not match return type");
            }
        }
    }

    // optimize() {
    //     this.parameters.forEach(p => p.optimize());
    //     this.body.forEach(s => s.optimize());
    //     this.body = this.body.filter(s => s !== null);
    //     // Suggested: Look for returns in the middle of the body
    //     return this;
    // }
};
