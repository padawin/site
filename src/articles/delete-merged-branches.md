## Delete merged branches

In Git, because a branch is only a reference to a commit, once it is merged,
there is no use keeping it.

However, with time it is possible to end up with a lot of old branches if they
haven't been deleted as they were merged.

### Delete a single branch

To delete a local branch, run:

	git branch -d branchName

the -d option stands for delete. If the branch is not merged in the branch you
are currently checked out on, the deletion will fail (to prevent you from losing
commits), if you still want to delete it, use the -D option instead of -d, to
force the deletion.

To delete a remote branch, run:

	git push origin :branchName

The colon is what triggers the deletion, more information about it in the
official doc of git push (```man git-push```), in the section about the
<refspec> option.

### Delete multiple branches

When deleting branches, as many branches can be passed (ed ```git branch -d
branch1 branch2 branch3``` and ```git push origin :branch1 :branch2 :branch3```)
but if you have a lot, it can be a hassle. So let's script all that.

First, we need the branches merged branches:

	git branch --merged

This lists the branches merged in the branch you currently are on, so make sure
you are on master (or on the relevant branch for you).

To list the remote branches which are merged, the -r option is needed:

	git branch -r --merged

It also includes the branch you are on, so we want to exclude it:

	git branch --merged | egrep -v '(master|any|other|branches|you|want|to|keep)'

For the remote branches only, it will display them with the remote name, let's
clean it (I use origin here, use the remote name you use) and add the colon:

	git branch -r --merged | egrep -v '(master)' | sed -e 's#origin/# :#g'

Also, if you have more than one origin, you will want to filter on a specific
one:

	git branch -r --merged | grep 'yourRemoteName/' | ...

Finally, we need to use this command to generate the list of branches to delete.
It then needs to be fed to the delete command:

	# local branches
	git branch -d $(git branch --merged | egrep -v '(master)')

	# remote branches
	git push origin $(git branch -r --merged | egrep -v '(master)' | sed -e 's#origin/# :#g')

### Forget about deleted branches

When someone deletes a remote branch, the other clones of the project don't see
them as deleted. To stop keeping track of the deleted branches, run:

	git fetch -p origin

or

	git remote update -p

The -p option stands for prune and in my opinion should always be used, for the
sake of your clone's tidiness.
