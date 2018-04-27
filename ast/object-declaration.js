// An object declaration creates an object.
module.exports = class ObjectDeclaration {
    constructor(id, body) {
        this.id = id;
        this.body = body;
    }

    analyze() {
        this.id.analyze();
        this.body.forEach(s => s.analyze());
    }
};
