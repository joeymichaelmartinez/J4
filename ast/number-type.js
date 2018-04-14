module.exports = class NumberType {
    constructor() {
        this.type = "Number";
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }

    optimize() {
        return this;
    }
};
