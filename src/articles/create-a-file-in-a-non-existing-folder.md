<b>Published: May 2014</b>

## Create file in non existing folder

Copy this script in a mtouch file and add the execution bit:

	#!/bin/sh

	[ ! -z $1 ] && (mkdir -p `dirname $1`; touch $1)

Then run it as follow:

	/patch/to/mtouch /some/folder/which/does/not/exist/for/the/file/F

This will create the folder /some/folder/which/does/not/exist/for/the/file and
then touch the file F in this folder.
