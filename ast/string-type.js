module.exports = class StringType {
    constructor() {
        this.type = "String";
    }

    analyze() { // eslint-disable-line class-methods-use-this
        // Intentionally empty

    }

    optimize() {
        return this;
    }
};
