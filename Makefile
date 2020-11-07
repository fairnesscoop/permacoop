help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p permacoop
exec = ${compose} exec
run = ${compose} run
logs = ${compose} logs -f

install: ## Install API and client
	cp server/ormconfig.json.dist server/ormconfig.json
	cp server/.env.dist server/.env
	cp client/config.js.dist client/config.js
	docker run -it --rm -v ${PWD}/server:/app -w /app node npm i
	docker run -it --rm -v ${PWD}/client:/app -w /app node npm i
	make start
	make api-build-dist
	make database-migrate
	make watch-tailwind
stop: ## Stop docker containers
	${compose} stop
rm: ## Remove docker containers
	${compose} rm
ps: ## List docker containers
	${compose} ps
start: ## Start docker containers
	${compose} up -d
watch-tailwind:
	${exec} client npm run watch:tailwind
build-tailwind: ## Build Tailwind in production mode
	${exec} client npm run build:tailwind
test: ## Run test suite
	${exec} api npm run test
	${exec} client npm run test-unit
test-watch: ## Run test suite
	${exec} api npm run test:watch
linter: ## Linter
	${exec} api npm run lint
	${exec} client npm run lint
api-logs: ## Display API logs
	${logs} api
api-bash: ## Connect to API container
	${exec} api bash
api-build-dist: ## Build API dist
	${exec} api npm run build
client-logs: ## Display Client logs
	${logs} client
client-bash: ## Connect to client container
	${exec} client bash
database-migrate: ## Database migrations
	${exec} api npm run migration:migrate
database-diff: ## Generate database diff
	${exec} api npm run migration:diff $(MIGRATION_NAME)
database-connect: ## Connect to the database container
	${exec} database psql -h database -d permacoop
ci: ## Run CI checks
	${run} api npm run test:cov
	${run} api npm run lint
