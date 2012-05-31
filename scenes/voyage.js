//sprites for the scene
Crafty.sprite(138, 96, "images/ship.png", {
	ship: [0,0]
});

Crafty.scene("Voyage", function() {

	Crafty.load(["images/home.png", "images/ship.png"], function() {
	
		Crafty.background("url(images/home.png) no-repeat #000");
		
		//reset the viewport
		Crafty.viewport.x = 0
		Crafty.viewport.y = 0
		
		//initialise dialogue bar
		DialogueBar = Crafty.e("DialogueBar")
			.attr({x: 192, y: 10, visible:true, alpha:1.0, w: 384})
			.css({background: '#000', border: 'none', padding: '0', color: "yellow"});
		
		//initialise dialogue entities	
		var sceneScript = DIALOGUE.Voyage;
		
		VoyageText = Crafty.e("2D, DOM, Text, Mouse, Dialogue")
			.attr({x: 526, y: 50, w: 100, h: 50})
			.css({ "color" :"#fff" })
			.text("Continue")
			.Dialogue(sceneScript.Player)
			.bind('Click', function(e) {
				this.nextLine();
			})
			.bind("DialogueChange", function() {
				DialogueBar.replaceText(this.currentLine.txt);
			})
			.bind("DialogueEnd", function() {
				Crafty.scene("Spaceport");
				$("#buttons").css('display', 'block');
				$("#inventory").css('display', 'block');
				$("#message").css('display', 'block');
			});
			
		spaceShip = Crafty.e("2D, Canvas, Tween, ship")
			.attr({x: 164, y: 103, alpha: 1.0, visible: true})
			.tween({x: 768, y: 0}, 150);
			
				
		Player.attr({visible: false});			
	
	});//end load
		
});//end scene