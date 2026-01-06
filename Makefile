.PHONY: install dev build preview lint lint-fix 

install:
	npm ci

dev:
	npx vite

build:
	npx vite build

preview: 
	npx vite preview

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix
