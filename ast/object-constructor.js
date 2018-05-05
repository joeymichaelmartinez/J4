
// An object declaration creates an object.
module.exports = class ObjectConstructor {
    constructor(params, suite) {
        this.params = params;
        this.suite = suite;
    }

    analyze(context, object) {
        context.assertInObject("constructor declared outside object");
        this.params.forEach(p => p.analyze(context));
        this.suite.forEach(s => s.analyze(context));
        if (object.constructor !== undefined) {
            throw new Error("multiple constructors in object");
        }
        object.constructor = this;
    }
};
