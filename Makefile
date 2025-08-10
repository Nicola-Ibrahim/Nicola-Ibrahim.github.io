# Makefile for Nicola-Ibrahim.github.io
# Usage: make <target>
# Targets:
#   build        - Install dependencies and build Tailwind CSS
#   tailwind     - Rebuild Tailwind CSS (input.css -> output.css)
#   npm-install  - Install npm dependencies
#   clean        - Remove output.css and node_modules
#   dev          - Run Tailwind in watch mode for development
#   help         - Show help

# Variables
TAILWIND_BIN=npx tailwindcss
INPUT_CSS=css/input.css
OUTPUT_CSS=css/output.css
NODE_MODULES=node_modules

.PHONY: build tailwind npm-install clean dev help

build: npm-install tailwind

npm-install:
	npm install

tailwind:
	$(TAILWIND_BIN) -i $(INPUT_CSS) -o $(OUTPUT_CSS) --minify

clean:
	rm -f $(OUTPUT_CSS)
	rm -rf $(NODE_MODULES)

dev:
	$(TAILWIND_BIN) -i $(INPUT_CSS) -o $(OUTPUT_CSS) --watch

help:
	@echo "Available targets:"
	@echo "  build        - Install dependencies and build Tailwind CSS"
	@echo "  tailwind     - Rebuild Tailwind CSS (input.css -> output.css)"
	@echo "  npm-install  - Install npm dependencies"
	@echo "  clean        - Remove output.css and node_modules"
	@echo "  dev          - Run Tailwind in watch mode for development"
	@echo "  help         - Show this help message"
