# Stage 0: Install alpine Linux + node + dependencies
FROM node:16.15-alpine@sha256:c785e617c8d7015190c0d41af52cc69be8a16e3d9eb7cb21f0bb58bcfca14d6b AS base

LABEL maintainer="1jz"
LABEL description="Fragments node.js microservice web-app"

ENV NODE_ENV=production

WORKDIR /app

# copy dep files and install the production deps
COPY package.json package-lock.json ./
RUN npm ci

#######################################################################

# Stage 1: use dependencies to build the site
FROM base AS builder

# Copy source code into the image
COPY . .

# Build the site to build/
RUN ["npm", "run", "build"]

########################################################################

# Stage 2: nginx web server to host the built site
FROM nginx:stable-alpine@sha256:74694f2de64c44787a81f0554aa45b281e468c0c58b8665fafceda624d31e556 AS deploy

# Put our build/ into /usr/share/nginx/html/ and host static files
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail localhost:80 || exit 1