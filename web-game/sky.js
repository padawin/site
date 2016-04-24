loader.addModule('sky', 'particles', 'canvas', function (particlesModule, canvas) {
	"use strict";
	var sky = {
			nbResources: 1
		},
		canvasContext = canvas.getContext(),
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
			cloudDimensions,
			position, speed, life, ratio;

		if (frequencyCloud > 0.9 && !clouds.isFull()) {
			position = {
				x: -cloudResource.width,
				y: canvas.canvas.height * Math.random()
			};
			speed = {
				x: Math.random() * 2, y: 0
			};
			life = 10000
			cloud = new particlesModule.Particle(
				position,
				speed,
				life
			);
			ratio = Math.max(0.2, Math.random())
			cloud.displayWidth = cloudResource.width * ratio;
			cloud.displayHeight = cloudResource.height * ratio;
			clouds.addParticle(cloud);
		}
	};

	sky.draw = function (camera) {
		canvasContext.fillStyle = '#AEE8FB';
		canvasContext.fillRect(0, 0, camera.w, camera.h);
		clouds.updateAndDrawParticles(function (cloud) {
			if (cloud.position.x > camera.w || cloud.position.y > camera.h) {
				return;
			}

			canvasContext.drawImage(cloudResource,
				0, 0,
				cloudResource.width, cloudResource.height,
				cloud.position.x, cloud.position.y,
				cloud.displayWidth, cloud.displayHeight
			);
		});
	};

	return sky;
});
