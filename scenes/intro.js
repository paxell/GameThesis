Crafty.scene("Intro", function() {
	
	Crafty.background("#82ccdc");
	
	//initialise dialogue bar
	DialogueBar = Crafty.e("DialogueBar")
		.attr({x: 192, y: 10, visible:true, alpha:1.0, w: 384})
		.css({background: '#82ccdc', border: 'none', padding: '0'});
	
	//initialise dialogue entities	
	var sceneScript = DIALOGUE.Intro;
	
	IntroText = Crafty.e("2D, DOM, Text, Mouse, Dialogue")
		.attr({x: 192, y: 50, w: 100, h: 50})
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
			Crafty.scene("Village");
			$("#buttons").css('display', 'block');
			$("#inventory").css('display', 'block');
			$("#message").css('display', 'block');
		});
		
	Player.attr({visible: true});
	Player.animate("walk", 60, -1);
	
		
});//end scene