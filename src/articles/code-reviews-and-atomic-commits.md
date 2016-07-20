## Code reviews and atomic commits

Reviewing code is crucial to create an application of quality. However, it
takes time and doing it fast often leads to mistakes.

One of the bottleneck of a code review is that the reviewer has to figure out
what the code is doing, and so must have a process of thoughts similar to the
developer's who wrote the code.

That is where Git comes in the game. In this article, I will describe how to
use it to get a review-friendly versioned code.

This will require some adjustments in the way of using Git for both the
developer and the reviewer.

Let's describe the workflow of the reviewer, then the developer's.

### Overall review process

The review is split in 2 parts, a read of the code commits per commits, then
a global read of the changes in the branch.

When you read a story (like a novel), it is the action of going through it step
by step which makes you understanding it. If the story is described as the list
of the locations with their state before and after the story, you will have no
clue about what happened. Reviewing a code is the same.

First, read the commit logs in the *chronological* order:

	git log master..yourBranch --patch --reverse

The --patch option will show each commit's patch to see their changes and
the --reverse option list the commits from the oldest to the newest.

This will give something like (the oneline is for the sake of the article's
length):

	> git log --format=oneline  master..myBranch -p --reverse
	7c60619023e37b9a9deab27807ac98570bc92236 a file added
	diff --git a/bar b/bar
	new file mode 100644
	index 0000000..5716ca5
	--- /dev/null
	+++ b/aFile
	@@ -0,0 +1 @@
	+Some content in my file
	0aec057d30d128930ae964891d23752092d06b1c bar changed
	diff --git a/bar b/bar
	index 5716ca5..a486f1a 100644
	--- a/bar
	+++ b/bar
	@@ -1 +1,2 @@
	 Some content in my file
	+Some new content in my file

This way, the reviewer can see the evolution of the code from the beginning
until the final goal is reached.

Then, an overall look is still needed, for that a diff is enough:

	git diff master myBranch

With a global diff, the reviewer can have a better general view of the branch
while already knowing the details.

With this, the reviewer then have a good understanding of what the developer
did, without having to *figure out* what has been done.

### Note on the reverse log

To make the reverse log efficient, each commit must be as precise as possible.
Each commit must be a step in the whole story and they must contain as little
noise as possible so the reviewer can directly see what has been achieved.

Those are example of "bad" commits:

	#1 "Some work done"
	[200 lines of changes]

	#2 "work for the feature 123"
	[Also a lot of changes]

	#3 "Variable renamed, indentation and new logic added"
	[yet more changes]

Instead, the commits should look like:

	#1 "Spaces fixes, this is a squashed commit of commits fixing the indentation,
	trimming the end of lines..."
	[potentially long commit *only* touching spaces]

	#2 "Variable renamed, storeIndex is more meaningful than s"
	[Changes where s is replaced by storeIndex]

	#3 "New class XYZZ added"
	[Empty unused class commited]

	#4 "new feature A in XYZ"
	[Changes about the new feature, this can potentially be spread on multiple
	commits]

	#5 "new feature B in XYZ"
	[Changes about the new feature, this can potentially be spread on multiple
	commits]

	#5 "Comments added"
	[Different comments added in the code base]

With those commits, the reviewer has to be careful about the 4 and 5 mostly (eg
only the logical changes). The other commits must of course be reviewed but
their review can be fast:

<ul>
	<li>
		For a spaces commit, doing a <code>git show %commithash% --color-words</code>
		must show nothing. This command shows changes on a word level instead of a
		line level. Cf <code>man git-show</code>. Then your lint tool will tell you if the
		code is correct, so you don't have to worry about it.
	</li>
	<li>
		For variable renamed, anything "changed", the reviewer should expect changes
		having pairs of removed/added like:
<pre><code>
 // Some unchanged code here
-int s;
+int storeIndex;
 // more unchanged code
-for (s = 0; s < nbStores; s++) {
+for (storeIndex = 0; storeIndex < nbStores; storeIndex++) {
 // rest of the code
</code></pre>
		Again, the command <code>git show %commithash% --color-words=.</code>
		should help to see exactly what changed.
	</li>
	<li>
		For commits mentionning something <b>added</b> (same for removed), the reviewer
		can expect to see only added lines (except for arrays, where he can
		potentially expect the last element to be removed and re added with a comma,
		followed by the new one actually added, and no, do not add trailing commas in
		arrays, please, that is not what a comma is for):
<pre><code>
 myArray = [
	'foo',
	'bar',
-	'toto'
+	'toto',
+	'tata'
 ]
</code></pre>
	</li>
</ul>
There are other patterns around about what a change look like but this gives
some examples.

Also those are simple cases, and sometimes commits are more complicated, but if
all the noise is removed to isolate the complicated ones, they become way
easier to read and review.

Random anecdot: I few years ago, a colleague asked me to review his branch. One
of the commit mentioned a change it a route of the website. I expected a fairly
small change. The commit was actually hundreds of lines of changes, all being
indentation changes and among them, the relevant logic change I was interested
in. If this commit would have been split into 2 commits (one for the spaces,
very quick to read and one for the change, very small), the code review would
have been way faster.

### Atomic commits

To create a log as described above, commits need to be atomic:

- They must contain the smallest change possible (if 2 changes are about 2
  different topics, commit then separately),
- They must not break the application (there is a limit to smallest, don't
  commit line per line),
- They must be ordered, if a commit A needs a change in the commit B, B must be
  first.

Also, it is not possible to commit as we code, most of the time we do changes,
test, amend our changes, retest, realise it is not the good way and so on. Then
comes the commiting step and we sometimes have changes all over the show. This
is at this moment, to make atomic commits, that
[git add --interactive](/articles/git-add---interactive.html) enters the game.
