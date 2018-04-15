module.exports = class Variable {
    constructor(type, id, value) {
        this.type = type;
        this.id = id;
        this.value = value;
    }

    analyze() { // eslint-disable-line class-methods-use-this
        if (this.type.toString() !== this.value.type.toString()) {
            throw new Error("Type of variable does not match type of assigned value.");
        }
    }

    optimize() {
        return this;
    }
};
