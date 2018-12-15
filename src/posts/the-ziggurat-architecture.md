---
path: "/blog/the-ziggurat-architecture"
date: "2018-12-15"
title: "The Ziggurat: An easy to understand architecture patten"
tags: ["react", "architecture", "mvp", "flux", "javascript", "web development"]
featuredImage: "./img/ziggurat.gif"
---

#### draft version

Okay, this is something that I'm not sure if I should be talking about. I don't know if I've finally overcome my impostor syndrome or if I'm heading headlong into Dunning-Krueger.  I'm sure someone like Douglas Crockford or Kyle Simpson has written books on this... but here's what I've figured out so far. 

To paraphrase Douglas Adams, a lot of codebases out there in the real world aren't so much "designed" as they are "congealed." There was a nifty technology that enabled a new feature and the library was just added to and modified to get the minimum viable thing that worked to please the customer. That's not bad - that's actually good - but it does mean that *the later you start thinking about how your application is designed, the harder it will be to organize your application. 

And looking back at my bootcamp education, I think maybe not enough effort was made to teach the idea of elegant software design.  And I can understand why. 

Programming may be as much an art as it is a science, but any beginner needs to know that the *science* of it takes priority. After all, if you don't know the basic concepts of programming and the syntax of the language you're working in, you can't build *anything.*  You can write terse, elegant code, but if it doesn't get the right answer, it's irrelevant.  So we focus on how to do, rather than how to think, in the early days of programmer learning.  

You'll find some mention of MVC and such in bootcamps, but it's really glossed over - or worse, presented in a specific context which doesn't really let you understand it.  (such as: Angular is a full MVC framework, while React is just the view). 

Truth is, it's hard to really understand what makes a *good* software design different from a *mediocre* one.  The key difference? Every project gets bugs, bad code, technical debt, etc. A good software design makes it easy to locate bugs or to refactor bad code.  A mediocre one makes it less easy to do so.  

And the reason this is important is that the higher the cost of paying off your technical debt, the less likely it will actually get paid off.  

To kind of combat this in my own programming, I've come up with* a simple model that should be easy to explain and understand.  I call it "The Ziggurat."  It's not the right solution for every problem but if you're trying to build something, I think there are worse models.  
  
  (*) Someone else has probably come up with this same model sometime over the last 50 years of computer development, I just haven't run across it yet.  So until I'm informed otherwise, I'll stick with "Ziggurat." Cause ziggurats are cool. 

A ziggurat's basically a pyramid, but with more distinct layers.  And it is that layering that I'd like to talk about now. 

The principals of the ziggurat are as follows: 

* The program is made of distinct layers.  
* Each layer has an **interface** that can be accessed by the layer above it. In turn, each layer accesses the interface of the layer below it.  
* A lower layer provides getter-only access to it's state via interface to it's upper neighbor alone. If the upper layer needs to *change* a state, the lower layer should *provide* a setter method (a callback) to that state, and the logic of the setter *lives* in the lower layer.  I.e., you should never be able to *directly* modify the state of any layer from any layer above it.
* Similarly, a lower layer should be completely blind to the state of the layers above it.  It only interacts with the above layer when the above layer calls one of it's provided methods. 
* Wherever possible, avoid side-effects and write in pure functions.  Where *not* possible, make sure that side effects *ONLY* affect the current layer, not other layers.  (One exception: During development, use console.log and console.error wherever you need to). 
* A lower layer can provide an interface to *many different instances* of upper layers. For example, in React/Redux, the Redux store provides the interface for many different React containers.  Still, each react container uses the same interface (or at least parts of the same interface) to access the Redux store. 
* It is *discouraged*, but *not forbidden* to write an upper layer that requires more than one instance of a lower layer. For example, if you have one lower layer that provides the price in USD of a product, and another lower layer that provides the current conversion rates from USD to GBP, if you want to display the price of a product in GBP, you need access to both those data points. That's a reasonable use of getting data from two different lower layer instances - but (and this is a huge "but"), every time you do this, you increase the amount of places you have to look when an application fails.  Therefore if you can make it so each upper layer requires *one and only one* instance of a lower layer, do so. 

### So what happens when you follow these guidelines? 

#### Reduce mean time to repair

First, you'll find that when your application fails due to a bug, it will fail *up*, not *down*.  A bug or error in a lower level can mess up the layers *above* it, but the layers *below* it should still be working perfectly.  This helps you to *isolate* the bugs faster, figure out *where the root cause is*, and come up with a solution, rather than having to examine your whole application, looking for the bug. 

