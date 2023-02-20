# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}

```
## Choose branch

Choose branch Dev2

### Containerization, Docker

    - To deploy the application and the database to docker, run npm run docker:build

    - Run npm run docker:stop to stop the containers

    - Run npm run docker:start to start the containers

    - Run npm run docker:test to run the e2e tests inside the docker

    - Run npm run docker:scan:server to scan the application for vulnerabilities

    - Run npm run docker:scan:db to scan the database for vulnerabilities

    - The application is running on port 4000

    - The postgres database is running on port 5432

    - PGAdmin is running on port 5050

