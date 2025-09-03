ARG NODE_VERSION=22.17.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /app

RUN apk --no-cache add curl

RUN --mount=type=bind,source=app/package.json,target=package.json \
    --mount=type=bind,source=app/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY ./app .

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s \
    CMD curl -f http://localhost:3000 || exit 1

CMD npm run dev
