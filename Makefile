.PHONY: docs

install:
	deno cache mod.ts
	deno cache tests/*
	yarn

test:
	deno test tests/*

test-coverage:
	deno test --coverage=coverage --unstable tests/*
	deno coverage --unstable coverage --lcov > coverage/lcov.info

docs:
	npx typedoc

dev:
	npx tsc -w -p tsconfig.json

build:
	npx tsc -p tsconfig.json

bundle:
	npx webpack