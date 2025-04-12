# Riu Heroes Manager

This project is based on a Single Page Application (SPA) developed with Angular for managing a list of superheroes.  
It includes functionalities to create, read, update, and delete (CRUD) heroes, along with a paginated and filterable list view.  
The project was developed as part of a frontend technical challenge, implementing reusable services, reactive forms, routing, and unit testing using the latest LTS version of Angular.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Docker

### Create Docker Image

To build a Docker image of the application, use the following command:

```bash
docker build -t riu-heroes-manager:v1.0.0 -f ./Dockerfile .

```

### Create a docker container

To create a Docker container, use the following command:

```bash
docker run -p 8000:80 -d riu-heroes-manager:v1.0.0
```

### Test app in docker container

Access to

```bash
http:locahost:8000
```

## Datasource

The app supports 3 types of data sources in order to test the application during the development procress.

The `environment.ts` file contain a `dataSource` property that can be modified using one of this 3 values:

- _api_: All the operations (GET, PUT, POST, DELETE) are made using a real API.
- _json-server_: all the operations (GET, PUT, POST, DELETE) are made using a 'json-server' server that could be initiated using
- _in-memory_: all the operations (GET, PUT, POST, DELETE) are made in memory using a Javascript array with all the loaded Heroes.

## Considerations

### Core Frameworks & Libraries

- [**Angular**](https://angular.io/) — Front-end framework for building dynamic web applications.
- [**Angular Material**](https://material.angular.io/) — UI component library based on Material Design, used for consistent and accessible design.
- [**Tailwind CSS**](https://tailwindcss.com/) — Utility-first CSS framework for rapid UI development with custom styling.

### Other Tools

- [**lint-staged**](https://github.com/okonet/lint-staged) — Runs linters (like ESLint/Prettier) only on staged files before a commit, improving performance and preventing bad code from being committed.
- [**Commitlint**](https://commitlint.js.org/) — Ensures that commit messages follow a conventional format (e.g., Conventional Commits), useful for automation and changelogs.

These tools help enforce code quality, consistency, and reliable versioning across the team and development lifecycle.
