#!/bin/sh

FILES=`find src/ -name "*.md"`

for f in $FILES
do
	DEST=`echo "$f" | sed 's#^src/#web/#' | sed 's#.md$#.html#'`
	DESTTMP="$DEST.tmp"
	mkdir -p `dirname "$DEST"`
	markdown "$f" > "$DESTTMP"
	cat src/header.inc.html "$DESTTMP" src/footer.inc.html > "$DEST"
	rm "$DESTTMP"
done
