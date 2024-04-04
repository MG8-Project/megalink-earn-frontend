FROM node:20-alpine as base

WORKDIR /src

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

FROM base as execute

RUN chmod +x /src/deployment/run.sh

ENTRYPOINT ["/bin/sh", "/src/deployment/run.sh"]

EXPOSE 3000