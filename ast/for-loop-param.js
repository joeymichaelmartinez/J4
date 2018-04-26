module.exports = class ForParam {
    constructor(type, id, expression) {
        Object.assign(this, { type, id, expression});
    }

    analyze() {
        this.type.analyze();
        this.id.analyze();
    }
};
