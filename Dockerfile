## BUILDER
FROM node:18 AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages

# build
RUN pnpm install
RUN pnpm -r build
RUN ls -al /usr/src/app/

# output prod version of service1
RUN pnpm --filter service1 --prod deploy build-service1

## RUNNER
FROM node:18-alpine AS service1

# install pnpm
# RUN npm install -g pnpm

# create user
RUN adduser -Dh /usr/src/app app
RUN mkdir -p /usr/src/app
RUN chown -R app:app /usr/src/app
USER app

# set working directory
WORKDIR /usr/src/app

# copy dist and node_modules
COPY --from=builder --chown=app:app /usr/src/app/build-service1 ./

EXPOSE 3000

CMD ["npm", "start"]


