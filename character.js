//CHARACTER COMPONENT
Crafty.c("Character", {
	
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Mouse, Dialogue");
        this.attr({visible: false});
        this.name = "";
		this.bind('MouseOver', function(e) {
			if (SELECTED == GIVE_TO) {
				var currentText = $("#message").text();
				$("#message").text(currentText + this.name);
			} else {
				$("#message").text(SELECTED + this.name);
			};
		});
		this.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		});
		this.bind('Click', function(e) {
			var self = this;
            if (SELECTED == GIVE_TO) {
				if (selectedGift.name == this.accepts) {
					selectedGift.giveItem(this);
					console.log("Gave item");
				} else {
					DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
					DialogueBar.replaceText("I don't think so");
					DialogueBar.tween({alpha: 0.0}, 80);
				};
			//note now all characters have to talk.
			} else if (SELECTED == TALK_TO) {
				DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0});
				//bug: skips the first line
				this.nextLine();
			};
        });
		this.bind("DialogueChange", function() {
			//check who's speaking to change the position of the dialogue bar
			//var speaker = this.currentLine.?
		
			if(this.currentLine.length) {
				//only if there are choices
				this.fillChoices(this.currentLine);
			} else {
				DialogueBar.replaceText(this.currentLine.txt);
				//DialogueBar.attr({x: Speaker.x});
			}
			/*this.bind('KeyDown', function(e) {
				if(e.key == Crafty.keys['ENTER']) {
					this.nextLine();
				} else if(e.key == Crafty.keys['ESC']) {
					this.DialogueEnd();
				};
			});*/
		});
		var self = this;
		this.bind("DialogueEnd", function() {
			//get out of dialogue mode
			DialogueBar.tween({alpha: 0.0}, 80);
			$("#choices").hide();
			$("#buttons").css('display', 'block');
			$("#inventory").css('display', 'block');
			//this.unbind("DialogueChange");
			//this.unbind("Click");
			//try to reset dialogue
			this.start = "Player:0";
		});
    }, 
});