## Edit commit message in the past

### patch method

	#create a patch file for each commit between HEAD and %commit_to_edit%
	git format-patch %commit_to_edit%

	#move HEAD to %commit_to_edit%
	git reset --hard %commit_to_edit%

	#apply all patches
	ls *.patch | sort -n | xargs -I[] sh -c "git am < []"

	#delete all patches files
	rm *.patch

### rebase -i method

	git rebase -i %commit_to_edit%^
	#in the editor, replace "pick" by "reword" for the commit to edit
	#save and quit
	#in second editor, edit message
	#save and quit
