loader.addModule('sky', function () {
	"use strict";
	var sky = {};

	sky.update = function () {

	};

	sky.draw = function (canvasContext, camera) {
		canvasContext.fillStyle = '#AEE8FB';
		canvasContext.fillRect(0, 0, camera.w, camera.h);
	};

	return sky;
});
