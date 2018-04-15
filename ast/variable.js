module.exports = class Variable {
    constructor(type, id, value) {
        this.type = type;
        this.id = id;
        this.value = value;
    }

    analyze() { // eslint-disable-line class-methods-use-this
        if (this.type.toString() !== this.value.type.toString()) {
            throw new Error("wrong type in declaration");
        }
    }

    optimize() {
        return this;
    }
};
