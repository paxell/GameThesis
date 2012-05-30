window.onload = function() {
	Crafty.init(1024, 768);
	
	//Sprites
	
	Crafty.sprite(147, 394, "images/character-sprite.png", {
		open: [0,0],
		closed: [1,0]
	});
	
	Crafty.sprite("images/item-sprite.png", {
		full: [0,0, 201, 230],
		half: [202, 0, 100, 115],
		pocket: [302, 0, 49, 58]
	});
	
	Crafty.sprite(765, 105, "images/menu.png", {
		menu: [0,0]
	});
	
	//Pre-load images before setting the scene
	Crafty.load(["images/character-sprite.png", "images/menu.png", "images/item-sprite.png"], function() {
		
		//Load all objects with assets
		
		//Player attributes
		Player = Crafty.e("2D, Canvas, open, SpriteAnimation, Persist")
				.animate("blink", 0, 0, 1)
				.bind("EnterFrame", function(e) {
					//blink every 50th - 60th frame
					if(e.frame % 50 > 0 && e.frame % 50 < 10) {
						this.sprite(1, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
					}
				})
				.attr({visible: false});
		
		Inventory = Crafty.e("2D, Canvas, menu, Persist")
			//use maths to center the menu
			.attr({y: 768 - 105, x: (1024 - 765) / 2, visible: false, inv: []});
		
		//then load the scene
		Crafty.scene("Cantina");
		
	});
	
	Actions = Crafty.e("2D, DOM, Text, Persist")
		.attr({y: 700, x: 200, w: 400, h: 100, visible: false})
		.text("Pick Up");

	
	//Setting the scene: a new scene deletes everything 2D except 'Persist'ant objects
	Crafty.scene("Cantina", function() {
		
		Crafty.background("url('images/bg.png') no-repeat");
		
		Inventory.attr({
			visible: true
		});
		
		Actions.attr({
			visible: true
		});
		
		Player.attr({
			visible: true,
			x: 124,
			y: 220
		});
		
		//using DOM for now, there's a bug with Canvas
		Item = Crafty.e("2D, DOM, item, half, Persist, Mouse").attr({
				visible:true,
				y: 274, 
				x: 364
			})
			.bind('MouseOver', function(e) {
				Actions.text("Pick up Item");
			})
			.bind('Click', function(e) {
				this.attr({
					x: 700,
					y: 700
				});
				this.removeComponent("half");
				this.addComponent("pocket");
				Actions.text("Picked up item");
				//adds a reference to this item to the inventory array
				Inventory.inv.push(this);
			});
		});
	
};

//TODO next:
//* Better system for changing text on the menu bar (dynamic rather than static)
//* Group properties of (for instance) items into a class/component
//* Text eg 'pick up' will need to be actions/links instead of static text
//* Add some basic dialogue interactions