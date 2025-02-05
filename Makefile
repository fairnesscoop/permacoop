.PHONY: dist

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

BIN_DOCKER_COMPOSE=docker-compose

compose = ${BIN_DOCKER_COMPOSE} -p permacoop

run_server = ./tools/colorize_prefix.sh [server] 31
run_watch = ./tools/colorize_prefix.sh [watch] 36

install: ## Install
	make install-deps
	make install-dev

install-deps: ## Install dependencies
	npm ci

install-dev: ## Install local development dependencies and services
	npx playwright install firefox
	make build
	make database-test-init

install-playwright-dependencies:
	sudo apt-get install libdbus-glib-1-2
	sudo npx playwright install-deps

start: ## Start
	make -j 2 start-server start-watch

start-server: up
	${run_server} "npm run start:dev"

start-watch:
	${run_watch} "npm run assets:watch"

compose: ## Run Docker compose command (args: CMD)
	${compose} ${CMD}

up: ## Start containers
	make compose CMD="up -d"

stop: ## Stop containers
	make compose CMD=stop

restart: ## Restart containers
	make compose CMD=restart

rm: stop  ## Stop and remove containers
	make compose CMD=rm

ps: ## Show running containers
	make compose CMD=ps

build: dist assets ## Build dist and assets

dist:
	npm run build

assets:
	npm run assets:build

start-dist: ## Serve built server
	npm run start

test: ## Run tests
	npm run test -- $(FILE)

test-watch: ## Run tests in watch mode
	npm run test:watch

test-cov: ## Run tests with coverage enabled
	npm run test:cov

test-e2e:
	npx playwright test

linter: ## Run linters
	npm run lint

format: ## Run code formatting
	npm run format

database-migrate: ## Database migrations
	npm run migration:migrate

database-test-init: up ## Initialize test database
	make compose CMD="exec -T database dropdb --if-exists permacoop_test"
	make compose CMD="exec -T database createdb permacoop_test"
	make database-migrate DATABASE_NAME=permacoop_test
	make database-seed DATABASE_NAME=permacoop_test

database-migration: ## Generate a database migration
	npm run migration:generate -- migrations/$(NAME)

database-seed: ## Seed database
	npm run seed:run

database-connect: ## Connect to the database container
	${compose} exec database psql -h database -d permacoop

ci: up ## Run CI checks
	make install
	make linter
	make test-cov
	make install-playwright-dependencies
	make test-e2e CI=1 DATABASE_NAME=permacoop

scalingo-postbuild:
	make build
	make database-migrate
