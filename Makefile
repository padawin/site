all: html css images js-game css-game images-game

html:
	./bin/generate.sh

css:
	mkdir -p web/css
	cp src/css/* web/css/

images:
	mkdir -p web/images
	cp -r src/images/* web/images/

js-game:
	./bin/minify-js.sh

css-game:
	mkdir -p web-game/css
	cp src-game/css/* web-game/css/

images-game:
	mkdir -p web-game/images
	cp src-game/images/* web-game/images/
