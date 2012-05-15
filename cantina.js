//sprites for the scene
Crafty.sprite(116, 145, "images/bman.png", {
	bopen: [0,0],
	bclosed: [1,0]
});
Crafty.sprite(32, 32, "images/item-coins.png", {
	coins: [0,0],
});
Crafty.sprite(32, 32, "images/item-opal.png", {
	opal: [0,0],
});

Crafty.scene("Cantina", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 275;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 1001;

	Crafty.load(["images/cantina.png", "images/bman.png", "images/item-coins.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/cantina.png");
		
		//initialise dialogue entities
		DialogueBar.visible = true;		
		var sceneScript = DIALOGUE.Cantina;
		
		//Barman character
		Barman = Crafty.e("2D, Canvas, bopen, SpriteAnimation, Mouse, Dialogue")
				.Dialogue(sceneScript.Barman)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
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
						DialogueBar.css({background: '#fff', padding: '8px'})
						this.nextLine();
					}
				})
				//rest of dialogue - could this go in the component?
				.bind('KeyDown', function(e) {
					if(e.key == Crafty.keys['ENTER']) {
						this.nextLine();
					}
				})
				.bind("DialogueChange", function() {
					if(this.currentLine.length) {
						//only if there are choices
						this.fillChoices(this.currentLine);
					} else {
						DialogueBar.replaceText(this.currentLine.txt);
					}
				})
				.bind("DialogueEnd", function() {
					//get out of dialogue mode
					DialogueBar.attr({visible: false});
					$("#choices").hide();
					$("#buttons").css('display', 'block');
					$("#inventory").css('display', 'block');
				});
		
		//initialise coins item
		coinAge = Crafty.e("Item, coins")
			//.showItem(145, 458)
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			})
			.bind('Click', function(e) {
				this.giveItem(Barman, function() {
					console.log("Gave item");
				});
			});
			
			
		//initialise opal item
		opalAge = Crafty.e("Item, opal")
			.bind('Click', function(e) {
				this.pickupItem();
			})
			.bind('Click', function(e) {
				this.giveItem(Barman, function() {
					console.log("Gave item");
				});
			})
			
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 124,
			y: 80
		});
		
		Barman.attr({
			visible: true,
			x: 478,
			y: 12,
			//accepts: "coins"
		});
		
		coinAge.attr({
			visible: true,
			name: "coins"
		});
		
		opalAge.attr({
			visible: false,
			name: "opal"
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Village scene
		villageDoor = Crafty.e("Door").makeDoor(14, 44, 76, 118, function() {
		   Crafty.scene("Village");
		   
		});
		
	});//end load
	
});//end scene