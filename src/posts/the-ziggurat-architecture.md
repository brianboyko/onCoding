---
path: "/blog/the-ziggurat-architecture"
date: "2018-06-23"
title: "The Ziggurat: An easy to understand architecture patten"
tags: ["react", "architecture", "mvp", "flux", "javascript", "web development"]
featuredImage: "./img/ziggurat.gif"
---

Okay, this is something that I'm not sure if I should be talking about. I don't know if I've finally overcome my impostor syndrome or if I'm heading headlong into Dunning-Krueger.  I'm sure someone like Douglas Crockford or Kyle Simpson has written books on this... but here's what I've figured out so far. 

To paraphrase Douglas Adams, a lot of codebases out there in the real world aren't so much "designed" as they are "congealed." There was a nifty technology that enabled a new feature and the library was just added to and modified to get the minimum viable thing that worked to please the customer. That's not bad - that's actually good - but it does mean that *the later you start thinking about how your application is designed, the harder it will be to organize your application. 

And looking back at my bootcamp education, I think maybe not enough effort was made to teach the idea of elegant software design.  And I can understand why. 

Programming may be as much an art as it is a science, but any beginner needs to know that the *science* of it takes priority. After all, if you don't know the basic concepts of programming and the syntax of the language you're working in, you can't build *anything.*  You can write terse, elegant code, but if it doesn't get the right answer, it's irrelevant.  So we focus on how to do, rather than how to think, in the early days of programmer learning.  

You'll find some mention of MVC and such in bootcamps, but it's really glossed over - or worse, presented in a specific context which doesn't really let you understand it.  (such as: Angular is a full MVC framework, while React is just the view). 

Truth is, it's hard to really understand what makes a *good* software design different from a *mediocre* one.  The key difference? Every project gets bugs, bad code, technical debt, etc. A good software design makes it easy to locate bugs or to refactor bad code.  A mediocre one makes it less easy to do so.  

And the reason this is important is that the higher the cost of paying off your technical debt, the less likely it will actually get paid off.  

To kind of combat this in my own programming, I've come up with a simple model that should be easy to explain and understand.  I mean, it's basically the MVC pattern, but I like to think of it as "The Ziggurat."  It's not the right solution for every problem but if you're trying to build something, I think there are worse models.  

A ziggurat's basically a pyramid, but with more distinct layers.  And it is that layering that I'd like to talk about now. 

The principals of the ziggurat are as follows: 

* A lower level provides the data the higher state needs, the higher level provides the "actions" (callbacks, really) which ask the lower level to change or use the data somehow. 
* Use encapsulation. That is, no layer should ever *directly* reassign a value on a lower level.  
* Wherever possible, avoid side-effects and write in pure functions. Javascript is not a purely functional language, but pure functions are easier to test and to understand.  
* Ensure that the application fails *up*, not down. That is, a break or bug in a lower layer can (and probably should) affect higher levels of the ziggurat, but a bug in a higher level should never cause problems with the lower level, such as corrupting state or disabling methods. 

I've seen MVC patterns described as "MVVM", "MVP", MV* - the truth is, the real key isn't following a specific set of patterns you find in a book, but just using your common sense to make sure that each layer can be switched out with another and the rest of the code doesn't need to be touched.  

So here are the advantages to this pattern:

* If you had to switch out an entire layer for something else, you could do so without refactoring the upper layer or the lower layer, simply by rewriting interfaces between the two.  
* You can more easily find out the root causes of bugs, because only the layer that contains the bug and the layers above it will be affected, so you'll know exactly where to start looking.  
* You'll be able to have multiple developers working on different parts of the project without stepping on each other's toes, so long as the interfaces don't change. 
* You'll be able to build faster during prototyping by mocking out the logic of the layers below a certain point.  

Now, I've mostly worked with React/Redux and Vue, so I'll explain it in terms of a front-end web-based framework, but I think any application - anything from pure-server-side code to video games - can make use of the Ziggurat. 

But first, let's start with something more basic - [the OSI model](https://www.webopedia.com/quick_ref/OSI_Layers.asp). 

The OSI model is used a lot in networking to describe different layers of how to get a packet of data to point A to point B. At the very lowest level is the physical hardware that runs on physical iron and travels on physical wires (or physical radio waves, as the case may be). It too follows this model, with transmission of data passing through each of the lower layers, and reception of data passing back through those layers. You don't really need to know much of this, save that we're going to start *our* ziggurat, where the OSI model ends: Layer 7, the application. 

And the application layer begins at deployment.  Are you going to be hosting this on localhost? On AWS? Digital Ocean? Heroku? Will you use containerization like Docker? Or run functions-as-a-service? In any case - that's the base of what we're going to build on.  So what do we want? 
## On the backend

### Backend Level 0: The Language Runtime & Database

At the bottom level, we're talking about the service which we're planning to use. And we're going to be following this Ziggurat pattern all the way down. If your language is JS, you're probably talking about Node as your environment, but you can also think of JVM, Python and Ruby as providing similar features. At any rate, whatever language you use, it *reads and gets methods from the environment it lives on* and provides a standard interface that you, as a software developer, can use to access the power of the environment it lives on. But unless you're specifically dealing with system level programming - writing drivers and such - it *never alters the environment it lives on*. 

