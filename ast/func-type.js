// Function used as a type for functional programming purposes
module.exports = class FunctionType {
    constructor(argTypes, returnType) {
        Object.assign(this, { argTypes, returnType});
    }

    toString() {
        return "Function";//TODO: Come up with a clever implementation for stringifying function types
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }
};
