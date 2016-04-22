loader.addModule('sky', function () {
	"use strict";
	var sky = {
			nbResources: 1
		},
		cloudResource;

	sky.loadResources = function (loaded) {
		cloudResource = new Image();
		cloudResource.onload = loaded;
		cloudResource.src = 'cloud.png';
	}

	sky.update = function () {

	};

	sky.draw = function (canvasContext, camera) {
		canvasContext.fillStyle = '#AEE8FB';
		canvasContext.fillRect(0, 0, camera.w, camera.h);
	};

	return sky;
});
