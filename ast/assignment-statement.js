module.exports = class AssignmentStatement {
    constructor(targets, sources) {
        Object.assign(this, { targets, sources });
    }

    analyze(context) {
        if (this.targets.length !== this.sources.length) {
            throw new Error("number of variables does not equal number of expressions");
        }
        this.targets.forEach(v => v.analyze(context));
        this.sources.forEach(e => e.analyze(context));
        for (let i = 0; i < this.targets.length; i++) {
            if (this.sources[i].id) {
                if (this.sources[i].referent.type.toString() !== this.targets[i].referent.type.toString()) {
                    throw new Error("type of variable does not match type of value");
                }
            } else {
                if (this.sources[i].type.toString() !== this.targets[i].referent.type.toString()) {
                    throw new Error("type of variable does not match type of value");
                }
            }
        }
    }

    // optimize() {
    //     this.sources.forEach(e => e.optimize());
    //     this.targets.forEach(v => v.optimize());
    //     // Suggested: Turn self-assignments without side-effects to null
    //     return this;
    // }
};
