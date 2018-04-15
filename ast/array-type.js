module.exports = class ArrayType {
    constructor(elementType) {
        this.elementType = elementType;
        this.type = this.elementType + " Array";
    }

    toString() {
        return this.type;
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }

    optimize() {
        return this;
    }
};
