help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install API and client
	cp server/ormconfig.json.dist server/ormconfig.json
	make start
	make database-migrate
start: ## Start docker containers
	docker-compose -p cooperp up -d
stop: ## Stop docker containers
	docker-compose -p cooperp stop
rm: ## Remove docker containers
	docker-compose -p cooperp rm
ps: ## List docker containers
	docker-compose -p cooperp ps
api-logs: ## Display API logs
	docker-compose -p cooperp logs -f api
api-test: ## Run test suite
	docker-compose -p cooperp exec api npm run test
api-bash: ## Connect to API container
	docker-compose -p cooperp exec api bash
api-test-coverage: ## Run test suite with coverage
	docker-compose -p cooperp exec api npm run test:cov
api-linter: ## API ts linter
	docker-compose -p cooperp exec api npm run lint
database-migrate: ## Database migrations
	docker-compose -p cooperp exec api npm run migration:migrate
database-connect: ## Connect to the database container
	docker-compose -p cooperp exec database psql -h database
client-logs: ## Display client logs
	docker-compose -p cooperp logs -f client
client-bash: ## Connect to API container
	docker-compose -p cooperp exec client bash
