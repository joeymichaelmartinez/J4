const NamedType = require("../ast/named-type");
const NumberType = require("../ast/number-type");
const StringType = require("../ast/string-type");
const SPECIAL_CALLS = ["print" , "sqrt" , "concat"];

module.exports = class Call {
    constructor(callee, args) {
        Object.assign(this, { callee, args });
    }

    analyze(context) {
        if (SPECIAL_CALLS.indexOf(this.callee.id) >= 0) {//Check if the id is a special call
            this.args.forEach(arg => arg.analyze(context));
            if (this.callee.id === "print") {
                if (this.args.length < 1) {//require print statments to have at least one argument
                    throw new Error("wrong number of arguments to print statement");
                }
                this.callee.type = new NamedType();
            } else if (this.callee.id === "sqrt") {
                if (this.args.length !== 1) {//require sqrt statments to have one argument
                    throw new Error("wrong number of arguments to sqrt statement");
                }
                this.callee.type = new NumberType();
            } else {
                if (this.args.length < 2) {//require concat statments to have at least two arguments
                    throw new Error("wrong number of arguments to concat statement");
                }
                this.callee.type = new StringType();
            }
        } else {//Otherwise look for a declared function
            this.callee.analyze(context);
            context.assertIsFunction(this.callee.referent);
            this.args.forEach(arg => arg.analyze(context));
            this.matchArgumentsToParams();
        }
        this.type = this.callee.type;
    }

    matchArgumentsToParams() {
        let currFunc = this.callee.referent;
        if (!currFunc.hasParams) {//If the function has no parameters check if we gave it args
            if (this.args.length !== 0) {
                throw new Error("argument passed to function with no parameters");
            }
        } else {//Otherwise, function has parameters, make sure they match with arguments
            if (this.args.length !== currFunc.params.length) {
                throw new Error("number of arguments in call does not match number of parameters in function");
            }
            for (let i = 0; i < this.args.length; i++) {
                // console.log(currFunc.params[i]);
                // console.log(this.args[i]);
                if (this.args[i].expression.id) {//If we have an id, check its referent
                    if (currFunc.params[i].type.toString() !== this.args[i].expression.referent.type.toString()) {
                        throw new Error("type of parameter does not match type of argument");
                    }
                } else {
                    if (currFunc.params[i].type.toString() !== this.args[i].expression.type.toString()) {
                        throw new Error("type of parameter does not match type of argument");
                    }
                }
            }
        }
    }

    // optimize() {
    //     this.callee = this.callee.optimize();
    //     this.args.forEach(arg => arg.optimize());
    //     return this;
    // }
};
