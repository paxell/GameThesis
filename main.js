//UI constants
SELECTED = "";
PICK_UP = "Pick up ";
TALK_TO = "Talk to ";
WALK_TO = "Walk to ";
LOOK_AT = "Look at ";
OPEN = "Open ";
GIVE = "Give ";

window.onload = function() {
	
	Crafty.init(768, 304);
	
	Crafty.load(["images/character-sprite.png", "images/village.png"], function() {
	
		//player - global sprite
		Crafty.sprite(68, 210, "images/character-sprite.png", {
			open: [0,0],
			closed: [1,0],
			//walk: [2,0]
		});
		
		/*----- Global Entities -----*/
		
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
			
		//initialise inventory	
		//Idea: use jQuery carousel for lots of items?
		Inventory = Crafty.e("2D, Canvas, menu, Persist")
			.attr({visible: false, inv: []});
			
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
			SELECTED = GIVE;
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
				//help text - can wrap a span around it to display this differently?
				//this.helpText = " (Press ENTER to continue or ESC to exit dialogue)";
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
					//displays help text in the message bar but disappears when choices appear
					//$("#message").text(SELECTED + this.name + this.helpText);
					$("#buttons").css('display', 'none');
					$("#inventory").css('display', 'none');
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
				
				//user clicked on a choice
				$("#choices .choice").click(function() {
					var idx = $(this).index(); //the index of the choice
					
					//set the current line to whatever the choice leads to
					self.currentLine = choices[idx];
					//self.currentLine = self.parse(choices[idx].next);
					
					//trigger a change event to update the dialogue on screen
					self.trigger("DialogueChange");
					
					//remove that choice as an option - not working
					$("#choices .choice'[idx]").css("display" , "none");
				});
			}
		});
		
		//dialogue bar
		Crafty.c("DialogueBar", {
			init: function(x, y) {
				this.addComponent("2D, DOM, Text");
				//will need more dynamic values for x and y
				this.attr({x: x, y: y, w: (Crafty.viewport.width / 3), h: 40, visible: false});
				this.css({background: '#fff', padding: '8px', opacity: 0.6, border: '2px solid #000'})
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
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar");
		
		//walking event
		Crafty.addEvent(this, Crafty.stage.elem, "click", function(e) {
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			
			if(SELECTED === WALK_TO) {
				Player.setTarget(pos.x, pos.y);
			}
		});
		
		//load the first scene
		Crafty.scene("Village");
		
	});//end Crafty load
	
};//end window load

Crafty.c("Door", {
    init: function() {
        this.addComponent("2D, DOM, Mouse"); 
    },

   makeDoor: function(x, y, w, h, callback) {
        this.bind("Click", function() {
            if(SELECTED == OPEN) {
                callback();
            }
        });
        this.bind("MouseOver", function() {
            //if(SELECTED == OPEN)
			$("#message").text(SELECTED + "door");      
        });
		this.bind("MouseOut", function() {
            $("#message").text(SELECTED);      
        });
        this.attr({w: w, h: h, x: x, y: y});
    }
	//add function for locked door
});