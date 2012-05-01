Crafty.scene("Temple", function() {
	
	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//add crafty.load for images/assets for this scene
	
	var bg = Crafty.e("2D, Canvas, Image").image("images/temple.png");
	
	Priestess = Crafty.e("2D, Canvas, popen, SpriteAnimation, Mouse, Dialogue")
			//.Dialogue(sceneScript.Priestess)
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
				$("#message").text(SELECTED + "priestess");
			})
			.bind('MouseOut', function(e) {
				$("#message").text(SELECTED);
			})
			
	Priestess.attr({
		visible: true,
		x: 500,
		y: 70
	});
	
	Player.attr({
		visible: true,
		x: 130,
		y: 100
	});
	
	//Door to the Village scene
	villageDoor = Crafty.e("Door").makeDoor(12, 129, 72, 337, function() {
	   Crafty.scene("Village");
	});
	
	//Set the player's walkable boundaries in every scene
	Player.boundary.minY = 450;
	Player.boundary.maxX = 669;
	
});