help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
start: ## Start docker containers
	docker-compose -p cooperp up -d
build: ## Build docker containers
	docker-compose -p cooperp build
stop: ## Stop docker containers
	docker-compose -p cooperp stop
rm: ## Remove docker containers
	docker-compose -p cooperp rm
ps: ## List docker containers
	docker-compose -p cooperp ps
logs: ## Display logs from node container
	docker-compose -p cooperp logs -f node
connect-node: ## Connect to node container
	docker-compose -p cooperp exec node bash
init-db: ## Setup the database. This command will launch migrations
	docker-compose -p cooperp run node npm run migration:migrate
connect-db: ## Connect to the database
	docker-compose -p cooperp exec database psql -h database
test: ## Run test suite
	docker-compose -p cooperp run node npm run test
test-coverage: ## Run test suite with coverage
	docker-compose -p cooperp run node npm run test:cov
lint: ## Linter
	docker-compose -p cooperp run node npm run lint
build-dist: ## Build dist
	docker-compose -p cooperp run node npm run build
