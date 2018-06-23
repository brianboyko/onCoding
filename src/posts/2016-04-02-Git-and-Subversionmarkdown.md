---
path: "/blog/git-and-subversion"
date: "2016-04-02"
title: "Git and Subversion"
tags: ["git", "subversion", "source control"]
featuredImage: "./img/defaultImage.jpg"
---

One of the things that does annoy me about my workplace is the version control system.  There's a reason that Cycorp does things a certain way, and these procedures work for them.  But I think that it makes it very difficult to do a certain style of development that most web developers have adopted.  

I'm just gonna write my thoughts here - feel free to agree to disagree. 

Cycorp uses a single subversion repository for the company. Coming from the Node.js/GitHub world, I thought at first that it was crazy! A single repository?  But there are some advantages.  

+ » You can reuse common libraries across projects. 
+ » There's only a single place where you look for code. 
+ » You have a single authorization and single commit number.

Now for a Node.js developer, these very real concerns are less concerning. 

For the most part, as a general rule, we don't store libraries with our source. Python, Ruby, and Node.JS tend to use package management instead - the source code is downloaded *sans libraries.*  The libraries you need are listed in the Package.json file in the root directory of your project, and anyone can get all of them, immediately, by running "npm install". 

What's interesting is that most libraries in the JavaScript world eventually end up open-source anyway.  For all the jokes about "leftpad" breaking NPM, it doesn't make sense for each company to have it's own proprietary version of most libraries. This *isn't* necessarily true if you're writing a whole bunch of stuff from scratch - like our inference engineers and ontologists are doing on a daily basis. Or if you have a Java shop, often you'll be building proprietary libraries in Java. This is probably the main reason why Cycorp uses Subversion. 

But while I agree that there are certain advantages to using Subversion, it doesn't make a whole lot of sense for node developers who use git to adjust to Subversion.  In fact, I'd like to make a compelling case for using Git in combination with Subversion. 

When I make a "commit" to Subversion, it's a big deal.  I launch svn-status in emacs, check all the diff files, hand pick which files I want to commit, and then, when it's all done, write a big commit message to explain the changes.  Then *everyone in the company is e-mailed to let them know that someone has made a commit to the repository.*  This encourages users to make sure that their code is "really truly done" by the time they commit, nothing's more embarassing than a string of little commits.  

(Honestly, this is also a reason to adopt Test-Driven-Development, but maybe for another blog post.)

Additionally, while one *can* branch with Subversion, in practice, almost every commit at Cycorp is a commit to master. 

Git, on the other hand, allows you to make lots of little tiny commits.  It's not a big deal to commit in Git because all you're doing is, well, creating a save point to go back to on your local hard drive.  I treat git commits like the quicksave button in Skyrim - if you'd get annoyed if you lost your progress, commit. 

What this means is that I can actually do a lot of things quickly that Subversion based developers have difficulty doing.  Let's say that after about 30 minutes of working on something, I realize I was on the wrong track completely and need to go back to 30 minutes ago.  It's super easy to do so.  Or maybe there's some source-code that I thought was dead but I find out a few hours later that it fulfills a crucial function.  I can commit what I have, go back in detached head mode, grab the files I need, head back to what I was working on, and put them in there. 

Most importantly to me is the idea of git's branching capabilities.  Typically, I'll have something like these branches in git. 

```text
    > master
    > master-deployment
    > master/[feature] 
    > refactor
    > refactor/[feature]
```

My workflow is something like this: 

When I'm asked to add a feature or fix a bug, I immediately create a branch off of master with the feature or bug name, and work primarily in that branch.  I make multiple, frequent commits, so that I can quickly go back to earlier code if I need to.  When I'm done, I make sure it all works properly. Once I'm satisfied, I then rebase master.

Rebasing master is simply "replaying" all the changes I made on the master/feature branch on top of the master branch. That way, I can treat master as sacred - as containing only code which has *Been Tested and Found Worthy*. (It's also the branch which I commit to the official Cycorp subversion from.)

The deployment branch is, 99% of the time, the same as Master.  But sometimes there's a bug in production (despite our best efforts, it happens) and I have to fix it Now Now Now.

Now, I try to avoid those situations as best I can, but because they do happen, I make sure that I only deploy, ever, from the master-deployment branch.  This way, I am 100% certain that the code in the master-deployment branch and the code running in production are identical.  

As for refactor and refactor-feature, those branches are for very large changes -- changes which would essentially *replace* master once they are complete.  But until then, this new codebase needs to be kept seperate from the master codebase. 

So, during a typical workday, I:

+ » have 5-6 branches on my projects
+ » am making 6-8 commits per day.

Now, one of the things that we don't do much at Cycorp that I think we absolutely should adopt is multiple developers working on the same codebase, pair programming, and all-in-all using the collaboration tools that are part of Git.  For this, we'd need to either use some form of cloud-based version tracker (like BitBucket) or install GitLab on our local network. 

Here's why it's such a big deal:

With Gitlab, we'd be able to have a single remote repository for each seperate project, and because of branching, different developers could work on different features of the same codebase *at the same time.*  This happened a lot with my thesis project, Digiquiz.  I'd be working on connecting the websockets, Juan would be working on developing unit tests, Pete would be working on Passport authentication... we'd all be working off the same repo, but in different branches.  So it would be something like this: 

```text
    GitHub: (origin)
      > master
      > feature/websockets-bb
      > testing-js
      > feature/authentication-pd

    Pete's Machine:
      > master
      > feature/authentication-pd

    Juan's Machine:
      > master
      > testing-js

    My machine: 
      > master
      > feature/websockets-bb. 
```

Juan was the keeper of the keys to Master.  Our process would go like this: 

Pete would complete his feature (authorization).  He'd make sure his master was synced with the master branch on the server by running "git pull origin master".  He then pushes his feature branch to the origin's feature/authentication-pd branch, and uses the GitHub tools to send a pull request.  Juan would take a look at the changes and diffs that Pete would make, and if they were clean and good, he would merge them into the remote master.  Pete then works on a different feature or bugfix. 


At this point, Juan and my local master branches are behind master.  Let's say I'd complete my feature next.  I do the same thing as Pete - I sync my master branch with the one on the server by "git pull origin master".  It lets me know that there have been changes made to master (Pete's authentication code.) What I then do is *rebase* the code in my branch with the master on the server.  This would replay any changes that Juan made to the sourcecode alongside changes that I made to the source code. It might go through without problems, or there might be a "merge conflict" which would be my responsibility to resolve before I send the pull request to Juan for approval.  

In this way, we all have access to the latest code, we can work on the same code in isolation, and if someone's stuck, we can quickly pull down their branch and look at the code together in pair-programming (even, with the help of floobits, if one or both of us are working remotely.) 

Git is powerful enough on it's own, but it's this collaborative process of development that makes Git+GitLab/GitHub huge when it comes to rapid, *accurate*, clean development.  

Right now, I'm only using git locally, but I hope to convince Cycorp to set up a GitLab for collaboration -- even though the "true" master would remain on Subversion. 

Oh, yeah that reminds me... you can automatically sync a git repository's master branch with any subversion repository you want.  Isn't that lovely?  