## Search and relace

### Search and Replace in one or multiple files

Single file:

	perl -pi -e 's/%SEARCHED_VALUE%/%REPLACE_VALUE%/g' file

Multiple files:

	files | xargs -I[] perl -pi -e 's/%SEARCHED_VALUE%/%REPLACE_VALUE%/g' []

example:

	ls *.txt | xargs -I[] perl -pi -e 's/%SEARCHED_VALUE%/%REPLACE_VALUE%/g' []

### Search and Replace in files and directories names

	rename 's/%SEARCHED_VALUE%/%REPLACE_VALUE%/' files
