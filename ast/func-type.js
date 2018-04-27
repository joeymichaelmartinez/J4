// Function used as a type for functional programming purposes
module.exports = class FunctionType {
    constructor(argTypes, returnType) {
        Object.assign(this, { argTypes, returnType});
    }

    toString() {
        let argsAsString = "";
        let returnTypeAsString = (this.returnType.id)? this.returnType.referent.type.toString() : this.returnType.type.toString();
        for (let i = 0; i < this.argTypes.size; i++) {
            argsAsString = argsAsString + ((this.argTypes.id)? this.argTypes.referent.type.toString() : this.argTypes.type.toString());
            if(i+1 !== this.argTypes.size){
                argsAsString = argsAsString + ", ";
            }
        }
        return "(" + argsAsString + ")" + "->" + returnTypeAsString;
        //TODO: test
    }

    analyze() { // eslint-disable-line class-methods-use-this
        //Left empty on purpose
    }
};
