# Fitness Tracker UI

[![Node.js CI](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/node.js.yml)
[![Dependabot Updates](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/shendriks/fitness-tracker-ui-nuxt/actions/workflows/dependabot/dependabot-updates)

A web UI for the Fitness Tracker API built with Nuxt. This repository is the UI only, it talks to a separate backend API 
(see next section). Part of the [Fitness Tracker project](https://shendriks.dev/projects/fitness-tracker).

## Related projects
* The fitness tracker API: https://github.com/shendriks/fitness-tracker-api-java - use this as the backend. 

## Run locally
### Prerequisites
* Node 24

### Start the UI

Install dependencies:

```bash
$ npm install
```

To configure the API URL create a `.env` file in the root directory (next to `nuxt.config.ts`) and set:

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

## Note
⚠️ Side-project and self-education experiment. No longer actively developed and not production-ready. Use at your own risk.
