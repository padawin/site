loader.addModule('object',
'sprites', 'canvas',
function (sprites, canvas) {
	"use strict";

	var ObjectClass,
		canvasContext = canvas.getContext();


	function draw (camera, map) {
		var coord, s;

		coord = camera.adapt(map.coordsToPixels(this.x, this.y));
		s = this.sprite;

		canvasContext.drawImage(sprites.spriteResource,
			s.x, s.y,
			s.w, s.h,
			coord.x - s.posInCell.x, coord.y - s.posInCell.y,
			s.w, s.h
		);
	}

	ObjectClass = function (data) {
		if (!data.draw) {
			data.draw = draw;
		}

		return data;
	};

	return ObjectClass;
});
