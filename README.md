# Project Devops

Alexandre CAROL / Mathis MICHENAUD

## Lancer MariaDB en local
```sh
docker run -d \
  --name mariadb-server \
  -e MARIADB_ROOT_PASSWORD={{votre_mot_de_passe}} \
  -p 3306:3306 \
  -v mariadb_data:/var/lib/mysql \
  mariadb
```

## Fichier .env
Créer un fichier .env en partant du fichier .env;example et remplacer par vos valeurs personnelles

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
