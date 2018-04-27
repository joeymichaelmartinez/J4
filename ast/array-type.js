module.exports = class ArrayType {
    constructor(elementType) {
        this.elementType = elementType;
        this.type = this.elementType;
    }

    toString() {
        return this.type.toString() + " Array";
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }

    // optimize() {
    //     return this;
    // }
};
