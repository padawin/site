loader.addModule('sprites', function () {
	var spriteBoardUrl = 'sprite.png',
		spriteModule = {
			nbResources: 1,
			spriteResource: null,
			sprites: [
				{x: 0, y: 0, w: 64, h: 36, d: 73, walkable: true},
				{x: 64, y: 0, w: 64, h: 36, d: 73, walkable: true},
				{x: 128, y: 0, w: 64, h: 36, d: 73, walkable: true}
			],
			loadResources: function (loaded) {
				spriteModule.spriteResource = new Image();
				spriteModule.spriteResource.onload = loaded;
				spriteModule.spriteResource.src = spriteBoardUrl;
			}
		};

	return spriteModule;
});
