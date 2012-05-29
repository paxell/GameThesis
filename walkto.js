//WALKTO COMPONENT
//TO DO:
//what if there is a slight difference between the walkable area and the scrollable area? eg cantina
Crafty.c("WalkTo", {
	init: function() {
		this.speed = 4;
		this.target = {x: 0, y: 0};
		this.moving = false;
		this.boundary = {
			minX: 0,
			//do these work? in which case can remove maxx and maxy from scenes
			maxX: Crafty.viewport.width,
			minY: 0,
			maxY: Crafty.viewport.height
		};
		
		this.bind("EnterFrame", this._enterframe);
	},
	
	_enterframe: function() {
		if(!this.moving) return;
		
		//because floating point numbers are innacurate
		var EP = this.speed,
			didMove = false;
		
		if(this._x - this.target.x > EP) {
			this.x -= this.speed;
			didMove = true;
			this._flipX = true;
			
			//make sure walking destination is within the boundary
			if(-Crafty.viewport.x > this.boundary.minX) 
				Crafty.viewport.x += this.speed;	
		} 
		
		//if player is to the left of the target, move it to the right
		if(this._x - this.target.x < -EP) {
			this.x += this.speed;
			didMove = true;
			
			this._flipX = false;
			
			if(-Crafty.viewport.x + Crafty.viewport.width < this.boundary.maxX) 
				Crafty.viewport.x -= this.speed;
				
		} 
		if(this._y - this.target.y > EP) {
			this.y -= this.speed;
			didMove = true;
			
		}
		if(this._y - this.target.y < -EP) {
			this.y += this.speed;
			didMove = true;
		}
		
		//not moving, stop the animation
        if(!didMove) {
            this.moving = false;
            this.stop();
        }
        
        //is moving, start the animation
        if (this.moving && !this.isPlaying()) {
            this.animate("walk", 24, -1);
        };
		
	},
	
	setTarget: function(x, y) {
		this.moving = true;
		//set midpoint of player
		this.target.x = x - this.w / 2;
		this.target.y = y - this.h;
		
		//keep target in boundary
		this.checkBoundary();
	},
	
	checkBoundary: function() {
		//was w / 2 but then the character can go halfway off the screen
		this.target.x = Math.min(this.target.x, this.boundary.maxX - this.w);
		this.target.x = Math.max(this.target.x, this.boundary.minX - this.w);
		this.target.y = Math.min(this.target.y, this.boundary.maxY - this.h);
		this.target.y = Math.max(this.target.y, this.boundary.minY - this.h);
	},
	
	stopMoving: function() {
		this.moving = false;
	}
});	