const ArrayType = require("./array-type");
// An array instantiation creates an array.
module.exports = class ArrayInstantiation {
    constructor(elementType, elements) {
        if(elementType){
            this.elements = elements;
            this.type = new ArrayType(elementType.type);
        } else {
            this.elements = elements;
            this.type = new ArrayType(this.elements[0].type);
        }

    }

    analyze(context) {
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].analyze(context);
            if(this.elements[i].type.toString !== this.type.toString){
                throw new Error("Type Mismatch");
            }
        }

        //this.elements.analyze(context);
        //this.elements.map((arrElement) => arrElement.type.toString === this.type.toString);
    }
};
