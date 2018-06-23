---
path: "/blog/coding-on-paper"
date: "2016-12-12"
title: "Coding on paper is like painting via essay"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
---

As you know I'm a huge advocate of "bootcamp" programs such as Hack Reactor for those learning to program.  I mean, not all bootcamps are worth the money - but for me, Hack Reactor Austin was worth it. 

But it wasn't my first attempt to program. I first attempted to learn programming by taking some intro computer programming courses during my B.A. - in 1997.  I look back at those courses now, and I can see that there were a number of reasons that it didn't take - part of it was that I got unlucky with some poor teachers, part of it was my general immaturity back then.  

But I didn't realize until recently that maybe it's not me.  Maybe colleges are just not equipped to teach computer programming and software engineering as a *skill*.  See, back in 1997, computer science course exams often included writing out code that needed to be syntactically perfect with pencil on bluebooks.  I thought that maybe that had changed significantly in the twenty years since I tried, and failed, to learn JDK 1.1.  But apparently not. 

[In this thread in /r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor/comments/5heq57/only_in_a_programming_course/), modern students are complaining about how they're still using pen and paper to "program."  Here's the top comment: 

> Are you telling me you get to take a programming exam on an actual computer? I don't give a s**t if they make me program on one of those roll-up rubber keyboards, if I have a working compiler/interpreter for the language they expect me to use I'd be one happy camper.

> Consider me just a tad jealous: I have to take a final in two weeks where I will need to write out Java classes (incl. single inheritance, overrides for equals/hashCode, etc.) by hand. Not pseudocode mind you, they have to be syntactically correct Java programs.

> Of course it's unspecified what version of the JDK our "exam" will be "compiled" with. I got marks off for using 7's diamond syntax on the midterm.  

This blew my mind! How could anyone expect to learn how to program in 2016 just by *memorizing syntax?* 

Programming is not about memorizing what does what.  Let's take Javascript - if I wanted to get the length of an array, I'd simply access the length property of that array. 

```javascript
const sample = [1, 2, 3];
console.log(sample.length); // -> 3
```

But the syntax is different in Python. 
```python
sample = [1, 2, 3]
print(len(sample)) # -> 3
```

Now, someone who knows Javascript in and out could sit in on an intro Python exam, be given the question of how to get the length of an array, and get zero marks.  But in the real world, the basic ideas from one programming language to another translate.  What's different is the *ecosystem* and *code style.* 

Java, for example, favors object-oriented construction and self-contained, tightly-coupled but independent code.  Functional programming favors reusable, light code and an uncoupling of data to operations.  And knowing how to use NPM, for example, won't help you with Maven, knowing Express won't help you with Spring.  

But it is far easier to learn the syntax of Spring if you already know the concepts behind REST than it is to learn the concepts of REST if you have Java's syntax down cold. It's not about the shape and the design on the puzzle pieces. It's about how the puzzle pieces work together.  

One of the reasons I think bootcamp programs like Hack Reactor were so effective is because from day one, we were working on computers, we were using every tool at our disposal. No one told us we couldn't actually compile our code, or restricted our access to the Internet.  What would be the point?

We used the *things we built* to show mastery of our skills.  We made sure that what we did was self-evident in quality.  

I think if anything, we need to really rethink STEM education less as an *academic* subject but as a learned skill.  Not that college isn't important - a broad, general education on a number of subjects is vital to understanding critical thinking.  But perhaps we should stop thinking of our majors as something to be drawn out over four years, with students graded like cuts of beef.  

Because trying to teach students to code by telling them to write out their code on paper is like teaching artists to paint by having them write essays on the color blue.  Even if you were to get it completely right - you're missing something important, and you're not teaching the right skill. 

