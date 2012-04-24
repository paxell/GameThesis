//Start of the tavern scene
Crafty.scene("Cantina", function() {

	//add crafty.load for images/assets for this scene
	
	//Note: need areamap to define the walkable area?
	Crafty.e("2D, Canvas, Image").image("images/tavern.png");
	
	Inventory.attr({
		visible: true
	});
	
	Barman = Crafty.e("2D, Canvas, bopen, SpriteAnimation, Mouse")
			.animate("blink", 0, 0, 1)
			.bind("EnterFrame", function(e) {
				//blink every 50th - 60th frame
				if(e.frame % 80 > 0 && e.frame % 80 < 10) {
					this.sprite(1, 0, 1, 1);
				} else {
					this.sprite(0, 0, 1, 1);
				}
			})
			.attr({visible: false})
			.bind('MouseOver', function(e) {
				$("#message").text(SELECTED + "barman");
			})
			.bind('MouseOut', function(e) {
				$("#message").text(SELECTED);
			})
			//first line of dialogue
			.bind('Click', function(e) {
				if (SELECTED == TALK_TO) {
					this.index = 0
					DialogueBar.replaceText(dialogue.CantinaConvo[this.index++]);
				}
			})
			//rest of dialogue
			.bind('KeyDown', function(e) {
				if(e.key == Crafty.keys['ENTER']) {
					DialogueBar.replaceText(dialogue.CantinaConvo[this.index++]);
				}
				if(this.index == 6) {
					Item.attr({visible:true});
				}
			});
	
	Player.attr({
		visible: true,
		x: 124,
		y: 120
	});
	
	Barman.attr({
		visible: true,
		x: 610,
		y: 180
	});
	
	villageDoor = Crafty.e("Door")
		.makeDoor(function() {
			Crafty.scene("Village");
		});
	
	//using DOM for now, there's a bug with Canvas
	//move this to the main file!
	Item = Crafty.e("2D, DOM, item, half, Mouse").attr({
			visible:false,
			y: 274, 
			x: 364
		})
		.bind('MouseOver', function(e) {
			$("#message").text(SELECTED + "item");
		})
		.bind('MouseOut', function(e) {
			$("#message").text(SELECTED);
		})
		.bind('Click', function(e) {
			if (SELECTED == TALK_TO) {
				this.attr({
					x: 450,
					y: 700
				});
			};
			this.removeComponent("half");
			this.addComponent("pocket");
			//adds a reference to this item to the inventory array
			Inventory.inv.push(this);
		});
	});