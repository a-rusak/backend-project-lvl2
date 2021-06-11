install: npm install

brain-games: node bin/gendiff.js

publish: npm publish --dry-run

make lint: npx eslint .

