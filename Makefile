help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install API and client
	cp server/ormconfig.json.dist server/ormconfig.json
	cp server/.env.dist server/.env
	cp client/config.js.dist client/config.js
	cd server && npm i
	cd client && npm i
	make api-start
	make api-build-dist
	make database-migrate
client-start: ## Start svelte app
	cd client && npm run dev
api-stop: ## Stop docker containers
	docker-compose -p permacoop stop
api-rm: ## Remove docker containers
	docker-compose -p permacoop rm
api-ps: ## List docker containers
	docker-compose -p permacoop ps
api-start: ## Start docker containers
	docker-compose -p permacoop up -d
api-logs: ## Display API logs
	docker-compose -p permacoop logs -f api
api-test: ## Run test suite
	docker-compose -p permacoop exec api npm run test
api-bash: ## Connect to API container
	docker-compose -p permacoop exec api bash
api-test-coverage: ## Run test suite with coverage
	docker-compose -p permacoop exec api npm run test:cov
api-linter: ## API ts linter
	docker-compose -p permacoop exec api npm run lint
api-build-dist: ## Build API dist
	docker-compose -p permacoop exec api npm run build
database-migrate: ## Database migrations
	docker-compose -p permacoop exec api npm run migration:migrate
database-diff: ## Generate database diff
	docker-compose -p permacoop exec api npm run migration:diff $(MIGRATION_NAME)
database-connect: ## Connect to the database container
	docker-compose -p permacoop exec database psql -h database
ci: ## Run CI checks
	docker-compose -p permacoop run api npm run test:cov
	docker-compose -p permacoop run api npm run lint
