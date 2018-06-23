---
path: "/blog/css-in-js-seperate-concerns"
date: "2017-05-02"
title: "CSS-in-JS and the separation of concerns."
tags: ["inline styles", "css-in-js"]
featuredImage: "./img/defaultImage.jpg"
---

As I've been working on Deverus's front-end problems, I'm causing myself to question an assumption. I've worked with CSS since CSS 1.0, I remember being blown away by someone using CSS to line things up instead of using table tags, or being able to select your style from a dropdown box. 

Today, there's a bit of a debate around CSS.  It used to be that you used HTML for managing layout, CSS for managing style, and JS for managing behavior.  For a great many apps, that's still true, and still a very solid pattern.  However, with React and the use of JSX - a syntactic sugar which "feels" like HTML but is really just an alternative way to write Javascript code (which, deliberately, allows you to reason about how your JavaScript affects the layout of your page).  There's other considerations as well, as there is a move to reactive programming paradigms - that user behavior causes changes in state, and changes in state cause the change in view.  

As a result, more people are writing "CSS-in-JS" - that is, writing inline styles whose behavior is pretty much just a javascript object.  You can define your stylesheet as a constant, then simply refer to the styles you want in the virtual DOM elements.  

With the Aphrodite library, it's possible to use even advanced CSS like media queries and the like.  Plus, you have access to all the tools of Javascript, and access to data you don't have in HTML, like the window object.  Media query breakpoints are good, but there's nothing like the power of being able to define style based directly off of the window.innerWidth. 

And so, even though there were some who resist this idea - that CSS and JS are different concerns and shouldn't be grouped together, I embraced this philosophy, with the idea that you could be looking at your style AND your behavior at the same time, breaking your project into smaller pieces.  That is, you can deal with the layout, behavior, and style of a small piece of your website at one time, instead of having to constantly switch between three files.  

Using inline styles exclusively or near exclusively also means you'll almost never have a scenario where the cascade is overwriting the behavior you want because someone's styled an #id when you are working in .classes, or that someone left an !important flag somewhere and forgot to tell you. 

But as I'm working on these problems in the real world, I do see one major drawback.  That is: code repetition. 

The good part about being able to work on a component in isolation is that you can do so with a minimum of shifting back and forth.  But the fact that CSS styles are in one place *encourages code reuse*, as you want to define specific classes and use them multiple times in multiple pieces of your code.  Looking over my code, I can see how many times I define the same component's style exactly the same way - and this defeats the DRY principle and leads to bugs. 

It's true that I could, for example, just take the styles into a seperate file and import it into the components that use the same styles, but at that point it's not that far from just using CSS anyway.  

It makes me realize how important "refactoring" is to development.  That is - it is absolutely easier to develop inline styles using repetition, and during development, I'm 100% towards keeping styles inline.  But once you have the styles the way you want them, it might be back to good ol' CSS.  

