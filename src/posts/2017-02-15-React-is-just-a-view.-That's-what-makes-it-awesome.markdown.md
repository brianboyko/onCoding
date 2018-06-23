---
path: "/blog/react-is-just-a-view"
date: "2017-02-15"
title: "React is just a view. That's what makes it awesome."
tags: ["react"]
featuredImage: "./img/defaultImage.jpg"
---

[From reactjs.reddit.com:](https://www.reddit.com/r/reactjs/comments/5u7q5s/new_to_reactjsusing_with_javaspring_backend/) 

> <sub>New to reactJS....Using with java/Spring backend self.reactjs</sub>

> <sub>Submitted by greyf0x55/u/greyf0x55:</sub>

> I'm new to ReactJS, in fact I am primarily a backend developer. We've decided to dive into ReactJS but I'm a bit confused on what is the best approach to building applications with ReactJS. Do people typically use ReactJS to build single page applications, or still use a traditional MVC approach on the backend, but use ReactJS to create rich UI components, basically a better solution than jQuery.

> ReactJS seems to be a view technology more than anything, not a complete framework.

Well, to trivialize it a bit - yes, React is *just* a view, it doesn't provide the whole model-view-controller stack that a full framework like Angular would provide.  

And that's part of what makes React so impressive and flexible.  You're not tied into a specific stack, or a specific way of doing things.  You can use the tools that are best for the job.  

For example, one of the things "baked" into Angular is an AJAX requestor, "$https:". That's great if you need an ajax requestor, but it also ties you into working things the Angular way. It assumes you're using REST (instead of, say, SOAP, or GraphQL).  It ties you into a specfic set of technologies. 

What React does, on the other hand, is assume that you don't need what is already provided by Javascript. It allows you to use alternative architectures, like Flux, if you think it's better for your app - or allow you to go without using any model at all!  (Some applications don't need one!)

React is very good at several things, which is why it's my favorite front end. 

* It's just Javascript. 

To repeat something in Angular, say, you have to use the ng-repeat attribute in your HTML (or EJS) file.  That's fine, it gets the job done, but there's no other program or framework that uses that syntax.  On the other hand, to repeat something in React means you can use .forEach() .map() and any other iterator method in your logic. React only requires that you use the JS you already know.

(React does discourage the use of if/else in favor of ternary operators, and the use of .forEach() and .map() instead of for loops and while loops, but if you *need* to use a for loop, you can just create a seperate function that encompasses it.)

As it's been said by many people - the better you get at most frameworks, the better you get at that specific framework - the better you get at React, the better you get at Javascript. 

(Especially if you're coming to JS from a Java background, learning React as your framework helps a great deal with understanding concepts that JS has had for a while, but which Java didn't have until recent versions, such as closures and lambdas.)  

* It isn't just a view manager but a way to manage a changing state. 

What may trip up people with React is the idea of stateful components.  In a typical Model-Controller-View application, you have a single source of truth - the Model - which keeps track of all the changes to the state.  For a simple calculator application, the model is where you find the information about what the current value is, and whether the current calculation is done.  That state is mutated through events that are sent by the view to the controller.

But in React, it seems like every component has a state.  What's up with that?  Wouldn't that increase the complexity of the application? 

Well -- no.  One of the main reasons the MVC model came about was because engineers were really tired of complex applications with spaghetti code.  By fragmenting the model code from the view code from the controller code, the process would be a lot more organized.  

But React takes a different approach.  React instead suggests that the "separation of concerns" be separated, instead, by small, discrete, reusable building blocks called Components. Each component has it's own view (usually found in the render() method), it's own controllers (the various handlers and lifecycle event handlers built into React) and it's own model (the component state.)  And it makes a lot of sense to do it this way - because if a property of the state is only relevant to a particular component, *why would the rest of the application need to know about it?* 

You *could* try and shoehorn React into becoming a framework. That would work out nicely in many instances. But you could just simply use react for what it is; a view library. Utilizing all of the "Lifecycle" methods that React provides gives the developer control over how he/she can construct a UI. It is it's versatility that gives react the power to be what the end user wants it to be.

Of course, there are times when the application does need to know about more "global" changes in state. You can use an MVC pattern if you like, but the Flux pattern works particularly well with React because of React's lifecycle changes.  

But what's great about that is that it's not one or the other.  You can have a global store state (like, for example, Redux) for *application* data, and component state for *component* data.  One *very* useful way this works is when you use inline styles though a library like "aphrodite" or "classnames" which allows you to control the CSS rendering in the component. You don't have to change the store in order to change the view, and not every event has to run back to the store.  

The end result of all this is that React allows you to write more modular, more reusable, more testable, simpler, (and therefore stabler) code.  At least - in my view.  Your mileage may vary. 