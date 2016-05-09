loader.addModule('mouse', 'B', 'canvas', function (B, canvas) {
	"use strict";

	/**
	 * Module to manage mouse events
	 */

	var isMouseDown = false,
		isMouseMoving = false,
		mouseMoveOldPosition;

	/**
	 * Callback to be executed when the mouse is dragging the view (also used
	 * for the touchmove event).
	 * This fires the mousedrag event.
	 */
	function mouseDragged (newPosition) {
		var vector = [
				newPosition[0] - mouseMoveOldPosition[0],
				newPosition[1] - mouseMoveOldPosition[1]
			];
		mouseMoveOldPosition = newPosition;
		B.Events.fire('mousedrag', vector);
	}

	/**
	 * Utility method to get the mouse/touch coordinates in the canvas
	 */
	function eventToCanvasCoordinates (event) {
		var rect = canvas.canvas.getBoundingClientRect(),
			root = document.documentElement,
			mouseX = event.clientX - rect.left - root.scrollLeft,
			mouseY = event.clientY - rect.top - root.scrollTop;

		return [mouseX, mouseY];
	}

	/**
	 * Registers the mousedown event on the canvas, update the
	 * mouseMoveOldPosition variable to keep track of the mouse moves.
	 */
	canvas.canvas.addEventListener('mousedown', function (event) {
		isMouseDown = true;
		mouseMoveOldPosition = eventToCanvasCoordinates(event);
	});

	/**
	 * Registers the mousemove event on the canvas. Fires the mousemove event
	 * and if the mouse is down, also fires the mouse drag event.
	 */
	canvas.canvas.addEventListener('mousemove', function (event) {
		var newPosition = eventToCanvasCoordinates(event);
		B.Events.fire('mousemove', newPosition);
		if (!isMouseDown) {
			return;
		}

		isMouseMoving = true;
		mouseDragged(newPosition);
	});

	/**
	 * Registers the touchstart event on the canvas, update the
	 * mouseMoveOldPosition variable to keep track of the finger moves.
	 */
	canvas.canvas.addEventListener("touchstart", function (event) {
		var touch = event.changedTouches[0];
		mouseMoveOldPosition = eventToCanvasCoordinates(touch);
	}, false);

	/**
	 * Registers the touchmove event on the canvas. Fires the mouse drag event.
	 */
	canvas.canvas.addEventListener("touchmove", function (event) {
		event.preventDefault();
		var touch = event.changedTouches[0],
			touchPosition = eventToCanvasCoordinates(touch);
		mouseDragged(touchPosition);
	}, false);

	/**
	 * Registers the click event on the canvas and fires the event to the
	 * application
	 */
	canvas.canvas.addEventListener('click', function (event) {
		isMouseDown = false;

		if (isMouseMoving) {
			isMouseMoving = false;
			return;
		}

		B.Events.fire('click', eventToCanvasCoordinates(event));
	}, false);
});
