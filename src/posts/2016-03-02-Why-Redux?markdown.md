---
path: "/blog/why-redux"
date: "2016-03-02"
title: "Why Redux?"
tags: ["redux"]
featuredImage: "./img/defaultImage.jpg"
---

Still working on refactoring the web app. I'm pretty close to having Redux working - everything after that is downhill. 

But here are the reasons I think that it was crucial to do this, and why the Redux pattern is very helpful.

* It's easy to test. If clicking on a UI element is supposed to dispatch an action, you can quickly tell if that action was indeed dispatched, see the before and after states.  This isn't that much to look at, *but* with this data, you can automate UI interaction so that you can leave the app running over the weekend, and log it to a database. Not only can you track down bugs, but you can also find bottlenecks in your app by timing when certain actions are called -- you can objectively prove with A/B testing that solution A is more efficient than solution B. 

* Once you get everything set up, it is extremely easy to manage state.  The way we were doing it before was by passing props around to different elements -- I'm sure there was a better way, but that's the way we did it.  In contrast, each element can easily get access to any reducer you want, but will only have access to the reducers and actions you specify.  

* Because reducers are pure functions, which don't mutate state, it makes it easier to test the functionality of components in isolation in unit testing.  

Now, you can do many of these things in Flux, but having Redux allows you to code in a more modular way, and separates your concerns. 