//sprites for the scene
Crafty.sprite(96, 232, "images/guard.png", {
	guard: [0,0]
});
Crafty.sprite(65, 95, "images/seller.png", {
	eopen: [0,0],
	eclosed: [1,0]
});
Crafty.sprite(32, 32, "images/item-paper.png", {
	paper: [0,0]
});
Crafty.sprite(32, 32, "images/item-food.png", {
	food: [0,0]
});
Crafty.sprite(32, 32, "images/item-water.png", {
	water: [0,0]
});

Crafty.scene("Village", function() {

	//reset the selection
	SELECTED = "";
	$("#message").text("");
	
	//reset the viewport
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;
	
	//set player boundaries if needed
	Player.boundary.minY = 285;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 1517;
	
	Player.moving = false;
	
	Crafty.load(["images/village.png", "images/seller.png", "images/guard.png", "images/item-paper.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/village.png");
		
		//initialise script		
		var sceneScript = DIALOGUE.Village;
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
				.attr({visible: false});
		
		//Guard character
		Guard = Crafty.e("Character, guard")
				.Dialogue(sceneScript.Guard)
				.attr({visible: false});
		
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
				.bind('ItemGiven', function() {
					DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
					DialogueBar.replaceText("Here you go. Safe journey and all that.");
					DialogueBar.tween({alpha: 0.0}, 150);
					foodItem.attr({visible:true});
					waterItem.attr({visible:true});
				});
				
		//initialise newspaper item
		newsPaper = Crafty.e("Item, paper")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});	
		
		//initialise food item
		foodItem = Crafty.e("Item, food")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});	
			
		//initialise water item
		waterItem = Crafty.e("Item, water")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});	
		
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true
			//x and y come from main depending on which scene player comes from
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
			accepts: "coins",
			name: "Alaine"
		});
		
		newsPaper.attr({
			name: "paper",
			x: 1244,
			y: 262,
			visible: true,
			to: "Salik"
		});
		
		foodItem.attr({
			name: "food",
			x: 1005,
			y: 162
		});
		
		waterItem.attr({
			name: "water",
			x: 1134,
			y: 171
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Front gate
		gateDoor = Crafty.e("Door")
			.attr({name: "village gate"})
			.makeDoor(0, 26, 106, 262, function() {
			   DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			   DialogueBar.replaceText("I can't go back to where I came from.");
			   DialogueBar.tween({alpha: 0.0}, 120);
			});
		
		//Locked guard door
		guardDoor = Crafty.e("Door")
			.attr({name: "guard door"})
			.makeDoor(181, 95, 91, 184, function() {
			   DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			   DialogueBar.replaceText("This door is locked.");
			   DialogueBar.tween({alpha: 0.0}, 120);
			});	
		
		//Goverment office - opening soon (?)
		govDoor = Crafty.e("Door")
			.attr({name: "office door"})
			.makeDoor(397, 53, 165, 185, function() {
			   DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			   DialogueBar.replaceText("This government office is closed.");
			   DialogueBar.tween({alpha: 0.0}, 120);
			});
		
		//Door to the Temple scene
		templeDoor = Crafty.e("Door")
			.attr({name: "temple door"})
			.makeDoor(712, 0, 93, 135, function() {
			   Crafty.scene("Temple");
			});
		
		//Door to the Cantina scene
		cantinaDoor = Crafty.e("Door")
			.attr({name: "cantina door"})
			.makeDoor(1364, 94, 138, 211, function() {
			   Crafty.scene("Cantina");
			});
		
	});//end Crafty load
	
});//end scene