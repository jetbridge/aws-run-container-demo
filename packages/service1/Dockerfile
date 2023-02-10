FROM node:18

RUN npm install -g pnpm

# create user
RUN useradd -ms /bin/bash app
RUN mkdir -p /usr/src/app
RUN chown -R app:app /usr/src/app
USER app

# set working directory
WORKDIR /usr/src/app

# install dependencies
COPY package.json ./
RUN pnpm install

# copy built app
COPY dist ./dist

EXPOSE 3000

CMD ["pnpm", "start"]


