# Fitness Tracker UI

[![Node.js CI](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml)
[![Dependabot Updates](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates)

A web UI for the Fitness Tracker API built with Nuxt. This repository is the UI only, it talks to a separate backend API 
(see next section).

## Related projects
* The fitness tracker API: https://github.com/shendriks/fitness-tracker-api-java - use this as the backend. 
* A meta repository: https://github.com/shendriks/fitness-tracker - use this to quickly spin up both the API and the 
  frontend together with docker compose.

## Run locally
### Prerequisites
* Node 22

### Start the UI

First of all the app lives in the `app` folder, so make sure to `cd` into it:

```bash
$ cd app
```

Install dependencies:

```bash
$ npm install
```

To configure the API URL create a `.env` file in the `app` directory (next to `nuxt.config.ts`) and set:

```
NUXT_FITNESS_TRACKER_API_BASE_URL=http://localhost:8080/api
```

Start the development server:

```bash
$ npm run dev
```

Then go to http://localhost:3000, sign up, login and start tracking activities. Make sure, the backend is running.

### Run tests
```bash
$ npm run test
```

## Run locally with Docker Compose
To quickly spin up the API and the frontend together with docker compose, use this meta repo: 
https://github.com/shendriks/fitness-tracker

## Note
⚠️ This project is still in development and is not yet ready for production use. Use at your own risk.
