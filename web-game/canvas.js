loader.addModule('canvas', 'B', function (B) {
	"use strict";

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

	return canvas;
});
