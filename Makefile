# Variables
INPUT_CSS=css/input.css
OUTPUT_CSS=css/output.css
NODE_MODULES=node_modules

.DEFAULT_GOAL := help

.PHONY: setup build watch clean distclean help

setup: # install project dependencies
	npm install

build: $(NODE_MODULES) # build Tailwind CSS
	npm run build

watch: $(NODE_MODULES) # watch and rebuild Tailwind CSS on changes
	npm run watch

$(NODE_MODULES): # create node_modules by installing dependencies
	npm install

clean: # remove generated CSS output
	rm -f $(OUTPUT_CSS)

distclean: clean # remove installed dependencies
	rm -rf $(NODE_MODULES)

help: # show help message
	@echo "Available targets:"
	@awk -F ':.*# ' '/^[a-zA-Z0-9_.-]+:.*# / {printf "  \033[36m%-10s\033[0m - \033[33m%s\033[0m\n", $$1, $$2}' Makefile
