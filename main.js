//UI constants
SELECTED = "";
PICK_UP = "Pick up ";
TALK_TO = "Talk to ";
WALK_TO = "Walk to ";
LOOK_AT = "Look at ";
OPEN = "Open ";
GIVE_TO = "Give ";

//no item is selected yet
var selectedGift = null;

window.onload = function() {
	
	Crafty.init(768, 304);
	
	Crafty.load(["images/character_sprite.png", "images/village.png"], function() {
	
		//player - global sprite
		Crafty.sprite(90, 210, "images/character_sprite.png", {
			open: [0,0],
			closed: [1,0],
			walk: [2,0],
			walk2: [3,0]
		});
		
		/*----- Global Entities -----*/
		
		Player = Crafty.e("2D, Canvas, closed, SpriteAnimation, Persist, WalkTo, Dialogue")
			.animate("blink", 0, 0, 1)
			.animate("walk", 2, 0, 5)
			.attr({visible: false, z: 100})
			.bind("SceneChange", function(e) {
				if ((e.newScene == "Gate") && (e.oldScene == "Intro")){
                    Player.attr({x: 55, y: 70});
				} else if ((e.newScene == "Village") && (e.oldScene == "Gate")){
                    Player.attr({x: 55, y: 90});
				} else if ((e.newScene == "Village") && (e.oldScene == "Office")){
                    Player.attr({x: 420, y: 78});
                } else if ((e.newScene == "Village") && (e.oldScene == "Cantina")) {
                    Player.attr({x: 1364, y: 94});
					Crafty.viewport.x = -750;
                } else if ((e.newScene == "Village") && (e.oldScene == "Temple")) {
                    Player.attr({x: 712, y: 90});
					Crafty.viewport.x = -500;
				} else if ((e.newScene == "Spaceport") && (e.oldScene == "Voyage")) {
                    Player.attr({x: 50, y: 70});
				} else if ((e.newScene == "Spaceport") && (e.oldScene == "Bathroom")) {
                    Player.attr({x: 797, y: 71});
					Crafty.viewport.x = -500;
				} else if ((e.newScene == "Spaceport") && (e.oldScene == "Carpark")) {
                    Player.attr({x: 1362, y: 75});
					Crafty.viewport.x = -750;
				} else if ((e.newScene == "Bathroom") && (e.oldScene == "Spaceport")) {
                    Player.attr({x: 50, y: 83});
				} else if ((e.newScene == "Carpark") && (e.oldScene == "Spaceport")) {
                    Player.attr({x: 125, y: 86});
                } else {
					Player.attr({x: 351, y: 75});
				};
            });
			
		//initialise inventory
		Inventory = Crafty.e("2D, Canvas, menu, Persist")
			.attr({visible: false, inv: []});

		//initialise UI item - need live because it might not exist when the page loads
		itemUI = $("#inventory ul li").live("click", function() {
			var id = $(this).index();
			//save the gift in a global var
			selectedGift = Inventory.inv[id];
			if (SELECTED == GIVE_TO) {
				$("#message").text(SELECTED + selectedGift.name + " to ");
			}
			console.log(selectedGift);
		});
		
		//initialise action buttons
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
			SELECTED = GIVE_TO;
		});
		
		//enable keyboard shortcuts
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
		
		//DIALOGUE COMPONENT
		//TO DO:
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
					//hide other UI items
					$("#buttons").css('display', 'none');
					$("#inventory").css('display', 'none');
					//$("#message").text("(click character to continue)");
				} //if there is no next (and not a choices array) end dialogue 
				else if(this.currentLine.length === undefined) {
					this.trigger("DialogueEnd");
					$("#message").text(SELECTED + this.name);
					$("#buttons").css('display', 'block');
					$("#inventory").css('display', 'block');
				}
			},
			
			fillChoices: function(choices) {
				var html = "";
				var self = this; //save the current context (value of 'this')
				
				$("#choices").show();
				
				//loop over choices array
				for(var i = 0; i < choices.length; ++i) {
					//generate HTML
					html += '<div class="choice">' + choices[i].txt + '</div>';
				}
				
				//update choices with new html
				$("#choices").html(html);
				$("#message").text("(select choice to continue)");
				
				//user clicked on a choice
				$("#choices .choice").click(function() {
					var idx = $(this).index(); //the index of the choice
					
					//set the current line to whatever the choice leads to
					//self.currentLine = choices[idx];
					//old - this works better but skips a line
					self.currentLine = self.parse(choices[idx].next);
					
					//trigger a change event to update the dialogue on screen
					self.trigger("DialogueChange");
					
					//remove that choice as an option - not working
					//$("#choices .choice'[idx]").css("display" , "none");
				});
			},
			
			/*resetDialogue: function() {
				
			}*/
		});
		
		//dialogue bar
		Crafty.c("DialogueBar", {
			init: function(x, y) {
				this.addComponent("2D, DOM, Text, Tween");
				//will need more dynamic values for x and y
				this.attr({x: x, y: 0, w: (Crafty.viewport.width / 3), h: 45, visible: false, alpha: 0.8});
				this.css({background: '#fff', padding: '8px', border: '2px solid #000'})
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
		
		//walking event
		Crafty.addEvent(this, Crafty.stage.elem, "click", function(e) {
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			
			if(SELECTED === WALK_TO) {
				Player.setTarget(pos.x, pos.y);
			}
		});
		
		//Crafty.audio.add("bgmusic", "audio/K_Desert_Wanderer_NO_VOCALS.mp3");
		//Crafty.audio.play("bgmusic", -1);
		
		//load the first scene
		Crafty.scene("Load");
		
	});//end Crafty load
	
};//end window load

Crafty.c("Door", {
    init: function() {
        this.addComponent("2D, DOM, Mouse");
		this.name = "";
    },

   makeDoor: function(x, y, w, h, callback) {
        this.bind("Click", function() {
            if(SELECTED == OPEN) {
                callback();
            }
        });
        this.bind("MouseOver", function() {
            //if(SELECTED == OPEN) ?
			$("#message").text(SELECTED + this.name);      
        });
		this.bind("MouseOut", function() {
            $("#message").text(SELECTED);      
        });
        this.attr({w: w, h: h, x: x, y: y});
    }
});