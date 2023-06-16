---
title: Moving Off Heroku
date: 9/6/2022
description: Heroku isn't free anymore, how else can I deploy my React/Node app?
tag: web development, heroku, express, docker, node, react
author: You
---

import Image from 'next/image'

# Heroku isn't free anymore, how else can I deploy my React/Node app? :(

I originally posted this on [Medium ↗ ](https://medium.com/@aaronnnnn/heroku-isnt-free-anymore-how-else-can-i-deploy-my-react-node-app-b6ba3afb67ba) where it receieved one 'clap' lol.....
<Image
  src="/images/heroku3.jpeg"
  alt="Photo"
  width={273}
  height={123}
  priority
  className="next-image"
/>

---

## _Important Information About Heroku Free Products_

Yes, Heroku is not free anymore.. I sadly had a bunch of random stuff hosted on Heroku. Most of my stuff is comprised of a front end build of some kind (often React) and an Express server all deployed to a single Heroku Dyno.

I generally configure Express to serve the static front end build AND handle server requests. I think this is a pretty common pattern and have seen it referenced all over the internet. One of my favorite articles describing this pattern is here:

[Deploy React and Express to Heroku ↗ ](https://daveceddia.com/deploy-react-express-app-heroku/)

Another excellent article showing how you might do this with a Flask app and React front end is here:
[How to Deploy a React + Flask Project ↗ ](https://blog.miguelgrinberg.com/post/how-to-deploy-a-react--flask-project)

This pattern is great for Heroku but doesn't really translate well to other hosting services.. for an Express app we are depending on a script called heroku-postbuild. In the Flask example we are depending on the usage of some Heroku only tech called the Procfile.

How do we migrate these apps to a different, free service as painlessly as possible?

I feel the easiest thing to do is to create a Docker image for your app and deploy your container. You can capture that same magic of the heroku-postbuild script with a Docker multi-stage build!

There are a ton of excellent resources out there on how to get the most out of Docker, this article is just enough to get you off Heroku with minimal thinking.

Below is an example Express app configured to serve a static Create React App build while also handling API requests. This project is set up to deploy to Heroku via heroku-postbuild OR could be deployed as a docker container.

[motherbrainn/deploy-react-docker ↗ ](https://github.com/motherbrainn/deploy-react-docker)

To review, the way this works on Heroku is:
<Image
  src="/images/heroku1.jpeg"
  alt="Photo"
  width={1002}
  height={152}
  priority
  className="next-image"
/>

`start` will install the server then start up the Express app

`heroku-postbuild` will install the client and run the build command

If we check out the Dockerfile we'll see how this can be achieved with a container:
<Image
  src="/images/heroku2.jpeg"
  alt="Photo"
  width={828}
  height={602}
  priority
  className="next-image"
/>

To break down what is happening in this multi-stage build:

- Install the client and create the build. This is the equivalent of heroku-postbuild.
- Set the NODE_ENV to production (this does not come free anymore like it did on Heroku).
- Copy over the build folder ONLY for the second stage of our build. This saves space in our container and is actually better than the old Heroku style that keeps the entire client folder hanging around.
- Copy the server files and install server.
- Start up the Express server!

That's it… you can test this out with the demo project by deploying it to Heroku, then turn around and deploy it again anywhere that supports docker images!

This opens up a bunch of free or very cheap hosting options, here are a few:

- DigitalOcean

- Azure

- AWS

**BONUS:** if you want to test the container in this example locally, this could save you a google search:
Create image: `docker build -f Dockerfile -t <tag_name> .`
Run image: `docker run -p 4000:4000 -d <image_id>`

_Special thanks to Heroku for all the years of free stuff_ ❤️
