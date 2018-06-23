---
path: "/blog/the hip"
date: "2016-10-16"
title: "Shooting from the Hip (without shooting yourself in the foot.)"
tags: ["professional coding"]
featuredImage: "./img/defaultImage.jpg"
---

Sometimes, you just can't do things the "right" way.  Sometimes it just takes more time than you have, the site needs to go up literally yesterday, and to hell with best practices. 

I don't like it, but sometimes it's a reality.  Case in point: I just helped @lessig with another site, this time raising money to fight for the [citizen-created and referendum-passed constitution in Iceland](https://canyouhearus.is).  Here's the problem - by the time we had finalized the plan, it was already the first week of October -- and the elections are to be held this [October 29th](https://en.wikipedia.org/wiki/Icelandic_parliamentary_election,_2016).  

Parliamentary systems move fast, that's one of the reasons I like 'em - but in this case, they needed a crowdfunding website up *now* and there was no time for my normal cautious "test-then-code-then-test-then-code" methodology. 

So, how do you do that? When you have to take on technical debt, how do you go about taking on the least amount of it? 

Even though you're not writing unit tests now, you need to assume you'll be writing unit tests in the future.  Because it's not just about having tests - testable code is easier to understand and reason about.  Writing tests encourages you to create loosely coupled code. In this case, you can get some of the effect without the cause, simply by keeping in mind: "When I unit test this, how would I want it organized?"  

This isn't as good as the real thing, of course.  I'm looking over my code - code that has made it into production - and realized there were places I should have used dependency injection instead of importing directly to a file. Like this: 

```javascript
//this is the bad way.  
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const MONGO_URL = 'mongodb://someURL.com';

export const connectToMongo = () => new Promise((resolve, reject) => {
  MongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      reject(err);
    } else {
      resolve(db);
    }
  });
});
```

The problem is that now if i want to test connectToMongo(), I actually have to connect to the real database.  And for the most part, I don't want to do that. What I really should have done was something like this: 

```javascript
//this is a better way.  
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const MONGO_URL = 'mongodb://someURL.com';

export default (injections = {}) => ({
  connectToMongo: () => new Promise((resolve, reject) => {
    let client = injections.client || MongoClient;
    client.connect(MONGO_URL, (err, db) => {
      if(err){
        reject(err);
      } else {
        resolve(db);
      }
    });
  },
});

```

Or something along those lines.  Main thing is that I'm importing a lot of files directly - and not just from third party libraries, but also my own code as well.  TDD would have caught this anti-pattern. Now it's going to be a messy refactor.  

But that said, I also made some smart decisions too. One key feature of the site was multilingual support.  Instead of hardcoding in key phrases, one of the ways I was able to approach this was by creating data objects for every possible phrase on the site and keeping them in a seperate "text" directory.  

For example, this is my "text/labels.js" file.  

```javascript
export default {
  donate: {
    EN: "Donate",
    IS: "Styðja",
  },
  home: {
    EN: "Home",
    IS: "Heim",
  },
  about: {
    EN: "About",
    IS: "Um",
  },
  theConstitution: {
    EN: "The Constitution",
    IS: "Stjórnarskráin",
  },
  learn: {
    EN: "Learn",
    IS: "Læra",
  },
  parties: {
    EN: "Parties",
    IS: "Flokkar",
  },
};
```

In Redux, I simply defined a reducer called "language," when then gets mapped to every component's props.  So when it came time to define the button texts, it was easy to switch up the languages - just send in "EN" for English, and "IS" for Icelandic.  

```jsx
<MenuItem primaryText={labels.home[this.props.language]} value="/" />
<MenuItem primaryText={labels.learn[this.props.language]} value="/learn" />
<MenuItem primaryText={labels.about[this.props.language]} value="/about" />
<MenuItem primaryText={labels.theConstitution[this.props.language]} value="/constitution" />
<MenuItem primaryText={labels.parties[this.props.language]} value="/parties" />
```

By factoring out the actual content of the text from the rest of the site, it also made it easier for Icelandic non-technical team members to go in and insert the correct Icelandic in the right areas, without having to wade through tons of JS or JSX code.  It worked out brilliantly.  

Another way to uncouple code was by using inline styles.  While some designers still swear by SASS and LESS, the truth is that since we're already abstracting our websites into itty bitty pieces (on purpose), it doesn't make a whole lot of sense in my view, to keep style separate from the content -- especially when the same component can be used with different styles, simply by passing in props in React. Having the styles in the same file as the component itself really helps narrow down those pesky CSS bugs.  

The big limitation of inline styles, however, is that CSS and SASS support some features that aren't provided for in inline styles.  However, the Aphrodite library removes that limitation - so I used it.  

I'm happy with the way the site worked out, though it's a bit embarrassing to have something on my public github without unit test coverage. In the meantime, I'll add what tests I can, now that the site's main requirements have been met, and probably will go over and refactor after the Icelandic elections so that I can use this as a portfolio piece.  
