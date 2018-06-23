---
path: "/blog/c-live-dangerously"
date: "2017-01-13"
title: "The C Programming Language: Live Dangerously."
tags: ["c"]
featuredImage: "./img/defaultImage.jpg"
---

Right now I've just begun "Learn C the Hard Way" by Zed Shaw.  It made a lot of sense to me to take this approach to C programming. 

Specifically, Zed Shaw takes the view that you *probably really shouldn't be writing C code for anything productive* but that it's a useful tool for understanding how the computer works at a very low level. 

And having worked with it for no more than 24 hours, I'm going to say he's probably right.  

There are no training wheels with C. And a lot can go wrong in unexpected ways. 

Take this simple program in Javascript(ES6): 

```javascript
> let foo
undefined
> console.log(`This is foo: ${foo}`)
This is foo: undefined
undefined
```

About what you'd expect right?  Undefined variable resolves as undefined. There's some issues that, effectively, an undefined variable printed to the console becomes the string "undefined." So maybe you want a programming language that will crash with an error - like Python. 

```python
>>> print("This is foo" + foo)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'foo' is not defined
>>> 
```

But what happens in C is completely off the rails.  

```c
// example.c
#import <stdio.h>

void main(){
  printf("this is foo: %s\n");
}
```

```bash
$ make example
cc     ex.c   -o ex
ex.c:1:2: warning: #import is a deprecated GCC extension [-Wdeprecated]
 #import <stdio.h>
  ^
ex.c: In function ‘main’:
ex.c:4:10: warning: format ‘%s’ expects a matching ‘char *’ argument [-Wformat=]
   printf("this is foo: %s\n");
          ^
$ ./example
this is foo: �����
$ ./example
this is foo: ꃔ��
$ ./example
this is foo: ����
```

Now, we did get a warning, which is great, but the problem is that instead of either declaring the error or crashing at runtime, when C hits an undefined variable, it basically looks to where the variable would be in memory if it was defined, and just prints out the random garbage in the memory. It doesn't even print out the *same* random garbage in the memory.  

There are no guardrails, no training wheels, with C.  It forces you to be a better programmer in a sink-or-swim way.  

Additionally, it's the lowest of the "high level" languages, and is about as close as you can get to assembly without, well, writing assembly.  And there are some clever things you can do with bitwise operators and memory management though I've yet to see those cases.  Even so, it is worth mentioning that all of modern video games exist simply because of this clever piece of code: the [Fast Invert Square Root](https://en.wikipedia.org/wiki/Fast_inverse_square_root)

> The algorithm accepts a 32-bit floating-point number as the input and stores a halved value for later use. Then, treating the bits representing the floating-point number as a 32-bit integer, a logical shift right by one bit is performed and the result subtracted from the magic number 0x5f3759df (1597463007 in decimal). This is the first approximation of the inverse square root of the input. Treating the bits again as a floating-point number, it runs one iteration of Newton's method, yielding a more precise approximation.

So, why was this a big deal?  Well, in 3D games, you have to deal a lot with how light reflects and blooms - how the angle of incidence equals the angle of reflection. As far as a computer is concerned, calculating a square root - or an inverse square root - is something that requires a lot of division, and division (unlike addition/subtraction) is computationally expensive, when you get down to the raw bits of assembly code.  So any time division - or multiple incidents of division - can be avoided, the code runs so much more quickly.  

What difference does that make?  Well, the game it first appeared in (to my knowledge) was Quake 3 Arena, and back in 1999, gamers needed lightning fast performance to be competitive. There were other shooters at the time - but Quake 3 *remains in active use,* compared, to say, Tribes 1 from the same era.  And I'd have to say a big part of that was the game *feel* that was just so much more responsive for it's time than competitors - and that had to do with bit manipulation. 

For study, C's going to be my focus for the next few weeks at least. I don't know how clever I can be with it, but it's fascinating how true the adage is that computer software or programming languages that keep you from doing really dumb things also limit your ability to do really clever things. 

It's fascinating how much power it has. Or frightening.  One of the two. 

