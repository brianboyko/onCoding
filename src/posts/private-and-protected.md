---
path: "/blog/private-and-protected"
date: "2018-06-22"
title: "Encapsulation in Javascript"
tags: ["javascript", "object-oriented programming"]
featuredImage: "./img/code.jpg"
---

From [javascript.reddit.com](https://javascript.reddit.com): 

Posted by /u/ithacasnowman

[I'm a “classical” OOP programmer. How should I “think” in JavaScript?](https://www.reddit.com/r/javascript/comments/8t09nq/im_a_classical_oop_programmer_how_should_i_think/)
 
> For > 15 years, I've coded in C, C++ and Java. I want to understand the mental models I should adopt for JavaScript and how they're different from those other "classical" languages. I'm not talking about specific concepts like prototypical vs classical inheritance, which I understand. Instead, I want to know what that means for me as an architect...

> How is information hiding implemented in ES6? There is no native support for private and protected properties with ES6 classes. Do I consider adding them? If not, how do I architect my programs without such a fundamental OOP feature?

Private and protected properties are part of Typescript, so you may find it more comfortable to go straight to that. 

But I can answer your question with ES6/ES5. A lot of stuff enforced by C/C++/Java and other languages did make it into ES6 (like the class keyword) but ultimately, there were a lot of design decisions in Javascript to *not* require the safety of other languages.  

That said, programmers have come up with conventions to help with this. For example, if we want to keep something a property, we don't set it as a property of an object.  We use closure to encapsulate it (often using currying).  Some programmers are in the habit of prefixing variables that we want to be "private".  

```javascript
const memoize = (funcToMemoize) => {
  const _hash = {}; 
  return (...args) => {
    let argKey = JSON.stringify(args)
    if(!_hash[argKey]){
      _hash[argKey] = funcToMemoize(...args);
    }
    return _hash[argKey]
  }
}

const square = (x) => x * x;
const memoSquare = memoize(square);

memoSquare(9) // 81
memoSquare._hash // undefined. 
```

In the above function, we can't get access to _hash, but the hash exists. 

That said, if we *wanted* to write a method that allowed us to get access to the hash... 

```javascript
const memoize = (funcToMemoize) => {
  const hash = {}; 
  this.getHash = () => hash;
  return (...args) => {
    let argKey = JSON.stringify(args)
    if(!_hash[argKey]){
      _hash[argKey] = funcToMemoize(...args);
    }
    return _hash[argKey]
  }
}

const square = (x) => x * x;
const memoSquare = memoize(square);
const otherSquare = memoize(square);

memoSquare(9) // 81
memoSquare(2) // 4
memoSquare.hash // undefined. 
memoSquare.getHash() // {"2": 4, "9": 81}
otherSquare.getHash() // {}
```

So, how does this happen with classes?  Well, keep in mind that the "class" keyword in ES6 is just syntactic sugar for the pseudoclassical pattern.  So these three code snippets do pretty much the same thing: 

```javascript
// class keyword
class Dude {
  constructor(name){
    this.name = name;
  }
  speak = () => {
    console.log(`Hello, I'm ${this.name}`)
  }
}

const kevin = new Dude("Kevin");
kevin.speak() // $> "Hello, I'm Kevin"
```

```javascript
// Pseudoclassical Pattern
const Dude = function(name) {
  this.name = name;
  this.speak = () => {
    console.log(`Hello, I'm ${this.name}`)
  }
}

const kevin = new Dude("Kevin");
kevin.speak() // $> "Hello, I'm Kevin"
```

```javascript
// Prototypal Pattern
const Dude = function(name) {
  this.name = name;
}

Dude.speak = () => {
  console.log(`Hello, I'm ${this.name}`)
}

const kevin = new Dude("Kevin");
kevin.speak() // $> "Hello, I'm Kevin"
```

Notice that the prototypal pattern (in many ways, the *preferred and canonical* javascript way of doing things) requires that the language *doesn't* support encapsulation, as you can assign a new method or a property to an object without problem. This does make it possible to overwrite properties - and if you're working with a multi-programming team, namespace collisions could happen.  That's why the underscore convention got instituted. 

```javascript
// class keyword
class Dude {
  constructor(name){
    this.name = name;
    this._age = 1;
  }
  doBirthday = () => {
    this.age += 1; 
  }
  speak = () => {
    console.log(`Hello, I'm ${this.name}, and I am ${this._age}`)
  }
}

const kevin = new Dude("Kevin");
kevin.doBirthday();
kevin.doBirthday();
kevin.speak() // $> "Hello, I'm Kevin, and I am 3"
kevin.age = 5 // does not throw an error. 
kevin.speak() // $> "Hello, I'm Kevin, and I am 3"
kevin._age = 5 // JS will not prevent you from doing this, but by convention, you don't. 
kevin.speak() // $> "Hello, I'm Kevin, and I am 5"
```