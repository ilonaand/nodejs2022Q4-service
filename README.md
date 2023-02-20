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

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging



    To deploy the application and the database to docker, run npm run docker:build

    Run npm run docker:stop to stop the containers

    Run npm run docker:start to start the containers

    Run npm run docker:test to run the e2e tests inside the docker

    Run npm run docker:scan:app to scan the application for vulnerabilities

    Run npm run docker:scan:db to scan the database for vulnerabilities

    The application is running on port 4000

    The postgres database is running on port 5432

    PGAdmin is running on port 5050

