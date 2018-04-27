const ArrayType = require("./array-type");
// An array instantiation creates an array.
module.exports = class ArrayInstantiation {
    constructor(elementType, elements) {
        if(elementType){
            this.elements = elements;
            this.type = new ArrayType(elementType.type.toString());
        } else {
            this.elements = elements;
            this.type = null;
        }

    }

    analyze(context) {
        let arrayElementType;
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].analyze(context);
            arrayElementType = (this.elements[i].id)? this.elements[i].referent.type : this.elements[i].type;
            if (this.type===null) {
                this.type = arrayElementType;
            }
            if(arrayElementType.toString() !==  this.type.toString()){
              // console.log(arrayElementType.toString());
              // console.log(this.type.toString());

                //*** NOT A REAL ERROR YET
                throw new Error("Type Mismatch");
                //
            }
        }

        //this.elements.analyze(context);
        //this.elements.map((arrElement) => arrElement.type.toString === this.type.toString);
    }
};
