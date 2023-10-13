help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop

run_server = ./tools/colorize_prefix.sh [server] 31
run_watch = ./tools/colorize_prefix.sh [watch] 36

install: ## Install
	cp -n server/.env.dist server/.env
	make install-deps
ifneq ($(ANSIBLE),1)
		make install-dev
endif

install-deps: ## Install dependencies
	cd server && npm ci

install-dev: ## Install local development dependencies and services
	cd server && npx playwright install firefox
	make build
	make database-test-init

start: ## Start
	make -j 2 start-server start-watch

start-server: up
	${run_server} "cd server && npm run start:dev"

start-watch:
	${run_watch} "cd server && npm run assets:watch"

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
	cd server && npm run build

assets:
	cd server && npm run assets:build

start-dist: up ## Serve built server
	cd server && npm run start:prod

test: ## Run tests
	cd server && npm run test -- $(FILE)

test-watch: ## Run tests in watch mode
	cd server && npm run test:watch

test-cov: ## Run tests with coverage enabled
	cd server && npm run test:cov

test-e2e:
	cd server && npx playwright test

linter: ## Run linters
	cd server && npm run lint

format: ## Run code formatting
	cd server && npm run format

database-migrate: ## Database migrations
	cd server && npm run migration:migrate

database-test-init: up ## Initialize test database
	make compose CMD="exec -T database createdb permacoop_test" || echo 'Does the test DB already exist? Ignoring...'
	make database-migrate DATABASE_NAME=permacoop_test
	make database-seed DATABASE_NAME=permacoop_test

database-migration: ## Generate a database migration
	cd server && npm run migration:create -- migrations/$(NAME)

database-seed: ## Seed database
	cd server && npm run seed:run

database-connect: ## Connect to the database container
	${compose} exec database psql -h database -d permacoop

ci: up ## Run CI checks
	make install
	make linter
	make test-cov
	make test-e2e CI=1
