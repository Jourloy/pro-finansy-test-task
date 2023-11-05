# ProFinansy test task

## Description

It's example of simple backend architecture.

- `apps/backend` is main REST API service.
- `apps/auth` is microservice for create users and generate tokens.

### Note

I done many test task and make my own backend. I know about *guards*, *middlewares*, *enums*, *decorators*, *services* and etc. You can look my other tasks:

- [My own backend](https://github.com/Jourloy/Jourloy-Backend)
- [Typical Nest.JS backend](https://github.com/Jourloy/MarketGuru-test-task)
- [Express.js backend](https://github.com/Jourloy/atsystems-test-task)
- [Nest.JS and Mongo](https://github.com/Jourloy/SpaceCorpTask)
- [API service for news](https://github.com/Jourloy/QtimTask)

## Getting started

### Prepare

I add `.env` in `.gitignore`, so you should create `.env` from `.env.example` in root, `/apps/backend` and `/apps/auth` folders.

Do not change params if it's not required.

### Starting

```bash
$ docker-compose up -d
```

### Use

You can open `/api` for get swagger API or import my **postman collection** for 
testing.

#### Create user

Send **POST** on `/auth` with `username` and `password` in body. You will get user and tokens models.

#### Get user data from token

Send **GET** on `/auth` with token in `authorizarion` header. You will get decoded data from jwt token.

#### Get user session

Send **GET** on `/auth/session`. You will get current session.