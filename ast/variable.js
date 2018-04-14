module.exports = class Variable {
    constructor(type, id, value) {
        this.type = type;
        this.id = id;
        this.value = value;
    }

    analyze(context) { // eslint-disable-line class-methods-use-this
        if (this.type !== this.value.type) {
            throw new Error("Type of variable does not match type of assigned value.");
        }
        context.add(this);
    }

    optimize() {
        return this;
    }
};
