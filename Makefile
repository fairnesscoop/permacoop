install:
	cp server/ormconfig.json.dist server/ormconfig.json
	cd server && npm install && make build-dist && make init-db
	cd client && npm install
