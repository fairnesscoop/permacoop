install:
	cp server/ormconfig.json.dist server/ormconfig.json
	cd server && npm install && make start && make setup-db
	cd client && npm install && make start
