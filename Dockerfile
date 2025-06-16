# Build Stage
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm i --shamefully-hoist

COPY . ./
RUN pnpm run build

# Production Stage
FROM node:22-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

EXPOSE 3000
CMD ["node", "/app/server/index.mjs"]
