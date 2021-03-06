---
path: "/blog/Working-with-dynamic-type"
date: "2016-03-11"
title: "Working with dynamic type"
tags: ["javascript", "dynamic type"]
featuredImage: "./img/defaultImage.jpg"
---

There's a saying: Systems that prevent you from doing stupid things also prevent you from doing clever things.  

At work, there's a bug that we can't reproduce, and didn't have time to track down and fix before a major pre-alpha display of our software.  Worse still, this bug would cause the problem to hang the entire application. 

And we had less than 24 hours to go before we had to demo the software to our client. 

Now, we'll eventually track it down (that's what the Redux refactor is for, partially), but, for right now, if we couldn't predict or reproduce this error reliably, we needed a way to detect when the error occurred and find a way to fail gracefully (which would be acceptable, if not great, for our client's users) But how? The error was uncommon, and seemed to happen at different times and different places for different reasons, usually only inside the game itself. This makes debugging particularly hard, as the game only runs on Windows, but my development tools are on Linux... explaining why I have two computers and not a VM would take a while, so let's just say, *"it wasn't my choice"*, and *"that's the way it is."*

With less than 24 hours before a big deployment to show our client, we needed at least a way to fail gracefully.  

The solution I came up with is either "very clever" or "very hacky", or both, depending on how you look at it.  Essentially, the only commonality the bug had in common was that it would display our loading bar interminably.  But for that to happen, our main component's state (we use React) had to have loading == true.  

The immediate idea I had was to set a timeout for 30000 milliseconds, that starts when loading = true, and ends when loading = false at any point. But for some reason, the clearTimeout wasn't working.  Perhaps it was because of something in the code that I hadn't accounted for - the legacy code is pretty spaghettified at this point.  I needed an alternative way to do this.  

I thought about creating another variable in the state called "lastLoaded," with a timestamp, which showed when the loading screen was last launched.  But there were two problems.  First, this wouldn't let you know if there was a time between when the timestamp was created and "now" where loading was set to "false".  Alternatively, you could change the timestamp every time that loading changed state from true to false, but then you have to check two variables regularly in order to determine if the bug had occured.  And adding another variable to the already overloaded component state wasn't going to help our spaghetti problem much. 

So, to solve this (and remember, this is a kludge workaround, produced under deadline), I took advantage of one of Javascript's most maligned "features."  Dynamic type. 

Essentially, whenever we want to show the loading bar, I changed this.setState({loading:true}) to this.setState({loading:Date.now()}).  But I kept every instance of this.setState({loading:false}) intact.  Then on checking the conditionals, instead of saying if (this.state.loading == true); I changed it to if(!!this.state.loading == true);  

Numbers are truthy values in Javascript, meaning that if you force them into booleans by prefixing the variable name with !, you end up with "false."  !!, or "not not", evaluates as "true". If I would have been using TypeScript or a static type language, I, at least, would have had to change every setState of loading:false to loading: 0... if I was lucky and the language I was using evaluates the number 0 as falsy, and every other number to be truthy.  And this would have been a cause for major concern because the key way to set the fail-gracefully condition was to check if it had been more than 30000 seconds since we showed the loading screen.  It has *absolutely* been at *least* 30 seconds since January 1, 1970.  

Now, TypeScript (or Gilbert.js's [Javascript Zero](http://js-zero.com/)) is a great solution for those who need static type checking. And it is true that static type checking can help prevent those nasty: "I expected value to equal 8675309, but value was equal to '8675309'" bugs.  But if dynamic type is a part of the language, if there's a usecase for it (and you document it well), why not use it?

Hopefully, the refactor I'm working on (which is mostly done) will eventually cause this to be moot, as when the bug occurs, instead of hanging the problem, we can simply rewind and replay state if it's a problem with the backend, or have detailed logs about when this occurs on the front-end. 