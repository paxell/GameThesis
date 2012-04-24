//Setting the scene: a new scene deletes everything 2D except 'Persist'ant objects
Crafty.scene("Village", function() {
	
	//add crafty.load for images/assets for this scene
	
	var bg = Crafty.e("2D, Canvas, Image").image("images/village.png");
	
	Player.attr({
		visible: true,
		x: 130,
		y: 100
	});
	
	Player.boundary.minY = 400;
	Player.boundary.maxX = 1600;
	
});