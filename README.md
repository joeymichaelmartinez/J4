<img src = "J4 Icon.png" alt = "J4 Logo" width = 400 />

## Introduction



## Features
* .j4 File Extension
* Whitespace Sensitive
* Simple Matching
* Object-oriented
* First Class Functions
* Higher Order Functions
* Static Typing
* Strong Typing
* Optional Parameters

### Operators

* Additive: `+`, `-`
* Multiplicative: `*`, `/`, `%`
* Exponentiation: `^`
* Relational: `<`, `>`, `>=`, `<=`, `=`, `not =`
* Boolean: `and`, `or`

### Data Types

* Number: `2`, `8.0`, `3.1415926`
* Boolean: `true`, `false`
* String: `“a”`, `“hello world”`, `“\“We have escape characters!\””`
* Array: [`“a”`, `false`, `8.0`, `hello world”`]
* Object: `{name:“Sally”, age:25, getName(), getAge()}`
* Comments: `~ Single line comment`
            `(~ Multi line comment ~)`

## Example Programs
J4 on the left, Javascript on the right

__Variable Declarations__

```
String name <- "j4"                               let name = “j4”
Number age <- 1                                   var age = 1
Boolean true -> hasArrows                         let hasArrows = true
```

__Constant Declarations__

```
Const Number PI = 3.14159265359                   const PI = 3.14159265359
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
        self.red   = red
        self.green = green
        self.blue  = blue

    init(white: Number)
        red   = white
        green = white
        blue  = white

Color magenta = new Color(red: 1.0, green: 0.0, blue: 1.0)
Color halfGray = new Color(white: 0.5)
```
