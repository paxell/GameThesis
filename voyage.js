Crafty.scene("Voyage", function() {
	
	//black background with some loading text
    Crafty.background("#fff");
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
            .text("Loading")
            .css({ "text-align": "center", "color": "#000" });		
	
});//end scene