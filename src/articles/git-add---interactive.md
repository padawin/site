<b>Published: November 2015</b>

## git add --interactive or how to make awesome commits

In git you can, for a commit, add only parts of a file. For that you'll need to use the &ndash;interactive option :

	git add --interactive

or

	git add -i

once you've typed this command, you'll get :

	&gt; git add -i
			   staged     unstaged path
	  1:    unchanged        +2/-0 README
	  2:    unchanged        +4/-0 index.html

	*** Commands ***
	  1: [s]tatus     2: [u]pdate     3: [r]evert     4: [a]dd untracked
	  5: [p]atch      6: [d]iff   7: [q]uit   8: [h]elp
	What now&gt;

there, you'll have many options, but two realy matter for you : to patch (add parts of the files for the commit) and to quit (to leave the interactive add).

So, let's patch :

	What now> p
			   staged     unstaged path
	  1:    unchanged        +2/-0 [R]EADME
	  2:    unchanged        +4/-0 [i]ndex.html
	Patch update&gt;&gt;

Now we have to choose the files we need to add :

	Patch update&gt;&gt; 2
			   staged     unstaged path
	  1:    unchanged        +2/-0 [R]EADME
	* 2:    unchanged        +4/-0 [i]ndex.html
	Patch update&gt;&gt;

All the files with a star (&#42;) at the left of the number will be processed.

To select the files, you have many possibilities:

-  #: Select the file number #
-  -#: Unselect the file number #
-  *: Select all files
-  #-#: Select an interval of files
-  #-: Select the files from the # to the last

Of course, all those notations can be mixed, for example, if you have 10 files changed, you can select this :

	Patch update&gt;&gt; 1 3-6 8-

Which will select the 1, 3, 4, 5, 6, 8, 9 and 10


When you've selected the files you want, press enter.


if you want to do pick diffs in all the files, you can do:

	git add -p


which is the same as doing:

	git add --interactive
	p (for patch)
	* (choose all the files)

From now, you will be asked for each diff of each file if you want to add it, with many possible answers :

	diff --git a/index.html b/index.html
	index e574d0d..057bf2d 100644
	--- a/index.html
	+++ b/index.html
	@@ -1,6 +1,10 @@
	 &lt;html&gt;
		 &lt;head&gt;
	+        &lt;script type="text/javascript"&gt;
	+            alert('Hello world');
	+        &lt;/script&gt;
		 &lt;/head&gt;
		 &lt;body&gt;
	+        &lt;h1&gt;title&lt;/h1&gt;
		 &lt;/body&gt;
	 &lt;/html&gt;
	Stage this hunk [y,n,q,a,d,/,s,e,?]?

The more important are :

- y : yes
- n : no
- s : split, if the current diff can be splited in few smaller diffs
- e : edit, to edit yourself the diff
- q : to quit

When you're done, in a git status, you will see your files, both in added files and in modified files :

	> git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#   modified:   index.html
	#
	# Changes not staged for commit:
	#   (use "git add <file>..." to update what will be committed)
	#   (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#   modified:   README
	#   modified:   index.html
	#


And if it's ok for you, you can commit what you've added.

