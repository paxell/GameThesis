Crafty.scene("Gate", function() {

	//reset the selection
	SELECTED = "";
	$("#message").text("");
	
	//reset the viewport
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;
	
	//set player boundaries if needed
	Player.boundary.minY = 285;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 768;
	
	Player.moving = false;
	
	Crafty.background("#000");
	
	Crafty.load(["images/gate.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/gate.png");
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//add blinking animation to player
		Player.bind("EnterFrame", function(e) {
				//blink every 50th - 60th frame
				if(e.frame % 50 > 0 && e.frame % 50 < 10) {
					this.sprite(1, 0, 1, 1);
				} else {
					this.sprite(0, 0, 1, 1);
				}
			});
		
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true
			//x and y come from main depending on which scene player comes from
		});
		
		//Front gate
		frontDoor = Crafty.e("Door")
			.attr({name: "village gate"})
			.makeDoor(560, 28, 173, 263, function() {
			   Crafty.scene("Village");
			});
		
	});//end Crafty load
	
});//end scene