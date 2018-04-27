const BoolType = require("./bool-type");

module.exports = class BooleanLiteral {
    constructor(value) {
        this.value = value;
        this.type = new BoolType();
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Let empty on purpose
    }

    // optimize(){
    //
    // }
};
