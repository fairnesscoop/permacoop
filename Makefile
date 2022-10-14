help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop
exec = ${compose} exec
run = ${compose} run
logs = ${compose} logs -f
prefix = ./tools/colorize_prefix.sh

start: ## Serve API, client, Tailwind and DB in parallel
	make -j 4 start-api start-client start-tailwind start-db

start-api: ## Run API
	${prefix} [api] 30 "cd server && npm run start:dev"

start-client: ## Run client
	PORT=3001 ${prefix} [client] 31 "cd client && npm run dev"

start-tailwind:
	${prefix} [tailwind] 36 "cd client && npm run watch:tailwind"

start-db:
	${prefix} [db] 34 "${compose} up -d -- database"

stop-db:
	${prefix} [db] 34 "${compose} stop -- database"

install: ## Install API and client and setup database
	make install-api
	make install-client
	make build-api
	make database-migrate
	make build-tailwind

install-api: ## Install API
	cp server/ormconfig.json.dist server/ormconfig.json
	cp server/.env.dist server/.env
	cd server && npm ci

install-client: ## Install client
	cp client/config.js.dist client/config.js
	cd client && npm ci

build: build-api build-client  # Build all

build-api: ## Build API dist
	cd server && npm run build

build-client: ## Build client
	cd client && npm run build

build-tailwind: ## Build Tailwind in production mode
	cd client && npm run build:tailwind

test: test-api test-client-unit ## Run test suite

test-api: ## Run API tests
	cd server && npm run test

test-api-watch: ## Run API tests in watch mode
	cd server && npm run test:watch

test-api-cov: ## Run API tests with coverage enabled
	cd server && npm run test:cov

test-client-unit: ## Run client unit tests
	cd client && npm run test-unit

linter: linter-api linter-client ## Run linters

linter-api: ## Run API linters
	cd server && npm run lint

linter-client: ## Run client linters
	cd client && npm run lint

format: format-api ## Run code formatting

format-api: ## Run API code formatting
	cd server && npm run format

database-migrate: ## Database migrations
	cd server && npm run migration:migrate

database-diff: ## Generate database diff
	cd server && npm run migration:diff -n $(MIGRATION_NAME)

database-connect: ## Connect to the database container
	${exec} database psql -h database -d permacoop

ci: ## Run CI checks
	make install-api
	make install-client
	make build-api
	make build-client
	make test-api-cov
	make linter
