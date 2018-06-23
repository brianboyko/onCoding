---
path: "/blog/currying-thinking-with-portals"
date: "2017-02-05"
title: "Currying: Now you're thinking with portals"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
---

Being able to be a good programmer is a lot like playing a puzzle game.  Like Portal 2. 

In Portal 2, you're given a tool called a portal gun that greatly changes the laws of physics so that you can place an instant passage between two places in space. In so doing, you're able to create solutions to puzzles that would otherwise be quite frankly, impossible.  But until you learn to think with what the new tool gives you -- to "think with portals," in other words, you may end up doing things the long way around.  

One of those conceptual thinking tricks in Javascript is called "currying".  And once you're familiar with it, it makes your code just that much more powerful.  

I'm working on a few side projects, including the re-doing of my HackReactor thesis project using what I've learned over my years in the field. (Programming is the perfect endeavor for anyone who wants to fight a younger version of themselves.) 

One simple thing that you'd think couldn't be improved -- but which has improved -- is how I create database models for my database.  I use Knex, which I won't get into here -- this really isn't about databases. 

What it is about, however, is functional programming.  

Back when I was learning Javascript, I thought this might be a good way to organize my database models: I'd have basic "create, read, update, del" objects, and give them various values. 

So, imagine a "USERS" table in an SQL database. It's set up like this: 

```plaintext
  uid: the auto-incrementing user id
  login: the username
  password the (hashed) password
  email: the user's email address
  first_name: the user's first name
  last_name: the user's last name
  created_at: timestamp of creation 
  updated_at: timestamp of when this was last updated
``` 

So, I'd want to create ways to look up users by a variety of methods - and remembering to assume that the person who maintains my code is an convicted axe murderer who has my home address, I want to make my code easy to understand. 

So, to access some value in my model, I think I want to use simple words.  Something like: "Users.read.by_id(|some number|)".  It's easy to tell what that does.  

So, I'd have a read object, with a "read.by\_id" method, "read.by\_login" method, and so on.  And I'd write them out individually, like this: 

```javascript
  Users.read = {
    by_id: (id) => knex('USERS').where({ id }).select(),
    by_login: (username) => knex('USERS').where({ username}).select(),
    by_email: (email) => knex('USERS').where({ email }).select(),
    by_name: (first_name, last_name) => 
      knex('USERS').where({ first_name, last_name }).select(), 
  };
```

And for what it's worth, that's not a bad way to do it.  But it seems to me that there's an awful lot of repetition. How many times do we type "knex('USERS')" and ".where()" and ".select()" Can't there be a better way? Plus, what happens if I, for some weird reason, need to access a property that I'm not really using all that often.  

What if you're writing a geneology database, and you get a request from the Beiber family to return all of the people with the last name of Beiber, but NOT if the first name is Justin? It'd be nice to be flexible.  

So instead of writing out all the cases I can think of, I can use higher order functions and functions that return functions. 

Like so: 

```javascript
// ./src/db/models/Users.js
export default (knex) => {

   // line one.
   let read = (by) => (lookup) => 
     knex('USERS').where({ [by] : lookup }).select();

   // line two. 
   ['uid', 'login', 'email'].forEach((by) => {
     read["by_" + by] = read(by);
    });

   //line three
   read.by_name = (first_name, last_name) =>
     knex('USERS').where({ first_name, last_name }).select();

  return {
    read,
  }
}
```
So, let's look through this code here.  

The first thing that might trip you up is the double arrow syntax.  It's really not that difficult - remember that arrow functions are just functions with a whole lot of boilerplate removed. (They also .bind(this) automatically, but let's not worry about that right now.) 

so, this would be an equivalent statement in ES4/5 for line one:

```javascript 
var read = function(by) {
  return function(lookup) {
    let keyVal = {};
    keyVal[by] = lookup;
    return knex('USERS').where(keyVal).select();
  } 
}
```
Essentially, what "read" takes is a parameter, "by", and it returns a function that takes a parameter "lookup".  

That function, in turn, returns the information we're looking for. 

Now, you may be asking, *why, for the love of all that's good and holy, didn't I do this?* 

```javascript
let read = (by, lookup) => knex('USERS').where({ [by] : lookup }).select();
```

Well, that's a good point.  It is a bit more straightforward.  But in order to use that, we'd need to know *both* the "by" variable, and the "lookup" variable at the time we create it.  

In some cases, *especially with asynchronous operations*, we don't want to wait until we have all the variables before we start working on the problem.  This is especially true with a particularly hairy algorithm, one that might make multiple async calls to databases, third-party APIs, etc.  

But in this case, the main thing is just to have more readable code in the controllers I'd eventually write, that follows the "Users.|do something|.by_|some key in the table|" pattern.  

What I've done with the "function that returns a function" pattern is currying, and it essentially lets you create multiple functions that do mostly the same thing but in different ways.  

So, if, for example, if I wanted to look up a record something by the login name, this is a perfectly valid way to do it: 

```javascript
// ./src/main.js
import usermodel from './src/db/models/Users'; 
import knex from './src/db/config';
const Users = usermodel(knex); 

Users.read('login')('bieberluver69'); 
```

The function "Users.read('login')" is evaluated first, and it returns a function. *That* function is then called with the parameter('bieberluver69').  

What's interesting is that we can split this up.  This does the same thing as the above: 

```javascript
// ./src/main.js
import usermodel from './src/db/models/Users'; 
import knex from './src/db/config';
const Users = usermodel(knex); 

const readByLogin = Users.read('login');
readByLogin('bieberluver69')
```

(If it helps you to think of it this way, Users.read() is a "mommy function" that takes a "parameter from daddy", and gives birth to a "baby function". Just don't use that terminology in technical interviews.) 

By now, you've probably also figured out that the Users model itself is a lot like a curried function! Only it doesn't return a function - it returns an object that has a function as it's property.  This is "dependency injection" and it's also important for a bunch of stuff. (but more on that some other time.)  

Okay, onto line two.  

```javascript
  // line two. 
  ['uid', 'login', 'email'].forEach((by) => {
    read["by_" + by] = read(by);
  });
```

You can probably guess what's going on here.  We're taking the strings "uid", "login", "email" - and we're passing them in as parameters to curry into the read function. 

Then all we have to do is put those curried functions somewhere, in one object.  Hey, wait, we already have an object!  "read" is a function, but in Javascript, *all functions are objects.*  Which means *you can add methods to a function.* 

Now, you can call read() by itself, or access the read.by\_uid(), read.by\_login(), and read.by\_email() parameters. 

Now, there are going to be times that you have to come up with special cases.  We want read.by\_name() to take two parameters and match against them both, so we really can't generate this automatically using the read() function.  In that case, we define it individually, with line three. 

But, even so, now this pattern can be re-used, and getting the rest of the models completed using this pattern can be so much simpler.  When we go to the next table in the database, we'll be able to reuse this code... in fact, *theoretically*, we can curry this further, simply by turning the literal string 'USERS' into a variable.

But that's an exercise for another day.  