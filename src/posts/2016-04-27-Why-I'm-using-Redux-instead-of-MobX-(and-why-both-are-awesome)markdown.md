---
path: "/blog/redux-mobx"
date: "2016-04-27"
title: "Why I'm using Redux instead of MobX (and why both are awesome)"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
---

This is a bit of a #humblebrag but I took a big risk (and Cycorp let me take that risk) by refactoring the MathPanel from our previous code to solution based on Redux. And I have to say, it's producing dividends.

Because we now have Redux, we can get logs of every action dispatched to the store, in effect, we can replay the user's experience, *as they experienced it*, from scratch. We don't need to worry about connecting to the backend (which is stateful, more on that later), and we can visually inspect every step for problems.

Already, within 48 hours of deployment, we found the root cause of a nasty error that was plaguing us for months.  We also found a bug I had inadvertently created when I redid how definition hoverovers work, and we can test and experiment to our heart's content.  And all I need to do this is use Redux's middleware to capture the actions. Right now, testers manually have to copy and paste JSON; soon it'll be hooked up to a database, and once that's automated, all that's left is building a "virtual monkey" to run through the application automatically.

Of course, Javascript being Javascript, between the two months when I started the project and when I finished it, people were talking about a new Flux framework called MobX.

You can get a quick overview of the differences here:

Now, everything in that video is true.  Redux is more boilerplate, more complexity, more everything. But all things considered, I still think Redux was the correct choice for *this project.*

The big reason is that we have a stateful backend. Cycorp's AI runs user models on the backend, which means that it sends different data for each user, based on what their current math skills are.  Clever way of dealing with different student skill levels, but damn hard to debug.  Since you don't always get the same answer every time you poll the API, some bugs are just super-hard to reproduce.  You also have to make sure that your front-end state remains in-sync with the back-end state.

With MobX, you simply have "observables" - simply put, they're variables. But whenever that variable mutates, every other thing that that variable depends on is recalculated based on the new state.  This is great, but for our debugging needs, it lacks a crucial step - we don't know *what* changed the variable, or why, so it can be hard to replay.

Redux not only has that "log every action" capability through middleware that I mentioned before, but also tells us, in a very real way, *what* changed the store and why.

It is entirely possible for multiple actions to change the same state variable in different ways. For example, we have a "scores" reducer (and corresponding property in the store), which can be modified by the actions clearScores, initializeScores, resetScores, modifyScores, addToScore, etc. All of them will change the value we get for "scores" -- but only with Redux do you get the logic behind what we're actually doing, and why.  You can even follow along, step-by-step, and pass in metadata that your reducer will ignore so that your logging data is solid.

Now, if we didn't have such a huge problem with recreating conditions precisely, I would say that MobX has better performance and is easier to develop for.  In Redux, if you want to add a new property, "foo", to the store, you have to create: foo reducer, at least one and perhaps several actions for foo, and constants for each of those actions. MobX just allows you to have an observable "foo" variable, and that's it.

I love 'em both, just that the more moving parts, the more complex the app, the more I'm likely to use Redux versus MobX.
