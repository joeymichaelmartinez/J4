
/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes.
 * Nothing is actually exported from this module.
 *
 * Each gen() method returns a fragment of JavaScript. The gen() method on
 * the program class generates the complete JavaScript code.
 *
 *   require('./backend/javascript-generator');
 *   program.gen();
 */

const SPECIAL_CALLS = ["print" , "sqrt" , "concat"];
const beautifyJs = require("js-beautify");

const VariableDeclaration = require("../ast/variable-declaration");
const Variable = require("../ast/variable");
const AssignmentStatement = require("../ast/assignment-statement");
const BreakStatement = require("../ast/break-statement");
const ReturnStatement = require("../ast/return-statement");
const IfStatement = require("../ast/if-statement");
const WhileStatement = require("../ast/while-statement");
const ForStatement = require("../ast/for-statement");
const FunctionDeclaration = require("../ast/function-declaration");
const FunctionObject = require("../ast/function-object");
// const ObjectDeclaration = require("../ast/object-declaration");
// const ObjectConstructor = require("../ast/object-constructor");
const ForParam = require("../ast/for-loop-param");
const BinaryExpression = require("../ast/binary-expression");
const ChainedExpression = require("../ast/chained-expression");
const UnaryExpression = require("../ast/unary-expression");
const IdentifierExpression = require("../ast/identifier-expression");
const SubscriptedExpression = require("../ast/subscripted-expression");
// const dotOperatorExpression = require("../ast/dot-operator-expression");
const Call = require("../ast/call");
// const ObjectInstantiation = require("../ast/object-instantiation");
const ArrayInstantiation = require("../ast/array-instantiation");
const Parameter = require("../ast/parameter");
const Argument = require("../ast/argument");
const BooleanLiteral = require("../ast/boolean-literal");
const NumericLiteral = require("../ast/numeric-literal");
const StringLiteral = require("../ast/string-literal");
const Program = require("../ast/program");

function makeOp(op) {
    return { not: "!", and: "&&", or: "||", "=": "===", "!=": "!==", "^": "**" }[op] || op;
}

// jsName(e) takes any J4 object with an id property, such as a
// Variable, Parameter, or FunctionDeclaration, and produces a JavaScript
// name by appending a unique indentifying suffix, such as '_1' or '_503'.
// It uses a cache so it can return the same exact string each time it is
// called with a particular entity.
const jsName = (() => {
    let lastId = 0;
    const map = new Map();
    return (v) => {
        if (!(map.has(v))) {
            map.set(v, ++lastId); // eslint-disable-line no-plusplus
        }
        return `${v.id}_${map.get(v)}`;
    };
})();

// This is a nice helper for variable declarations and assignment statements.
// The AST represents both of these with lists of sources and lists of targets,
// but when writing out JavaScript it seems silly to write `[x] = [y]` when
// `x = y` suffices.
function bracketIfNecessary(a) {
    return (a.length === 1) ? `${a}` : `[${a.join(", ")}]`;
}

Object.assign(Argument.prototype, {
    gen(isInCall) { return this.expression.gen(isInCall); },
});

Object.assign(AssignmentStatement.prototype, {
    gen(isInFor) {
        const targets = this.targets.map(t => t.gen());
        const sources = this.sources.map(s => s.gen());
        let result = `${bracketIfNecessary(targets)} = ${bracketIfNecessary(sources)}`;
        if (!isInFor) {
            result += ";";
        }
        return result;
    },
});

Object.assign(ArrayInstantiation.prototype, {
    gen() {
        return `[${this.elements.map(e => e.gen()).join(", ")}]`;
    },
});

Object.assign(BinaryExpression.prototype, {
    gen() { return `(${this.left.gen(true)} ${makeOp(this.op)} ${this.right.gen(true)})`; },
});

Object.assign(BooleanLiteral.prototype, {
    gen() { return `${this.value}`; },
});

Object.assign(BreakStatement.prototype, {
    gen() { return "break;"; },
});

