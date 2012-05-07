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
		y: 90
	});
	
	//Inventory.visible = true;
	
	//Set the player's walkable boundaries in every scene
	Player.boundary.minY = 285;
	Player.boundary.maxX = 1517;
	
	//Door to the Cantina scene
	cantinaDoor = Crafty.e("Door").makeDoor(1364, 94, 138, 211, function() {
	   Crafty.scene("Cantina");
	});
	
});