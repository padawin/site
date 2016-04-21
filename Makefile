all: html css images

html:
	./bin/generate.sh

css:
	mkdir -p web/css
	cp src/css/* web/css/

images:
	mkdir -p web/images
	cp src/images/* web/images/
