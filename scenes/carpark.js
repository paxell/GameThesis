//sprites for the scene
Crafty.sprite(108, 185, "images/cabbie.png", {
	copen: [0,0],
	cclosed: [1,0]
});

Crafty.scene("Carpark", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 256;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 	796;
	
	Player.moving = false;

	Crafty.load(["images/carpark.png", "images/cabbie.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/carpark.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Carpark;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//Cabbie character
		Cabbie = Crafty.e("Character, copen")
				.Dialogue(sceneScript.Cabbie)
				.animate("mouth", 0, 0, 1)
				.animate("mouth", 100, -1)
				.bind('ItemGiven', function() {
					$("#buttons").css('display', 'none');
					$("#inventory").css('display', 'none');
					$("#message").css('display', 'none');
					Crafty.scene("Journey");
				});
			
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 83,
			y: 40
		});
		
		Cabbie.attr({
			visible: true,
			x: 276,
			y: 74,
			name: "Mos",
			accepts: "address"
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Spaceport scene
		villageDoor = Crafty.e("Door")
			.attr({name: "spaceport door"})
			.makeDoor(0, 0, 114, 237, function() {
			   Crafty.scene("Spaceport");   
			});
		
	});//end load
	
});//end scene