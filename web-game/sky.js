loader.addModule('sky', 'particles', function (particlesModule) {
	"use strict";
	var sky = {
			nbResources: 1
		},
		cloudResource,
		clouds = new particlesModule.ParticlesManager(20);

	sky.loadResources = function (loaded) {
		cloudResource = new Image();
		cloudResource.onload = loaded;
		cloudResource.src = 'cloud.png';
	}

	sky.update = function () {
		var frequencyCloud = Math.random(),
			cloud,
			cloudDimensions;

		if (frequencyCloud > 0.9 && !clouds.isFull()) {
			cloud = new particlesModule.Particle(
				{x: -cloudResource.width, y: Math.random()},
				{x: Math.random() * 2, y: 0},
				10000
			);
			cloud.ratio = Math.max(0.2, Math.random());
			clouds.addParticle(cloud);
		}
	};

	sky.draw = function (canvasContext, camera) {
		canvasContext.fillStyle = '#AEE8FB';
		canvasContext.fillRect(0, 0, camera.w, camera.h);
	};

	return sky;
});
