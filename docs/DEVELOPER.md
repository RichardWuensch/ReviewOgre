## Requirements

The application requires JavaScript to be activated in the browser.

We are using a [Font](fonts/roboto-v30-latin-regular.woff2) that is included locally in the project.
This font does not support legacy browsers. Minimum versions are
- Chrome 36+
- Opera 23+
- Firefox 39+
- Safari 12+
- iOS 10+

As of the creation of the project Vite requires Node.js version
14.18+ or higher. Vite doesn't support the legacy browser versions as well.
If you need to support these versions look into the vite-legacy plugin.

Cypress requires at least Node.js version 14+ as well.

To push to the repository your commit needs to pass the pipeline.
This requires at least one active GitLab Runner. For more information 
visit the chapter on the [Pipeline](#Pipeline).

## Recommended extension for VS Code

- ES7+ React/Redux/React-Native snippets
- Material Icon Theme
- Quokka.js
- ESLint
- Git Graph
- IntelliSense for CSS class names in HTML

These recommendations however, are purely optional.

## Important information on the source code

The following chapters provides a quick overview on some important 
aspects of the source code.

### Project structure

The projects structure should mostly be self-explanatory. This diagram 
should provide an overview of the most important files and directories
and what's contained within.

```
root/
├── cypress/                                (e2e tests)
├── docs/
├── fonts/                                  (locally included fonts)
├── src/
│   ├── algorithm/
│   ├── import_export/                      (import/export functionality)
│   ├── components                          (UI components)
│   ├── data/                               (models)
│   └── media/
├── public/
│   └── manifest.json                       (provides information for installation)
├── vite.config.js                          (vite react config)
├── cypress.config.js                       (e2e config)
├── .eslintrc.js                            (codestyle config)
├── package.json
├── netlify.toml                            (deploy config)
├── gitlab.ci.yml                           (pipeline config)
├── index.html                              (entry point of app)
└── README.md
```

### Context

The application uses the context to store the slots, rooms and participants.
This allows for the data to be available globally. The context is wrapped arround 
the UI elements. 

For more information visit the [React Documentation](https://react.dev/reference/react/createContext).
### Algorithm

Information about the algorithm will be provided in a separate file.

## e2e-Tests

In some cases you may need to add a css class to locate a specific item in the
DOM. To do so please use the following naming convention:
``e2e-testing-[unique-name-of-class]``.

This marks the CSS-class to be for testing purposes only to avoid 
confusions or collisions with other CSS classes.

> When running ``npm install`` to moderate severity vulnerabilities will appear.
> These stem from cypress and don't affect the project itself, since they are only 
> dev dependencies.


## Pipeline

### Basic Information

This project requires at least one GitLab runner to be active.
These runners will run the pipeline after every commit. The pipeline
has the following stages:

1. Build: Builds the applications to make sure the build works. This
is important for the deploy in step 5 as well.
2. Test: Runs the unit tests. Will fail if one of the tests fails.
3. e2e: Runs the e2e tests. Will fail if one of tests fails
4. Lint: Runs esLint on the project. This will create a report on
coding style issues in the project. The rules can be found in the ```.eslintrc.js```
file in the repository root folder.
5. Deploy: This stage will only run on the main branch. The deploy allows us to
show the current state of the application to our customers. The link
to this deploy is in the ReadMe.md file. To deploy we need to secret values which
are stored in GitLab (marked with %[value_name]) under ```Settings > CI/CD > Variables```.

### Runners

To use a runner you need to perform two steps:
1. Install a runner on a device
2. Register it with the project

> It is recommended to install the runner on a Raspberry Pi or a Cloud instance
> to run the runner continuously

> You need to have docker installed on the machine because the pipeline
> runs with docker images. Please make sure the system has the 
> recommended system requirements.

### 1. Install

GitLab offers extensive information on the installations process
based on the target OS. The information can be found here:
[GitLab Runner installation guilde](https://docs.gitlab.com/runner/install/)

### 2. Register

> `GitLab URL` is [https://git.fiw.fhws.de/](https://git.fiw.fhws.de/) and `Gitlab Token` token can be found under:
> `Settings > CI/CD > Runners > ⋮ `

After installing the runner make sure it is started. Next 
you need to register it with the project. A step-by-step guide
can be found here: [GitLab Runner registration](https://docs.gitlab.com/runner/register/index.html).
If it is successfully registered and running it will be shown in
the project under `Settings > CI/CD > Runners` with a green dot
next to it.