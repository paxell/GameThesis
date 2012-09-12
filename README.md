Game Thesis: Another World
================================

This repo will contain the source code, assets and supporting files for my thesis game, working title: "Another World". 

The game is in the style of a point-and-click adventure and aims to address some myths and stereotypes about refugees through its narrative about a boy who has to leave his homeworld. More about the story can be found on my blog: http://gamethesis.tumblr.com/

The game utilises the Javascript game framework Crafty (https://github.com/craftyjs/Crafty).

The latest game prototype can be found here: http://epaxman.com/anotherworld/

Framework
-----------

The Framework consists of a few main components:

* WalkTo for player movement, including scrolling the viewport with the character's movement and animating the character walking.
* Dialogue for interacting with other characters, parsing the dialogue from a JSON file.
* Doors for moving between some scenes.
* Item for picking up, looking at and and giving items.
* Character with bindings to dialogue and receiving items.

BugWorld
------------

A progress demo of the game (warts and all) will be found here: http://epaxman.com/bugworld/ (note currently inactive)