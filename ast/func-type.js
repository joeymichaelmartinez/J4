// Function used as a type for functional programming purposes
module.exports = class FunctionType {
    constructor(argTypes, returnType) {
        Object.assign(this, { argTypes, returnType});
    }
};
