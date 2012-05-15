//sprites for the scene

Crafty.scene("Village", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 285;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 1517;
	
	Crafty.load(["images/village.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/village.png");
		
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 130,
			y: 90
		});
		
		//Door to the Cantina scene
		cantinaDoor = Crafty.e("Door").makeDoor(1364, 94, 138, 211, function() {
		   Crafty.scene("Cantina");
		});
		
	});//end Crafty load
	
});//end scene