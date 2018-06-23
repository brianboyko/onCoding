---
path: "/blog/typescript-i-get-it"
date: "2018-06-23"
title: "Typescript: I get it now"
tags: ["typescript", "best practices"]
featuredImage: "./img/code.jpg"
---

Okay - so here's the deal:

About a year ago, I wrote a post on this blog basically saying: "I don't get Typescript." 

There's a couple of reasons I came to that conclusion - I just thought it added a whole lot of complexity for very little benefit.  

I was wrong. Yeah, it adds complexity, sure. You may have to deal with type definitions and you can't just mutate objects willy nilly.  

But what I had failed to realize was that Typescript isn't a *language* that compiles to Javascript, it's an *ecosystem that checks your Javascript as you type it.* 

What do I mean by that? Well, quite frankly, many people may be too young to remember this, but back in the day, when you typed words into a word processor, and you misspelled one, you wouldn't know about it until you actually ran the "spell check" command - and it would check the whole document.  There was no red underline squiggle telling you when you had mistyped a word immediately after you mistyped it.  

<img src="https://i.imgur.com/0dKFt9i.png" width="150" height="150" style="float: right"/>Typescript is like having those red underline squiggles, but for your code.  The value of Typescript is not in the language but that it can be configured with linters and IDEs such as VSCode, Atom, Sublime, etc. to warn you about problems while you're *in the coding stage of the process.*  

And this is *heavenly* because we have to *think deeply about code.*  The linter-as-you-type immediately catches the error at the *moment* you are looking at the code where the error has been introduced.  You don't have to disrupt "programming flow" to address the issue - it remains first and foremost in your mind. 

In short, I was using Typescript wrong - I was waiting for *compilation time* to catch errors.  That's still better than runtime, but by the time you compile, you've already moved out of the state of flow towards something else - the problem area isn't in your head and you have to spend time re-organizing around cognative cycles.  

So - what made me do a complete 180 on Typescript?  Quite frankly, I saw how it was done *right.* 

The first was a Typescript course by [Maximillian Schwartzmuller](https://www.udemy.com/user/maximilian-schwarzmuller/) on Udemy - Udemy courses tend to be hit-or-miss, but anything by Max seems to be great at taking you step by step through what you need to do. 

One of the reasons that Max is so effective at teaching Typescript is that he comes at it from the perspective of a Javascript developer. A lot of people who like Typescript tend to come from Object-Oriented languages, especially C#, and tend to write code in a very, for lack of a better term, "java-esque" way, focusing on object-oriented design, classes with encapsulation, etc.  Javascript developers do have some object oriented thinking, but they also borrow a lot from functional programming languages - I joke that "the better I get at Javascript, the more my javascript looks like LISP." 

But Typescript doesn't *need* to be C#-lite. You can do everything in JS - all the little tricks like currying, monads, closure, etc. that make life as a JS programmer interesting - that can all be done in Typescript.  

The second thing that made me a Typescript convert was actually a code challenge I did for a company called Contiamo, which happened to be *in* Typescript. The challenge was pretty simple - create essentially helper methods that queried a provided mock API. But they wanted the software to behave in a very *specific* way, and had already written tests to make sure the software conformed to those expectations.  

I imagine that the challenge probably would have taken me about twice as long had they *not already provided the interface definitions that they were looking for.* Merely having those made coding the challenge far less time consuming - as I knew exactly what I was to expect and exactly what I was to return from every one of my functions. 

I didn't really get it at the time, sad to say, but I realized the general application of this in multi-team programming - as interfaces and types are exportable in Typescript, you can actually ensure that when you are using a class, library, or even function developed by your teammate, you know *exactly* what you need to send to them and *exactly* what you're getting back.  I can't tell you how much time would have been saved if it wasn't for that.  

Stupid me, though, I still though vanilla JS ES6 was better for rapid prototyping, not having to worry about types and such.  What finally convinced me was a contract job I took with Indigo Fair, which was using Typescript with MobX. 

MobX is an observable library that is very similar to Redux - and [like any observable library, under the hood it's taking advantage of hidden getters and setters](./getters-and-setters-antipattern).  This could have been a major hassle, except that they were using Typescript - AND provided all the linting tools one would ever want, properly configured. Working with *that* codebase was a night and day difference. First, I knew exactly what code was needed and exactly what pre-existing code was expecting, (even from the hidden getters and setters) and, secondly, as I was making errors in the unfamiliar codebase, the IDE was telling me about those errors as I typed them. 

That was huge, and I noticed a major productivity difference between working with the typescript code and the javascript code at my previous job.  That was the moment I became a Typescript convert despite being ambivelant before. 

Honestly, I wish I had done it the other way around, as I (honestly, at the time) answered Contiamo during the interview that I wasn't convinced about Typescript and still though vanilla JS was better for "rapid prototyping."  That may very well have cost me the job - in fact, I got an e-mail from them confirming as much. Now I see why Contiamo and a lot of other companies find typescript such an important tool in their ability to write scalable, performant Javascript code. 
