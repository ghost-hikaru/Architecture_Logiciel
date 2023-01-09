# Synthèse du projet coté client
## Introduction
Le frontend fait référence à tout ce qui est visible et accessible à l'utilisateur final d'une application web. Cela comprend l'interface utilisateur (UI) et l'expérience utilisateur (UX). Le rôle du frontend dans un projet web est de prendre en charge l'affichage et la mise en forme des données pour l'utilisateur final. Cela peut inclure la mise en place de formulaires de saisie de données, la mise en place de menus de navigation, etc.

### Les technologies du front-end
Pour la réalisation du front-end nous utilisons un framework nommé **Angular** qui se base sur le langage **TypeScript** qui lui-même se base sur le langage **JavaScript**. Ce framework permet de réaliser plus facilement nos applications côté client. Pour le CSS on va utiliser **Bootstrap** qui est une librairie qui permet la stylisation de composant HTML plus simplement.
Pour la réalisation du front-end nous utilisons un framework nommé **Angular** qui se base sur le langage **TypeScript** qui lui-même se base sur le langage **JavaScript**. Ce framework permet de réaliser plus facilement nos applications coté client.

### L'interface utilisateur
L’interface est assez simple et consiste en :
* **Une page de connexion** : Page permettant à l'utilisateur de se connecter à l'application
* **Une page personnelle** : Cette page affichera les informations de l'utilisateur et servira de hub pour l'utilisateur. Il aura accès à toutes les fonctionnalités de l'application depuis cette endroit
* **Une page pour lister les utilisateurs et une pour les associations** : Ce sont des pages qui viendront afficher un tableau contenant l'ensemble des utilisateurs et associations que l'on connait.
* Une page contenant un formulaire pour **ajouter une association** et une autre pour **ajouter un utilisateur**. 
* Une page permettant **d'afficher des informations personnelles** sur l'association choisi et une pour l'utilisateur choisi.
* Une page permettant à l'utilisateur de **modifier ces informations personnelles**.

### Les interactions utilisateurs
* Création d'un compte via le bouton "Inscrivez-vous"
* Connexion à son compte via le bouton "Connexion" à l'aide de son **id** et de son **mot de passe**
Une fois connecté il pourra utiliser les interactions suivantes :
* Création d'utilisateurs
* Mettre à jour ses informations personnelles
* Création d'associations
* Lister les associations et les utilisateurs présent dans la base de donnée
* Voir un utilisateur spécifique et une association spécifique également

### Description technique du front
Pour la réalisation du front end, nous avons décidé de réaliser un composant par page. Seul deux exceptions :
* La barre de navigation : Composant qui permet de naviguer plus facilement dans l'application
* La barre de recherche : Composant qui permet de rechercher une association ou un utilisateur
A noter que nous avons des fichiers particulier dans le front :
* api-helper : ce fichier permet de faire des requêtes plus facilement à notre backend
* token-storage : ce fichier permet de générer et stocker un token lors de la connexion de l'utilisateur

#### Présentation de la page login
On a un fichier **HTML** avec notre formulaire pour se connecter lorsque que l'on clique sur le bouton de connexion. Cela déclenche une méthode **login()** qui vient récupérer les informations mis dans le formulaire pour ensuite appeler la méthode de connexion du backend.
Si l'utilisateur n'a pas encore de compte, il peut en créer un en cliquant sur le bouton **Inscrivez-vous**. Cela envoie l'utilisateur sur la page de création d'un utilisateur. Lors de la connexion, on vient également stocker dans le token-storage l'id de l'utilisateur pour par la suite l'utiliser pour par exemple afficher des informations spécifiques à l'utilisateur.

#### Création d'un utilisateur
Le HTML est composé d'un formulaire qui demande les informations pour la création d'un utilisateur.
On a donc dans le .ts un **formgroup** et un **formcontrol** pour chaque attribut du formulaire. Ensuite on vient dans la méthode **onSubmit()** appeler quand on clique sur **Ajouter**, traiter tous les attributs de notre formulaire pour ensuite les passer en paramètre de notre requête (Type POST). Si l'utilisateur vient de la page de connexion, une fois l'utilisateur créée il est renvoyé sur la page de connexion pour se connecter. Sinon il est renvoyé sur la page personnelle.

#### Page personnelle
Cette page représente un hub de l'application. En effet depuis cette page l'utilisateur peut réaliser plusieurs actions et aller partout.
On vient à l'aide de l'id stocké précédemment récupérer les nom,prénoms de l'utilisateur à l'aide d'une requête GET et les afficher sur la page. Cette page contient également des boutons qui permettent plusieurs actions(Modifier ses informations personnelles, ajouter un utilisateur ou bien une association) pour cela on utilise rounterlink.

