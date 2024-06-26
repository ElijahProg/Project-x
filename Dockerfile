FROM node:18

LABEL maintainer="Elias"

WORKDIR /Project-x

COPY --chown=node:node . .

# Install dependencies
RUN yarn --frozen-lockfile

# Set Docker as a non-root user
USER node