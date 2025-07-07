# TP-CI-CD-2

## Lancer MariaDB en local
```sh
docker run -d \
  --name mariadb-server \
  -e MARIADB_ROOT_PASSWORD=motdepassefort \
  -p 3306:3306 \
  -v mariadb_data:/var/lib/mysql \
  mariadb
```

## Lancer en local

```sh
npm install
node fixtures/setup-db.js
npm start
```

## Tests
```sh
npm run test
```

## Linter

```sh
npm run lint
```
