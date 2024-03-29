loader.addModule('level', 'sprites', function (sprites) {
	var n = null;
	return {
		gridCellsDimensions: {w: 64, h: 36},
		ground: [
			[0, 0, 2, n, n, n, n, n, n, n, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, n, n, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0],
			[3, n, n, n, 0, 3, n, n, n, n, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, n, n, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[n, n, 8, 3, 0, n, n, 8, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, n, n, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 3, 0],
			[n, 0, 0, 2, n, n, 8, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[n, n, n, n, n, 1, 1, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, n, n, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[n, n, 0, 3, 0, 0, 1, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, 7, n, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[n, n, 0, 0, 0, 0, 1, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, n, 7, n, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[n, n, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, n, 7, n, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
			[n, n, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, n, 7, n, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[n, n, n, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n, 7, n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[n, n, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n, 7, n, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3],
			[n, n, n, 0, 0, 0, 0, 1, 2, n, n, n, n, n, n, n, n, n, n, n, 8, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, 0, 0, 0, 0, 0, n, n, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, 0, 0, 3, 0, 0, n, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, 8, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
			[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n]
		],
		walkables: [
			[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		objects: [
			{x: 10, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 1, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 2, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 3, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 4, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 5, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 10, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 11, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 12, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 13, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 14, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 15, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 16, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 17, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 1, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 2, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 4, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 5, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 18, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 17, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 16, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 15, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 13, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 12, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 11, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 14, y: 3, sprite: sprites.sprites[sprites.SPRITES_ACCESS.SCROLL],
				canBeTaken: true, name: 'CV', icon: 'images/cv.png',
				onopen: function () {
					window.open('http://www.ghislain-rodrigues.fr/CV-Ghislain-Rodrigues.pdf');
				}
			},
			{x: 7, y: 13, sprite: sprites.sprites[sprites.SPRITES_ACCESS.ROCK]},
			{x: 20, y: 14, sprite: sprites.sprites[sprites.SPRITES_ACCESS.ROCK]},
			{x: 18, y: 7, sprite: sprites.sprites[sprites.SPRITES_ACCESS.ROCK]},
			{x: 11, y: 15, sprite: sprites.sprites[sprites.SPRITES_ACCESS.SMALL_ROCK]},
			{x: 13, y: 10, sprite: sprites.sprites[sprites.SPRITES_ACCESS.SMALL_ROCK]},
			{x: 2, y: 5, sprite: sprites.sprites[sprites.SPRITES_ACCESS.SMALL_ROCK]},
			{x: 4, y: 10, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE]},
			{x: 10, y: 7, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE]},
			{x: 8, y: 3, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE_LARGE]},
			{x: 1, y: 3, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE_LARGE]},
			{x: 19, y: 12, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE_LARGE]},
			{x: 14, y: 1, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TABLE]},
			{x: 4, y: 12, sprite: sprites.sprites[sprites.SPRITES_ACCESS.CAMERA],
				canBeTaken: true, name: 'My pictures', icon: 'images/camera.png',
				onopen: function () {
					window.open('https://travels.ghislain-rodrigues.fr/');
				}
			},
			{x: 17, y: 17, sprite: sprites.sprites[sprites.SPRITES_ACCESS.OCTOCAT],
				canBeTaken: true, name: 'Github', icon: 'images/Octocat.png',
				onopen: function () {
					window.open('https://github.com/padawin/');
				}
			},
			{x: 22, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 28, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 22, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 28, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.WALL]},
			{x: 25, y: 8, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE]},
			{x: 32, y: 5, sprite: sprites.sprites[sprites.SPRITES_ACCESS.TREE_LARGE]},
			{x: 25, y: 6, sprite: sprites.sprites[sprites.SPRITES_ACCESS.FLOODIT],
				canBeTaken: true, name: 'Floodit', icon: 'images/floodit.png',
				onopen: function () {
					window.open('https://github.com/padawin/floodit-clone');
				}
			},
			{x: 25, y: 0, sprite: sprites.sprites[sprites.SPRITES_ACCESS.ROGUE_CARD],
				canBeTaken: true, name: 'Rogue Card', icon: 'images/rogue-card.png',
				onopen: function () {
					window.open('https://github.com/padawin/RogueCard');
				}
			},
		]
	};
});
