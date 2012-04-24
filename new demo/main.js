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
		
		Player = Crafty.e("2D, Canvas, open, SpriteAnimation, Persist, WalkTo")
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
		
		DialogueBar = Crafty.e("Dialogue");
		
		Crafty.addEvent(this, Crafty.stage.elem, "click", function(e) {
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			console.log(pos);
			
			if(SELECTED === WALK_TO) {
				Player.setTarget(pos.x, pos.y);
			}
		});
		
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
		
Crafty.c("WalkTo", {
	init: function() {
		this.speed = 4;
		this.target = {x: 0, y: 0};
		this.moving = false;
		this.boundary = {
			minX: 0,
			maxX: Crafty.viewport.width,
			minY: 0,
			maxY: Crafty.viewport.height
		};
		
		this.bind("EnterFrame", this._enterframe);
	},
	
	_enterframe: function() {
		if(!this.moving) return;
		
		var EP = this.speed,
			didMove = false;
		
		if(this._x - this.target.x > EP) {
			//console.log("MOVE LEFT", this._x - this.target.x);
			this.x -= this.speed;
			didMove = true;
			this._flipX = true;
			
			//make sure walking destination is within the boundary
			if(-Crafty.viewport.x > this.boundary.minX) 
				Crafty.viewport.x += this.speed;
				
		} else if(this._x - this.target.x < -EP) {
			//console.log("MOVE RIGHT", this._x - this.target.x);
			this.x += this.speed;
			didMove = true;
			this._flipX = false;
			
			if(-Crafty.viewport.x + Crafty.viewport.width < this.boundary.maxX) 
				Crafty.viewport.x -= this.speed;
				
		} else if(this._y - this.target.y > EP) {
			//console.log("MOVE UP", this._y - this.target.y);
			this.y -= this.speed;
			didMove = true;
			
		} else if(this._y - this.target.y < -EP) {
			//console.log("MOVE DOWN", this._y - this.target.y);
			this.y += this.speed;
			didMove = true;
		}
		
		if(!didMove) this.moving = false;
	},
	
	setTarget: function(x, y) {
		this.moving = true;
		//set midpoint of player
		this.target.x = x - this.w / 2;
		this.target.y = y - this.h;
		
		//keep target in boundary
		this.checkBoundary();
	},
	
	checkBoundary: function() {
		this.target.x = Math.min(this.target.x, this.boundary.maxX - this.w / 2);
		this.target.x = Math.max(this.target.x, this.boundary.minX - this.w / 2);
		this.target.y = Math.min(this.target.y, this.boundary.maxY - this.h);
		this.target.y = Math.max(this.target.y, this.boundary.minY - this.h);
	},
	
	stopMoving: function() {
		this.moving = false;
	}
});		

//TODO next:
//* keyboard shortcuts for actions
//* move inventory to jQuery. items defined in each scene, becomes global when added to inventory
//* Better system for dialogue incl. choices
//* Make doors have x, y, width and height as values

//NOTEs:
//DOM is better for when less animation also better for mobile devices