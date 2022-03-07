FROM node:14.18.1-buster

ENV WORKDIR /var/app
WORKDIR ${WORKDIR}

# Declare the entrypoint.sh file
COPY ./docker/app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]