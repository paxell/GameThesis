//ITEM COMPONENT
Crafty.c("Item", {
	
    init: function() {
		//canvas or DOM?
        this.addComponent("2D, DOM, Mouse");
        this.attr({visible: false});
        this.name = "";
		this.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + this.name);
		})
		this.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		});
    },
    
	//figure out why this isn't working
    /*showItem: function(x, y) {
        this.attr({x: x, y: y, visible:true});
		return this;
    },*/
	
	pickupItem: function() {
        if(SELECTED == PICK_UP) {
		
			//save the position/index in the inv array
			//Inventory.inv.push(this);
            this.indexPos = Inventory.inv.push(this) - 1;
			
			//take off the stage
			this.attr({visible:false});
			
			//add as a li to the inventory
			$('#inventory ul').append('<li id="' + this.name + '"><img src="' + this.__image + '"></li>');
			
			return this;
			
		}
		
    },

	giveItem: function(to, callback) {     
                   
		//remove from the position
		Inventory.inv.splice(this.indexPos, 1);
		
		var self = this;
		
		//remove from the UI - broken
		//$('#inventory ul').remove("li#" + self.name);
		("li#" + self.name).remove();
	},
	
	lookatItem: function() {
		//make these global to the component since the text will be used in other function(s)?
		
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