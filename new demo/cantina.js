Crafty.c("Dialogue", {
	Dialogue: function(script, start) {
		this.script  	 = script;
		this.start	 	 = start || "Player:0";
		this.currentLine = this.parse(this.start);
		
		return this;
	},
	
	//changes data format into something usable
	parse: function(cmd) {
		
		var cmds = cmd.split(":");
		var result = this.script[cmds[0]][+cmds[1]];
		
		return result;
		//needs if statement? for if another array is returned: eg choices
		//display choices as clickable link times like controls
		//controls disappear if within choices?
		//also needs to look for something that stops the conversation. (elseif?)
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
		
		//user clicked on a choice
		$("#choices .choice").click(function() {
			var idx = $(this).index(); //the index of the choice
			
			//set the current line to whatever the choice leads to
			self.currentLine = self.parse(choices[idx].next);
			
			//trigger a change event to update the dialogue on screen
			self.trigger("DialogueChange");
		});
	}
});

//Start of the tavern scene
Crafty.scene("Cantina", function() {

	//add crafty.load for images/assets for this scene
	
	Crafty.e("2D, Canvas, Image").image("images/tavern.png");
	
	Inventory.visible = true;	
	DialogueBar.visible = true;
	
	var sceneScript = DIALOGUE.Cantina;
	
	Barman = Crafty.e("2D, Canvas, bopen, SpriteAnimation, Mouse, Dialogue")
			.Dialogue(sceneScript.Barman)
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
				$("#message").text(SELECTED + "barman");
			})
			.bind('MouseOut', function(e) {
				$("#message").text(SELECTED);
			})
			//first line of dialogue
			.bind('Click', function(e) {
				if (SELECTED == TALK_TO) {
					this.nextLine();
				}
			})
			//rest of dialogue
			.bind('KeyDown', function(e) {
				if(e.key == Crafty.keys['ENTER']) {
					this.nextLine();
				}
			})
			.bind("DialogueChange", function() {
				if(this.currentLine.length) {
					this.fillChoices(this.currentLine);
				} else {
					DialogueBar.replaceText(this.currentLine.txt);
				}
			})
			.bind("DialogueEnd", function() {
				//DIALOGUE IS OVER!
				console.log("THANKS FOR THE CHAT");
			});
	
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
	
	//using DOM for now, there's a bug with Canvas
	//move this to the main file!
	Item = Crafty.e("2D, DOM, item, half, Mouse").attr({
			visible:false,
			y: 274, 
			x: 364
		})
		.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + "item");
		})
		.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		})
		.bind('Click', function(e) {
			if (SELECTED == TALK_TO) {
				this.attr({
					x: 450,
					y: 700
				});
			};
			this.removeComponent("half");
			this.addComponent("pocket");
			//adds a reference to this item to the inventory array
			Inventory.inv.push(this);
		});
});