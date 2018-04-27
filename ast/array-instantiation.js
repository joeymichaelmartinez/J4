const ArrayType = require("./array-type");
// An array instantiation creates an array.
module.exports = class ArrayInstantiation {
    constructor(elementType, elements) {
        this.elements = elements;
        if(elementType !== null){
            this.type = new ArrayType(elementType.type.toString());
        } else {
            this.type = null;
        }
    }

    analyze(context) {
        let arrayElementType;
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].analyze(context);
            arrayElementType = (this.elements[i].id)? this.elements[i].referent.type : this.elements[i].type;
            if (this.type === null) {
                this.type = arrayElementType;
            }
            if(arrayElementType.toString() !==  this.type.toString()) {
                throw new Error("type of element in array does not match type of array");
            }
        }
    }
};
