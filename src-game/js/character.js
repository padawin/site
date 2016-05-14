loader.addModule('character',
'sprites', 'canvas', 'inventory', 'B',
function (sprites, canvas, inventory, B) {
	"use strict";

	/**
	 * Module to manage the game's player
	 */

	var canvasContext = canvas.getContext();

	/**
	 * Method to calculate an euclidean distance between two points
	 */
	function calcDistance (p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	/**
	 * Method to set the good sprite to the player depending of his speed. Used
	 * only when the player is moving
	 */
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

	/**
	 * Player constructor. Sets the player at the point 0,0 of the map.
	 * Also initialises different data in the player (path, frames and animation
	 * information, speed)
	 */
	function Character () {
		this.path = [];
		this.frame = 0;
		this.maxFrame = 4;
		this.tick = 0;
		this.timePerFrame = 8;
		this.sprite = sprites.sprites[sprites.SPRITES_ACCESS.PLAYER_RIGHT];
		this.maxLinearSpeed = 2;
		this.speed = {x: 0, y: 0};
	}

	/**
	 * Calculates the player's speed from a given vector representing the
	 * player's destination. If the destination is closer than the player's
	 * linear speed, the player's speed is the vector itself, otherwise, the
	 * player's speed is calculated from the player's linear speed and the
	 * destination's vector.
	 *
	 * @TODO Can be private
	 */
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

	/**
	 * Set the player's cell in the world and updates the map's list of objects
	 * because the player is considered as an object of the map.
	 */
	Character.prototype.setCell = function (map, x, y) {
		var start, oldPosition, object;

		if (this.cell) {
			oldPosition = this.cell;
		}

		this.cell = {x: x, y: y};
		if (oldPosition) {
			object = map.getObject(this.cell);
			if (object && object != this) {
				inventory.add(object);
				B.Events.fire(
					'message',
					[object.name + ' added to the inventory']
				);
			}
			map.moveObject(oldPosition, this.cell);
		}
		else {
			map.addObject(this, this.cell);
		}

		// @TODO Obsolete with the updatePosition method?
		start = map.coordsToPixels(this.cell.x, this.cell.y);
		this.x = start.x;
		this.y = start.y;
	};

	/**
	 * Set the character's path. As soon as the character has a path, it will
	 * start moving towards it.
	 */
	Character.prototype.setPath = function (path) {
		this.path = path;
	};

	/**
	 * Update the player's position and sprite according to his path.
	 */
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

	/**
	 * Change the character's position according to his speed
	 */
	Character.prototype.updatePosition = function () {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	/**
	 * Update the character's frame from his ticks
	 *
	 * @TODO Create an animated behaviour for every animated elements in the
	 *		game?
	 */
	Character.prototype.updateFrame = function () {
		this.tick++;
		if (this.tick == this.timePerFrame) {
			this.tick = 0;
			this.frame = (this.frame + 1) % this.maxFrame;
		}
	};

	/**
	 * Draw the character in the screen depending to the camera position
	 */
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
