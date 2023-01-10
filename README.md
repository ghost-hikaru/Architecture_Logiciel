# Rapport
Here is the link to access the report [Rapport](https://github.com/ghost-hikaru/Architecture_Logiciel/blob/main/Architecture.md).

# Project Overview
This project utilizes `Docker` and `docker-compose` to bring together multiple services, including:
- A MySQL database service, using the `mysql/mysql-server` image
- An Nginx service, using the `nginx:latest` image
- A frontend service, using a custom built image from the `./wm_frontend` directory
- A backend service, using a custom built image from the `./wm` directory
- An adminer service, using the `adminer` image
- A rabbitmq service, using the `rabbitmq:management` image
- A quarkus service, using a custom built image from the `./quarkus` directory
- An smtp service, using the `soulteary/maildev` image
- A Prometheus service, using the `prom/prometheus` image
- A Grafana service, using the `grafana/grafana` image

Each service runs in its own container and communicates with the other services through a shared `app-tier` network.

## Getting Started
1. Clone this repository to your local machine.
2. Make sure you have `Docker` and `docker-compose` installed on your machine.
3. In the project root, run `docker-compose build` to build the necessary images.
4. Run `docker-compose up` to start the services.
5. Access the services at the following URLs:
   - MySQL: `http://localhost:3306`
   - Nginx: `http://localhost:80`
   - Frontend: `http://localhost:4200`
   - Backend: `http://localhost:3000`
   - Adminer: `http://localhost:8080`
   - Rabbitmq: `http://localhost:15672`
   - Quarkus: `http://localhost:8081`
   - Grafana: `http://localhost:3001`
## Volumes
This project uses the following volumes:
- `prometheus-data`: This volume is used to store the data collected by Prometheus service.
- `grafana-data`: This volume is used to store the data collected by Grafana service.
- `grafana-config`: This volume is used to store the configuration files for Grafana service.
- `grafana-dashboards` : This volume is used to store the dashboards for Grafana service.

## Database

A MySQL database service. The service uses the official MySQL image from Docker Hub, and sets the following environment variables:

- `MYSQL_USER`: The user that will be used to connect to the database. The value is set to `root`.
- `MYSQL_ROOT_PASSWORD`: The password for the root user. The value is set to `root`.
- `MYSQL_PASSWORD`: The password for the specified user. The value is set to `root`.
- `MYSQL_DATABASE`: The name of the database to be created. The value is set to `nest`.

The service is configured to listen on port 3306 and will be exposed on the host machine at the same port, and also the service will be given a name `db`.

## Frontend

A service that builds an Angular application from the files located in the `./wm_frontend` directory and exposes the application on port 4200 of the host machine, and also connects to app-tier network.

## Backend

A service that builds a Node.js application from the files located in the `./wm` directory and exposes the application on port 3000 of the host machine. This service depends on the `db` service, and connects to app-tier network.

## Quarkus

A service that runs a Quarkus application from the files located in the `./quarkus` directory. It runs the native version of the application using the `Dockerfile.native` file located in `src/main/docker` directory. It connects to the app-tier network and exposes the application on port 8081. Also, it depends on the rabbitmq service.

### RabbitMQ
- The management interface for RabbitMQ can be accessed at `http://localhost:15672`
- The default username and password for the management interface is `guest/guest`.
- It runs on default port `5672` for amqp and `15672` for management interface
- You could also connect to rabbitmq by using rabbitmq-client and connecting to host `rabbitmq` and port `5672`

### Grafana
- The Grafana web interface can be accessed at `http://localhost:3001`
- The default username and password for the web interface is `admin/password`.
- You could also connect to grafana by using a grafana-client and connecting to host `grafana` and port `3000`

### Adminer
- The Adminer web interface can be accessed at `http://localhost:8080`
- You could connect to the database server by using mysql-client and connecting to host `db` and port `3306`.

### Nginx
- The default nginx configuration can be found in `./nginx.conf` and replace it with your custom configuration. 
- Certs should be placed in `./certs` and referenced in the nginx configuration
- Nginx will run on ports `80` and `443` which are mapped to the host

### SMTP
- The SMTP service can be accessed at `http://localhost:1080`
- The service will catch all outgoing mails and display them in its web interface
- You can configure your application to send mails to the smtp service and use the smtp service web interface to view the mails

### Prometheus
- Prometheus can be accessed at `http://localhost:9090`
- Prometheus is an open-source monitoring system that is used to collect and store metrics from different systems
- It is used to scrape metrics from the backend, quarkus and rabbitmq services and store them in the `prometheus-data` volume for further analysis
- Prometheus uses the configuration file `prometheus.yaml` which is located in `./loadTesting/prometheus/` directory


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
