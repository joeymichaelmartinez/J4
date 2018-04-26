module.exports = class BinaryExpression {
    constructor(op, left, right) {
        Object.assign(this, { op, left, right });
    }

    analyze(context) {
        this.left.analyze(context);
        this.right.analyze(context);
        let leftType;
        let rightType;
        if (this.left.id) {
            leftType = this.left.referent.type;
        } else {
            leftType = this.left.type;
        }
        if (this.right.id) {
            rightType = this.right.referent.type;
        } else {
            rightType = this.right.type;
        }
        if (leftType.toString() !== rightType.toString()) {
            throw new Error("type of left expression does not match type of right expression");
        }
        this.type = leftType;
    }

    optimize() {
        this.left = this.left.optimize();
        this.right = this.right.optimize();
        // Suggested: Constant folding and strength reductions. There are many.
        return this;
    }
};
