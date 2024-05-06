docker run -it -v "$PWD":/workdir -w /workdir node:lts "npx playwright install-deps &&
npx playwright install &&
npm run build:lib &&
npm run build:prod &&
npm run e2e:update-snapshots"
