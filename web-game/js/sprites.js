loader.addModule('sprites', function () {
	var spriteBoardUrl = 'images/sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			SPRITES_ACCESS: {
				STAIR: 2,
				FLOWERS: 3,
				WALL: 6,
				PLAYER_RIGHT: 7,
				PLAYER_LEFT: 8,
				PLAYER_MOVE_LEFT: 9,
				PLAYER_MOVE_RIGHT: 10,
				PLAYER_MOVE_UP_LEFT: 11,
				PLAYER_MOVE_UP_RIGHT: 12
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
						{x: 384, y: 0, w: 64, h: 36, d: 73},
						{x: 448, y: 0, w: 64, h: 36, d: 73}
					]
				},
				// sand
				{x: 512, y: 0, w: 64, h: 36, d: 73,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// wall
				{x: 320, y: 0, w: 64, h: 73, d: 73, posInCell: {x: 32, y: 55}},
				// player right
				{x: 0, y: 73, w: 28, h: 56, posInCell: {x: 14, y: 52}},
				// player left
				{x: 28, y: 73, w: 28, h: 56, posInCell: {x: 14, y: 52}},
				// player move left
				{animation: [
					{x: 56, y: 73, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 92, y: 73, w: 16, h: 56, posInCell: {x: 8, y: 52}},
					{x: 108, y: 73, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 144, y: 73, w: 16, h: 56, posInCell: {x: 8, y: 52}}
				]},
				// player move right
				{animation: [
					{x: 160, y: 73, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 196, y: 73, w: 16, h: 56, posInCell: {x: 8, y: 52}},
					{x: 212, y: 73, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 248, y: 73, w: 16, h: 56, posInCell: {x: 8, y: 52}}
				]},
				// player move up left
				{animation: [
					{x: 56, y: 129, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 92, y: 129, w: 16, h: 56, posInCell: {x: 8, y: 52}},
					{x: 108, y: 129, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 144, y: 129, w: 16, h: 56, posInCell: {x: 8, y: 52}}
				]},
				// player move up right
				{animation: [
					{x: 160, y: 129, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 196, y: 129, w: 16, h: 56, posInCell: {x: 8, y: 52}},
					{x: 212, y: 129, w: 36, h: 56, posInCell: {x: 18, y: 52}},
					{x: 248, y: 129, w: 16, h: 56, posInCell: {x: 8, y: 52}}
				]}
			],
			loadResources: function (loaded) {
				spriteModule.spriteResource = new Image();
				spriteModule.spriteResource.onload = loaded;
				spriteModule.spriteResource.src = spriteBoardUrl;
			}
		};

	return spriteModule;
});
