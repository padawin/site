loader.addModule('mouse', 'B', 'canvas', function (B, canvas) {
	var isMouseDown = false,
		isMouseMoving = false;

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
	});

	canvas.canvas.addEventListener('click', function (event) {
		isMouseDown = false;

		if (isMouseMoving) {
			isMouseMoving = false;
			return;
		}

		B.Events.fire('click', eventToCanvasCoordinates(event));
	}, false);
});
