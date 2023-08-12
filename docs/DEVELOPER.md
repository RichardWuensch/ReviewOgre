
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