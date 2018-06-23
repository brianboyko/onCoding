---
path: "/blog/stupid-redux-tricks"
date: "2017-04-21"
title: "Stupid Redux Tricks"
tags: ["redux"]
featuredImage: "./img/defaultImage.jpg"
---

If you use Redux, you know how powerful it can be for managing state. What you may *not* know is that you can also use Redux for some stupid - but powerful tricks. 

### Trick one: JSON.stringify() all the things!

While redux-logger is an amazing tool, sometimes it's not very useful. For example: when the application is running on someone else's computer. Like the end-user, for example. 

Unless you're using something like Redux-thunk or Redux-saga to pass functions into your reducer, your actions are just objects containing data literals. That is - you can JSON.stringify them.  

Why would you want to do that?  Well, if you can stringify something, you can store it anywhere that you can write a string - which means that you can save a log of all the actions that went through the reducer one-by-one on a file, in a database, even on the cloud.  And if you can stringify objects, you can use JSON parse to put them back into an array of objects, and run them through the reducers in order -- to recreate all the changes in state that happened to your end user.  

### Trick two: Type: "NO_OP"

Redux is powerful, but it can't do everything.  But wouldn't it be great if you could still use it to keep *track* of everything, not just changes in state? 

For example, say you're writing to the DOM - maybe you're loading in a background image from AJAX, for example, and need to append it to the &lt;body&gt; tag, which isn't reachable from React-dom.  You can pass into the function which makes that change a "NO_OP" callback which dispatches an action through the reducers that matches up to *none of the types the reducers are looking for* meaning there is no change in state. 

This doesn't help you with replayability, if you're using trick one, but at the very least, you can use redux-logger as a full application logger, simply by having a "NO_OP" action creator.  

```javascript
const noop = (info) => ({type: "NO_OP", info})
```


