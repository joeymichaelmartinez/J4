const Parameter = require("./parameter");

module.exports = class SubscriptedExpression {
    constructor(variable, subscript) {
        Object.assign(this, { variable, subscript });
    }

    analyze(context) {
        this.variable.analyze(context);
        this.subscript.analyze(context);

        let subscriptType = (this.subscript.id)? this.subscript.referent.type : this.subscript.type;
        if (subscriptType.toString() !== "Number"){
            throw new Error(`the subscript is of type ${this.test.type} but a number is required`);
        }
        let value = (this.variable.id) ? this.variable.referent : this.variable;
        //Check if the variable is a parameter
        if (Object.is(value.constructor, Parameter)) {
            let variableType = value.type.toString();
            if (variableType.split(" ")[1] !== "Array") {
                //Check if the type of the variable is not an array
                throw new Error("subscripted value is not an array");
            }
        } else {//Otherwise the variable is defined locally
            if (value.type.toString().split(" ")[1] !== "Array") {
                //Check if the type of the variable is not an array
                throw new Error("subscripted value is not an array");
            }
            let arrayElements = value.value.elements;
            let subscript = this.subscript.value;
            if (subscript < 0 || subscript > arrayElements.length - 1) {
                throw new Error("array index out of bounds");
            }
        }
        //Use element type of subscripted array
        this.type = value.type.elementType;
    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.subscript = this.subscript.optimize();
    //     return this;
    // }
};
