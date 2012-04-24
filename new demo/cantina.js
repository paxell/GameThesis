function Dialogue(script, start) {
	this.script = script;
	this.start = start || "Player:0";
	this.current = this.parse(this.start);
}

Dialogue.prototype = {
	parse: function(cmd) {
		var cmds = cmd.split(":");
		
		return this.script[cmds[0]][+cmds[1]];
	},
	
	next: function() {
		this.current = this.parse(this.current.next);
	}
};

//Start of the tavern scene
Crafty.scene("Cantina", function() {

	//add crafty.load for images/assets for this scene
	
	Crafty.e("2D, Canvas, Image").image("images/tavern.png");
	
	Inventory.visible = true;	
	DialogueBar.visible = true;
	
	var sceneScript = DIALOGUE.Cantina;
	
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
				$("#message").text(SELECTED + "barman");
			})
			.bind('MouseOut', function(e) {
				$("#message").text(SELECTED);
			})
			//first line of dialogue
			.bind('Click', function(e) {
				if (SELECTED == TALK_TO) {
					this.index = 0
					if(!this.dialogue)
						this.dialogue = new Dialogue(sceneScript.Barman, "Player:0");
					
					console.log(this.dialogue.current.txt);
					DialogueBar.replaceText(this.dialogue.current.txt);
					
					this.dialogue.next();
				}
			})
			//rest of dialogue
			.bind('KeyDown', function(e) {
				if(e.key == Crafty.keys['ENTER']) {
					DialogueBar.replaceText(this.dialogue.current.txt);
					
					this.dialogue.next();
				}
				if(this.index == 6) {
					Item.attr({visible:true});
				}
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