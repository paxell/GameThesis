window.onload = function() {
	Crafty.init(1024, 580);
	
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
		//Crafty.sprite(765, 105, "images/menu.png", {
			//menu: [0,0]
		//});
		
		//Global Entities
		
		Player = Crafty.e("2D, Canvas, open, SpriteAnimation, Persist, Tween")
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					//blink every 50th - 60th frame
					if(e.frame % 50 > 0 && e.frame % 50 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				.attr({visible: false});
		
		//Inventory = Crafty.e("2D, Canvas, Persist")
			//use maths to center the menu
			//.attr({y: 768 - 105, x: (1024 - 765) / 2, visible: false, inv: []});
		
		Crafty.c("Button", {
			//make a component for the buttons
			init: function() {
				//text has to be DOM :(
				this.addComponent("2D, DOM, Text, Persist, Mouse");
			},

			Button: function(x, y, text, callback) {
				this.attr({x: x, y: y, w: 120, h: 30, visible: false});
				this.text(text);
				this.bind("Click", callback);
				
				return this;
			}
		});
			
		//Initialise buttons
		PickUp = Crafty.e("Button").Button(0, 550, "Pick Up", function() {
			MessageBar.replaceText("Pick up")
		});
		TalkTo = Crafty.e("Button").Button(100, 550, "Talk to", function() {
			MessageBar.replaceText("Talk to")
		});
		WalkTo = Crafty.e("Button").Button(200, 550, "Walk to", function() {
			MessageBar.replaceText("Walk to");
			//Player walking tween
			Player.tween({x: 800}, 200).bind("TweenEnd", function() {
				//what to do when tween is finished -  performance
				this.unbind("EnterFrame", scroll);
			//Scroll the background
			}).bind("EnterFrame", function scroll() {
				Crafty.background("url('images/village.png') no-repeat -" + (this.x - 130) + "px top");
			});
		});
		
		Crafty.c("Message", {
			//make a component of the message so that it can have its own functions
			init: function() {
				this.addComponent("2D, DOM, Text, Persist");
				this.attr({y: 515, x: 0, w: 400, h: 100, visible: false})
				this.text("Do something");
			},
			
			addText: function(txt) {
				this.text("Pick up " + txt);
				return this;
			},
			
			replaceText: function(txt) {
				this.text(txt);
				return this;
			}
		});
		MessageBar = Crafty.e("Message")
		
		Crafty.c("Dialogue", {
			init: function() {
				this.addComponent("2D, DOM, Text, Persist");
				this.attr({y: 100, x: 200, w: 400, h: 100, visible: false})
			},
			
			//can use the same name for function in a different component
			replaceText: function(txt) {
				this.text(txt);
				return this;
			}
		});
		DialogueBar = Crafty.e("Dialogue")
		
		Crafty.c("Door", {
			init: function() {
				this.addComponent("2D, DOM, Mouse, Persist");
				this.attr({w: 200, h: 400, x: 800, y: 50});
			},
			
			makeDoor: function(callback) {
				this.bind("Click", callback)
			}
		});
		
		//Load the first scene
		Crafty.scene("Village");
		
	});
	
	//Setting the scene: a new scene deletes everything 2D except 'Persist'ant objects
	Crafty.scene("Village", function() {
		
		Crafty.background("url('images/village.png') no-repeat");
		
		//Inventory.attr({
			//visible: true
		//});
		
		Crafty("Button").each(function() {
			this.attr("visible", true);
		});
		
		Crafty("Message").each(function() {
			this.attr("visible", true);
		});
		
		Crafty("Dialogue").each(function() {
			this.attr("visible", true);
		});
		
		Player.attr({
			visible: true,
			x: 130,
			y: 100
		});
		
		barDoor = Crafty.e("Door")
				.makeDoor(function() {
					Crafty.scene("Cantina");
				})
		
	});
	
	//Start of the tavern scene
	Crafty.scene("Cantina", function() {
		
		Crafty.background("url('images/bg.png') no-repeat top left");
		
		//Inventory.attr({
			//visible: true
		//});
		
		Crafty("Button").each(function() {
			this.attr("visible", true);
		});
		
		Crafty("Message").each(function() {
			this.attr("visible", true);
		});
		
		Crafty("Dialogue").each(function() {
			this.attr("visible", true);
		});
		
		Barman = Crafty.e("2D, Canvas, bopen, SpriteAnimation, Mouse")
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					//blink every 50th - 60th frame
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				.attr({visible: false})
				.bind('MouseOver', function(e) {
					MessageBar.replaceText("Talk to Barman");
				})
				.bind('MouseOut', function(e) {
					MessageBar.replaceText("Pick up");
				})
				//first line of dialogue
				.bind('Click', function(e) {
					this.index = 0
					DialogueBar.replaceText(dialogue.CantinaConvo[this.index++]);
				})
				//rest of dialogue
				.bind('KeyDown', function(e) {
					if(e.key == Crafty.keys['ENTER']) {
						DialogueBar.replaceText(dialogue.CantinaConvo[this.index++]);
					}
				})
		
		Player.attr({
			visible: true,
			x: 124,
			y: 120
		});
		
		Barman.attr({
			visible: true,
			x: 610,
			y: 180
		});
		
		villageDoor = Crafty.e("Door")
				.makeDoor(function() {
					Crafty.scene("Village");
				})
		
		//using DOM for now, there's a bug with Canvas
		Item = Crafty.e("2D, DOM, item, half, Mouse").attr({
				visible:true,
				y: 274, 
				x: 364
			})
			.bind('MouseOver', function(e) {
				MessageBar.addText("Item");
			})
			.bind('MouseOut', function(e) {
				MessageBar.replaceText("Pick up");
			})
			.bind('Click', function(e) {
				this.attr({
					x: 700,
					y: 700
				});
				this.removeComponent("half");
				this.addComponent("pocket");
				MessageBar.replaceText("Picked up item");
				//adds a reference to this item to the inventory array
				//Inventory.inv.push(this);
			});
		});
	
};

//TODO next:
//* Better system for changing text on the menu bar (too easy?)
//* Add some basic dialogue interactions - how to sequence and animate conversations?
//* Split files! 1 for each scene, main file for the rest (global stuff like inventory, player, buttons (?)
//* Walk to mouse selection

//NOTEs:
//DOM is better for when less animation also better for mobile devices