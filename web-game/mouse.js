loader.addModule('mouse', 'B', 'canvas', function (B, canvas) {
	var isMouseDown = false,
		isMouseMoving = false;

	canvas.canvas.addEventListener('mousedown', function (event) {
		isMouseDown = true;
	});

	canvas.canvas.addEventListener('mousemove', function (event) {
		if (isMouseDown) {
			isMouseMoving = true;
		}
	});

	canvas.canvas.addEventListener('click', function (event) {
		isMouseDown = false;

		if (isMouseMoving) {
			isMouseMoving = false;
			return;
		}

		var rect = canvas.canvas.getBoundingClientRect(),
			root = document.documentElement,
			mouseX = event.clientX - rect.left - root.scrollLeft,
			mouseY = event.clientY - rect.top - root.scrollTop;

		B.Events.fire('click', [mouseX, mouseY]);
	}, false);
});
