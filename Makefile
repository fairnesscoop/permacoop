help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop

# See color codes here: http://jafrog.com/2013/11/23/colors-in-terminal.html
run_api = ./tools/colorize_prefix.sh [api] 30 
run_client_legacy = ./tools/colorize_prefix.sh [client:legacy] 31
run_client_legacy_tailwind = ./tools/colorize_prefix.sh [client:legacy:tailwind] "38;5;52"
run_client_kit = ./tools/colorize_prefix.sh [client:kit] "38;5;202"
run_nginx = ./tools/colorize_prefix.sh [nginx] 32 
run_db = ./tools/colorize_prefix.sh [db] 34

client_legacy_port = 3002
client_kit_port = 3003

install: ## Install API and client
	make install-api
	make install-client

install-api: ## Install API
	cp -n server/ormconfig.json.dist server/ormconfig.json
	cp -n server/.env.dist server/.env
	cd server && npm ci

install-client: install-client-legacy install-client-kit ## Install client

install-client-legacy: ## Install legacy client
	cd client/legacy && npm ci

install-client-kit: ## Install SvelteKit client
	cd client/kit && npm ci && npx playwright install firefox

start: ## Serve API and client in parallel
	make -j 2 start-api start-client

start-api: ## Run API
	${run_api} "cd server && npm run start:dev"

start-client: start-client-proxy ## Run client
	make -j 2 start-client-legacy start-client-kit

start-client-proxy: ## Run client proxy
	${run_nginx} "${compose} up -d -- nginx"

start-client-legacy: ## Run legacy client
	make -j 2 start-client-legacy-dev start-client-legacy-tailwind

start-client-legacy-dev:
	PORT=${client_legacy_port} ${run_client_legacy} "cd client/legacy && npm run dev"

start-client-legacy-tailwind:
	${run_client_legacy_tailwind} "cd client/legacy && npm run watch:tailwind"

start-client-kit: ## Run SvelteKit client
	PORT=${client_kit_port} ${run_client_kit} "cd client/kit && npm run dev"

build: build-api build-client ## Build API and client

build-api: ## Build API dist
	cd server && npm run build

build-client: build-client-legacy build-client-kit ## Build client

build-client-legacy: ## Build legacy client
	cd client/legacy && npm run build

build-client-kit: ## Build SvelteKit client
	cd client/kit && npm run build

start-dist: start-client-proxy ## Serve built API and client
	make -j 2 start-dist-api start-dist-client

start-dist-api: ## Serve built API
	${run_api} "cd server && npm run start:prod"

start-dist-client: ## Serve built client
	make -j 2 start-dist-client-legacy start-dist-client-kit

start-dist-client-legacy: ## Serve built legacy client
	PORT=${client_legacy_port} ${run_client_legacy} "cd client/legacy && npm run start"

start-dist-client-kit: ## Serve built client
	HOST=127.0.0.1 PORT=${client_kit_port} ${run_client_kit} "cd client/kit && npm run start"

test: test-api test-client-unit ## Run test suite

test-api: ## Run API tests
	cd server && npm run test

test-api-watch: ## Run API tests in watch mode
	cd server && npm run test:watch

test-api-cov: ## Run API tests with coverage enabled
	cd server && npm run test:cov

test-client: test-client-legacy-unit test-client-kit-unit ## Run client tests

test-client-legacy-unit: ## Run legacy client unit tests
	cd client/legacy && npm run test-unit

test-client-kit-unit: ## Run SvelteKit client unit tests
	cd client/kit && npm run test:coverage

test-client-e2e: ## Run client E2E tests (servers must be running)
	cd client/kit && npm run test-e2e

test-client-ci: test-client test-client-e2e-ci

test-client-e2e-ci: ## Run client E2E tests
	cd client/kit && npm run test-e2e:ci

linter: linter-api linter-client ## Run linters

linter-api: ## Run API linters
	cd server && npm run lint

linter-client: linter-client-legacy linter-client-kit ## Run client linters

linter-client-legacy: ## Run legacy client linters
	cd client/legacy && npm run lint

linter-client-kit: ## Run SvelteKit client linters
	cd client/kit && npm run lint

format: format-api format-client ## Run code formatting

format-api: ## Run API code formatting
	cd server && npm run format

format-client: format-client-kit ## Run client code formatting

format-client-kit: ## Run SvelteKit client code formatting
	cd client/kit && npm run format

database-start: ## Start database container
	${run_db} "${compose} up -d -- database"

database-stop: ## Stop database container
	${run_db} "${compose} stop -- database"

database-migrate: ## Database migrations
	cd server && npm run migration:migrate

database-diff: ## Generate database diff
	cd server && npm run migration:diff -n $(MIGRATION_NAME)

database-connect: ## Connect to the database container
	${compose} exec database psql -h database -d permacoop

ci: ## Run CI checks
	make install
	make database-migrate
	make build
	make test-api-cov
	make test-client-ci
	make linter
