# 🏗️Projet N°6 - Vieux Grimoire - OpenClassrooms

## Description du projet

**Vieux Grimoire** Vieux Grimoire est un site web permettant aux utilisateurs de noter les livres qu'ils ont lus. Le projet consiste à développer le back-end.
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

1. **Implémenter un modèle logique de données conformément à la réglementation** : Vous apprendrez à structurer les données dans une base de données MongoDB en respectant une logique cohérente et en appliquant des principes de modélisation efficaces.
2. **Mettre en œuvre des opérations CRUD de manière sécurisée** : Vous comprendrez comment créer, lire, mettre à jour et supprimer des données de manière sécurisée, en prenant soin de valider et de protéger les données entrées par les utilisateurs.
3. **Stocker des données de manière sécurisée** : Vous apprendrez à sécuriser les données sensibles, telles que les mots de passe des utilisateurs, et à appliquer les bonnes pratiques pour garantir la sécurité de l'application.


## Installation
 Allez dans le répertoire du projet et installez les dépendances nécessaires avec npm :

   - Frontend :
     - Allez dans le répertoire du front-end.
     - Exécutez `npm start` pour démarrer le projet.
  
   - Backend :
     - Allez dans le répertoire du back-end.
     - Exécutez `nodemon server` pour démarrer le projet.
