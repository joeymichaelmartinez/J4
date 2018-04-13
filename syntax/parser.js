/*
 * Parser module
 *
 *   const parse = require('./parser');
 *
 *   parse(text)
 *       Returns the abstract syntax tree for the given program text. This
 *       function will first pre-parse (figure out indents and dedents),
 *       then match against an Ohm grammar, then apply AST generation
 *       rules. If there are any errors, this function will throw an error.
 */

const fs = require("fs");
const ohm = require("ohm-js");
const withIndentsAndDedents = require("./preparser");

const Program = require("../ast/program");
const VariableDeclaration = require("../ast/variable-declaration");
const AssignmentStatement = require("../ast/assignment-statement");
const BreakStatement = require("../ast/break-statement");
const ReturnStatement = require("../ast/return-statement");
const IfStatement = require("../ast/if-statement");
const Case = require("../ast/case");
const WhileStatement = require("../ast/while-statement");
const ForStatement = require("../ast/for-statement");
const FunctionDeclaration = require("../ast/function-declaration");
const ObjectDeclaration = require("../ast/object-declaration");
const ObjectConstructor = require("../ast/object-constructor");
const ForParam = require("../ast/for-loop-param");
const BinaryExpression = require("../ast/binary-expression");
const UnaryExpression = require("../ast/unary-expression");
const IdentifierExpression = require("../ast/identifier-expression");
const SubscriptedExpression = require("../ast/subscripted-expression");
const dotOperatorExpression = require("../ast/dot-operator-expression");
const Call = require("../ast/call");
const ObjectInstantiation = require("../ast/object-instantiation");
const NamedType = require("../ast/type");
const ArrayType = require("../ast/array-type");
const FuncType = require("../ast/func-type");
const Parameter = require("../ast/parameter");
const Argument = require("../ast/argument");
const BooleanLiteral = require("../ast/boolean-literal");
const NumericLiteral = require("../ast/numeric-literal");
const StringLiteral = require("../ast/string-literal");

const grammar = ohm.grammar(fs.readFileSync("./syntax/J4Grammar.ohm"));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function unpack(a) {
    return a.length === 0 ? null : a[0];
}

/*eslint-disable no-unused-vars*/
const astGenerator = grammar.createSemantics().addOperation("ast", {
    Program(_1, body, _2) { return new Program(body.ast()); },
    Stmt_simple(statement, _) { return statement.ast(); },
    Stmt_while(_, test, suite) { return new WhileStatement(test.ast(), suite.ast()); },
    Stmt_for(_1, forparam, _2, test, _3, statement, suite) {
        return new ForStatement(forparam.ast(), test.ast(), unpack(statement.ast()), suite.ast());
    },
    Stmt_if(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
        const tests = [firstTest.ast(), ...moreTests.ast()];
        const bodies = [firstSuite.ast(), ...moreSuites.ast()];
        const cases = tests.map((test, index) => new Case(test, bodies[index]));
        return new IfStatement(cases, unpack(lastSuite.ast()));
    },
    Stmt_functionDec(_1, id, _2, params, _3, _4, type, suite) {
        return new FunctionDeclaration(id.ast(), params.ast(), type.ast(), suite.ast());
    },
    Stmt_struct(_1, id, suite){ return new ObjectDeclaration(id.ast(), suite.ast()); },
    Stmt_init(_1, _2, params, _3, suite){ return new ObjectConstructor(params.ast(), suite.ast()); },
    SimpleStmt_vardeclAndAssign(type, v, _, e) {
        return new VariableDeclaration(type.ast(), v.ast(), e.ast());
    },
    SimpleStmt_vardecl(type, v) { return new VariableDeclaration(type.ast(), v.ast(), undefined ); },
    SimpleStmt_assign(v, _, e) { return new AssignmentStatement(v.ast(), e.ast()); },
    SimpleStmt_break(_) { return new BreakStatement(); },
    SimpleStmt_return(_, e) { return new ReturnStatement(unpack(e.ast())); },
    Suite(_1, _2, statements, _3) { return statements.ast(); },
    ForParam_loopingVarDec(type, id, _1, e) { return new ForParam(type.ast(), id.ast(), e.ast()); },
    ForParam_outsideVar(id) { return new ForParam(undefined, id.ast(), undefined); },
    Exp_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
    Exp_and(left, op, right) { return new BinaryExpression(op.ast(), right.ast()); },
    Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
    Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
    Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
    Exp4_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
    Exp5_unary(op, operand) { return new UnaryExpression(op.ast(), operand.ast()); },
    Exp6_parens(_1, expression, _2) { return expression.ast(); },
    Call(callee, _1, args, _2) { return new Call(callee.ast(), args.ast()); },
    ObjDecl(_1, v, _2, args, _3) { return new ObjectInstantiation(v.ast(), args.ast()); },

    Type_arrayType(type, _) { return new ArrayType(type.ast()); },
    Type_functionType(_1, rest, _2, _3, last) {return new FuncType([...rest.ast()], last.ast()); },
    Type_idType(name) { return new NamedType(name.sourceString); },
    Type_numberType(name) { return new NamedType(name.sourceString); },
    Type_stringType(name) { return new NamedType(name.sourceString); },
    Type_boolType(name) { return new NamedType(name.sourceString); },

    VarExp_subscripted(v, _1, e, _2) { return new SubscriptedExpression(v.ast(), e.ast()); },
    VarExp_simple(id) { return new IdentifierExpression(id.ast()); },
    VarExp_dotOperator(v, _1, id, _2, args, _3) { return new dotOperatorExpression(v.ast(), id.ast(), args.ast()); },
    Param(id, _, type) { return new Parameter(id.ast(), type.ast()); },
    Arg(exp) { return new Argument(exp.ast()); },
    NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
    EmptyListOf() { return []; },
    boollit(_) { return new BooleanLiteral(this.sourceString === "true"); },
    numlit(_1, _2, _3) { return new NumericLiteral(+this.sourceString); },
    strlit(_1, chars, _6) { return new StringLiteral(this.sourceString); },
    id(_1, _2) { return this.sourceString; },
    _terminal() { return this.sourceString; },
});
/*eslint-enable no-unused-vars*/

module.exports = (text) => {
    const match = grammar.match(withIndentsAndDedents(text));
    if (!match.succeeded()) {
        throw new Error(`Syntax Error: ${match.message}`);
    }
    return astGenerator(match).ast();
};
