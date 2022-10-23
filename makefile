CURRENT_BRANCH=nelson
MASTER_BRANCH=main

# Commits everything to the current branch and merges it to master
#parameters:
# m: commit message


poh:
	git add --all
	git commit -m "${m} :${emoji}:"
	git push origin HEAD


pohn:
	make poh m="${m}" emoji="tada"

pohf:
	make poh m="${m}" emoji="hammer"

poha:
	make poh m="${m}" emoji="goberserk"

pohg:
	make poh m="${m}" emoji="godmode"



merp:
	git checkout ${MASTER_BRANCH}
	git merge ${CURRENT_BRANCH}
	git pull
	git push origin HEAD
	git checkout ${CURRENT_BRANCH}


s-front:
	cd frontend &&	cd ecommerce &&	npm install --legacy-peer-deps
	cd frontend &&	cd ecommerce &&	npm run dev

s-sanity:
	echo DONT USE THIS xd
	cd backend && cd ecommerce && sanity start

m-sanity:
	cd backend && cd ecommerce && sanity manage

set-sanity:
	npm install -g @sanity/cli
	sanity init --coupon javascriptmastery2022

push:
	git pull
	git add *
	git commit -m "${m} :"
	git push
	




