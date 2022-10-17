help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop
client_port = 3001

install: ## Install API and client
	make install-api
	make install-client

install-api: ## Install API
	cp -n server/ormconfig.json.dist server/ormconfig.json
	cp -n server/.env.dist server/.env
	cd server && npm ci

install-client: ## Install client
	cp -n client/config.js.dist client/config.js
	cd client && npm ci

start: ## Serve API and client in parallel
	make -j 2 start-api start-client

start-api: ## Run API
	./tools/colorize_prefix.sh [api] 30 "cd server && npm run start:dev"

start-client: ## Run client
	make -j 2 start-client-dev start-client-tailwind

start-client-dev:
	PORT=${client_port} ./tools/colorize_prefix.sh [client] 31 "cd client && npm run dev"

start-client-tailwind:
	./tools/colorize_prefix.sh [tailwind] 36 "cd client && npm run watch:tailwind"

build: build-api build-client ## Build API and client

build-api: ## Build API dist
	cd server && npm run build

build-client: ## Build client
	cd client && npm run build

start-dist: ## Serve built API and client
	make -j 2 start-dist-api start-dist-client

start-dist-api: ## Serve built API
	./tools/colorize_prefix.sh [api] 30 "cd server && npm run start:prod"

start-dist-client: ## Serve built client
	PORT=${client_port} ./tools/colorize_prefix.sh [client] 31 "cd client && npm run start"

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

database-start: ## Start database container
	./tools/colorize_prefix.sh [db] 34 "${compose} up -d -- database"

database-stop: ## Stop database container
	./tools/colorize_prefix.sh [db] 34 "${compose} stop -- database"

database-migrate: ## Database migrations
	cd server && npm run migration:migrate

database-diff: ## Generate database diff
	cd server && npm run migration:diff -n $(MIGRATION_NAME)

database-connect: ## Connect to the database container
	${compose} exec database psql -h database -d permacoop

ci: ## Run CI checks
	make install
	make build
	make test-api-cov
	make linter
