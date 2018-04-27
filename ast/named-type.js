module.exports = class NamedType {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }

    analyze() {
    }

    // optimize() {
    //     return this;
    // }
};
