---
path: "/blog/random-redux-thoughts"
date: "2016-04-30"
title: "Random Redux Thoughts"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
---

Maybe I'm not experienced enough to be telling people how they do things is wrong, so I guess I'm not.  I've been just [browsing some of the many, many third-party add-ons for Redux](https://github.com/markerikson/redux-ecosystem-links/blob/master/component-state.md), trying to see if any of them might be good for my workflow.  But as it turns out, I've developed a redux workflow that it's clear that some of these developers didn't share. That's the thing about a new framework - best practices aren't yet established.  

Here's an example: [Redux Brick](https://github.com/leeching/redux-brick) basically combines both actions and reducers into a single function, to eliminate some of the boilerplate in writing Redux apps.  This, it does well, but it's main assumption is that, for the most part, every action has a reducer, and vice versa.  (This might have something to do with the fact that most Redux tutorials follow this pattern - in the real world, apps can get much more complex.)

There are a number of instances in my application where multiple actions can trigger the same reducer; and different actions can trigger the same reducer in different ways.  

Here's a good example.
```jsx
// actions

// hydrate() is used to directly modify components in the store;
// if the newState passed into hydrate() has a parameter with the
// same name as the reducer, it replaces the old one, otherwise
// it defaults to returning state, so partial state changes are possible.
// keep in mind, this is not mutating the state - it is an
// action just like anything else, and can be reverted.  
// I use it to replay user experiences and to have a reliable tutorial
// mode that works just like the real thing.

const hydrate = function(newState){
  return {
    type: HYDRATE,
    newState: newState,
  }
}
 // and others, naturally.

// reducers

export function myColor(state = "#000000", action){
  switch(action.type){
    case CHANGE_COLOR:
      return action.color;
    case HYDRATE:
      return action.newState.hasOwnProperty('myColor') ?
      action.newState.myColor : state; // could use a failthrough to default, but nah.
    default:
      return state;
  }
}

export function myNumber(state = 0, action){
  switch(action.type){
    case ADD_ONE:
      return state+1;
    case DOUBLE:
      return state*2;
    case ADD_CUSTOM:
      return state + action.numberToAdd
    case HYDRATE:
      return action.newState.hasOwnProperty('myNumber') ?
      action.newState.myNumber : state;
    default:
      return state;
  }
}
```

So what's going on here?  Well, for starters, the hydrate() action can affect multiple reducers, and the myNumber() reducer can be affected by multiple actions.  This is not a one-to-one proposition.

Yet despite that, it's really easy to keep track of what's going on here.  Despite the relative complexity, it's simple and relatively easy to read.  

In the app I'm developing for Cycorp, each reducer's switch has a HYDRATE case.  If I want to partially (or completely) replace the entire store, I can do so with HYDRATE.

You may be wondering: Why would you do this?  Well, there are two scenarios.  

The first is the Tutorial Mode of the app I'm building. When the user chooses to go to tutorial mode, a "snapshot" of the state at that moment is made into a backup variable in my store.  I can then step through the tutorial step-by-step by creating an initial, static state from which to begin the tutorial, and either pass through actions or entire states one by one, as the user progresses through the tutorial. At the end, I simply hydrate the store using the backup I created earlier.

A more general use case is anytime you need to stop and save the progress of the user and restore it from that moment.  

The other use case - I have a "replay" mode used in debugging. Our testers simply send us a description of the problem, and it auto-sends us all the actions that lead to that problem.  I simply have the program run through the actions one-by-one, and keep track of an array of states along the entire way.  That way, I end up with an array of every state the state ever experienced, and I can quickly "time-travel" back to any point in the application where the error may have occurred and quickly isolate the buggy action.

Indeed, this way of debugging has allowed us to solve issues in a matter of hours when it would have taken us weeks before, just to find the root cause. I'm getting more than a few "attaboys" from work because of it -- all thanks to NOT following the pattern that Redux-Brick's author thinks Redux follows.

Again, Redux-Brick is brilliant, but it's a completely different workflow and solves a completely different problem than the one I currently have.  I may end up using it, but on a different app entirely, where that approach is the right one to take.
