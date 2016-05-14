#!/usr/bin/env sh

mkdir -p web-game/js
rm web-game/js/game.min.js
touch web-game/js/game.min.js
echo "" > web-game/js/game.min.js
echo src-game/js/lib/heapqueue.js
yui-compressor src-game/js/lib/heapqueue.js >> web-game/js/game.min.js
echo src-game/js/path-finding.js
yui-compressor src-game/js/path-finding.js >> web-game/js/game.min.js
echo src-game/js/inventory.js
yui-compressor src-game/js/inventory.js >> web-game/js/game.min.js
echo src-game/js/screen-size.js
yui-compressor src-game/js/screen-size.js >> web-game/js/game.min.js
echo web-game/js/message.js
yui-compressor src-game/js/message.js >> web-game/js/game.min.js
echo web-game/js/canvas.js
yui-compressor src-game/js/canvas.js >> web-game/js/game.min.js
echo web-game/js/GUI.js
yui-compressor src-game/js/GUI.js >> web-game/js/game.min.js
echo web-game/js/sprites.js
yui-compressor src-game/js/sprites.js >> web-game/js/game.min.js
echo web-game/js/level.js
yui-compressor src-game/js/level.js >> web-game/js/game.min.js
echo web-game/js/camera.js
yui-compressor src-game/js/camera.js >> web-game/js/game.min.js
echo web-game/js/character.js
yui-compressor src-game/js/character.js >> web-game/js/game.min.js
echo web-game/js/object.js
yui-compressor src-game/js/object.js >> web-game/js/game.min.js
echo web-game/js/map.js
yui-compressor src-game/js/map.js >> web-game/js/game.min.js
echo web-game/js/mouse.js
yui-compressor src-game/js/mouse.js >> web-game/js/game.min.js
echo web-game/js/particles.js
yui-compressor src-game/js/particles.js >> web-game/js/game.min.js
echo web-game/js/sky.js
yui-compressor src-game/js/sky.js >> web-game/js/game.min.js
echo web-game/js/engine.js
yui-compressor src-game/js/engine.js >> web-game/js/game.min.js
echo web-game/js/contactForm.js
yui-compressor src-game/js/contactForm.js >> web-game/js/game.min.js

# Replace in index.html
cp src-game/index.html web-game/index.html
perl -i -pe 'BEGIN{undef $/;} s#<!--\s*inject\s.*<!--\s*end inject\s*-->#<script type="text/javascript" src="js/game.min.js"></script>#smg' web-game/index.html
