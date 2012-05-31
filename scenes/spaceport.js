//sprites for the scene
Crafty.sprite(105, 196, "images/passenger.png", {
	hands1: [0,0],
	hands2: [1,0]
});
Crafty.sprite(56, 138, "images/girl.png", {
	sad: [0,0],
	happy: [1,0]
});
Crafty.sprite(83, 248, "images/secguard.png", {
	secopen: [0,0],
	secclosed: [1,0]
});
Crafty.sprite(32, 32, "images/item-doll.png", {
	doll: [0,0]
});
Crafty.sprite(32, 32, "images/item-address.png", {
	address: [0,0]
});

Crafty.scene("Spaceport", function() {

	//reset the selection
	SELECTED = "";
	
	//reset the viewport
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;
	
	//set player boundaries if needed
	Player.boundary.minY = 268;
	//this shouldn't be needed but it is..
	Player.boundary.maxX = 1517;
	
	Player.moving = false;
	
	Crafty.load(["images/spaceport.png", "images/girl.png", "images/item-doll.png", "images/item-address.png", "images/passenger.png", "images/secguard.png"], function() {
		
		var bg = Crafty.e("2D, Canvas, Image").image("images/spaceport.png");
		
		//initialise script		
		var sceneScript = DIALOGUE.Spaceport;
		
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
		
		//Girl character
		Girl = Crafty.e("Character, sad")
				.Dialogue(sceneScript.Girl)
				.animate("happy", 0, 0, 1)
				.bind('ItemGiven', function() {
					DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
					DialogueBar.replaceText("Thanks a lot!");
					DialogueBar.tween({alpha: 0.0}, 120);
					this.animate("happy", 1, 1);
				});
		
		//Passenger character
		Passenger = Crafty.e("Character, hands1")
				.Dialogue(sceneScript.Passenger)
				.animate("hands", 0, 0, 1)
				.animate("hands", 80, -1)
				.bind("DialogueEnd", function() {
					addressItem.attr({visible: true});
				});;
				
		//Guard character
		SecGuard = Crafty.e("Character, secopen")
				.Dialogue(sceneScript.SecGuard)
				.attr({visible: false})
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					if(e.frame % 80 > 0 && e.frame % 80 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				});

				
		//initialise doll item
		dollItem = Crafty.e("Item, doll")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});	
		
		//initialise address item
		addressItem = Crafty.e("Item, address")
			.bind('Click', function(e) {
				this.lookatItem();
			})
			.bind('Click', function(e) {
				this.pickupItem();
			});
		/*
		
		/*----- Initialise Entities -----*/
		
		Player.attr({
			visible: true
			//x and y come from main depending on which scene player comes from
		});
		
		Girl.attr({
			visible: true,
			x: 215,
			y: 103,
			accepts: "doll",
			name: "Kina"
		});
		
		Passenger.attr({
			visible: true,
			x: 500,
			y: 77,
			accepts: "paper",
			name: "Salik"
		});
		
		SecGuard.attr({
			visible: true,
			x: 1301,
			y: 5, 
			name: "Trager"
		});
		
		dollItem.attr({
			name: "doll",
			x: 988,
			y: 153,
			visible:true
		})
		
		addressItem.attr({
			name: "address",
			x: 433,
			y: 175,
			visible:false
		});
		
		Inventory.attr({
			visible: false
		});
		
		//Spaceport gate
		spaceportGate = Crafty.e("Door")
			.attr({name: "spaceport gate"})
			.makeDoor(13, 19, 97, 246, function() {
			   DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			   DialogueBar.replaceText("I can't go back to where I came from.");
			   DialogueBar.tween({alpha: 0.0}, 120);
			});
		
		//Girls bathroom
		girlsDoor = Crafty.e("Door")
			.attr({name: "girls' bathroom door"})
			.makeDoor(655, 41, 100, 168, function() {
			   DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			   DialogueBar.replaceText("I can't go in there!");
			   DialogueBar.tween({alpha: 0.0}, 120);
			});
		
		//Door to the Bathroom scene
		boysDoor = Crafty.e("Door")
			.attr({name: "boys' bathroom door"})
			.makeDoor(785, 49, 97, 166, function() {
			   Crafty.scene("Bathroom");
			});
		
		//Door to the Carpark scene
		carparkDoor = Crafty.e("Door")
			.attr({name: "spaceport exit"})
			.makeDoor(1371, 0, 144, 294, function() {
				//DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
				//DialogueBar.replaceText("He won't let me out");
				//DialogueBar.tween({alpha: 0.0}, 120);
			   Crafty.scene("Carpark");
			});
		
	});//end Crafty load
	
});//end scene