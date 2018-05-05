<img src = "J4 Icon.png" alt = "J4 Logo" width = 400 />

[J4 website](https://j4lang.github.io/)

## Introduction
J4 does away with verbose, unreadable code and replaces it with a readable, understandable coding language that standardizes meaningful, beautiful code. This is made possible with whitespace matching and utilizing syntax that emphasize the flow of information. Along with these leaps forward in code structure, J4 simplifies coding conventions by handling the minutia of memory management and reinventing the outdated and arbitrary rules present in other languages.

J4 pulls inspiration from Swift, ELM, Python, and Lua

## Features
* .j4 File Extension
* Whitespace Sensitive
* Easy Array Creation
* Powerful Object Creation
* First Class Functions
* Higher Order Functions
* Static Typing
* Strong Typing

### Operators

* Additive: `+`, `-`
* Multiplicative: `*`, `/`, `%`
* Exponentiation: `^`
* Relational: `<`, `>`, `>=`, `<=`, `=`
* Boolean: `and`, `or`

### Data Types

* Number: `2`, `8.0`, `3.1415926`
* Boolean: `true`, `false`
* String: `“a”`, `“hello world”
* Function: `addOne(x)`
* Array: [`“Martinez”`, `"Goocher"`, `"Hardy"`, `"Watkins”`]
* Object: `Color magenta <- new Color(1.0,0.0,1.0)`, `Color halfGray <- new Color(0.5)`
* Comments: `~ Single line comment`
            `(~ Multi line comment ~)`

## Example Programs
J4 on the left, Javascript on the right

__Variable Declarations__

```
String name <- "j4"                               let name = “j4”;
Number age <- 1                                   let age = 1;
Boolean hasArrows <- true                         let hasArrows = true;
```

__Arithmetic__

```
Number x <- ((4 + 3) * (10 - 1) ^ 2) / 4                 x = ((4 + 3) * Math.pow((10 - 1), 2)) / 4;
```

__If Statements__

```
if i=2                                           if (i===2){
    f(i)                                             f(i);
else if i>5                                      } else if (i>5){
    g(i)                                             g(i);
else                                             } else{
    h(i)                                             h(i);
                                                 }
```

__For Statements__

```
for Number i<-1, i<7, i<-i+1                      for (let i=1; i<7; i++) {
    f(i)                                              f(i);
                                                  }
```

__While Statements__

```
while i<7                                         while (i < 7) {
   f(i)                                               f(i);
                                                  }
```

__Functions__

```
Function twice(f:(Number) -> Number, x:Number) -> Number        var doTwice = (f, x) => {
    return f(f(x))                                                  return f(f(x));
                                                                }
Function addOne(x: Number) -> Number                            function addOne(x){
    return x+1                                                      return x+1;
                                                                }
```

__Concat__
To increase readibility and learnability, strings do not use the "+" operator
instead, the concat function is called to concatenate two or more strings
```
String s <- concat("Hello ", "World!")                  let s = "Hello" + "World";

```

__Object Declarations__

```
struct Color
  Number red, green, blue <- 0, 0, 0

  init(r: Number, g: Number, b: Number)
    self.red   <- r
    self.green <- g
    self.blue  <- b

  Function getColor(Nothing) -> Number[]
    Number[] rgb <- [self.red, self.green, self.blue]
    return rgb

Color magenta <- new Color(1.0,0.0,1.0)
Color halfGray <- new Color(0.5)
```

### Semantic Analysis
* changedImmutableType : tried to change x from type Number to String.
* isNotAFunction : f is not a function
* isNotAnArray : l is not an array
* isNotAnObject : d is not an object
* doesNotHaveProperty : x does not have property x.property
* invalidBinaryOperands : List and Number cannot be used with +
* invalidUnaryOperand : String cannot be used with ‘not’
* parameterArgumentMismatch : f has signature Number, Array but was called with signature String, Array, Number
* expressionIsNotTypeBoolean : x + 3 is type Number but must be type Boolean
* notDeclared : tried to use x before it was declared
* notInitialized : x is not given a value
* notDeclared : x has not been declared
* alreadyDeclared : x has already been declared
* returnOutsideFunction : found a return statement outside of a function
* typeMismatch : expected String got Number
* typeDoesNotExist : X y expects object ‘X’ is a type for variable y
* noClassConstructor : did not find a constructor in class C
* invalidAccessType : arr["2"], Cannot access a list using a string, need a number
* arrayIndexOutOfBounds : tried to access an element outside of the bounds of the array
