## Getting a language manual in Vim

The ```K``` command opens in a new buffer the manual of the word under the
cursor.

For example, if the edited file is a C, or a bash file, pressing ```K``` on a
command will open ```man <the-command>```. If the edited file is a python file,
pressing ```K``` will open ```pydoc```.

### Set custom help commands

First you need to have the filetype plugin enabled in vim, to do so, add the
following line in your ```.vimrc```:

	filetype plugin on

Then, create the directory ```~/.vim/ftplugin/```. In this directory, you can
add vimscripts executed only for the desired filetypes. For example, if you want
some script and configuration for PHP only, create the directory
```~/.vim/ftplugin/php/``` and any vim script in it will be executed only when
editing PHP files.

So, let's say we want to open [php.net](https://php.net) when pressing ```K```
on a function in a PHP file.

First we need to create a program to open php.net:


	#!/bin/bash

	firefox https://php.net/$1 &

Then, we need to define in Vim that ```K``` must run the previously created
script instead of ```man``` in PHP files. For that, create a ```.vim``` script
in ```~/.vim/ftplugin/php/``` with the following line:

	set keywordprg='/path/to/the/bash/script/above'

From this point, if you press ```K``` in a php file, it will open php.net.
