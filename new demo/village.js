Crafty.scene("Village", function() {

	//reset the selection (?)
	SELECTED = "";
	
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//add crafty.load for images/assets for this scene
	
	var bg = Crafty.e("2D, Canvas, Image").image("images/village.png");
	
	Player.attr({
		visible: true,
		x: 130,
		y: 100
	});
	
	//Set the player's walkable boundaries in every scene
	Player.boundary.minY = 400;
	Player.boundary.maxX = 1600;
	
	//Door to the Cantina scene
	cantinaDoor = Crafty.e("Door").makeDoor(1547, 118, 114, 339, function() {
	   Crafty.scene("Cantina");
	});
	
	//Door to the Temple scene
	templeDoor = Crafty.e("Door").makeDoor(977, 83, 193, 261, function() {
	   Crafty.scene("Temple");
	});
	
});