//UI constants
SELECTED = "";
PICK_UP = "Pick up ";
TALK_TO = "Talk to ";
WALK_TO = "Walk to ";
LOOK_AT = "Look at ";
OPEN = "Open ";
GIVE = "Give ";

//things that need the DOM, images etc need to be inside onload
window.onload = function() {
	Crafty.init(1024, 500);
	
	//Pre-load images before setting the scene
	Crafty.load(["images/character-sprite.png", "images/item-sprite.png", "images/barman-sprite.png"], function() {
	
		//Sprites
		Crafty.sprite(147, 394, "images/character-sprite-w.png", {
			open: [0,0],
			closed: [1,0],
			walk: [2,0]
		});
		Crafty.sprite(292, 348, "images/bman.png", {
			bopen: [0,0],
			bclosed: [1,0]
		});
		Crafty.sprite(181, 439, "images/priest.png", {
			popen: [0,0],
			pclosed: [1,0]
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
		
		/*WalkTo = $("#walkto").click(function() {
			$("#message").text("Walk to");
			SELECTED = WALK_TO;
		});*/
		
		//example using keyboard shortcut (jquery hotkeys) - can it bind on both events?
		WalkTo = $(document).bind('keydown', 'w', function() {
			$("#message").text("Walk to");
			SELECTED = WALK_TO;
		});
		
		LookAt = $("#lookat").click(function() {
			$("#message").text("Look at");
			SELECTED = LOOK_AT;
		});
		
		WalkTo = $("#open").click(function() {
			$("#message").text("Open");
			SELECTED = OPEN;
		});
		
		Give = $("#give").click(function() {
			$("#message").text("Give");
			SELECTED = GIVE;
		});
		
		//DIALOGUE COMPONENT
		//TO DO:
		//* choices need to disappear once chosen
		//* DialogueEnd needs to work
		
		Crafty.c("Dialogue", {
			Dialogue: function(script, start) {
				this.script  	 = script;
				//default start point
				this.start	 	 = start || "Player:0";
				this.currentLine = this.parse(this.start);
				
				return this;
			},
			
			//changes data format into something usable
			parse: function(cmd) {
				
				var cmds = cmd.split(":");
				var result = this.script[cmds[0]][+cmds[1]];
				
				return result;
			},
			
			nextLine: function() {
				//if there is a next line specified, goto it
				if(this.currentLine.next) {
					this.currentLine = this.parse(this.currentLine.next);
					
					//trigger the change event
					this.trigger("DialogueChange");
				} //if there is no next (and not a choices array) end dialogue 
				else if(this.currentLine.length === undefined) {
					this.trigger("DialogueEnd");
				}
			},
			
			fillChoices: function(choices) {
				var html = "";
				var self = this; //save the current context (value of `this`)
				
				//show choices box
				$("#choices").show();
				
				//loop over choices array
				for(var i = 0; i < choices.length; ++i) {
					//generate HTML
					html += '<div class="choice">' + choices[i].txt + '</div>';
				}
				
				//update choices with new html
				$("#choices").html(html);
				$("#buttons").css('display', 'none');
				
				//user clicked on a choice
				$("#choices .choice").click(function() {
					var idx = $(this).index(); //the index of the choice
					
					//set the current line to whatever the choice leads to
					self.currentLine = choices[idx];
					//self.currentLine = self.parse(choices[idx].next);
					
					//trigger a change event to update the dialogue on screen
					self.trigger("DialogueChange");
				});
			}
		});
		
		
		//also animate when it appears?
		Crafty.c("DialogueBar", {
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
		
		DialogueBar = Crafty.e("DialogueBar");
		
		Crafty.addEvent(this, Crafty.stage.elem, "click", function(e) {
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			
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
		//debug component just adds css property of a red border for now for debugging
        this.addComponent("2D, DOM, Mouse, Debug"); 
    },

   makeDoor: function(x, y, w, h, callback) {
        this.bind("Click", function() {
            if(SELECTED == OPEN) {
                callback();
            }
        });
        this.bind("MouseOver", function() {
            if(SELECTED == OPEN)
                $("#message").text("Open door");      
        });
        this.attr({w: w, h: h, x: x, y: y});
    }
});

//Note: character keeps moving even if gone to the next scene	
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
		
		//because floating point numbers are innacurate
		var EP = this.speed,
			didMove = false;
		
		if(this._x - this.target.x > EP) {
			this.x -= this.speed;
			didMove = true;
			this._flipX = true;
			
			//make sure walking destination is within the boundary
			if(-Crafty.viewport.x > this.boundary.minX) 
				Crafty.viewport.x += this.speed;	
		} 
		
		//if player is to the left of the target, move it to
		if(this._x - this.target.x < -EP) {
			this.x += this.speed;
			didMove = true;
			
			this._flipX = false;
			
			if(-Crafty.viewport.x + Crafty.viewport.width < this.boundary.maxX) 
				Crafty.viewport.x -= this.speed;
				
		} 
		if(this._y - this.target.y > EP) {
			this.y -= this.speed;
			didMove = true;
			
		}
		if(this._y - this.target.y < -EP) {
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
		
		//Player.animate("walk", 2, 3);
	},
	
	checkBoundary: function() {
		//was w / 2 but then the character can go halfway off the screen
		this.target.x = Math.min(this.target.x, this.boundary.maxX - this.w);
		this.target.x = Math.max(this.target.x, this.boundary.minX - this.w);
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
//DOM is better for when less animation also better for mobile devices.