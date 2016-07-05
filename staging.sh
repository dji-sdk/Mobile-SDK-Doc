C='\033[1;34m'
NC='\033[0m'
SERVER='121.196.219.14'

export ACCESS_KEY_ID=bJ5XKDeUOEMrQ1p6
export ACCESS_KEY_SECRET=gUQoCEQMHthV6diqBPxMWVNPTj7F48
export BUCKET=pro-dev-front-hz01-e4s8
export CDN_HOST=http://dev1.djicdn.com

echo -e "${C}[ BUILD HTML ]${NC}"
git pull
npm i
rm db.json
NODE_ENV=staging hexo generate

echo -e "${C}[ BUILD ASSETS ]${NC}"
npm run build

echo -e "${C}[ FLY TO THE CLOUD ]${NC}"
mv dist mobile-doc-dist
tar zcf mobile-doc-dist.tar.gz mobile-doc-dist
scp mobile-doc-dist.tar.gz dev-front@${SERVER}:/data/home/dev-front/front
ssh dev-front@${SERVER} "cd ~/front; \
  tar zxf mobile-doc-dist.tar.gz; \
  rm -r doc/mobile-sdk; \
  mv mobile-doc-dist doc/mobile-sdk; \
  rm mobile-doc-dist.tar.gz;"

echo -e "${C}[ LAUNCHED ]${NC}"
rm -r mobile-doc-dist mobile-doc-dist.tar.gz
