module.exports = class StringType {
    constructor() {
        this.type = "String";
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }

    optimize() {
        return this;
    }
};
