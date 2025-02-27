# Model: Symfony+Nuxt+Caddy

## Install

Add those lines to your hosts file:

    127.0.0.1 local.api.<domain>.fr
    127.0.0.1 local.app.<domain>.fr

Run from the project directory:

    docker-compose build

Copy the .env file, and edit it if needed:

    cp .env.skeleton .env

Edit the following files to update the directives whith you domain name

* docker/api/vhost.conf
* docker/caddy/Caddyfile
* api/.env

## Run

Run from the project directory:

    docker-compose up

Install the API server : 

    docker exec -it api bash
    composer install --with-all-dependencies
    bin/console d:s:u

Start the nuxt server:

    docker exec -it app bash
    yarn dev
