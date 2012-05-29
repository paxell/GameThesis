//ITEM COMPONENT
Crafty.c("Item", {
	
    init: function() {
		//canvas or DOM?
        this.addComponent("2D, Canvas, Mouse");
        this.attr({visible: false, z: 50});
        this.name = "";
		this.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + this.name);
		})
		this.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		});
    },
	
	pickupItem: function() {
        if(SELECTED == PICK_UP) {
		
			//save the position/index in the inv array
            this.indexPos = Inventory.inv.push(this) - 1;
			
			//take off the stage
			this.attr({visible:false});
			
			//add as a li to the inventory
			$('#inventory ul').append('<li id="' + this.name + '"><img src="' + this.__image + '"></li>');
			
			pickedUp = true;
			return this;
			
		};
		/* trying to prevent items reappearing
		if (pickedUp == true) {
			this.attr({visible:false});
		}*/
		
    },

	giveItem: function(to, callback) {     
                   
		//remove from the position
		Inventory.inv.splice(this.indexPos, 1);
		
		var self = this;
		
		//remove from the UI - broken
		$("li#" + self.name).remove();
	},
	
	lookatItem: function() {
		
		var itemStuff = this.name;
		var itemText = ITEMS[itemStuff];
		
		var itemDesc = itemText[0];
		
        if (SELECTED == LOOK_AT) {
			DialogueBar.attr({x: Player.x, y: 0, visible:true, alpha:1.0}); 
			DialogueBar.replaceText(itemDesc);
			DialogueBar.tween({alpha: 0.0}, 120);
		}
    }
    
});