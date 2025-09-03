ARG NODE_VERSION=22.17.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /app

RUN --mount=type=bind,source=app/package.json,target=package.json \
    --mount=type=bind,source=app/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY ./app .

EXPOSE 3000

CMD npm run dev