#### Modifier ses informations personnelles
Cette page permet de modifier notre nom/prénom/âge/mot de passe (on est maintenant dans le dossier modif-info). Pour cela on utilise la même méthode que ajouter un utilisateur, à savoir créer un **formgroup** avec de **formcontrol**. On envoie une méthode PUT au back-end.

#### Ajouter une association
Cette page permet d'ajouter une association. Pour cela on utilise la même méthode que ajouter un utilisateur, à savoir créer un **formgroup** avec de **formcontrol**. On envoie une méthode POST au back-end. A noter que pour cette page nous avons fait le choix pour les utilisateurs de les afficher dans un select html en remplissant le select avec les utilisateurs de la base de données. Pour cela on vient dans le .ts chercher avec une requête GET tous les utilisateurs, on les stocke dans un tableau qu'on vient parcourir dans le select. Egalement vu qu'une association peut contenir plusieurs utilisateurs. Notre select peut être multiple et à l'aide de la commande **CTRL+CLICK** on peut sélectionner plusieurs utilisateurs.

#### La barre de navigation
La barre de navigation est un composant à part entière que l'on va afficher sur toutes les pages sauf sur celles de connexion ainsi que sur les pages détails. Ce composant est situé en haut de la page. Elle contient de simple bouton vers des bouts de notre application. Chaque boutons contient un appel à une méthode qui renvoie l'utilisateur sur la page associée à l'aide de la méthode naviguateByUrl de la classe Router de angular. En cliquant sur le premier bouton, cela permet d'envoyer un message à rabbitMq (AL), le deuxième permet d'aller sur son espace personnel. En cliquant sur le troisième bouton, on est envoyé vers la page contenant la liste des utilisateurs (dossier user-list). En cliquant sur le quatrième bouton, on est envoyé vers la page contenant la liste des associations (dossier association-list)
Le dernier bouton permet de se déconnecter : on est renvoyé vers la page de connexion. 

#### Liste des utilisateurs
On affiche, via une requête GET pour utiliser la méthode permettant de récupérer tous les utilisateurs, les informations de ces utilisateurs. Le bouton supprimer appelle dans le .html la méthode delete qui envoie une requête delete au back-end via l’ApiHelperService pour supprimer l’utilisateur. Lorsque l'on clique sur le bouton on récupère également l'id de l'utilisateur pour être sûr de ne pas delete un utilisateur au hasard.
Il y a également un bouton plus qui renvoie sur la page avec plus d’informations (dossier user-detail). 

#### Détail d'un utilisateur
Cette page page permet d'afficher plus d'informations sur l'utilisateur cliqué(que l’on va chercher via une requête GET selon l’ID). On récupère l’ID via les commandes this.route.paramMap.subscribe( res => {this.id = res.get('id');}). Il y a également un bouton pour retourner à la liste. 

#### Liste des assocations
On affiche, via une requête GET pour utiliser la méthode permettant de récupérer tous les associations, les informations de ces associations. Le bouton supprimer appelle dans le .html la méthode delete qui envoie une requête delete au back-end via l’ApiHelperService pour supprimer l'association. Lorsque l'on clique sur le bouton on récupère également l'id de l'association pour être sûr de ne pas delete une association au hasard.
Il y a également un bouton plus qui renvoie sur la page avec plus d’informations (dossier association-detail). 

#### Détail d'une assocation
Cette page page permet d'afficher plus d'informations sur une association cliquée (que l’on va chercher via une requête GET selon l’ID). On récupère l’ID via les commandes this.route.paramMap.subscribe( res => {this.id = res.get('id');}). Il y a également un bouton pour retourner à la liste. 

#### Barre de recherche
La barre de recherche est un composant à part entière que l'on va afficher sur les deux pages(Association list et User list) et sont gérées via la même classe qui est dans le dossier search, selon l’url de la page, on ira chercher dans la liste d’association ou d’utilisateur. On envoie ensuite une requête GET vers le backend où se trouve une méthode que l’on a rajouté appelée getSearch. On actualise ensuite le tableau avec la méthode setDataSource. A noter qu'un utilisateur peut être recherché via son id,son nom,son prénom et son âge. De plus une association peut être recherché par son nom.

## Conclusion
Ce frontend permet de remplir les fonctions demandées par le sujet, et va un peu plus loin par exemple dans la barre de recherche où l’on peut chercher également par le nom, le prénom, l’âge pour les utilisateurs et par le nom pour les associations. Un futur point qui peut être amélioré est l’envoi des caractéristiques d’un compte par mail lors de la création du compte afin que l’utilisateur connaisse son ID pour se connecter car celui-ci n’est jamais donné mais le sujet exige de se connecter via l’ID ce que nous avons choisi de respecter pour des conditions pratiques. 


------------------------------------------------------------------------------------------------
# Information

Ce projet a été généré par [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Lancer le projet
Pour lancer le projet, il faut suivre les instructions présentes sur le lien suivant : 
https://github.com/ghost-hikaru/Architecture_Logiciel
