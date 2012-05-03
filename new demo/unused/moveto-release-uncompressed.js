Crafty.c("MoveTo", {
	
	//need to add somewhere an if statement for (SELECTED == WALK_TO)
	//need to make the final position relative to the size of the sprite/character
	
	_speed: 4,
	
	_onmousedown: function (e) {
		// clear any existing EnterFrame handlers
		this._stopMoving();

		this._target = { x: e.realX, y: e.realY };
		this.trigger('NewDirection', this._movement,(SELECTED == WALK_TO));
		this.bind("EnterFrame", this._enterFrame);
		
	},

	_stopMoving: function () {
		this._movement = {
			x: 0,
			y: 0
		};
		this._target = undefined;
		this.unbind("EnterFrame", this._enterFrame);
	},

	_enterFrame: function () {
		if (this.disableControls || !this._target) {
			return;
		}

		
		// target (almost) reached - jump the last part.
		// We could be more fancy (circular check instead of square), but don't want to pay the sqrt penalty each frame.
		if (Math.abs(this._target.x - this.x) < this._speed && Math.abs(this._target.y - this.y) < this._speed) {
			var prev_pos = {
				x: this.x,
				y: this.y
			};
			this.x = this._target.x;
			this.y = this._target.y;

			this._stopMoving();

			this.trigger('Moved', prev_pos);
			this.trigger('NewDirection', this._movement);
			return;
		};

		// Pixels to move are calculated from location and target every frame to handle the case when something else (IE, collision detection logic) changes our position.
		// Some cleaver optimization could probably eliminate the sqrt cost...
		var dx = this._target.x - this.x, dy = this._target.y - this.y, oldX = this.x, oldY = this.y;

		// Moved triggered twice to allow for better collision logic (like moving along diagonal walls)
		this.x += (dx * this._speed) / (Math.sqrt(dx * dx + dy * dy));
		this.trigger('Moved', { x: oldX, y: this.y });
		this.y += (dy * this._speed) / (Math.sqrt(dx * dx + dy * dy));
		this.trigger('Moved', { x: this.x, y: oldY });
	},

	moveTo: function (speed) {
		this._speed = speed;
		return this;
	},

	init: function () {
		this.requires("Mouse");

		if (SELECTED == WALK_TO) {
			Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this._onmousedown);
		}

	}
});