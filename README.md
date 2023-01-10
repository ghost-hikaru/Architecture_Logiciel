# Rapport
Voici le lien pour acceder au rapport [Rapport](https://github.com/ghost-hikaru/Architecture_Logiciel/blob/main/Architecture.md).



# Comment lancer l'application ?
## db

A MySQL database service. The service uses the official MySQL image from Docker Hub, and sets the following environment variables:

- `MYSQL_USER`: The user that will be used to connect to the database. The value is set to `root`.
- `MYSQL_ROOT_PASSWORD`: The password for the root user. The value is set to `root`.
- `MYSQL_PASSWORD`: The password for the specified user. The value is set to `root`.
- `MYSQL_DATABASE`: The name of the database to be created. The value is set to `nest`.

The service is configured to listen on port 3306 and will be exposed on the host machine at the same port, and also the service will be given a name `db`.

## frontend

A service that builds an Angular application from the files located in the `./wm_frontend` directory and exposes the application on port 4200 of the host machine, and also connects to app-tier network.

## backend

A service that builds a Node.js application from the files located in the `./wm` directory and exposes the application on port 3000 of the host machine. This service depends on the `db` service, and connects to app-tier network.

## adminer

A service that runs the [Adminer](https://www.adminer.org/) web-based database management tool. The service uses the official Adminer image from Docker Hub and exposes the tool on port 8080 of the host machine.

## rabbitmq

A service that runs a RabbitMQ message broker. The service uses the official RabbitMQ image from Docker Hub with the management plugin enabled. It connects to the app-tier network and is accessible via ports 15672 for the management UI and 5672 for the message broker

## quarkus

A service that runs a Quarkus application from the files located in the `./quarkus` directory. It runs the native version of the application using the `Dockerfile.native` file located in `src/main/docker` directory. It connects to the app-tier network and exposes the application on port 8081. Also, it depends on the rabbitmq service.

## Networks

This project uses a custom bridge network named `app-tier`, to which all services are connected to.

# Usage

To start the services defined in this project, run the following command in the same directory as the `docker-compose.yml` file:
```
docker-compose build
```
The command above allows you to build the project by downloading all the necessary images.
Finally it remains only to make :
```
docker-compose up
```

# Contributeur
[Mathurin Melvin](melvin.mathurin@etudiant.univ-rennes1.fr),

[Voisin Enzo](enzo.voisin@etudiant.univ-rennes1.fr)
