const BooleanType = require("../ast/bool-type");
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
                this.callee.type = new BooleanType();//Assume that print statements return a bool
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
        if (this.args.length !== currFunc.params.length) {
            throw new Error("number of parameters in call does not match number of arguments in function");
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

    checkArgumentMatching(callee) {
        let keywordArgumentSeen = false;
        const matchedParameterNames = new Set([]);
        this.args.forEach((arg, index) => {
            if (index >= callee.params.length) {
                throw new Error("Too many arguments in call");
            }
            if (arg.isKeywordArgument) {
                keywordArgumentSeen = true;
            } else if (keywordArgumentSeen) {
                throw new Error("Positional argument in call after keyword argument");
            }
            const parameterName = arg.id ? arg.id : callee.params[index].id;
            if (!callee.allParameterNames.has(parameterName)) {
                throw new Error(`Function does not have a parameter called ${parameterName}`);
            }
            if (matchedParameterNames.has(parameterName)) {
                throw new Error(`Multiple arguments for parameter ${parameterName}`);
            }
            matchedParameterNames.add(parameterName);
        });

        // Look for and report a required parameter that is not matched
        const miss = [...callee.requiredParameterNames].find(name => !matchedParameterNames.has(name));
        if (miss) {
            throw new Error(`Required parameter ${miss} is not matched in call`);
        }
    }

    // optimize() {
    //     this.callee = this.callee.optimize();
    //     this.args.forEach(arg => arg.optimize());
    //     return this;
    // }
};
