all: js-game css-game images-game

js-game:
	./bin/minify-js.sh

css-game:
	mkdir -p web-game/css
	cp src-game/css/* web-game/css/

images-game:
	mkdir -p web-game/images
	cp src-game/images/* web-game/images/
