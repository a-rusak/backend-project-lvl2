install: install-deps

run:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
