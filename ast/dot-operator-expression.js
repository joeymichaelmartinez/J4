module.exports = class DotOperatorExpression {
    constructor(variable, id, args) {
        Object.assign(this, { variable, id, args });
    }

    analyze(context) {
        if (this.variable.id === "self") {
            context.assertInObject("self dot operation outside of object");
            this.referent = context.lookup(this.id);
            this.type = this.referent.type;
            if (this.args) {
                throw new Error("self dot operation contains arguments");
            }
        } else {
            this.variable.analyze(context);
            this.referent = context.lookup(this.variable.id);
            this.type = this.referent.type;
            this.args.forEach(a => {
                a.analyze(context);
            });
            this.findMethodInObject(
                (context.lookup(this.variable.id).value.id.referent),
                this.id,
                this.args
            );
        }
    }

    findMethodInObject(object, id, args) {
        let hasNoMatch = true;
        //Search through each statement in object
        for (let i = 0; i < object.body.length; i++) {
            let s = object.body[i];
            //if we find a function with the right id
            if (s.id === id) {
                let params = s.function.params;
                //check that args and parameters map to each other
                if (params.length !== args.length) {
                    throw new Error("method call arguments does not match method parameters");
                }
                //now check that our types match
                for (let j = 0; j < params.length; j++) {
                    if(params[j].type.toString() !== args[j].type.toString()) {
                        throw new Error("type of method call argument does not match method call parameter");
                    }
                }
                hasNoMatch = false;
            }
        }
        if (hasNoMatch) {
            throw new Error(`method ${id} not found`);
        }
    }

    // optimize() {
    //     this.variable = this.variable.optimize();
    //     this.id = this.id.optimize();
    //     this.args = this.args.optimize();
    //     return this;
    // }
};
