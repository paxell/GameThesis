//sprites for the scene
Crafty.sprite(116, 145, "images/bman.png", {
	bopen: [0,0],
	bclosed: [1,0]
});
Crafty.sprite(151, 270, "images/smuggler.png", {
	sopen: [0,0],
	sclosed: [1,0]
});
Crafty.sprite(70, 179, "images/patron.png", {
	drunk: [0,0]
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

	Crafty.load(["images/cantina.png", "images/bman.png", "images/smuggler.png", "images/patron.png", "images/item-coins.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/cantina.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Cantina;
		
		//Barman character
		Barman = Crafty.e("Character, bopen")
				.Dialogue(sceneScript.Barman)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				//first line of dialogue
				.bind('Click', function(e) {
					if (SELECTED == TALK_TO) {
						DialogueBar.attr({x: Player.x, y: 0, visible:true});
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
				
		//Smuggler character
		Smuggler = Crafty.e("Character, sopen")
				//.Dialogue(sceneScript.Smuggler)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 70 > 0 && e.frame % 70 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				});
				
		//Drunk character
		Drunk = Crafty.e("Character, drunk");
				//.Dialogue(sceneScript.Drunk)
		
		/*
		//initialise coins item
		coinAge = Crafty.e("Item, coins")
			//.showItem(145, 458)
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});
			/*.giveItem(Barman, function() {
				console.log("Gave item");
			});		
			
		//initialise opal item
		opalAge = Crafty.e("Item, opal")
			.bind('Click', function(e) {
				this.pickupItem();
			});
		*/
			
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
			name: "Arrak"
		});
		
		Smuggler.attr({
			visible: true,
			x: 784,
			y: 30,
			//accepts: "opal"
			name: "Voler"
		});
		
		Drunk.attr({
			visible: true,
			x: 335,
			y: 22,
			name: "Barxes"
		});
		
		/*coinAge.attr({
			name: "coins",
			visible:true,
			//to: "Barman"
		});
		
		opalAge.attr({
			name: "opal"
		});*/
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Village scene
		villageDoor = Crafty.e("Door").makeDoor(14, 44, 76, 118, function() {
		   Crafty.scene("Village");
		   
		});
		
	});//end load
	
});//end scene