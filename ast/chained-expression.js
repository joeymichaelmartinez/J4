module.exports = class ChainedExpression {
    constructor(op, left, right) {
        Object.assign(this, { op, left, right });
    }

    analyze(context) {
        this.left.analyze(context);
        this.right.forEach(e => e.analyze(context));
        let leftType = (this.left.id)? this.left.referent.type : this.left.type;
        let rightType;
        if(leftType.toString() !== "Boolean") {
            throw new Error("type of left expression does not match type of right expression");
        }
        for(let i = 0; i < this.right.size; i++) {
            rightType = (this.right[i].id)? this.right[i].referent.type : this.right[i].type;

            if (rightType.toString() != "Boolean") {
                throw new Error("type of left expression does not match type of right expression");
            }
        }
        this.type = leftType;
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
