const BoolType = require("../ast/bool-type");

module.exports = class BinaryExpression {
    constructor(op, left, right) {
        Object.assign(this, { op, left, right });
    }

    analyze(context) {
        this.left.analyze(context);
        this.right.analyze(context);
        let leftType = (this.left.id)? this.left.referent.type : this.left.type;
        let rightType = (this.right.id)? this.right.referent.type : this.right.type;
        if (leftType.toString() !== rightType.toString()) {
            throw new Error("type of left expression does not match type of right expression");
        }
        this.type = leftType;
        if (this.op === "=") {
            this.type = new BoolType();
        } else if (this.op in ["<=" , "<" , "=" , "!=" , ">=" , ">"]) {
            if (leftType.toString() !== "Number") {
                throw new Error("number required for relational operator");
            } else {
                this.type = new BoolType();
            }
        } else {
            if(leftType.toString() !== "Number") {
                throw new Error("number required for arithmetic operator");
            }
        }
    }
    /*
    optimize() {
        this.left = this.left.optimize();
        this.right = this.right.optimize();
        // Suggested: Constant folding and strength reductions. There are many.
        return this;
    }
    */
};
