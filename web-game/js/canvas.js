loader.addModule('canvas', 'B', function (B) {
	"use strict";

	/**
	 * Module to encapsulate the canvas object
	 */

	var canvas = {},
		canvasContext;

	canvas.canvas = B.$id('myCanvas');
	canvasContext = canvas.canvas.getContext('2d');

	canvas.getContext = function () {
		return canvasContext;
	};

	canvas.resize = function () {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	};

	canvas.getWidth = function () {
		return this.canvas.width;
	};

	canvas.getHeight = function () {
		return this.canvas.height;
	};

	/**
	 * Method to draw a rectangle
	 */
	canvas.drawRectangle = function (x, y, width, height, fillColor, strokeColor) {
		if (fillColor) {
			canvasContext.fillStyle = fillColor;
			canvasContext.fillRect(x, y, width, height);
		}
		if (strokeColor) {
			canvasContext.strokeStyle = strokeColor;
			canvasContext.strokeRect(x, y, width, height);
		}
	};

	return canvas;
});
