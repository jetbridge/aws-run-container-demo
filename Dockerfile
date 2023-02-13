## BUILDER
FROM node:18 AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages

# build
RUN pnpm install  # install all dependencies for building
RUN pnpm -r build  # build all packages

# install prod dependencies
RUN pnpm --filter service1 --prod deploy build/service1

## SERVICE1 RUNNER
FROM node:18-alpine AS service1

# create user
RUN mkdir -p /usr/src/app
RUN adduser -Dh /usr/src/app app
RUN chown -R app:app /usr/src/app
USER app

# set working directory
WORKDIR /usr/src/app

# copy app files
COPY --from=builder --chown=app:app /usr/src/app/build/service1 ./
# copy dist
COPY --from=builder --chown=app:app /usr/src/app/packages/service1/dist ./dist/

EXPOSE 3000

CMD ["npm", "start"]


