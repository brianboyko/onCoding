---
path: "/blog/doing-it-right-vs-doing-it-fast"
title: "Doing it right, vs. Doing it fast"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
date: "2016-02-13"
---

Now that I'm employed as an engineer, there's one thing that I really think I need to address - and that is the concept of "good code".

At MaydayPAC, at MakerSquare and in my job at Cycorp, the code needs to accomplish practical things, and it needs to do so in a limited amount of time. It is a "rushed" development cycle, and if the "better" way of doing things takes longer to develop, it may mean, unfortunately, that the quick and dirty way wins out.

So while I've been a developer for longer than I thought I have, I've come to the conclusion that I've never really had time to develop code that I thought was "truly good.""

For the MakerSquare thesis project, there were some difficulties (that I won't get into here) which left us with half the development time of other teams, and we lost two out of an original five developers along the way.

We made significant choices based on our lack of development time and manpower, _not_ because we believed them to be the best for the project, but because we had to make sure at the end of the day _we had a working project_ that we could show potential employers.

For example:

---

- We used MongoDB rather than PostgreSQL

Digiquiz's data is almost entirely relational in nature. Teachers have classes, classes have students -- while it is possible that there are many-to-many relations, of course, that simply means you need join tables. From a long-term architecture standpoint, a relational DB would have been a more fitting choice. However, Mongo is much easier to develop for, and the ability to store objects and arrays in Mongo meant it was much easier to add and remove features without having to constantly redesign the schema to match.

- We used an MVC pattern instead of Flux

While React and Flux are made to work for each other, understanding Flux was something the entire team had trouble processing at the time. We certainly could have gotten it, but with the deadline on our backs, we decided to develop using the older and more conventional MVC framework (which we were all familiar with from the MakerSquare curriculum), instead of using a Flux architecture. Looking back on it, now, using Flux, Reflux, (or the new hotness, Redux), would have been the better option for the long term.

- We used multiple modular scripts loaded in the HTML instead of bundling via browserify/webpack.

This was a big one. We tried multiple times and multiple ways to build out our client using browserify/webpack, but never took the time to understand the tools and how they worked. As a result, we ended up loading in the modules one by one on the index.html page, resulting in noticably slower load times. Again, we did what we could in the timeframe, compared to what we knew would be best.

- We couldn't finish charting of student data

Though we really wanted to make sure we had data visualization working, in the end, we decided to go with Charts.js instead of D3.js, because, again, we felt the simple route was all we had time for. It was only after a few attempts that we realized that Charts.js didn't have the functionality we needed, and as a result, data visualization never made it into the final product. (This was a big blow, especially, to Peter, who really wanted to focus on data visualization as something he wanted to own. As product owner, I feel guilty about making the call to go with Charts.js, but I still stand by it.)

---

So, now that I'm only working 40 hours a week (instead of 66), one of the things I'm doing is redeveloping Digiquiz more or less from scratch, this time, taking the time to truly understand the best way, and taking the time (now that there is no time pressure) to develop in that manner.

- I'm using ES6 to make the code more modular.
- I'm developing unit testing for nearly every function.
- I'm using gulp to automate testing and other tasks.
- I'm planning on using a packing system for the client (though I don't know if that's going to be Browserify, Webpack, or Rollup.js just yet).
- I'm going to be using PostgreSQL instead of MongoDB as the database.
- I'm going to put in data visualization using D3.js

And it is hard. Not just because I only have nights and weekends, but because I _have to power through_ when I don't quite understand a technology. I no longer have the _excuse_ of deadlines to excuse the quick and dirty way, I have to do things right. A way without acruing technical debt.

Right now, we're having trouble at Cycorp tracking down a bug that might be in the front end, might be in the back-end, but appears almost randomly. It's a serious bug and I find myself going back and writing code to track it down that probably should have been in it from day one - for example, a pseudo stack-trace system which logs which function was being called and how long it took to execute, to track down asyncronous timeout errors.

On Monday, I'm going to probably start developing a type of automated "torture test" system, so that we can perhaps find common threads in when the bug occurs. This is kind of difficult, considering that the AI that Cycorp has developed is smart enough _not_ to be functional. That is, given the same inputs, there might be wildly random things that come out. (This is a feature, not a bug.); So what I might have to do is just develop a way to automate going through the software, recognizing when there's a problem, and creating a log of those events, hoping there's some commonality to it. Again - probably something that should have been part of the overall design spec. (Actually, we probably should have a design spec, but never mind that right now.)

The differences between the two types of development are significant... something that I'm only appreciating now that I have time to code on my own projects.
