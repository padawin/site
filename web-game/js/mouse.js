loader.addModule('mouse', 'B', 'canvas', function (B, canvas) {
	var isMouseDown = false,
		isMouseMoving = false,
		mouseMoveOldPosition;

	function mouseMove (event) {
		var newPosition = eventToCanvasCoordinates(event),
			vector = [
				newPosition[0] - mouseMoveOldPosition[0],
				newPosition[1] - mouseMoveOldPosition[1]
			];
		mouseMoveOldPosition = newPosition;
		B.Events.fire('mousedrag', vector);
	}

	function eventToCanvasCoordinates (event) {
		var rect = canvas.canvas.getBoundingClientRect(),
			root = document.documentElement,
			mouseX = event.clientX - rect.left - root.scrollLeft,
			mouseY = event.clientY - rect.top - root.scrollTop;

		return [mouseX, mouseY];
	}

	canvas.canvas.addEventListener('mousedown', function (event) {
		isMouseDown = true;
		mouseMoveOldPosition = eventToCanvasCoordinates(event);
	});

	canvas.canvas.addEventListener('mousemove', function (event) {
		if (!isMouseDown) {
			return;
		}

		isMouseMoving = true;
		mouseMove(event);
	});

	canvas.canvas.addEventListener("touchstart", function (event) {
		var touch = event.changedTouches[0];
		mouseMoveOldPosition = eventToCanvasCoordinates(touch);
	}, false);

	canvas.canvas.addEventListener("touchmove", function (event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		mouseMove(touch);
	}, false);

	canvas.canvas.addEventListener('click', function (event) {
		isMouseDown = false;

		if (isMouseMoving) {
			isMouseMoving = false;
			return;
		}

		B.Events.fire('click', eventToCanvasCoordinates(event));
	}, false);
});
