module.exports = class ArrayType {
    constructor(elementType) {
        this.elementType = elementType;
        this.type = this.elementType + " Array";
    }

    analyze() {
    }

    optimize() {
        return this;
    }
};
