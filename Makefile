all:
	./bin/generate.sh
	mkdir -p web/css
	cp src/css/* web/css/
