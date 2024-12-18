### NPM Version | Package License | NPM Downloads | CircleCI Coverage | Discord Backers on Open Collective | Sponsors on Open Collective | Donate Us | Support Us | Follow Us on Twitter

---

## Description
Module that would allow a user to sign up and sign in, to the application.

## Project setup
To set up the project, run the following command:

```bash
$ npm install
```

## Compile and run the project

- **Watch mode**
```bash
$ npm run start:dev
```

## Run tests

- **Unit tests**
```bash
$ npm run test
```

## Swagger API Documentation
Once your application is running, you can access the Swagger UI for API documentation:

- Swagger UI URL: `http://localhost:3000/api`

## Example CURL Commands

### 1. **Signup**
To register a new user, use the following `curl` command:

```bash
curl --location 'http://localhost:3000/auth/signup' --header 'Content-Type: application/json' --data-raw '{
    "name": "anshul",
    "email": "anshul4@gmail.com",
    "password": "12345a!a"
}'
```

### 2. **Health Check**
Check the health status of the application:

```bash
curl --location --request GET 'http://localhost:3000/health' --form 'file=@"/Users/anshulchhabra/Downloads/anshul_accessKeys.csv"'
```

### 3. **Signin**
To login with a registered user, use the following `curl` command:

```bash
curl --location 'http://localhost:3000/auth/signin' --header 'Content-Type: application/json' --data-raw '{
    "email": "anshul4@gmail.com",
    "password": "12345a!a"
}'
```