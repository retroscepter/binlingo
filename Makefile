.PHONY: docs

install:
	make install-deno
	yarn

install-deno:
	deno cache mod.ts
	deno cache tests/*

test:
	deno test tests/*

test-coverage:
	deno test --coverage=coverage --unstable tests/*
	deno coverage --unstable coverage --lcov > coverage/lcov.info

docs:
	yarn typedoc

dev:
	yarn tsc -w -p tsconfig.json

build:
	yarn tsc -p tsconfig.json

bundle:
	yarn webpack