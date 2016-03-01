all: html css

html:
	./bin/generate.sh

css:
	mkdir -p web/css
	cp src/css/* web/css/
