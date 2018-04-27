const StringType = require("./string-type");

module.exports = class StringLiteral {
    constructor(value) {
        this.value = value;
        this.type = new StringType();
    }

    analyze() { // eslint-disable-line class-methods-use-this
        // Intentionally empty
    }

    // optimize() {
    //     return this;
    // }
};
