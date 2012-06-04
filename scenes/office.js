//sprites for the scene
Crafty.sprite(65, 85, "images/clerk.png", {
	clopen: [0,0],
	clclosed: [1,0]
});

Crafty.scene("Office", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 220;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 	433;
	
	Player.moving = false;

	Crafty.load(["images/office.png", "images/clerk.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/office.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Office;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//Clerk character
		Clerk = Crafty.e("Character, clopen")
				.Dialogue(sceneScript.Clerk)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 50 > 0 && e.frame % 50 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				});
			
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 83,
			y: 40
		});
		
		Clerk.attr({
			visible: true,
			x: 583,
			y: 80,
			name: "Marla"
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Village scene
		villageDoor = Crafty.e("Door")
			.attr({name: "village door"})
			.makeDoor(7, 5, 105, 243, function() {
			   Crafty.scene("Village");   
			});
		
	});//end load
	
});//end scene