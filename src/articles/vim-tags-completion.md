## Vim tags completion

Vim autocompletion is great (:help ins-completion), line and path completions
are among my favourite. Vim also supports tags completion (CTRL-x CTRL-], to
jump to tags definition (for example a class, method or function definition).

However, it needs a
<a href="http://ctags.sourceforge.net/" target="_target">ctags</a> file defined
for it to work. Tim Pope described a very straightforward way to
<a href="https://tbaggery.com/2011/08/08/effortless-ctags-with-git.html" target="_blank">manage them using Git hooks</a>
along with
[templates](./git-hooks-template.html), it becomes completely transparent and
just works.

Once you have your ctags file ready, you can then set it up in your .vimrc with
the following:

	set tags+=/path/to/you/ctags/file

If you use Git hooks as described above, your line will probably be:

	set tags+=.git/tags

From this point, pressing CTRL-x CTRL-] should open the autocompletion menu with
the available tags.
