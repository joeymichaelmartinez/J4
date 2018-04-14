const BoolType = require("./bool-type");

module.exports = class BooleanLiteral {
    constructor(value) {
        this.value = value;
        this.type = new BoolType;
    }

    analyze() {
        //Let empty on purpose
    }
};
