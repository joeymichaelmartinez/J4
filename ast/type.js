module.exports = class type {
  constructor(type) {
    this.type = type;
  }

  // analyze(context) {
  //   if (this.returnValue) {
  //     this.returnValue.analyze(context);
  //   }
  //   context.assertInFunction('Return statement outside function');
  // }
  //
  // optimize() {
  //   if (this.returnValue) {
  //     this.returnValue = this.returnValue.optimize();
  //   }
  //   return this;
  // }
