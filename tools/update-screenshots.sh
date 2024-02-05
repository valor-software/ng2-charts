docker run -it -v "$PWD":/workdir -w /workdir node:lts npx playwright install &&
npx playwright install-deps &&
npm ci &&
npm run build:lib &&
npm run build:prod &&
npm run e2e:update-snapshots
