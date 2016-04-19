(function () {
	var canvas = document.getElementById('myCanvas'),
		canvasContext = canvas.getContext('2d'),
		map = [
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 1, 1, 0],
			[0, 1, 0, 1, 0],
			[0, 0, 0, 0, 0],
		],
		camera = {x:0, y:0},
		spriteBoard,
		spriteBoardUrl = 'sprite.png',
		tileDimensions = {w: 64, h: 36},
		mapSize = {
			// assumes square map
			w: map.length * tileDimensions.w,
			h: map.length * tileDimensions.h
		};

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
