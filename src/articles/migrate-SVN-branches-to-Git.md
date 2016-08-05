<b>Published: December 2014</b>

## Migrate SVN branches to Git

### Context

During a migration from SVN to Git, I faced the following situation:

In SVN, when a branch is created, it contains a single commit being the whole
code base.

In Git, a branch is just a symbolic link (kind of) to a commit. So when a branch
is created from master, the branch's history is the same as master's.

After migrating the SVN branches in the Git repository, each branch had a
different starting point, which made things complicated when the branch had to
be merged back in master (many conflicts of files existing in both branches).

So I wrote a script to recreate the branch to base them on the commit they've
been created from.

### Explanations


### Get the branch's first commit


First, I had to find the branch's first commit:

	BRANCH_FIRST_COMMIT=`git rev-list $BRANCH | tail -n 1`

### Find the commit where BRANCH\_FIRST\_COMMIT comes from


Then, I had to find in the parent, when the branch has been created. For that, I
looped in the target's rev-list starting from the last:

	COMMIT=$TARGET
	DIFF='1'
	while [ ! -z "$DIFF" ]
	do
		COMMIT=`git rev-list $COMMIT^ | head -n 1`
		DIFF=`git diff $BRANCH_FIRST_COMMIT $COMMIT | head -n 1`
	done

### Recreate the branch


Once the commit had been found, I recreated the branch from this commit. I did
that by creating a new branch and cherry-picking all the original branch's
commits (except for the first one, which is the branch creation) in the newly
created:

	git branch tmp-$BRANCH $COMMIT
	git checkout tmp-$BRANCH
	git rev-list $BRANCH_FIRST_COMMIT..$BRANCH | tac | awk 'NR > 0 { print }' | xargs -I [] sh -c "git cherry-pick []"

### Replace the branches


Finally, I replaced the original branch by the newly created:

	git checkout $BRANCH
	git branch -m $BRANCH-old
	git checkout tmp-$BRANCH
	git branch -m $BRANCH

### Global version


The whole script can be found at https://gist.github.com/padawin/9899f82913d237c1fd5c
