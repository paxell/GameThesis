//CHARACTER COMPONENT
Crafty.c("Character", {
	
    init: function() {
        this.addComponent("2D, Canvas, SpriteAnimation, Mouse, Dialogue");
        this.attr({visible: false});
        this.name = "";
		this.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + this.name);
		})
		this.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		});
    },
    
});

/* Notes:
could add animation although every character might have a different animation
could add dialogue script but some characters might not talk
*/