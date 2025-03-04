FROM node:23.8.0

ENV WORKDIR /var/app

RUN corepack enable; \
    yarn set version 4.3.1;

WORKDIR ${WORKDIR}

CMD node
