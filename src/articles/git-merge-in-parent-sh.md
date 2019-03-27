## git-merge-in-parent.sh

[This script](https://github.com/padawin/home_conf/blob/master/.self/bin/git-merge-in-parent.sh)
is a shortcut to merge a branch in another (typically a feature branch in a
master branch once the feature is finished).

It can be used from the branch to merge as:

	git-merge-in-parent.sh <PARENT_BRANCH>

and it does the equivalent of:

	git checkout <PARENT_BRANCH>
	git merge --no-ff <CHILD_BRANCH>
	# Save and quit your editor with the merge message

For example:

	ghislain@localhost (1): site (tips $) ✔
	> git rev-parse master
	640d9d078c59c0183e3abe6ae4b3edf6eb28d90f
	ghislain@localhost (1): site (tips $) ✔
	> git-merge-in-parent.sh master
	Switched to branch 'master'
	Your branch is ahead of 'origin/master' by 3 commits.
	  (use "git push" to publish your local commits)
	ghislain@localhost (1): site (master $>) ✔
	> git log --graph  -n4 --oneline
	*   ab5bd0e (HEAD -> master) Merge tips into master
	|\
	| * dd6b194 (tips) Vim tags completions tip added
	| * 478698c Git hook template tip added
	|/
	* 640d9d0 (origin/master, origin/HEAD) About page removed

I created it originally as a proof of concept/joke/tiny time saving, but ended
up using it regularly.

However, it had a side effect which made it very useful on a project which
contained a lot of large binary data. ```git checkout``` and ```git merge```
change the file system and the checkout/merge process would have done the
following:

- when checking master out, all the changes of the branch are removed (to change
		the file system at master's state),
- merging the branch re-introduces back those changes.

The checkout and merge were each few minutes long.

Instead, this script manually creates, from the branch to merge, a merge commit
with as parents the provided master branch and the child branch. But while doing
that, it does not move ```HEAD``` and so does not change the file system.

Then it moves the master branch to the newly created merge commit.

Finally checkout the master branch.

So the file system stays unchanged, making the whole operation instantaneous to
execute.
