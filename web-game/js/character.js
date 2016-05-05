loader.addModule('character', 'sprites', 'canvas', function (sprites, canvas) {
	"use strict";

	var canvasContext = canvas.getContext();

	function calcDistance (p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	function _updateSpriteFromSpeed(character) {
		var gridSpeed = {
			x: character.path[0].x - character.cell.x,
			y: character.path[0].y - character.cell.y,
		};
		if (gridSpeed.x > 0) {
			character.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_RIGHT
			];
		}
		else if (gridSpeed.y > 0) {
			character.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_LEFT
			];
		}
		else if (gridSpeed.x < 0) {
			character.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_UP_LEFT
			];
		}
		else if (gridSpeed.y < 0) {
			character.sprite = sprites.sprites[
				sprites.SPRITES_ACCESS.PLAYER_MOVE_UP_RIGHT
			];
		}
	}

	function Character (map) {
		this.setCell(map, 0, 0);
		this.path = [];
		this.frame = 0;
		this.maxFrame = 4;
		this.tick = 0;
		this.timePerFrame = 8;
		this.sprite = sprites.sprites[sprites.SPRITES_ACCESS.PLAYER_RIGHT];
		this.maxLinearSpeed = 2;
		this.speed = {x: 0, y: 0};
	}

	Character.prototype.calculateSpeed = function (destinationVector) {
		// get remaining distance to walk
		var distance = calcDistance(
			{x: 0, y: 0},
			destinationVector
		);

		if (distance <= this.maxLinearSpeed) {
			this.speed = destinationVector;
		}
		else {
			this.speed.x = destinationVector.x * this.maxLinearSpeed / distance;
			this.speed.y = destinationVector.y * this.maxLinearSpeed / distance;
		}
	};

	Character.prototype.setCell = function (map, x, y) {
		var start, oldPosition;

		if (this.cell) {
			oldPosition = this.cell;
		}

		this.cell = {x: x, y: y};
		if (oldPosition) {
			map.moveObject(oldPosition, this.cell);
		}
		else {
			map.addObject(this, this.cell);
		}

		start = map.coordsToPixels(this.cell.x, this.cell.y);
		this.x = start.x;
		this.y = start.y;
	};

	Character.prototype.setPath = function (path) {
		this.path = path;
	};

	Character.prototype.update = function (map) {
		var pointNextDest, destinationVector;

		// nowhere to go
		if (!this.path.length) {
			// was moving and just arrived
			// depending on his speed, set the rest position sprite
			if (this.speed !== {x: 0, y: 0}) {
				this.frame = 0;
				if (this.speed.x > 0) {
					this.sprite = sprites.sprites[
						sprites.SPRITES_ACCESS.PLAYER_RIGHT
					];
				}
				else if (this.speed.y > 0) {
					this.sprite = sprites.sprites[
						sprites.SPRITES_ACCESS.PLAYER_LEFT

					];
				}
				this.speed = {x: 0, y: 0};
			}
			return;
		}

		// The player has to reach its destination, update its speed so it
		// won't go past it

		// get the coordinates of the next point to reach
		pointNextDest = map.coordsToPixels(this.path[0].x, this.path[0].y);
		// get direction vector
		destinationVector = {
			x: pointNextDest.x - this.x,
			y: pointNextDest.y - this.y
		};
		// calculate speed
		this.calculateSpeed(destinationVector);
		this.updatePosition();
		this.updateFrame();

		_updateSpriteFromSpeed(this);

		if (this.x == pointNextDest.x && this.y == pointNextDest.y) {
			this.setCell(map, this.path[0].x, this.path[0].y);
			this.path.shift();
		}
	};

	Character.prototype.updatePosition = function () {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	Character.prototype.updateFrame = function () {
		this.tick++;
		if (this.tick == this.timePerFrame) {
			this.tick = 0;
			this.frame = (this.frame + 1) % this.maxFrame;
		}
	};

	Character.prototype.draw = function (camera) {
		var coord = camera.adapt(this), s;

		s = this.sprite;
		if (s.animation !== undefined) {
			s = s.animation[this.frame];
		}

		canvasContext.drawImage(sprites.spriteResource,
			s.x, s.y,
			s.w, s.h,
			coord.x - s.posInCell.x, coord.y - s.posInCell.y,
			s.w, s.h
		);
	};

	return Character;
});
