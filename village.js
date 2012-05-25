//sprites for the scene
Crafty.sprite(96, 232, "images/guard.png", {
	guard: [0,0]
});
Crafty.sprite(65, 95, "images/seller.png", {
	eopen: [0,0],
	eclosed: [1,0]
});

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
	
	Crafty.load(["images/village.png", "images/seller.png", "images/guard.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/village.png");
		
		//initialise script		
		var sceneScript = DIALOGUE.Village;
		
		//Guard character
		Guard = Crafty.e("Character, guard")
				//.Dialogue(sceneScript.Guard)
				.attr({visible: false})
		
		//Seller character
		Seller = Crafty.e("Character, eopen")
				.Dialogue(sceneScript.Seller)
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				//first line of dialogue
				.bind('Click', function(e) {
					if (SELECTED == TALK_TO) {
						//this.start;
						DialogueBar.attr({x: Player.x, y: 0, visible:true}); 
						//skips the first line - fix or work around?
						this.nextLine();
					}
				})
				//rest of dialogue - could this go in the component?
				.bind('KeyDown', function(e) {
					if(e.key == Crafty.keys['ENTER']) {
						/*
						//change x depending on who is speaking - only works once so far - reference to dialogue key is probably wrong
						if(sceneScript.Seller == Seller || sceneScript.Seller == Answers) {
							DialogueBar.attr({x: Seller.x});
						}
						else {
							DialogueBar.attr({x: Player.x});
						}
						*/
						this.nextLine();						
					}
					/*
					//need better method for escape - inside component?
					else if(e.key == Crafty.keys['ESC']) {
						DialogueBar.attr({visible: false});
						$("#choices").hide();					
					}*/
				})
				.bind("DialogueChange", function() {
					if(this.currentLine.length) {
						//only if there are choices
						this.fillChoices(this.currentLine);
					} else {
						DialogueBar.replaceText(this.currentLine.txt);
					}
				})
				.bind("DialogueEnd", function() {
					//get out of dialogue mode - move to component?
					DialogueBar.attr({visible: false});
					$("#choices").hide();
				});
		
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true,
			x: 130,
			y: 90
		});
		
		Guard.attr({
			visible: true,
			x: 290,
			y: 36, 
			name: "Joruk"
		});
		
		Seller.attr({
			visible: true,
			x: 1058,
			y: 100,
			//accepts: "coins"
			name: "Alaine"
		});
		
		/*Locked guard door
		guardDoor = Crafty.e("Door").makeDoor(181, 95, 91, 184, function() {
		   DialogueBar.attr({x: Player.x, y: 0, visible:true}); 
		   DialogueBar.replaceText("This door is locked.");
		   DialogueBar.tween({visible: false}, 300);
		});*/
		
		//Door to the Temple scene
		govDoor = Crafty.e("Door").makeDoor(712, 0, 93, 135, function() {
		   Crafty.scene("Temple");
		});
		
		//Door to the Temple scene
		cantinaDoor = Crafty.e("Door").makeDoor(712, 0, 93, 135, function() {
		   Crafty.scene("Temple");
		});
		
		//Door to the Cantina scene
		cantinaDoor = Crafty.e("Door").makeDoor(1364, 94, 138, 211, function() {
		   Crafty.scene("Cantina");
		});
		
	});//end Crafty load
	
});//end scene