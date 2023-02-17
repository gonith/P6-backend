- Installation et mise en service du backend

- La commande "npm install" depuis le fichier backend téléchargera les dépendances nécessaires.

- Ensuite il vous faudra modifier le fichier ".exemple.env" et le renommer en ".env"

///

    PORT = "3000"

    DB_USERNAME = "Username de votre compte MongoDB"

    DB_PASSWORD = "Mot de passe de votre compte MongoDB"

    DB_CLUSTER = "Nom de votre cluster MongoDB"

    DB_TOKEN = "Le nom du token de votre choix"

///

- Après avoir bien rempli le fichier, éxécutez la commande "nodemon server" depuis le fichier backend pour lancer le serveur.

- Pour lancer le front, veuillez lire le README.md frontend.