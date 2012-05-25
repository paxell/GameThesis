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
		pickedUp = false;
    },
    
	//figure out why this isn't working
    /*showItem: function(x, y) {
        this.attr({x: x, y: y, visible:true});
		return this;
    },*/
	
	pickupItem: function() {
        if(SELECTED == PICK_UP) {
		
			//save the position/index in the inv array
			Inventory.inv.push(this);
            //this.pos = Inventory.inv.push(this) - 1;
			
			//take off the stage
			this.attr({visible:false});
			
			//add as a li to the inventory
			$('#inventory ul').append('<li id="' + this.name + '"><img src="' + this.__image + '"></li>');
			
			pickedUp = true;
			
		}
		
		if (pickedUp = true) {
			this.giveItem();
		}
		
    },

	giveItem: function() {
	//giveItem: function(to, callback) {	
	
        if (SELECTED == GIVE) {
				
			var itemName = this.name;
			var itemUI = $("#inventory ul li#" + itemName);
			
			//register the item in the UI as clicked and prompt user to select the recipient
			itemUI.click(function() {
				$("#message").text(SELECTED + itemName + "to ");
				console.log("UI item clicked");
			});
			
			/*
			//to is the name of the character, to.accepts is the name of the item the character accepts
			//need player to click the character after selecting the item, only then will it be given
			if (to.accepts == this.name) {        
				callback();
				
				//remove from the position
				Inventory.inv.splice(this.pos, 1);
				
				//remove from the UI
				$('#inventory ul').detach(itemUI);
			}
			else {
				DialogueBar.replaceText("I don't think so");
			}*/
			
		}
		
		return this;
    },
	
	lookatItem: function() {
		//make these global to the component since the text will be used in other function(s)?
		
		var itemStuff = this.name;
		var itemText = ITEMS[itemStuff];
		
		var itemDesc = itemText[0];
		
        if (SELECTED == LOOK_AT) {
			console.log(itemDesc);
		}
    }
    
});