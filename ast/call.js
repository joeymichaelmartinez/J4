const NamedType = require("../ast/named-type");
const NumberType = require("../ast/number-type");
const StringType = require("../ast/string-type");
const FunctionType = require("../ast/func-type");
const FunctionObject = require("../ast/function-object");
const SPECIAL_CALLS = ["print" , "sqrt" , "concat"];

module.exports = class Call {
    constructor(callee, args) {
        Object.assign(this, { callee, args });
    }

    analyze(context) {
        this.args.forEach(arg => arg.analyze(context));
        if (SPECIAL_CALLS.indexOf(this.callee.id) >= 0) {//Check if the id is a special call
            if (this.callee.id === "print") {
                if (this.args.length < 1) {//require print statments to have at least one argument
                    throw new Error("wrong number of arguments to print statement");
                }
                this.callee.type = new NamedType("Nothing");
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
            this.type = this.callee.type;
        } else {
            this.callee.analyze(context);
            if (Object.is(this.callee.type.constructor, FunctionType)){//check if we have a function type parameter
                // Function type - Function Parameter call
                this.matchFunctionType();
                this.type = this.callee.referent.type.returnType;
            } else {
                // regular old function call
                context.assertIsFunction(this.callee.referent);
                this.matchArgumentsToParams();
                this.type = this.callee.type;
            }
        }

    }

    matchFunctionType(){
        let funcParamArray = this.callee.referent.type.argTypes;
        let argsArray = this.args;
        if (funcParamArray.length !== argsArray.length){
            throw new Error("number of parameters to function does not match number of arguments given");
        }
        for (let i = 0; i < funcParamArray.length; i++){
            if (funcParamArray[i].toString() !== argsArray[i].type.toString()){
                throw new Error("type of parameter to function does not match type of argument given");
            }
        }
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
                if (this.args[i].expression.id) {//If we have an id, check its referent
                    if (Object.is(this.args[i].expression.referent.constructor, FunctionObject)) {
                        //If the current arg is a function object, compare it with the parameter's function object (assuming it exists)
                        let currArgFuncArgs = this.args[i].expression.referent.params;
                        let currParamFuncArgs = currFunc.params[i].type.argTypes;
                        if (
                            //Check if the current parameter is indeed a function type
                            !Object.is(currFunc.params[i].type.constructor, FunctionType) ||
                            currParamFuncArgs.length !== currArgFuncArgs.length
                            //If the current parameter function's # parameters !== the current arg function's # parameters
                        ) {
                            throw new Error("type of parameter does not match type of argument");
                        }
                        //Now check that the arguments between the two functions match
                        for (let i = 0; i < currArgFuncArgs.length; i++) {
                            if (currArgFuncArgs[i].type.toString() !== currParamFuncArgs[i].type.toString()) {
                                throw new Error("type of parameter does not match type of argument");
                            }
                        }
                    } else if (currFunc.params[i].type.toString() !== this.args[i].expression.referent.type.toString()) {
                        //Otherwise, we did not pass a function so just check types
                        throw new Error("type of parameter does not match type of argument");
                    }
                } else {//ditto here
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
