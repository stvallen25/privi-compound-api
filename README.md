# Privi Compound API
Backend repo for privi-compound

## How this works

## Documentation

### Authentication

This endpoint uses the basic authentication method. There is a predefined API key (`BASIC_REQUEST_TOKEN`). The client should send this key in the authorization header with `Basic` key prefix.

```bash
Authorization: Basic "BASIC_REQUEST_TOKEN"
```
## Setup

```bash
$ nvm install
$ npm install
$ cp .env.example .env
```

## Development

```bash
$ npm run start:dev
```
