all: site game

site: html css images

game: js-game-min js-game css-game images-game

html:
	./bin/generate.sh

js:
	cp -r src/js/ web

css:
	mkdir -p web/css
	cp src/css/* web/css/

images:
	mkdir -p web/images
	cp -r src/images/* web/images/

js-game-min:
	./bin/minify-js.sh make

js-game:
	./bin/minify-js.sh deploy

css-game:
	mkdir -p web-game/css
	cp src-game/css/* web-game/css/

images-game:
	mkdir -p web-game/images
	cp src-game/images/* web-game/images/
