loader.addModule('sprites', function () {
	var spriteBoardUrl = 'sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			SPRITES_ACCESS: {
				PLAYER: 3
			},
			sprites: [
				// grass
				{x: 0, y: 0, w: 64, h: 36, d: 73, walkable: true},
				// stone
				{x: 64, y: 0, w: 64, h: 36, d: 73, walkable: true},
				// stairs
				{x: 128, y: 0, w: 64, h: 36, d: 73, walkable: true},
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
