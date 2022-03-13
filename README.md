

## Overview

This project has two components: `api` and `react\my-blog`. 

The `api` contains a rest API that serves the frontend. `react\my-blog` is a react application that represents the information given by the api.

- [Overview](#overview)
- [Running the project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Tests](#tests)
  - [Unit](#unit)
  - [UI/Integration](#uiintegration)

## Running the project

### Backend

In order to run the project, you must have node installed, my version is :

```
> node -v 
> v16.14.0
```

To start the `backend`, you must run the project from within the api folder:

```
> cd api
> npm install 
> npm start
```

By default, the backend is runnning on port `9000` and you can access it with the following url:

```
> http://localhost:9000
```

### Frontend

To start the `frontend` you need to enter the project within its folder:

```
> cd react/my-blog
> npm install 
> npm start
```

In order to access the front, go into a browser of your choosing and type:

```
> http://localhost:3000
```


## Tests

There two test types: `unit` and `ui/integration` tests.

### Unit

React components are unit tested in jest (using `react-testing-library`) and the API is stubbed with static data.

You can run all tests with the following commands:

```
cd react/my-blog
npm test
```

### UI/Integration

For this kind of tests the `cypress` framework was used.

> Before running the tests, you must make sure the frontend is running. The backend is mocked

You can run all tests with the following commands:

```
cd react/my-blog
npm run cypress:start
```

There is also a `cypress dashboard` that lets you choose which tests to run, and monitor with great detail what happens meanwhile. You can open that with the following commands:

```
cd react/my-blog
npm run cypress:open
```



