help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop

install: ## Install
	cp -n server/.env.dist server/.env
	make install-deps
ifneq ($(ANSIBLE),1)
		make install-dev
endif

install-deps: ## Install dependencies
	cd server && npm ci

install-dev: up ## Install local development dependencies and services
	make database-test-init

start: up ## Start
	cd server && npm run start:dev

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

build: ## Build dist
	cd server && npm run build

start-dist: ## Serve built server
	cd server && npm run start:prod

test: ## Run tests
	cd server && npm run test -- $(FILE)

test-watch: ## Run tests in watch mode
	cd server && npm run test:watch

test-cov: ## Run tests with coverage enabled
	cd server && npm run test:cov

linter: ## Run linters
	cd server && npm run lint

format: ## Run code formatting
	cd server && npm run format

database-migrate: ## Database migrations
	cd server && npm run migration:migrate

database-test-init: ## Initialize test database
	make compose CMD="exec -T database createdb permacoop_test" || echo 'Does the test DB already exist? Ignoring...'
	DATABASE_NAME=permacoop_test make database-migrate

database-migration: ## Generate a database migration
	cd server && npm run migration:generate -- migrations/$(NAME)

database-seed: ## Seed database
	cd server && npm run build && npm run seed:run

database-connect: ## Connect to the database container
	${compose} exec database psql -h database -d permacoop

ci: ## Run CI checks
	make compose CMD="up -d"
	make install
	make build
	make database-migrate
	make test-api-cov
	make database-test-init
	make linter
