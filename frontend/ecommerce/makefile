
PAGE=https://brooklynslcouncil.com

# Prototype FTP
# FTP_HOST=wangnancy.com
# FTP_USER=admin@slc-prototype.evildorm.com
# FTP_PASSWORD=slcadmin2022

FTP_HOST=wangnelson.xyz
FTP_USER=admin@ecommerce.wangnelson.xyz
FTP_PASSWORD=PassCommerce200!


THIS_BRANCH=master
MASTER_BRANCH=master
DEPLOY_BRANCH=deployment



main: build-commit ft-push


build-commit:
	yarn run build
	yarn run export
	git add --all
	git commit -m "Production update | ${v}"	
	git push origin HEAD

build-commit-donpush:
	yarn install
	yarn run build
	yarn run export
	git add --all
	git commit -m "Production update "

cap:
	git coa "${m}"
	git poh

merp:
	git checkout ${DEPLOY_BRANCH}
	git pull
	git merge ${THIS_BRANCH}
	make ft-configpush
	git push origin HEAD
	git checkout ${THIS_BRANCH}

merge-to-deployment:
	git checkout ${DEPLOY_BRANCH}
	git pull
	git merge ${THIS_BRANCH}
	git push origin HEAD
	git checkout ${THIS_BRANCH}

mastermerge-deployment:
	git checkout ${MASTER_BRANCH}
	git pull
	git merge ${THIS_BRANCH}
	git push origin HEAD
	git checkout ${DEPLOY_BRANCH}
	git pull
	git merge ${MASTER_BRANCH}
	git push origin HEAD
	git checkout ${THIS_BRANCH}

ft-push:
	git ftp push 
	echo "open in ${PAGE}" && git log -n 2
	
ft-configpush:
	git config git-ftp.url ${FTP_HOST}
	git config git-ftp.user ${FTP_USER}
	git config git-ftp.password ${FTP_PASSWORD}
	git config git-ftp.syncroot out/
	git ftp push --force


ftpinit:
	git config git-ftp.url ${FTP_HOST}
	git config git-ftp.user ${FTP_USER}
	git config git-ftp.password ${FTP_PASSWORD}
	git config git-ftp.syncroot out/

first-deploy:
	make ftpinit
	git ftp init