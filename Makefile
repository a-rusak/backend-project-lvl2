install: install-deps

run:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npm test -- --coverage --coverageProvider=v8

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