#### Avoid shotgun surgery

Because each layer is independent and provides the interface above it, if you need to change something or add a new feature, you typically *won't* have to engage in "shotgun surgery" - using find/replace to find out where the old method was accessed and patch each instance throughout the application.  *Instead*, while you may need to write code to take advantage of the new capabilities from the changed interface - you'll only need to change the interface in a *linear fashion* - following the layers up. 

#### Easier Team Development

If you have a larger application, and a team working on the application, this allows for easier team development - as each developer can, essentially, work in isolation on their one layer, provided that other developers know what the interface of the lower layer will provide, and what it needs to provide to the upper layer.  In that way, even while a lower layer is "still in development," other engineers can start working on the upper layers by mocking out the lower level's interface.  

#### Easier testing

Following on the same vein, while it is important to do integration testing, the value of having each layer being independently testable - that is, being able to mock the lower layers in test environments - allows you to create more self-contained tests.  

#### Easier refactoring / Easier Scaling / Reduce the cost of paying off technical debt.

If you had to switch out an entire layer for something else, you could do so without refactoring the upper layer or the lower layer, simply by rewriting interfaces between the two.  This means that when a better solution becomes available, or you need to switch out technologies as you scale up, you don't have to rewrite your entire application to take advantage of it.  This is *especially* true in early 2019, when people are starting to rewrite methods in lower level languages to take advantage of the speed gains of WASM - you'll still write your first version in Javascript, later, when your code is pretty stable, you'll re-write it in C++ or Rust and get a performance boost - yet still not have to worry about the rest of your application. 

#### Less Frustration

Let's be honest - *any* organization in the code is better than a big ball of mud to work on.  By taking your large project and breaking it down into smaller layers, you essentially limit the amount of stuff you have to keep in your head at one time, and reduce the number of tabs you have open to track down bugs.  

### In Practice

Now, I've mostly worked with the NodeJS stack, so I'll explain it in terms of a web application, but I think any application - anything from pure-server-side enterprise code to video games - can make use of the Ziggurat. 

For me, what this has meant in practice is that when I build front-end applications, I tend to follow this pattern, whether it's React, Vue, or something else. 

```
    ajax-layer provides data to --> 
      store provides data to --> 
        container provides data to --> 
          component uses the data to render the --> 
            view watches for --> 
              events triggers methods on -->
            view runs a method from the --> 
          component then runs the appropriate callback from the -->
        container which dispatches an action provided by the -->
      store which makes a call to the asynchronous methods of the -->
    ajax-layer when then gets new data to provide to the --> 
      store which provides data to... you get the idea. 
```

Now this is slightly different from a traditional "flux" pattern which likes to skip the middleman a lot.  And there's nothing wrong with that.  

In flux, you're more likely to see:

```
    ajax-layer provides data to --> 
      store provides data to --> 
        container provides data to --> 
          component uses the data to render the --> 
            view watches for --> 
              events triggers methods directly provided by the -->
      store which makes a call to the asynchronous methods of the -->
    ajax-layer when then gets new data to provide to the --> 
      store provides data to --> 
        container provides data to --> 
          component uses the data to render the --> 
            view watches for --> 
              events triggers methods directly provided by the -->
```

So why write programs in this way?  Why not just "map state to props/map dispatch to props" and let the view access the store directly if we use the flux pattern of "data up, actions deep down?"  Well the problem comes in when we need to change the interface of the store (maybe for new functionality, maybe just because there's an embarassing typo in a method call). In any case, if the interface of the store changes significantly, we now have to make sure that *every* container, component, and view is rewritten to handle the new store interface. 

On the other hand, with a ziggurat pattern, we only have to make sure the container is rewritten to take into consideration the new store interface.  Now - granted, for some changes, that means that the container's interface will have to change as well, and that may necessitate a change in components... and you may indeed end up having to rewrite the code at the view layer anyway - but *not every time*, and *not for every instance of every layer*.  

Additionally, writing in the flux pattern makes it difficult to test the view independently of the store (and every intervening layer).  To test a stateless component in Flux, you not only have to mock the container, but also the store and all the actions it provides.  Keep in mind, even if you're just using the container to make a "pass-through" method all the way down through to the store, it still provides an 'escape hatch' for mocking just one component. It also allows you, during debugging, to place breakpoints and console.logs to determine where in your application things are going wrong. 

As always, YMMV. This is just a pattern that has worked for me.  

---

This blog post is a draft. I hope to revise it when I get some more expertise and feedback from the community.  