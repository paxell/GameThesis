//ITEM COMPONENT
Crafty.c("Item", {
    init: function() {
		//canvas or DOM?
        this.addComponent("2D, Canvas, Mouse, Persist");
        this.attr({visible: false});
        this.name = "";
		this.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + this.name);
		})
		this.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		})
    },
    
	//figure out why this isn't working
    showItem: function(x, y) {
        this.attr({x: x, y: y, visible:true});
    },
	
	pickupItem: function() {
        if(SELECTED == PICK_UP) {
            
			//save the position/index in the inv array
			Inventory.inv.push(this);
            //this.pos = Inventory.inv.push(this) - 1;
			
			//take off the stage
			this.attr({visible:false});
			
			//add as a li to the inventory
			$('#inventory ul').append('<li id="' + this.name + '"><img src="' + this.__image + '"></li>');
		}
    },
    
    lookatItem: function() {
		//make these global to the component since the text will be used in other function(s)?
		//reference doesn't work - works if add the title explicitly
		//var itemStuff = this.name;
		var itemText = ITEMS.coins;
		
		var itemDesc = itemText[0];
		
        if (SELECTED == LOOK_AT) {
			console.log(itemDesc);
		}
    },

    giveItem: function(to, callback) {
		
		var self = this;
		
        if (SELECTED == GIVE) {
			
			//problem: the item is now in the UI - check if works
			//reset this to the item in the UI
			self = $('#inventory ul li #' + this.name + '');
			
			//prompt user to select the recipient
			self.click(function() {
				$("#message").text(SELECTED + this.name + "to ");
			});
			
            //to is the name of the character, to.accepts is the name of the item the character accepts
			//need player to click the character first
            if (to.accepts == this.name) {        
                callback();
                //remove from the position
                Inventory.inv.splice(this.pos, 1);
				//remove from the UI - check if works
				$('#inventory ul').detach(self);
            }
            else {
                DialogueBar.replaceText("I don't think so");
			}
		}
    }
    
});