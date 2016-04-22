loader.addModule('particles', function () {
	"use strict";

	var particlesModule = {};

	const PARTICLE_STATES = {
		DEAD: 0,
		ALIVE: 1
	};

	const PARTICLES_NUMBER = 1000;

	particlesModule.Particle = function (position, speed, draw) {
		this.draw = draw;
		this.maxLife = parseInt(Math.random() * 100);
		this.life = this.maxLife;
		this.position = position;
		this.speed = speed;
		this.state = PARTICLE_STATES.ALIVE;
		this.color = [
			parseInt(Math.random() * 255),
			parseInt(Math.random() * 255),
			parseInt(Math.random() * 255)
		];
	}

	particlesModule.Particle.prototype.update = function () {
		if (this.state == PARTICLE_STATES.DEAD) {
			return;
		}

		this.life--;

		if (this.life <= 0) {
			this.state = PARTICLE_STATES.DEAD;
		}

		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
	};


	function ParticlesManager (size) {
		this.maxSize = size;
		this.particlesCollection = Array(size);
		this.nbParticles = 0;
	}

	ParticlesManager.prototype.addParticle = function (particle) {
		if (this.nbParticles == this.maxSize) {
			return;
		}

		this.particlesCollection[this.nbParticles] = particle;
		this.nbParticles++;
	};

	ParticlesManager.prototype.updateAndDrawParticles = function () {
		var that = this;
		function swapParticles (i, j) {
			var tmp = that.particlesCollection[i];
			that.particlesCollection[i] = that.particlesCollection[j];
			that.particlesCollection[j] = tmp;
		}

		var i = 0;
		while (i < this.nbParticles) {
			this.particlesCollection[i].update();

			if (this.particlesCollection[i].state == PARTICLE_STATES.DEAD) {
				this.nbParticles--;
				swapParticles(i, this.nbParticles);
			}
			else {
				this.particlesCollection[i].draw();
				i++;
			}
		}
	};

	particlesModule.createManager = function (size) {
		return new ParticlesManager(size);
	};

	return particlesModule;
});
