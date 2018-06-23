---
path: "/blog/typescript-i-don't-get-it"
date: "2017-05-21"
title: "TypeScript: I don't get it."
tags: ["typescript"]
featuredImage: "./img/defaultImage.jpg"
---

> Note: This was written over a year ago.  I'm currently writing a blog post follow up because I finally got it. 

At the behest of my friend, I've been spending most of today trying to learn TypeScript.  And while some advantages are clear (No more "cannot read property "foo" of undefined" errors...) on the whole I'm reasonably sure that I'd rather not deal with the entire mess. 

Take, for example, objects.  In Javascript, you can create an object and then add additional properties as necessary.  

```javascript
let a = {}; 
a.foo = 1;
a.bar = 2; 
console.log(a.foo, a.bar) // => 1, 2
```

However, this pattern is verboten in Typescript. 

```typescript
 let b = {}
 b.foo = 1 // => The property 'foo' does not exist on value of type '{}'
```
To get around this, you either have to know what you're going to be putting in there at declaration time, *or*, you have to specially declare that your object can have any props *or* you have to cast the type as any both with you assign and use the new property.  
 
```typescript
let c: any = {}
c.foo = 1 // works. 
```

A quick look at [Stack Overflow](http://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript) shows how complicated this can be if you want to have the best of Javascript's flexibility with TypeScript's type checking. 

```typescript
interface IFoo{
    bar:string;
    baz:string;
    boo:string;     
}

let foo:IFoo = <any>{};

foo.bar = "asdf";
foo.baz = "boo";
foo.boo = "boo";
foo.whatever = 5; // is allowed because foo is initialized with <any>{}; 

foo.bar = 123; // => Throws a compiler error. 
```

Don't get me wrong.  I *get it.* Creating an interface ensures that you'll have the right type for the right property at the right time.  It means that you don't have to type check in unit tests to catch errors. 

But it also starts to make your clean, elegant Javascript code look a hell of a lot like Java. 

The big problem I have with Typescript - and this is just opinion, mind you - is that you add an awful lot of complexity for a very limited benefit. It removes the flexibility of the simple object into static class-like interfaces. It's a hell of a lot like in Java where you have to define your properties in a constructor before you can even do so.  There's no dynamic adding of properties at all -- and sometimes it's just so much easier to do exactly that when you're adding new features.  If I wanted to add an additional piece of data so that a new feature can deal with it, in Javascript, I just tack that piece on. The legacy functions don't care that there's extra information, and the new functionality gets the data - and whatever else it needs - from the existing data structures.  

Right now, working for Deverus, I'm using Redux for an application - one thing that I'm doing is passing in data via a linked-list property, and I use the "just tack it on" feature of JS objects in order to be able to provide each specific page with the specific data it needs to render correctly.  *Because* of this built-in functionality of Javascript, when we start building out our "custom form" build-on-the-fly feature for our form pages, we can just give the page the data it needs, without worrying about what type it is.  

This also allows us to refactor code and iterate quickly instead of being stuck with a long list of changes that need to be made every time that something needs to be debugged and fixed.  This is critical - Typescript's main advantage is that it lets you catch problems at compile time instead of runtime, but all that advantage is eaten up when you realize:

* It takes nearly twice as much Typescript code - in lines and characters - to do the things you can do with vanilla ES6.  
* Classes are good when used *sparingly* - and especially useful when you want to keep a collection of data with a collection of functions to operate on that data.  But placing everything inside a class - or an interface, which is class-like just pollutes your namespace with one-off interfaces for objects you create.

Now, this opinion might not be well formed - I've only been messing with it for a day now... but if Typescript were invented *first* (which is kinda was - with C, Java, and the other statically typed languages), and Javascript came out today, here's what people would be saying about it.

* You can write less, and do more. 
* It allows you to get up and running quickly. 
* Javascript uses a simple syntax. 
* Anything in Javascript can be extended, so adding new features to your applications is a snap.  

So that's why I just don't get Typescript. 

Though I reserve the right to change my mind on this. 