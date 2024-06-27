FROM node:18

LABEL maintainer="Elias"

WORKDIR /Project-x

# Install dependencies
RUN rm -rf node_modules
COPY package.json /Project-x

# RUN npm install
RUN yarn --frozen-lockfile

# Set Docker as a non-root user
USER node