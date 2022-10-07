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


s-front:
	cd frontend &&	cd ecommerce &&	npm install --legacy-peer-deps
	cd frontend &&	cd ecommerce &&	npm run dev

s-sanity:
	npm install -g @sanity/cli
	sanity init --coupon javascriptmastery2022
	




