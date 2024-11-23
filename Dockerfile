FROM node:20-alpine AS base
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++ linux-headers eudev-dev

RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml .

RUN pnpm i
COPY . .

# ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

CMD ["pnpm", "start"]