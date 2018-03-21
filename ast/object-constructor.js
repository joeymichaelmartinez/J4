
// An object declaration cretes an object.
module.exports = class ObjectConstructor {
  constructor(params, suite) {
    this.params = params;
    this.suite = suite;
  }

  // analyze(context) {
  //   // First put the function in the current context, then analyze it in
  //   // a new child context.
  //   context.add(this.function);
  //   this.function.analyze(context.createChildContextForFunctionBody(this));
  // }
};
