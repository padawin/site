#!/usr/bin/env bash

if [ "make" == "$1" ]
then
	rm src-game/js/game.min.js
	touch src-game/js/game.min.js
	echo "" > src-game/js/game.min.js
	echo src-game/js/lib/heapqueue.js
	yui-compressor src-game/js/lib/heapqueue.js >> src-game/js/game.min.js
	echo src-game/js/path-finding.js
	yui-compressor src-game/js/path-finding.js >> src-game/js/game.min.js
	echo src-game/js/inventory.js
	yui-compressor src-game/js/inventory.js >> src-game/js/game.min.js
	echo src-game/js/screen-size.js
	yui-compressor src-game/js/screen-size.js >> src-game/js/game.min.js
	echo web-game/js/message.js
	yui-compressor src-game/js/message.js >> src-game/js/game.min.js
	echo web-game/js/canvas.js
	yui-compressor src-game/js/canvas.js >> src-game/js/game.min.js
	echo web-game/js/GUI.js
	yui-compressor src-game/js/GUI.js >> src-game/js/game.min.js
	echo web-game/js/sprites.js
	yui-compressor src-game/js/sprites.js >> src-game/js/game.min.js
	echo web-game/js/level.js
	yui-compressor src-game/js/level.js >> src-game/js/game.min.js
	echo web-game/js/camera.js
	yui-compressor src-game/js/camera.js >> src-game/js/game.min.js
	echo web-game/js/character.js
	yui-compressor src-game/js/character.js >> src-game/js/game.min.js
	echo web-game/js/object.js
	yui-compressor src-game/js/object.js >> src-game/js/game.min.js
	echo web-game/js/map.js
	yui-compressor src-game/js/map.js >> src-game/js/game.min.js
	echo web-game/js/mouse.js
	yui-compressor src-game/js/mouse.js >> src-game/js/game.min.js
	echo web-game/js/particles.js
	yui-compressor src-game/js/particles.js >> src-game/js/game.min.js
	echo web-game/js/sky.js
	yui-compressor src-game/js/sky.js >> src-game/js/game.min.js
	echo web-game/js/engine.js
	yui-compressor src-game/js/engine.js >> src-game/js/game.min.js
	echo web-game/js/contactForm.js
	yui-compressor src-game/js/contactForm.js >> src-game/js/game.min.js
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