Object.assign(Call.prototype, {
    gen(isInCall) {
        if (SPECIAL_CALLS.includes(this.callee.id)) {
            if (this.callee.id === "print") {
                return `console.log(${this.args.map(a => a.gen(true)).join(", ")});`;
            } else if (this.callee.id === "sqrt") {
                let result = `Math.sqrt(${this.args[0].gen()})`;
                if (!isInCall) {
                    result += ";";
                }
                return result;
            } else if(this.callee.id === "concat") {
                let firstArg = this.args[0];
                let argsFollowingDotOperator = this.args;
                argsFollowingDotOperator.splice(0, 1);
                let result = `${firstArg.gen()}.concat(${argsFollowingDotOperator.map(a => a.gen()).join(", ")})`;
                if (!isInCall) {
                    result += ";";
                }
                return result;
            } else {
                throw new Error("Special Call not recognized");
            }
        }
        const fun = this.callee.referent;
        let result = `${jsName(fun)}(${this.args.map(a => a.gen(true)).join(", ")})`;
        if(!isInCall) {
            result += ";";
        }
        return result;
    },
});

Object.assign(ChainedExpression.prototype, {
    gen() {
        let op = makeOp(this.op);
        return`(${this.left.gen()} ${op} ${this.right.map(e => e.gen()).join(" " + op + " ")})`;
    }
});

Object.assign(FunctionDeclaration.prototype, {
    gen() { return this.function.gen(); },
});

Object.assign(FunctionObject.prototype, {
    gen() {
        return `function ${jsName(this)}(${this.params.map(p => p.gen()).join(", ")}) {
        ${this.body.map(s => s.gen()).join("\n")}
    }`;
    },
});

Object.assign(IdentifierExpression.prototype, {
    gen() { return this.referent.gen(); },
});

Object.assign(IfStatement.prototype, {
    gen() {
        const cases = this.cases.map((c, index) => {
            const prefix = index === 0 ? "if" : "} else if";
            return `${prefix} (${c.test.gen()}) {${c.body.map(s => s.gen()).join("")}`;
        });
        const alternate = this.alternate ? `}else{${this.alternate.map(s => s.gen()).join("")}` : "";
        return `${cases.join("")}${alternate}}`;
    },
});

Object.assign(NumericLiteral.prototype, {
    gen() { return `${this.value}`; },
});

Object.assign(Parameter.prototype, {
    gen() {
        let translation = jsName(this);
        if (this.defaultExpression) {
            translation += ` = ${this.defaultExpression.gen()}`;
        }
        return translation;
    },
});

Object.assign(Program.prototype, {
    gen() {
        return beautifyJs(this.statements.map(statement => statement.gen()).join("\n"), { indent: "   "});
    },
});

Object.assign(ReturnStatement.prototype, {
    gen() {
        return `return ${this.returnValue ? this.returnValue.gen(true) : ""};`;
    },
});

Object.assign(StringLiteral.prototype, {
    gen() { return `${this.value}`; },
});

Object.assign(SubscriptedExpression.prototype, {
    gen() {
        const base = this.variable.gen();
        const subscript = this.subscript.gen();
        return `${base}[${subscript}]`;
    },
});

Object.assign(UnaryExpression.prototype, {
    gen() { return `(${makeOp(this.op)} ${this.operand.gen()})`; },
});

Object.assign(VariableDeclaration.prototype, {
    gen() {
        const variables = this.variables.map(v => v.gen());
        const initializers = this.initializers.map(i => i.gen());
        return `let ${bracketIfNecessary(variables)} = ${bracketIfNecessary(initializers)};`;
    },
});

Object.assign(Variable.prototype, {
    gen() { return jsName(this); },
});

Object.assign(WhileStatement.prototype, {
    gen() {
        return `while (${this.test.gen()}) { ${this.body.map(s => s.gen()).join("")} }`; //*** Generates extra parens?
    },
});

Object.assign(ForParam.prototype, {
    gen() {
        return `let ${this.value.gen()} = ${this.expression.gen()}`;
    }
});

Object.assign(ForStatement.prototype, {
    gen() {
        return `for (${this.forparam.gen()}; ${this.test.gen()}; ${this.iteration.gen(true)}) { ${this.body.map(s => s.gen()).join("")} }`;
    },
});
