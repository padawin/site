loader.addModule('camera', 'canvas', function (canvas) {
	"use strict";
	/**
	 * Module to handle the camera, its position, the conversion between world
	 * and camera positions
	 */

	var canvasContext = canvas.getContext(),
		camera;

	/**
	 * The camera object
	 * x, y: the camera position in the world, this corresponds to the center of
	 * the camera
	 * w, h: the camera's dimensions
	 * subject: any object the camera is supposed to follow
	 */
	camera = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		subject: null,

		/**
		 * Convert some world coordinates to coordinates in the camera
		 */
		adapt: function (coord) {
			var ret = {
				x: Math.round(coord.x - (this.x - this.w / 2)),
				y: Math.round(coord.y - (this.y - this.h / 2))
			};
			return ret;
		},

		/**
		 * Convert some camera coordinates to coordinates in the world
		 */
		toWorldCoords: function (coord) {
			var ret = {
				x: coord.x + (this.x - this.w / 2),
				y: coord.y + (this.y - this.h / 2),
			};
			return ret;
		},
		setSubject (subject) {
			this.subject = subject;
		},
		setPosition (coordinates) {
			this.x = coordinates.x;
			this.y = coordinates.y;
		},

		/**
		 * Update the camera's position
		 * if the camera has a subject and the subject move to less than 150px
		 * from the camera's edges, move the camera to follow its subject so it
		 * does not end up too close to the camera's edge.
		 */
		update: function () {
			if (!this.subject) {
				return;
			}

			var cameraPosition = {x: camera.x, y: camera.y};

			if (camera.w / 2 - (this.subject.x - camera.x) < 150) {
				cameraPosition.x = this.subject.x - (camera.w / 2 - 150);
			}
			else if (camera.w / 2 - (camera.x - this.subject.x) < 150) {
				cameraPosition.x = this.subject.x + (camera.w / 2 - 150);
			}

			if (camera.h / 2 - (this.subject.y - camera.y) < 150) {
				cameraPosition.y = this.subject.y - (camera.h / 2 - 150);
			}
			else if (camera.h / 2 - (camera.y - this.subject.y) < 150) {
				cameraPosition.y = this.subject.y + (camera.h / 2 - 150);
			}

			this.setPosition(cameraPosition);
		},

		/**
		 * Draw the camera, this just draws a cross to see the center of the
		 * camera. Used for debug mode.
		 */
		draw: function () {
			canvasContext.strokeStyle = 'black';
			canvasContext.beginPath();
			canvasContext.moveTo(this.w / 2, 0);
			canvasContext.lineTo(this.w / 2, this.h);
			canvasContext.stroke();

			canvasContext.beginPath();
			canvasContext.moveTo(0, this.h / 2);
			canvasContext.lineTo(this.w, this.h / 2);
			canvasContext.stroke();
		}
	};

	return camera;
});
