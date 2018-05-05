<img src = "J4 Icon.png" alt = "J4 Logo" width = 400 />

## Introduction
J4 does away with verbose, unreadable code and replaces it with a readable, understandable coding language that standardizes meaningful, beautiful code. This is made possible with whitespace matching and utilizing semantics that emphasize the flow of information. Along with these leaps forward in code structure, J4 simplifies coding conventions by handling the minutia of memory management and reinventing the outdated and arbitrary rules present in other languages.

J4 pulls inspiration from Swift, ELM, Python, and Lua

## Features
* .j4 File Extension
* Whitespace Sensitive
* Easy Array Creation
* Powerful Object
* First Class Functions
* Higher Order Functions
* Static Typing
* Strong Typing
* Optional Parameters

### Operators

* Additive: `+`, `-`
* Multiplicative: `*`, `/`, `%`
* Exponentiation: `^`
* Relational: `<`, `>`, `>=`, `<=`, `=`
* Boolean: `and`, `or`

### Data Types

* Number: `2`, `8.0`, `3.1415926`
* Boolean: `true`, `false`
* String: `“a”`, `“hello world”`, `“\“We have escape characters!\””`
* Function: `addOne(x)`
* Array: [`“Martinez”`, `"Goocher"`, `"Hardy"`, `"Watkins”`]
* Object: `{name:“Sally”, age:25, delete(), duplicate()}`
* Comments: `~ Single line comment`
            `(~ Multi line comment ~)`

## Example Programs
J4 on the left, Javascript on the right

__Variable Declarations__

```
String name <- "j4"                               let name = “j4”
Number age <- 1                                   let age = 1
Boolean hasArrows <- true                         let hasArrows = true
```

__Arithmetic__

```
x <- ((4 + 3) * (10 - 1) ^ 2) / 4                 x = ((4 + 3) * Math.pow((10 - 1), 2)) / 4
```

__If Statements__

```
if i=2                                           if (i===2){
    f(i)                                             f(i)
else if i>5                                      } else if (i>5){
    g(i)                                             g(i)
else                                             } else{
    h(i)                                             h(i)
                                                 }
```

__For Statements__

```
for Number i<-1, i<7, i<-i+1                      for (let i=1; i<7; i++) {
    f(i)                                              f(i)
                                                  }
```

__While Statements__

```
while i<7                                         while (i < 7) {
   f(i)                                               f(i)
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

__Object Declarations__

```
struct Color
    Number red, green, blue
    init(red: Number, green: Number, blue: Number)
        self.red   <- red
        self.green <- green
        self.blue  <- blue

    init(grayscale: Number)
        red   <- grayscale
        green <- grayscale
        blue  <- grayscale

Color magenta <- new Color(1.0, 0.0, 1.0)
Color halfGray <- new Color(0.5)
```
