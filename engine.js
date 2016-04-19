(function () {
	var canvas = document.getElementById('myCanvas'),
		canvasContext = canvas.getContext('2d'),
		map = [
			[0, 1, 0, 0, 0],
			[0, 0, 1, 2, 2],
			[0, 0, 1, 2, 2],
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
		var x = 0, coordX,
			y = 0, coordY,
			level = 0,
			startX = 0,
			max = this.map.length - 1,
			relativeTopCornerTile = {
				x: tileDimensions.w / 2,
				y: tileDimensions.h / 2
			};

		while (x <= max && y <= max) {
			// where to print the tiles
			coordX = (mapSize.w - (x - y) * tileDimensions.w) / 2;
			coordY = (x + y + 1) *  tileDimensions.h / 2;
			canvasContext.drawImage(spriteBoard,
				this.map[y][x] * tileDimensions.w, 0,
				tileDimensions.w, tileDimensions.h,
				coordX - relativeTopCornerTile.x, coordY - relativeTopCornerTile.y,
				tileDimensions.w, tileDimensions.h
			);

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
		}


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
