//UI constants
SELECTED = "";
PICK_UP = "Pick up ";
TALK_TO = "Talk to ";
WALK_TO = "Walk to ";

//things that need the DOM, images etc need to be inside onload
window.onload = function() {
	Crafty.init(1024, 500);
	
	//Pre-load images before setting the scene
	Crafty.load(["images/character-sprite.png", "images/item-sprite.png", "images/barman-sprite.png"], function() {
	
		//Sprites
		Crafty.sprite(147, 394, "images/character-sprite.png", {
			open: [0,0],
			closed: [1,0]
		});
		Crafty.sprite(292, 348, "images/bman.png", {
			bopen: [0,0],
			bclosed: [1,0]
		});
		Crafty.sprite("images/item-sprite.png", {
			full: [0,0, 201, 230],
			half: [202, 0, 100, 115],
			pocket: [302, 0, 49, 58]
		});
		
		//Global Entities
		
		Player = Crafty.e("2D, Canvas, open, SpriteAnimation, Persist, Tween, MoveTo")
			.animate("blink", 0, 0, 1)
			.bind("EnterFrame", function(e) {
				//blink every 50th - 60th frame
				if(e.frame % 50 > 0 && e.frame % 50 < 10) {
					this.sprite(1, 0, 1, 1);
				} else {
					this.sprite(0, 0, 1, 1);
				}
			})
			.attr({visible: false, z: 100});
		
		Inventory = Crafty.e("2D, Canvas, Persist")
			//use maths to center the menu
			.attr({y: 768 - 105, x: (1024 - 765) / 2, visible: false, inv: []});
			
		//Initialise buttons
		PickUp = $("#pickup").click(function() {
			$("#message").text("Pick up");
			SELECTED = PICK_UP;
		});
		
		TalkTo = $("#talkto").click(function() {
			$("#message").text("Talk to");
			SELECTED = TALK_TO;
		});
		
		WalkTo = $("#walkto").click(function() {
			$("#message").text("Walk to");
			SELECTED = WALK_TO;
		});
		
		Crafty.c("Dialogue", {
			init: function() {
				this.addComponent("2D, DOM, Text, Persist");
				this.attr({y: 100, x: 200, w: 400, h: 100, visible: false})
			},
			//can use the same name for function in a different component
			replaceText: function(txt) {
				this.text(txt);
				return this;
			},
			addText: function(txt) {
				this.text(this._text + txt);
				return this;
			}
		});
		
		DialogueBar = Crafty.e("Dialogue")
		
		//Load the first scene
		Crafty.scene("Village");
		
	});
};

Crafty.c("Door", {
	init: function() {
		this.addComponent("2D, DOM, Mouse, Persist");
		this.attr({w: 200, h: 400, x: 800, y: 50});
	},
	
	makeDoor: function(callback) {
		this.bind("Click", callback)
	}
});
		
		

//TODO next:
//* Better system for changing text on the menu bar (too easy?)
//* Add some basic dialogue interactions - how to sequence and animate conversations?
//* Split files! 1 for each scene, main file for the rest (global stuff like inventory, player, buttons (?)
//* Walk to mouse selection

//NOTEs:
//DOM is better for when less animation also better for mobile devices

//define walkable area in every scene
//keyboard shortcuts for actions

//move inventory to jQuery
//Fix dialogue!!!