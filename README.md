An intinerary for a trip to SPA Land.

1) create the initial boilerplate and build system

browserify / webpack / system.js / custom

Most important thing is that the debug and release code can be generated with a single command.
It is preferred that the debug code self updates with each modification.
Bonus points if live reload can be setup, so the browser reloads the contents when a file is saved.

2) select the framework or templating system

jquery/underscore/lodash templates
react / angular / mithrill / riotjs
virtualdom
custom

3) select a css preprocessor
less / sass / stylus

4) Tie everything together

Started creating events w/o much structure
Realized it was getting messy
Came up with some rules for naming events, listening and triggering.

lodash custom is worth it.


Pub/Sub Guidelines:

Event names follow the pattern: namespace:module:action:event.

E.g., for a persist event:

store:post:did:persist
store:post:failed:persist

Stores only emit or handle own events.

A good reason to add a prefix to your tags: it is easier to locate them with grep or ack, easy to identify them as part of your app
Riot tags: mounted in other nodes not node name, use css classes equal to the new node name.

5) Setup a data model: Firebase

6) Setup a very simple test harness and plan the data API

7) Setup the frontend, SPA routes, tie handlers to your object API

8) Finish styling and retouching
