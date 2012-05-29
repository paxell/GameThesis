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

Crafty.scene("Cantina", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;
	
	//set player boundaries if needed
	Player.boundary.minY = 275;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 1001;
	
	Player.moving = false;

	Crafty.load(["images/cantina.png", "images/bman.png", "images/smuggler.png", "images/patron.png", "images/item-coins.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/cantina.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Cantina;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
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
				.bind("DialogueEnd", function() {
					coinAge.attr({visible: true});
				});
				
		//Smuggler character
		Smuggler = Crafty.e("Character, sopen")
				.Dialogue(sceneScript.Smuggler)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 70 > 0 && e.frame % 70 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				});
				
		//Drunk character
		Drunk = Crafty.e("Character, drunk")
				.Dialogue(sceneScript.Drunk);
		
		//initialise coins item
		coinAge = Crafty.e("Item, coins")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});	
			
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
			name: "Arrak"
		});
		
		Smuggler.attr({
			visible: true,
			x: 784,
			y: 30,
			accepts: "opal",
			name: "Voler"
		});
		
		Drunk.attr({
			visible: true,
			x: 335,
			y: 22,
			name: "Barxes"
		});
		
		coinAge.attr({
			name: "coins",
			x: 430,
			y: 138,
			to: "Seller"
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Village scene
		villageDoor = Crafty.e("Door")
			.attr({name: "village door"})
			.makeDoor(14, 44, 76, 118, function() {
				Crafty.scene("Village");
			});
		
	});//end load
	
});//end scene