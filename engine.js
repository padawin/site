(function () {
	var canvas = document.getElementById('myCanvas'),
		canvasContext = canvas.getContext('2d'),
		map = [
			[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
			[[0, 1], [1, 1], [1, 1], [3, 1], [4, 1]],
			[[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
			[[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]],
			[[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
		],
		camera = {x:0, y:0},
		spriteBoard,
		spriteBoardUrl = 'sprite.png';

	function Map (m) {
		this.map = m;
	}

	Map.prototype.draw = function (camera) {
		var x = 0,
			y = 0,
			level = 0,
			startX = 0,
			max = this.map.length - 1;
		do {
			// end of a row
			if (x == level) {
				// top half of the map
				if (level < max) {
					level++;
				}
				// bottom half of the map
				else {
					startX++;
				}
				y = level;
				x = startX;
			}
			else {
				y--;
				x++;
			}
		} while (x != max || y != max);
	};

	function loadResources (callback) {
		spriteBoard = new Image();
		spriteBoard.onload = function () {
			callback();
		};
		spriteBoard.src = spriteBoardUrl;
	}

	loadResources(function () {
		m = new Map(map);
		m.draw(camera);
	})

	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resizeCanvas();
})();
