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
	Crafty.init(768, 304);
	
	Crafty.load(["images/character-sprite.png", "images/village.png"], function() {
	
		//Sprites
		Crafty.sprite(68, 210, "images/character-sprite.png", {
			open: [0,0],
			closed: [1,0],
			//walk: [2,0]
		});
		Crafty.sprite(116, 145, "images/bman.png", {
			bopen: [0,0],
			bclosed: [1,0]
		});
		Crafty.sprite(32, 32, "images/item-coins.png", {
			coins: [0,0],
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
		
		Inventory = $("#inventory")
			.attr({inv: []});
			
		//Initialise action buttons
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
		})
		
		LookAt = $("#lookat").click(function() {
			$("#message").text("Look at");
			SELECTED = LOOK_AT;
		});
		
		Open = $("#open").click(function() {
			$("#message").text("Open");
			SELECTED = OPEN;
		});
		
		Give = $("#give").click(function() {
			$("#message").text("Give");
			SELECTED = GIVE;
		});
		
		//Enable keyboard shortcuts
		$(document).keydown(function(e) {
			switch(e.keyCode) {
				case 80: //P
					$("#pickup").trigger("click");
					break;
				case 84: //T
					$("#talkto").trigger("click");
					break;
				case 87: //W
					$("#walkto").trigger("click");
					break;
				case 76: //L
					$("#lookat").trigger("click");
					break;
				case 79: //O
					$("#open").trigger("click");
					break;
				case 71: //G
					$("#give").trigger("click");
					break;
			}
		});
		
		//DIALOGUE COMPONENT TO DO:
		//* choices need to disappear once chosen
		
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
				$("#inventory").css('display', 'none');
				
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
		
		Crafty.c("DialogueBar", {
			init: function() {
				this.addComponent("2D, DOM, Text, Persist");
				this.attr({y: 274, x: 0, w: 768, h: 14, visible: false});
			},
			replaceText: function(txt) {
				this.text(txt);
				return this;
			},
			addText: function(txt) {
				this.text(this._text + txt);
				return this;
			}
		});
		
		/*Crafty.c("HelpText", {
			init: function() {
				this.addComponent("2D, DOM, Text, Persist");
				this.attr({y: 274, x: 700, w: 68, h: 14, visible: false});
				this.text("[Press Enter to Continue]");
			},
			replaceText: function(txt) {
				this.text(txt);
				return this;
			},
			addText: function(txt) {
				this.text(this._text + txt);
				return this;
			}
		});
		
		HelpText = Crafty.e("HelpText");*/
		DialogueBar = Crafty.e("DialogueBar");
		
		//Walking event
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
		this.bind("MouseOut", function() {
            $("#message").text(SELECTED);      
        });
        this.attr({w: w, h: h, x: x, y: y});
    }
});

Crafty.c("Item", {
    init: function() {
        this.addComponent("2D, DOM, Mouse, Persist");
        this.attr({visible: false});
        //this.name = ""; //give me a name!
    },
    
    showItem: function(x, y) {
        this.attr({x: x, y: y, visible:true});
    },
	
	pickupItem: function() {
        if(SELECTED == PICK_UP) {
            //save the position/index in the inv array
            this.pos = Inventory.inv.push(this) - 1;
			//also needs to visually show in the inventory
			this.attr({visible:false});
		}
    },
    
    /*lookatItem: function() {
        if (SELECTED == LOOK_AT)
        find the corresponding description from the JSON file and show it in the message bar
    },*/
    
    //@param to - The character entity who you are giving an item to
    giveItem: function(to, callback) {
        if (SELECTED == GIVE) {
            //this will be custom depending on what the item does
            //to.accepts is the name of the item he accepts
            if (to.accepts == THISITEM) {        
                callback();
                //remove from the position
                Inventory.inv.splice(this.pos, 1);
            }
            else {
                DialogueBar.replaceText("I don't think so");
			}
		}
    }
    
});

/*Idea: use jQuery carousel for lots of items
Inventory = Crafty.e("2D, Canvas, menu, Persist")
		.attr({visible: false, inv: []});*/

//Note: character keeps moving even if gone to the next scene	
Crafty.c("WalkTo", {
	init: function() {
		this.speed = 4;
		this.target = {x: 0, y: 0};
		this.moving = false;
		this.boundary = {
			minX: 0,
			//do these work? in which case can remove maxx and maxy from scenes
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
		
		//if player is to the left of the target, move it to the right
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
		
		//Needs walking sprite
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