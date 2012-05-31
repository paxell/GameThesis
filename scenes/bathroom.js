//sprites for the scene
Crafty.sprite(69, 271, "images/father.png", {
	jacket1: [0,0],
	jacket2: [1,0]
});
Crafty.sprite(32, 32, "images/item-docs.png", {
	docs: [0,0],
});

Crafty.scene("Bathroom", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//set player boundaries if needed
	Player.boundary.minY = 236;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 	768;
	
	Player.moving = false;

	Crafty.load(["images/bathroom.png", "images/father.png", "images/item-docs.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/bathroom.png");
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Bathroom;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//Father character
		Father = Crafty.e("Character, jacket1")
				.Dialogue(sceneScript.Father)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				/*.bind("DialogueEnd", function() {
					docsItem.attr({visible: true});
				});*/
		
		//initialise docs item
		docsItem = Crafty.e("Item, docs")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});
			
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
		});
		
		Father.attr({
			visible: true,
			x: 557,
			y: 0,
			name: "Bana"
		});
		
		docsItem.attr({
			name: "documents",
			x: 939,
			y: 202
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Door to the Spaceport scene
		spDoor = Crafty.e("Door")
			.attr({name: "spaceport door"})
			.makeDoor(0, 35, 69, 255, function() {
			   Crafty.scene("Spaceport");   
			});
		
	});//end load
	
});//end scene