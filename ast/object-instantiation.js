const NamedType = require("../ast/named-type");

module.exports = class ObjectInstantiation {
    constructor(id, args) {
        this.id = id;
        this.args = args;
    }

    analyze(context) {
        this.id.analyze(context);
        this.args.forEach(a => a.analyze(context));
        this.type = new NamedType(this.id.id);
    }
};
