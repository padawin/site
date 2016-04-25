loader.addModule('mouse', 'B', 'canvas', function (B, canvas) {
	var coordinates,
		isMouseDown = false;

	canvas.canvas.addEventListener('click', function (event) {
		var rect = canvas.canvas.getBoundingClientRect(),
			root = document.documentElement,
			mouseX = event.clientX - rect.left - root.scrollLeft,
			mouseY = event.clientY - rect.top - root.scrollTop;

		B.Events.fire('click', [mouseX, mouseY]);
	}, false);
});
