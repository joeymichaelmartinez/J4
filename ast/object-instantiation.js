// const ObjectConstructor = require('./object-constructor');

// An object declaration cretes an object.
module.exports = class ObjectInstantiation {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  // analyze(context) {
  //   // First put the function in the current context, then analyze it in
  //   // a new child context.
  //   context.add(this.function);
  //   this.function.analyze(context.createChildContextForFunctionBody(this));
  // }
};
