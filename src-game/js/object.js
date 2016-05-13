loader.addModule('object',
'sprites', 'canvas',
function (sprites, canvas) {
	"use strict";

	/**
	 * Module to manage map objects. An object must be drawable, so if an object
	 * is not, this module provides a default draw method.
	 */

	var ObjectClass,
		canvasContext = canvas.getContext();

	/**
	 * default draw method for the map objects. Handles animated sprites.
	 */
	function draw (camera, map) {
		var coord, s;

		coord = camera.adapt(map.coordsToPixels(this.x, this.y));
		s = this.sprite;
		if (s.animation !== undefined) {
			this.tick++;
			if (this.tick == this.timePerFrame) {
				this.tick = 0;
				this.frame = (this.frame + 1) % s.animation.length;
			}
			s = s.animation[this.frame];
		}

		canvasContext.drawImage(sprites.spriteResource,
			s.x, s.y,
			s.w, s.h,
			coord.x - s.posInCell.x, coord.y - s.posInCell.y,
			s.w, s.h
		);
	}

	/**
	 * Factory method. Takes a JS object and parasites it with the default draw
	 * method if it has none and if the object's sprite is animated, initialises
	 * its frame, ticks and timePerFrame (hard coded)
	 */
	ObjectClass = function (data) {
		if (!data.draw) {
			data.draw = draw;
		}

		if (data.sprite.animation) {
			data.frame = 0;
			data.tick = 0;
			data.timePerFrame = 16;
		}

		return data;
	};

	return ObjectClass;
});
