---
path: "/blog/cool-tools"
date: "2016-05-08"
title: "Cool Tools You May Not Have Heard Of"
tags: ["beginning coding"]
featuredImage: "./img/defaultImage.jpg"
---

Just a quickie: Cool tools you may not have heard of.

## [Gogs](https://gogs.io/)

My current best friend at work, [Gogs](https://gogs.io/) is basically your own personal GitHub, emphasis on the personal.

This is not the only alternative to GitHub out there - [BitBucket](https://bitbucket.org/), from Atlassian, is (closed-source) SaaS that works like GitHub but incorporates into the entire Atlassian/Jira toolset, while [GitLab](https://about.gitlab.com/) is a more mature open-source version control hub for large teams that need to collaborate and coordinate.  You need to basically provision a server, and have everyone connect to it. That said, it's fully featured.

Gogs, on the other hand, is a single binary. That's it. You *could* run it as a server, hook it up to a PostGres database, and use it for collaboration, but at the most basic, it uses a SQLite DB (that it comes with) and just runs from a local port on your machine.  For me, this solves a very specific problem - I prefer to use Git/GitHub for version control, but my workplace uses Subversion.  This allows me to use the best of both worlds, using the Git branch-code-commit-rebase-push lifecycle, while keeping the master branch in sync with the SVN repository. Additionally, by keeping the repository itself on a network share, I've automatically backed up all my changes.  

In addition to helping younger developers, who learned on Git, incorporate the advantages of Git into their workflow, it might also be useful if you have one or two people learning to make the transition from Subversion on your team.

## [Franz](http://meetfranz.com/)

Collaboration services like [Slack](https://slack.com/) are awesome for organizing your team and your thoughts. The problem comes when you have more than one team and more than one set of thoughts.

I myself use Skype for chatting with friends on [Team Democracy](http://www.teamdemocracy.us/), use the MakerSquare Alumni Slack, talk regularly on [Reactiflux](http://www.reactiflux.com/), a [Discord](https://discordapp.com/) room dedicated to all things React and Flux, and Cycorp has BOTH Google Hangouts and Slack for collaboration.

Franz is a single application that can handle all this, at the same time, for me.  It's a single binary, so you can just run it, no admin access needed (for those of you developing from locked-down Linux machines) and it's super useful.

### While I'm on the subject...

While I'm on the subject, I'd like to also talk a little bit about something I've noticed... I'm reasonably sure that developer communities are going to be moving more and more to Slacks and Discords and GroupMes and HipChats, and other "super-chat" collaboration applications, when before you would log onto IRC and Freenode to get chat information.  By all means, these collaboration tools are WAY better - file uploads, pasting, code-highlighting, search, see who's active (and not just idling)... but we're starting to see more of a fragmentation, much like years ago when Usenet practically died out in favor of PHP-based bulletin boards, with the ability to block users for spamming or trolling or just general bad behavior.  

I'm not saying that this isn't a good change - but we lost something in the move from Usenet to small gated bulletin boards, and that was a central location for everything.  As a kid, I used to browse the list of alt forums looking for anything I found interesting, and got turned on to different ideas and concepts because of it.  I can probably find a forum -- or several -- on a topic I want, but I have to know what I'm searching for.  I'm hoping that things don't go the same way with Freenode - or at least, that the transition is handled a bit better.  

## [LocalTunnel](http://localtunnel.me/)

This is LOVELY.  Yes, you'll need Sudo access, but if you have a web service that you're testing on your local computer, and want to access it from elsewhere OR show people you're working with what you're working on, you can use localtunnel.me to create a local tunnel, and it will create a randomly generated domain name, [random string].localtunnel.me, that you can access directly.  Want to run OwnCloud on your local machine to access your music at work?  Sounds like a plan!  

## [Postman](https://www.getpostman.com/)

An absolute must-have for testing RESTful application interfaces, allowing you to create custom GET and POST requests to you endpoints.

## [Robomongo](https://robomongo.org/)

One of the reasons that I like MongoDB so much is because of Robomongo, which is a native Mongo management tool. It allows you to browse through your data quickly and easily.  I'd also make a shoutout to [Mongotron](http://mongotron.io/#/), which is a similar app based on Electron, but it's not quite there yet - I couldn't connect to my local Mongo instance with it.  

## [Nylas N1](https://invite.nylas.com/download/)

A free, fully-featured e-mail client that is just gorgeous.  The only reason I don't use it is the 7000+ unread e-mails in my mailbox - I think I'll let Google handle that for now.

## [LightTable](http://lighttable.com/)

I prefer Atom for working with Javascript, but my friend Josh turned me onto LightTable for working with Clojure. I have to admit that it's incredibly impressive for one key feature: Inline Evaluation.  You can get the value of variables inside your editor. While I'm not sure of the utility of this in object-oriented languages, for functional languages, this can save an awful lot of headaches.

I haven't used these, but they look COOL.

## [SuperPowers](http://superpowers-html5.com/index.en.html)

I'll admit, I haven't used this yet, but for indie games, SuperPowers seems like a good starting point.

## [MatterMost](https://www.mattermost.org/)

Let's say that you just don't want to pay for Slack or HipChat in your organization.  You won't need to with MatterMost, which is essentially a "roll your own" collaboration tool along those lines.
