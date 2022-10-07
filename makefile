CURRENT_BRANCH=nelson
MASTER_BRANCH=main

# Commits everything to the current branch and merges it to master
#parameters:
# m: commit message
comain:
	git add --all
	git commit -m "${m}"
	git push origin HEAD
	make merge-main

merge-main:
	git checkout ${MASTER_BRANCH}
	git merge ${CURRENT_BRANCH}
	git push origin HEAD
	git checkout ${CURRENT_BRANCH}


startfront:
	cd frontend &&	cd ecommerce &&	yarn run dev

