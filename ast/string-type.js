module.exports = class StringType {
    constructor() {
        this.type = "String";
    }

    toString() {
        return this.type;
    }

    analyze() { // eslint-disable-line class-methods-use-this
        // Intentionally empty
    }

    // optimize() {
    //     return this;
    // }
};
