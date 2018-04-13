module.exports = class NamedType {
    constructor(name) {
        this.name = name;
    }

    analyze() {
    }

    optimize() {
        return this;
    }
};
