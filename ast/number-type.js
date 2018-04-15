module.exports = class NumberType {
    constructor() {
        this.type = "Number";
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
