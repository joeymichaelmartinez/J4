const ArrayType = require("./array-type");
// An array instantiation creates an array.
module.exports = class ArrayInstantiation {
    constructor(elementType, elements) {
        this.type = elementType;
        this.elements = elements;
    }
};
