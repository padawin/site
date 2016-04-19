(function () {
	var canvas = document.getElementById('myCanvas'),
		canvasContext = canvas.getContext('2d'),
		map = [
			[0, 0   , null, null, null, null, null, null, null, null],
			[0, 3   , 8, 0   , 0   , null, null, null, null, null],
			[0, 8, 8, 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[2, 2, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[2, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[5, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[5, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[5, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[5, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[5, 0, 0   , 1   , 0   , 0   , 0   , 0   , 0   , 0   ],
			[7, 0   , 0   , 1   , 3   , 8   , 4   , 4   , 4   , 4   ]
		],
		camera = {x:0, y:0},
		spriteBoard,
		spriteBoardUrl = 'sprite.png',
		tileDimensions = {w: 64, h: 36, d: 73},
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
			coordX = (mapSize.w - (y - x) * tileDimensions.w) / 2;
			coordY = (x + y + 1) *  tileDimensions.h / 2;
			if (this.map[y][x] !== null) {
				canvasContext.drawImage(spriteBoard,
					this.map[y][x] * tileDimensions.w, 0,
					tileDimensions.w, tileDimensions.d,
					coordX - relativeTopCornerTile.x, coordY - relativeTopCornerTile.y,
					tileDimensions.w, tileDimensions.d
				);
			}

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
