.PHONY: dist

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run_server = ./tools/colorize_prefix.sh [server] 31
run_watch = ./tools/colorize_prefix.sh [watch] 36

DOCKER_COMPOSE=docker compose

install: ## Install
	$(MAKE) install-deps
	$(MAKE) install-dev

install-deps: ## Install dependencies
	npm ci

install-dev: ## Install local development dependencies and services
	npx playwright install firefox
	$(MAKE) build
	$(MAKE) database-test-init

start: ## Start
	$(MAKE) -j 2 start-server start-watch

start-server: up
	${run_server} "npm run start:dev"

start-watch:
	${run_watch} "npm run assets:watch"

compose: ## Run Docker compose command (args: CMD)
	${DOCKER_COMPOSE} ${CMD}

up: ## Start containers
	${DOCKER_COMPOSE} up -d

stop: ## Stop containers
	${DOCKER_COMPOSE} stop

restart: ## Restart containers
	${DOCKER_COMPOSE} restart

rm: stop  ## Stop and remove containers
	${DOCKER_COMPOSE} rm

ps: ## Show running containers
	${DOCKER_COMPOSE} ps

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
	$(MAKE) compose CMD="exec -T database dropdb --if-exists permacoop_test"
	$(MAKE) compose CMD="exec -T database createdb permacoop_test"
	$(MAKE) database-migrate DATABASE_NAME=permacoop_test
	$(MAKE) database-seed DATABASE_NAME=permacoop_test

database-migration: ## Generate a database migration
	npm run migration:generate -- migrations/$(NAME)

database-seed: ## Seed database
	npm run seed:run

database-connect: ## Connect to the database container
	${DOCKER_COMPOSE} exec database psql -h database -d permacoop

ci: up ## Run CI checks
	$(MAKE) install
	$(MAKE) linter
	$(MAKE) test-cov
	$(MAKE) test-e2e CI=1 DATABASE_NAME=permacoop

scalingo-postbuild:
	$(MAKE) build
	$(MAKE) database-migrate
