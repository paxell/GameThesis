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
		})
		this.bind('Click', function(e) {
			console.log("Selected character");
            if ((SELECTED == GIVE_TO) && (selectedGift.name == this.accepts)) {
                selectedGift.giveItem(this);
				console.log("Gave item");
            } /*else {
				DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
				DialogueBar.replaceText("Can't accept that");
				DialogueBar.tween({alpha: 0.0}, 80);
            }*/
        });
    },
    
});

/* Notes:
could add animation although every character might have a different animation
could add dialogue script but some characters might not talk
*/