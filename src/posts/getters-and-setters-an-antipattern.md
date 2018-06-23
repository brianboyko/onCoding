---
path: "/blog/getters-and-setters-antipattern"
date: "2018-06-23"
title: "Getters and Setters: A Javascript antipattern?"
tags: ["react", "vue", "observables", "getters and setters", "es6", "typescript", "javascript"]
featuredImage: "./img/code.jpg"
---

One of the things that wasn't covered at Hack Reactor (or if it was, only briefly) was that Javascript has "get" and "set" methods built into objects and classes. 

Of course, I don't blame Hack Reactor for not covering it, as it can get a little... complicated. 

If you're not familiar with it, here's an example from the [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) documentation: 

```javascript
var o = {
  a: 7,
  get b() { 
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
console.log(o.c); // undefined
```

So you can see the problem with this. We've used the assignment operator on o.c, and it changed the value of o.a, while o.c (which has no getter) doesn't exist. 

You can see exactly how this can result in some really, *really* horribly complicated code. 

The thing is - it's also used in some clever code.  Specifically, this is the key idea behind "observables". Used in MobX (for React) and in Vue, observables allow you to do things like trigger a page re-render whenever a variable gets assigned. 

Vue.js
```javascript
<template>
  <div id="app-5">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>
</template>
<script>
  var app5 = new Vue({
    el: '#app-5',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        // running this function triggers a re-render of the above // HTML. Vue takes the elements in "data" and applies a 
        // setter on this.message that triggers a re-render. 
        this.message = this.message.split('').reverse().join('')
      }
    }
  })
</script>
```

Now *that said*, the "just change the variable and it re-renders" simplicity of Vue is one of the reasons that many people find it easier to learn and make useful sites with, as compared to React and similar frameworks. 

But in so doing, Vue and other observable frameworks - as all getters and setters that execute any code with side effects - *significally changes how programmers expect their code to behave.* 

That's why (and this is just my opinion) I believe using getters and setters - and even observables as a whole - is probably better avoided as an antipattern.  Instead, consider using method calls to accomplish the same effect. 

```javascript
var o = {
  a: 7,
  computeB() { 
    return this.a + 1;
  },
  setAToHalf() {
    this.a = x / 2;
  }
};

console.log(o.a); // 7
console.log(o.b); // undefined
console.log(o.computeB()) // 8
o.c = 50;
console.log(o.a); // 8
console.log(o.c); // 50
o.setToAHalf(50)
console.log(o.a); // 25
```

This is especially important when you are working in a big team and have to import each other's libraries. Take the code. 

```javascript
import SomeClass from './SomeClass';

let foo = new SomeClass();
foo.name = 'bar';
```

Would you expect that line: "foo.name = 'bar'" to do any other thing, or change any other value, other than assigning foo.name to bar?  Using an observable library means you have to keep track of which objects and methods are observables and which aren't. 

This breaks the principle of "least surprise."  That is - if you write your code, you should write it in a way that reduces the suprises in it. 

Instead, avoid the problem by reducing the assignment operator (=) to *only assign*. 

