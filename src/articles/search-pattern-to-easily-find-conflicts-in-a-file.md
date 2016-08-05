<b>Published: 1st March 2014</b>

## Search pattern to easily find a conflict in a file

When, during a merge, a rebase, a stash apply/pop, a conflict occurs, browsing
the conflicting file to find the conflicts may be boring.

Here is a vim search to search the lines containing a begining ( <<<<< ), middle
( ===== ) or end ( >>>>> ) of all the conflicts of the file:

	/\(<<<<\|====\|>>>>\)

Because it's a bit bothering to remember, here is a mapping to write in a .vimrc:

	map gn /\(<<<<\\|====\\|>>>>\)<CR>

Once in the .vimrc file, type "gn" to search for this string. Type then 'n' to
go to the next match.

From that, when I want to remove a whole section of a conflict, I go to the
start of the section to delete (<<<<< or =====), type 'd' and then 'n' to reach
the end of the part, which will delete it.
