#!/usr/bin/env bash

if [ "make" == "$1" ]
then
	rm src-game/js/game.min.js
	touch src-game/js/game.min.js
	echo "" > src-game/js/game.min.js
	echo src-game/js/lib/heapqueue.js
	yuicompressor src-game/js/lib/heapqueue.js >> src-game/js/game.min.js
	echo src-game/js/path-finding.js
	yuicompressor src-game/js/path-finding.js >> src-game/js/game.min.js
	echo src-game/js/inventory.js
	yuicompressor src-game/js/inventory.js >> src-game/js/game.min.js
	echo src-game/js/screen-size.js
	yuicompressor src-game/js/screen-size.js >> src-game/js/game.min.js
	echo src-game/js/message.js
	yuicompressor src-game/js/message.js >> src-game/js/game.min.js
	echo src-game/js/canvas.js
	yuicompressor src-game/js/canvas.js >> src-game/js/game.min.js
	echo src-game/js/GUI.js
	yuicompressor src-game/js/GUI.js >> src-game/js/game.min.js
	echo src-game/js/sprites.js
	yuicompressor src-game/js/sprites.js >> src-game/js/game.min.js
	echo src-game/js/level.js
	yuicompressor src-game/js/level.js >> src-game/js/game.min.js
	echo src-game/js/camera.js
	yuicompressor src-game/js/camera.js >> src-game/js/game.min.js
	echo src-game/js/character.js
	yuicompressor src-game/js/character.js >> src-game/js/game.min.js
	echo src-game/js/object.js
	yuicompressor src-game/js/object.js >> src-game/js/game.min.js
	echo src-game/js/map.js
	yuicompressor src-game/js/map.js >> src-game/js/game.min.js
	echo src-game/js/mouse.js
	yuicompressor src-game/js/mouse.js >> src-game/js/game.min.js
	echo src-game/js/particles.js
	yuicompressor src-game/js/particles.js >> src-game/js/game.min.js
	echo src-game/js/sky.js
	yuicompressor src-game/js/sky.js >> src-game/js/game.min.js
	echo src-game/js/engine.js
	yuicompressor src-game/js/engine.js >> src-game/js/game.min.js
	exit 0
fi

if [ "$1" == "deploy" ]
then
	mkdir -p web-game/js
	cp src-game/js/game.min.js web-game/js/game.min.js
	# Replace in index.html
	cp src-game/index.html web-game/index.html
	perl -i -pe 'BEGIN{undef $/;} s#<!--\s*inject\s.*<!--\s*end inject\s*-->#<script type="text/javascript" src="js/game.min.js"></script>#smg' web-game/index.html
	exit 0
fi

echo "Nothing asked, exiting"
exit 1