Node, for example, grants access to the computer's filesystem by use of the "fs" library, and accesses the network via the "net", "http" "http/2" and "https" libraries. Even [node's "os" library](https://nodejs.org/dist/latest-v11.x/docs/api/os.html) is geared towards accessing the data provided by the OS - with only one method, "setPriority" which can be considered perhaps an alteration to that environment. And though I don't know for certain, I'm reasonably convident that setPriority() only accesses methods provided to Node by the environment. 

### Backend Level 1: Database Direct Manipulation - The Model in MVC

Once we get a runtime up, what's the first level we should think about?  Well, we're probably going to need to access some sort of datastore - usually a database.  While there are usually libraries for each combination of runtimes, environments, and databases so that you can easily access the database from your application, the first code you really have to think about writing lives here in level one: Database manipulation.  For most applications, you're going to be dealing with writing and reading from a persistant datastore - i.e., the database. What methods do you need to write to change that data?  

The first thing you need to do is define the schema of your database.  That is - come up with a model of how you want the data to be presented and provide the methods for creating that model (migration) and accessing that model (CRUD).   

Now, it's true that you may not know *exactly* what you need until you start developing it.  Or something might change and you may need a new table or reorganize how you link your primary keys, or something like that.  That's *fine*.  These levels are not *the order in which you develop the application.*  They're just, as you develop the application, where each bit of information lives.  In this layer, we're only dealing with the most basic functions needed to access the database in the most basic terms.  They can be changed.  

### Backend Level 2: Database Interface methods - The Controller in MVC

For some apps, CRUD is all you need, but for most, there will be some added complexity.  This is *especially* true of applications that have complicated one-to-many or many-to-many relationships, or where data lookups aren't always straightforward.  That layer is here.  Whereas the lower CRUD layer might read a single entry, the methods you provide here will *use* the methods provided in the lower layer (the CRUD layer) and chain them together to create more specific queries. So for example, if you're running Amazon, to get the data for a product might be CRUD level.  To find out "people who bought this also bought...", that kind of complex method, which probably deals with multiple records over multiple tables will likely live in this level.  

There are cases where you might need to write a complex query out in raw SQL or something and access the database directly for speed if a query is so common that it doesn't make sense to wait for tons of callbacks to resolve.  Despite the complexity, since it directly accesses the database, it belongs in the lower level... here's the reason.

If you follow this pattern, if you, for some reason, decided to switch databases entirely - say you were moving from MySQL to Postgres, or you wanted to get out from under Microsoft or Oracle's thumb - *so long as you provided the same interface to the lower level 1 to level 2*, you could do so without disrupting the rest of the application.  Everything would still work as expected, and you wouldn't need to rewrite any code *other* than the code that lives on Level 1. Your server (level 3) will still access the same methods that you provide at this level, and because of that, *when technological advancement comes along*, or *when you think of a better way to do things*, you're not trapped into rewriting your entire application to take advantage of it.  

### Backend Level 3: The API - The View in MVC

Now, in a web application the server level is quite literal, but what we're really talking about more broadly is the way that you provide access to the methods you've provided in the previous level to the levels above in a very safe and defined manner.  That is - you want to limit the amount of access to exactly what the front-end of your application (whether that's a browser, or some sort of video game rendering engine) needs.  That's where the API comes in - whether REST or SOAP, the API gets the data from the methods provided by the Database Interface Methods. 

This API provides the data in the format the consumer (the browser) wants it in, making it effectively "the view" for your browser (if not for your end user). Again, see how things are encapsulated.  We access the controller's methods to get data, and provide endpoints which our browser can access.  If you wanted to switch from, Express to Koa, you could easily do so, provided you keep the same endpoints to the upper levels and the same method calls to the lower levels. 

So that's our backend. This is actually pretty standard stuff, nothing really all that different than conventional wisdom.  Heck, on the backend, this "ziggurat" pattern looks exactly like MVC.  What gives?  What's so important about it?  

Well, the key to this is that you can continue thinking in this way when you start designing code on the front end.  

## On the Frontend

### Frontend Level 1: The API Access

The counterpart to the API is the API access.  We need to write methods to access the methods and information the API provides - that access should be in it's own seperate library, with the idea being that all it does is send requests and recieves responses.  In many ways, the API access in your frontend application is just a way to continue encaspulation of the API to the rest of your application.  

This API access provides to the layer above it methods to get data, and by it's very nature, uses HTTP to gain access to the exposed parts of the backend API. And yes, once again - you can replace your entire API library (from Axios to Superagent or Fetch, for example) and still only have to rewrite this one portion of the code.  

### Frontend Level 2: The State Manager - The Model in MVC

In most applications, it's not enough to access the API, but to store the data that you get back from the API somewhere.  There are also cases in which there may be more "local" data which needs to be retained (User preferences, history lists, JWT tokens, or even things like username) that we might need to send to the API, but don't necessarily need to be stored in the database.  For that, you use a state manager.  And there are tons of options - Redux is the one that comes to mind, but even if you just use a React component state as a sort of "event bus", it will work.  

This state manager takes care of the state of the application, storing the data and providing that data to the level above. And here we also provide our interfaces - in Redux, Vuex, and the Flux pattern, these interfaces are called actions - and the upper level never manipulates the state directly - only through those actions that the interface provides.  

The state manager too, should provide the only access to the API.  Ideally, the API provides an action to the upper levels. While the action *call* is executed at the upper levels, the action itself lives on this level.  Now, when that action gets called, *inside that action* is a *call* that has been provided by the API to the state manager, which will return the data, which changes the state in the state manager, which changes the data sent upwards to the next level, the containers. 

### Frontend Level 3: The Container - The Controller in MVC

The next layer up is the controller.  Here is where we have the logic that deals with user-created events.  All our handlers for what happens when the user does X should live here in the containers layer.  And here we follow the same pattern. Actions and data are provided by the state manager - and we provide methods to our view that should kick off when the view captures an user event. 

### Frontend Level 4: The View - The View in MVC

And here at the end of all things is the view - rendering what the user sees and capturing what the user does.  Like every other layer, it too provides an interface - but this interface is the *user interface.*  

