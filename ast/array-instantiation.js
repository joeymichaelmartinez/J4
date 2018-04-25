const ArrayType = require("./array-type");
// An array instantiation creates an array.
module.exports = class ArrayInstantiation {
    constructor(elementType, elements) {
        if(elementType){
            this.elements = elements;
            this.type = new ArrayType(elementType.type.toString());
        } else {
            this.elements = elements;
            this.type = new ArrayType(this.elements[0].type.toString());
        }

    }

    analyze(context) {
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].analyze(context);
            if(this.elements[i].type.toString() !== this.type.toString()){
                //*** NOT A REAL ERROR YET
                //throw new Error("Type Mismatch");
                //console.log(this.elements[i].type.toString());
                //console.log(this.type.toString());
            }
        }

        //this.elements.analyze(context);
        //this.elements.map((arrElement) => arrElement.type.toString === this.type.toString);
    }
};
