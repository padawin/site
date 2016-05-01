loader.addModule('sprites', function () {
	var spriteBoardUrl = 'images/sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			SPRITES_ACCESS: {
				STAIR: 2,
				PLAYER_RIGHT: 3,
				PLAYER_LEFT: 4,
				PLAYER_MOVE_LEFT: 5,
				PLAYER_MOVE_RIGHT: 6
			},
			sprites: [
				// grass
				{x: 0, y: 0, w: 64, h: 36, d: 73, walkable: true,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// stone
				{x: 64, y: 0, w: 64, h: 36, d: 73, walkable: true,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}}
				},
				// stairs
				{x: 128, y: 0, w: 64, h: 36, d: 73, walkable: true,
					neighbours: {left: {x: -1, y: 0}, up: {x: 0, y: -1}, right: {x: 2, y: 1}, down: {x: 0, y: 1}}
				},
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
