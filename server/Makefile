start:
	docker-compose -p cooperp up -d
build:
	docker-compose -p cooperp build
stop:
	docker-compose -p cooperp stop
ps:
	docker-compose  -p cooperp ps
logs:
	docker-compose -p cooperp logs -f node
bash:
	docker-compose -p cooperp run node bash
setup-db:
	docker-compose -p cooperp run node npm run migration:migrate
