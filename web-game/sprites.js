loader.addModule('sprites', function () {
	var spriteBoardUrl = 'sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			SPRITES_ACCESS: {
				STAIR: 2,
				PLAYER: 3
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
				// player
				{x: 0, y: 73, w: 64, h: 64, posInCell: {x: 32, y: 44}},
			],
			loadResources: function (loaded) {
				spriteModule.spriteResource = new Image();
				spriteModule.spriteResource.onload = loaded;
				spriteModule.spriteResource.src = spriteBoardUrl;
			}
		};

	return spriteModule;
});
