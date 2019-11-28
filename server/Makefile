help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
start: ## Start docker containers
	docker-compose -p cooperp up -d
build: ## Build docker containers
	docker-compose -p cooperp build
stop: ## Stop docker containers
	docker-compose -p cooperp stop
ps: ## List containers
	docker-compose  -p cooperp ps
logs: ## Display server logs
	docker-compose -p cooperp logs -f node
bash: ## Connect to the bash
	docker-compose -p cooperp run node bash
setup-db: ## Setup the database. This command will launch migrations
	docker-compose -p cooperp run node npm run migration:migrate
test: ## Run test suite
	docker-compose -p cooperp run node npm run test
lint: ## Linter
	docker-compose -p cooperp run node npm run lint
