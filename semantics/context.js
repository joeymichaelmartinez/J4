/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase, such as the
 * enclosing function (if any), whether or not we are in a loop, a map of
 * declarations introduced in this scope, and the parent context.
 *
 *   const Context = require('./semantics/context');
 */

const FunctionObject = require("../ast/function-object");
const J4Object = require("../ast/object-declaration");
const FunctionType = require("../ast/func-type.js");

class Context {
    constructor({ parent = null, currentFunction = null, inObject = false, inLoop = false } = {}) {
        Object.assign(this, { parent, currentFunction, inObject, inLoop, declarations: Object.create(null) });
    }

    createChildContextForFunctionBody(currentFunction, isInObject) {
        // When entering a new function, we're not in a loop anymore
        return new Context({ parent: this, currentFunction, inObject: isInObject, inLoop: false });
    }

    createChildContextForLoop() {
        // When entering a loop body, just set the inLoop field, retain others
        return new Context({ parent: this, currentFunction: this.currentFunction, inObject: false, inLoop: true });
    }

    createChildContextForObjectBody() {
        return new Context({ parent: this, currentFunction: this.currentFunction, inObject: true, inLoop: false });
    }

    createChildContextForBlock() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
        return new Context({
            parent: this,
            currentFunction: this.currentFunction,
            inObject: false,//Only constructors care if they are in an object
            inLoop: this.inLoop,
        });
    }

    // Call this to add a new entity (which could be a variable, a function,
    // or a parameter) to this context. It will check to see if the entity's
    // identifier has already been declared in this context. It does not need
    // to check enclosing contexts because in this language, shadowing is always
    // allowed. Note that if we allowed overloading, this method would have to
    // be a bit more sophisticated.

    notDeclaredInScope(id){
        if (id in this.declarations){
            throw new Error(`Identitier ${id} already declared`);
        } else if (this.parent !== null && !this.parent.inObject) {
            return this.parent.notDeclaredInScope(id);
        } else {
            return true;
        }
    }

    add(entity) {
        if(this.notDeclaredInScope(entity.id)){
            this.declarations[entity.id] = entity;
        }
    }

    // Returns the entity bound to the given identifier, starting from this
    // context and searching "outward" through enclosing contexts if necessary.
    lookup(id) {
        let isAtTopLevelObjectScope = this.inObject && (!this.currentFunction);
        if (id in this.declarations) {
            return this.declarations[id];
        } else if (this.parent === null || isAtTopLevelObjectScope) {
            throw new Error(`identifier ${id} not declared`);
        } else {
            return this.parent.lookup(id);
        }
    }

    assertInFunction(message) {
        if (!this.currentFunction) {
            throw new Error(message);
        }
    }

    isInFunction() {
        return !!this.currentFunction;//convert to boolean
    }

    assertInObject(message) {
        if (!this.inObject) {
            throw new Error(message);
        }
    }

    isInObject() {
        return this.inObject;
    }

    assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
        let isFunctionType = Object.is(entity.type.constructor, FunctionType);
        if (entity.constructor !== FunctionObject && !isFunctionType) {
            throw new Error(`${entity.id} is not a function`);
        }
    }

    assertIsObject(entity) { // eslint-disable-line class-methods-use-this
        if (entity.constructor !== J4Object) {
            throw new Error(`${entity.id} is not an object`);
        }
    }

}

Context.INITIAL = new Context();
// J4 DOES NOT USE FUNCTION DECLARATIONS FOR PRINT AND SQRT, EVERYTHING IS HANDLED BY CALL.JS
// DOING THIS CREATE BUGS IN OUR CODE!!!!!
// new FunctionDeclaration("print", [new Parameter("_", null)], null).analyze(Context.INITIAL);
// new FunctionDeclaration("sqrt", [new Parameter("_", null)], null).analyze(Context.INITIAL);

module.exports = Context;
