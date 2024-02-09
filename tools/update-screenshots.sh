docker run -it -v "$PWD":/workdir -w /workdir mcr.microsoft.com/playwright:v1.40.0-jammy npm ci &&
npm run build:lib &&
npm run build:prod &&
npm run e2e:update-snapshots
