Crafty.scene("Journey", function() {
	
	Crafty.background("#000");
	
	//reset the viewport
	Crafty.viewport.x = 0
	Crafty.viewport.y = 0
	
	//initialise dialogue bar
	DialogueBar = Crafty.e("DialogueBar")
		.attr({x: 192, y: 10, visible:true, alpha:1.0, w: 384})
		.css({background: '#000', border: 'none', padding: '0', color: "yellow"});
	
	//initialise dialogue entities	
	var sceneScript = DIALOGUE.Journey;
	
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
			//Crafty.scene("Apartments");
			//$("#buttons").css('display', 'block');
			//$("#inventory").css('display', 'block');
			//$("#message").css('display', 'block');
		});	
			
	Player.attr({visible: false});			
	
});//end scene