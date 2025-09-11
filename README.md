# Fitness Tracker UI with Nuxt

[![Node.js CI](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml)
[![Dependabot Updates](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates)

A Nuxt-based web UI for the Fitness Tracker API. This repository is the UI only, it talks to a separate backend API
whose repository can be found here: https://github.com/shendriks/fitness-tracker-api-java

## Quick start with Docker Compose (API + UI together)
The fastest way to run both the API and this UI is via the meta repository: https://github.com/shendriks/fitness-tracker

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

Start the development server on `http://localhost:3000`:

```bash
$ npm run dev
```

Sign up and login to the UI, then import or create activities. Make sure the backend is running and reachable at the 
configured base URL.

### Run tests
```bash
$ npm run test
```

## Related projects
- Fitness Tracker API (Java/Spring Boot): https://github.com/shendriks/fitness-tracker-api-java
- Meta repo (docker compose for API + UI): https://github.com/shendriks/fitness-tracker

## Note
⚠️ This project is still in development and is not yet ready for production use. Use at your own risk.
