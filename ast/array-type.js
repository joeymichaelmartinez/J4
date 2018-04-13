module.exports = class ArrayType {
    constructor(elementType) {
        this.elementType = elementType;
    }

    analyze() {
    }

    optimize() {
        return this;
    }
};
