loader.addModule('sprites', function () {
	var spriteBoardUrl = 'images/sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			SPRITES_ACCESS: {
				STAIR: 2,
				FLOWERS: 3,
				PLAYER_RIGHT: 9,
				PLAYER_LEFT: 10,
				PLAYER_MOVE_LEFT: 11,
				PLAYER_MOVE_RIGHT: 12,
				PLAYER_MOVE_UP_LEFT: 13,
				PLAYER_MOVE_UP_RIGHT: 14,
				WALL: 15,
				SCROLL: 16,
				ROCK: 17,
				SMALL_ROCK: 18,
				TREE: 19,
				TREE_LARGE: 20,
				TABLE: 21,
				CAMERA: 22,
				OCTOCAT: 23
			},
			sprites: [
				// grass
				{x: 0, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// stone
				{x: 64, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// stairs
				{x: 128, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 2, y: 1}, down: {x: 0, y: 1}}
				},
				// flowers
				{
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}},
					animation: [
						{x: 192, y: 0, w: 64, h: 36, d: 73},
						{x: 256, y: 0, w: 64, h: 36, d: 73}
					]
				},
				// water
				{
					animation: [
						{x: 320, y: 0, w: 64, h: 36, d: 73},
						{x: 384, y: 0, w: 64, h: 36, d: 73}
					]
				},
				// sand
				{x: 448, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// sand
				{x: 512, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// grass shadow
				{x: 576, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// grass shadow corner
				{x: 640, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// player right
				{x: 0, y: 73, w: 28, h: 60, posInCell: {x: 14, y: 52}},
				// player left
				{x: 28, y: 73, w: 28, h: 60, posInCell: {x: 14, y: 52}},
				// player move left
				{animation: [
					{x: 56, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 92, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}},
					{x: 112, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 148, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}}
				]},
				// player move right
				{animation: [
					{x: 168, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 204, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}},
					{x: 224, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 260, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}}
				]},
				// player move up left
				{animation: [
					{x: 280, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 316, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}},
					{x: 336, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 372, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}}
				]},
				// player move up right
				{animation: [
					{x: 392, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 428, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}},
					{x: 448, y: 73, w: 36, h: 60, posInCell: {x: 18, y: 52}},
					{x: 484, y: 73, w: 20, h: 60, posInCell: {x: 8, y: 52}}
				]},
				// wall
				{x: 0, y: 133, w: 64, h: 73, d: 73, posInCell: {x: 32, y: 55}},
				// scroll
				{animation: [
					{x: 64, y: 133, w: 38, h: 73, d: 73, posInCell: {x: 19, y: 57}},
					{x: 102, y: 133, w: 38, h: 73, d: 73, posInCell: {x: 19, y: 57}},
					{x: 64, y: 133, w: 38, h: 73, d: 73, posInCell: {x: 19, y: 57}},
					{x: 140, y: 133, w: 38, h: 73, d: 73, posInCell: {x: 19, y: 57}}
				]},
				// rock
				{x: 178, y: 138, w: 42, h: 26, posInCell: {x: 23, y: 18}},
				// small rock
				{x: 166, y: 200, w: 54, h: 21, posInCell: {x: 26, y: 12}},
				// tree
				{x: 220, y: 133, w: 58, h: 82, posInCell: {x: 30, y: 72}},
				// tree large
				{x: 504, y: 76, w: 79, h: 144, posInCell: {x: 30, y: 125}},
				// table
				{x: 278, y: 136, w: 108, h: 78, posInCell: {x: 60, y: 50}},
				// camera
				{animation: [
					{x: 583, y: 73, w: 42, h: 42, posInCell: {x: 20, y: 30}},
					{x: 583, y: 115, w: 42, h: 44, posInCell: {x: 20, y: 32}},
					{x: 583, y: 73, w: 42, h: 42, posInCell: {x: 20, y: 30}},
					{x: 583, y: 159, w: 42, h: 40, posInCell: {x: 20, y: 28}}
				]},
				// Octocat
				{x: 386, y: 135, w: 76, h: 66, posInCell: {x: 38, y: 58}}
			],
			loadResources: function (loaded) {
				spriteModule.spriteResource = new Image();
				spriteModule.spriteResource.onload = loaded;
				spriteModule.spriteResource.src = spriteBoardUrl;
			}
		};

	return spriteModule;
});
