// An object declaration creates an object.
module.exports = class ObjectDeclaration {
    constructor(id, body) {
        this.id = id;
        this.body = body;
        this.constructors = [];
        this.fields = [];//Just an array of variables
    }

    analyze(context) {
        context.add(this);
        const bodyContext = context.createChildContextForObjectBody(this);
        //Each constructor adds itself to constructors
        //Ditto for fields
        this.body.forEach(s => s.analyze(bodyContext, this));
        //Now we need to check if self dot operations match with fields
        this.constructors.forEach(c => {
            c.suite.forEach(s => {
                if (s.targets) {
                    //Make sure the statement is an assignment statement
                    for(let i = 0; i < s.targets.length; i++) {
                        let t = s.targets[i];
                        //check if each target is a dot operation containing 'self'
                        if (t.variable.id === "self") {
                            //we found a self dot operation, check that its field exists
                            let hasNoMatch = true;
                            for(let j = 0; j < this.fields.length; j++) {
                                let f = this.fields[j];
                                //this is done by iterating through each field and checking
                                if (f.id === t.id) {
                                    //match found, check type and then set flag
                                    if (f.type.toString() !== t.type.toString()) {
                                        throw new Error("type of dot operation does not match type of field");
                                    }
                                    hasNoMatch = false;
                                    break;
                                }
                            }
                            if (hasNoMatch) {
                                throw new Error("no field found for given dot operation");
                            }
                        }
                    }
                }
            });
        });
    }
};
