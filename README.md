# Projet N°6 - Vieux Grimoire - OpenClassrooms

## Description du projet

**Vieux Grimoire** est un site web permettant aux utilisateurs de noter les livres qu'ils ont lus. Le projet consiste à développer le back-end.
Le back-end permet de créer un livre, de le mettre à jour, de le supprimer, ainsi que d'ajouter des notations et de calculer la note moyenne. 


## Spécifications techniques

- **Langages utilisés** : JavaScript (Node.js, Express), MongoDB, Mongoose
- **Technologies** :
  - **Express** : Framework web pour gérer les routes et la logique du serveur.
  - **MongoDB** : Base de données NoSQL pour stocker les livres et les notations.
  - **Mongoose** : Bibliothèque pour modéliser les données et interagir avec MongoDB.
  - **Bcrypt** : Pour le cryptage des mots de passe et la gestion de l'authentification.
  - **JWT** : JSON Web Token pour la gestion des sessions utilisateur et l'authentification.
- **Opérations CRUD** : Implémentation de la création, lecture, mise à jour et suppression des livres et des notations.
- **Système de notation** : Les utilisateurs peuvent noter les livres et calculer une note moyenne.
- **Gestion de l'authentification** : Mise en place d'une authentification sécurisée pour les utilisateurs.
- **Sécurité des données** : Utilisation de bonnes pratiques pour sécuriser les données stockées et leur transmission (cryptage des mots de passe, validation des entrées, etc.).
- **Gestion des images** : Implémentation d'un système pour télécharger et optimiser les images des livres.

## Objectifs pédagogiques

- **Implémenter un modèle logique de données** dans MongoDB en suivant des principes de modélisation efficaces.
- **Mettre en œuvre des opérations CRUD sécurisées**, en validant et protégeant les données des utilisateurs.
- **Stocker des données sensibles de manière sécurisée**, en garantissant la protection des mots de passe et en appliquant les meilleures pratiques de sécurité.

## Installation
 Allez dans le répertoire du projet et installez les dépendances nécessaires avec npm :

   - Frontend :
     - Allez dans le répertoire du front-end.
     - Exécutez `npm start` pour démarrer le projet.
  
   - Backend :
     - Allez dans le répertoire du back-end.
     - Exécutez `nodemon server` pour démarrer le projet.
