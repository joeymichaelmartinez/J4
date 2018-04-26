module.exports = class BoolType {

    /* This is one of the most basic objects used in our semantic analysis which
     * is only used to do basic type checking.
     */
    constructor() {
        this.type = "Boolean";
    }

    toString() {
        return this.type;
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Intentionally left empty
    }

    optimize() {
        return this;
    }
};
