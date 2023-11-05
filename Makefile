.PHONY: help install copy-images watch dev production build prettier

.DEFAULT_GOAL := production

## Prettier files
prettier:
	pnpm prettier --write --no-error-on-unmatched-pattern 'Resources/Private/**/*.{js,ts,php,yaml,pcss}'

## Install dependencies and build production version
build:
	pnpm install
	make production

## Install dependencies
install:
	pnpm install

## Copy images from leaflet to public folder
copy-images:
	mkdir -pv Resources/Public/
	cp node_modules/leaflet.fullscreen/icon-fullscreen.svg Resources/Public/
	cp -r node_modules/leaflet/dist/images Resources/Public/


## Watch for changes in JS and CSS files
watch:
	make copy-images
	pnpm watch

## Build development version
dev:
	make copy-images
	pnpm dev

## Build production version
production:
	make copy-images
	pnpm build

# Define colors
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# define indention for descriptions
TARGET_MAX_CHAR_NUM=15

## Show help
help:
	@echo ''
	@echo '${GREEN}CLI command list:${RESET}'
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
	@echo ''
