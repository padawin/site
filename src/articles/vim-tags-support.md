## Vim tags support

Vim autocompletion is great (```:help ins-completion```), line and path
completions are among my favourite. Vim also supports tags completion (```CTRL-x
CTRL-]```), to jump to symbols definition (for example a class, method or
function definition).

However, it needs a
<a href="http://ctags.sourceforge.net/" target="_target">ctags</a> file defined
for it to work.

### Set up tags

I heavily inspired myself on Tim Pope's
<a href="https://tbaggery.com/2011/08/08/effortless-ctags-with-git.html" target="_blank">explanations</a>.

This way, the tags are updated after every checkout, rebase, commit and merge.
However, one of these Git manipulations is needed to update the tags. If a new
symbol (method/class/property/...) is created, it will only be added in the tags
at the next Git command.

A solution to that is to also generate them when Vim saves a file.

First, move the ```ctags``` file from the Git templates directory to a directory
listed in ```$PATH``` (and renamed, to not shadow the needed original
```ctags``` program) to be globally accessible:

	sudo mv ~/.git_template/hooks/ctags /usr/local/bin/ctags-gen

Then, make sure that the script does not do anything in case it is called out of
a Git repository (you don't want Vim to scream about it when you write a random
file), so let's add an exit if `git status` fails:

	 #!/bin/sh
	 set -e

	+git status > /dev/null 2>&1 || exit

	 PATH="/usr/local/bin:$PATH"
	 dir="`git rev-parse --git-dir`"
	 trap 'rm -f "$dir/$$.tags"' EXIT
	 git ls-files | \
	 	ctags --tag-relative -L - -f"$dir/$$.tags" \
	 	--languages=python,php,c,c++
	 mv "$dir/$$.tags" "$dir/tags"

Then all the hooks need to be renamed to call this new script, as a global
command. They will then look as follow (in my case, I renamed the script as
```ctags-gen```):

	#!/bin/sh
	ctags-gen >/dev/null 2>&1 &

Finally, in your ```vimrc```, you can add the following hook:

	autocmd BufWritePost * silent !ctags-gen

to call ```ctags-gen``` everytime a buffer is saved.

### Use tags in Vim

Once you have your ctags file ready, you can then set it up in your .vimrc with
the following:

	set tags+=.git/tags

Now that you have tags set up, you can use them to autocomplete using
```CTRL-x CTRL-]``` in INSERT mode and you can jump to the definition of the
symbol under the cursor by pressing ```CTRL-]``` in NORMAL mode.
