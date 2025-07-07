# Utilise une image officielle Node.js
FROM node:18

# Définir le dossier de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port sur lequel l'app écoute
EXPOSE 3000

# Lancer l'application
CMD ["node", "src/app.js"]
