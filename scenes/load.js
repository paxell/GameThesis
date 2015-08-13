Crafty.scene("Load", function() {
	
	//black background with some loading text
    Crafty.background("url(images/home.png) no-repeat #000");
    Crafty.e("2D, DOM, Text").attr({ w: 300, h: 20, x: 260, y: 120 })
            .text("Another World")
            .css({ "color": "#fff", "font-size" : "40px" });

	Crafty.e("2D, DOM, Text, Mouse").attr({ w: 400, h: 20, x: 260, y: 170 })
            .text("Continue")
            .css({ "color": "yellow", "font-size" : "18px" })
			.bind("Click", function(e) {
				Crafty.scene("Intro");
			});
	
		Player.attr({
			visible: false,
		});
		
});//end scene