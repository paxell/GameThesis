//sprites for the scene
Crafty.sprite(90, 235, "images/priestess.png", {
	popen: [0,0],
	pclosed: [1,0]
});
Crafty.sprite(116, 88, "images/worshipper.png", {
	bow: [0,0],
	nobow: [1,0]
});
Crafty.sprite(32, 32, "images/item-opal.png", {
	opal: [0,0],
});

Crafty.scene("Temple", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 250;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 	1039;
	
	Player.moving = false;

	Crafty.load(["images/temple.png", "images/priestess.png", "images/worshipper.png", "images/item-opal.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/temple.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Temple;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//Worshipper character
		Worshipper = Crafty.e("Character, bow")
				.Dialogue(sceneScript.Worshipper)
				.animate("bow", 0, 0, 1)
				.animate("bow", 300, -1)
		
		//Priestess character
		Priestess = Crafty.e("Character, popen")
				.Dialogue(sceneScript.Priestess)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				.bind("DialogueEnd", function() {
					opalAge.attr({visible: true});
				});
		
		//initialise opal item
		opalAge = Crafty.e("Item, opal")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});
			
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 83,
			y: 40
		});
		
		Priestess.attr({
			visible: true,
			x: 791,
			y: 64,
			name: "Luna"
		});
		
		Worshipper.attr({
			visible: true,
			x: 265,
			y: 140,
			name: "Selise"
		});
		
		opalAge.attr({
			name: "opal",
			x: 939,
			y: 202,
			to: "Smuggler"
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Village scene
		villageDoor = Crafty.e("Door")
			.attr({name: "village door"})
			.makeDoor(27, 61, 89, 178, function() {
			   Crafty.scene("Village");   
			});
		
	});//end load
	
});//end scene