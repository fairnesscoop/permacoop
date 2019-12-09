help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install API and client
	cp server/ormconfig.json.dist server/ormconfig.json
	cd server && npm install
	cd client && npm install
	make api-start
	make api-build-dist
	make database-migrate
client-start: ## Start react app
	cd client && npm start
stop: ## Stop docker containers
	docker-compose -p cooperp stop
rm: ## Remove docker containers
	docker-compose -p cooperp rm
ps: ## List docker containers
	docker-compose -p cooperp ps
api-start: ## Start docker containers
	docker-compose -p cooperp up -d
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
api-build-dist: ## Build API dist
	docker-compose -p cooperp exec api npm run build
database-migrate: ## Database migrations
	docker-compose -p cooperp exec api npm run migration:migrate
database-connect: ## Connect to the database container
	docker-compose -p cooperp exec database psql -h database
ci: ## Run CI checks
	docker-compose -p cooperp run api npm run test:cov
	docker-compose -p cooperp run api npm run lint
