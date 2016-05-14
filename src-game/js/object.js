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
	 * Factory method. Takes a JS object and parasites it with the default draw
	 * method if it has none and if the object's sprite is animated, initialises
	 * its frame, ticks and timePerFrame (hard coded)
	 */
	ObjectClass = function (data) {
		if (!data.draw) {
			/**
			 * default draw method for the map objects. Handles animated sprites.
			 */
			data.draw = function (camera, map) {
				var coord, s;

				coord = camera.adapt(map.coordsToPixels(data.x, data.y));
				s = data.sprite;
				if (s.animation !== undefined) {
					data.tick++;
					if (data.tick == data.timePerFrame) {
						data.tick = 0;
						data.frame = (data.frame + 1) % s.animation.length;
					}
					s = s.animation[data.frame];
				}

				canvasContext.drawImage(sprites.spriteResource,
					s.x, s.y,
					s.w, s.h,
					coord.x - s.posInCell.x, coord.y - s.posInCell.y,
					s.w, s.h
				);
			};
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
