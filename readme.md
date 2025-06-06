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
    bin/console doctrine:database:create
    bin/console doctrine:schema:update --force

Start the nuxt server:

    docker exec -it app bash
    yarn install
    yarn dev

> **Warning**: You will probably have to open a tab for both of the domains (`local.api.<domain>.fr` and 
>          `local.api.<domain>.fr`) in your browser to add a security exception for the self-signed SSL certificate.
> Without it, the frontend's requests will be blocked as CORS errors.


## Add Fixtures

	ALTER TABLE `snc_demo`.`author` AUTO_INCREMENT = 1;
    INSERT INTO `snc_demo`.`author` (`name`)
    VALUES 
        ('Artist 1'),
        ('Artist 2'),
        ('Artist 3');

    ALTER TABLE `snc_demo`.`song` AUTO_INCREMENT = 1;
    INSERT INTO `snc_demo`.`song` (`title`, `author_id`)
    VALUES
        ('Song A', 1),
        ('Song B', 1),
        ('Song C', 1),
        ('Song D', 2),
        ('Song E', 2),
        ('Song F', 3),
        ('Song G', 3);


## Accessing the OpenAPI Interface

The OpenAPI interface is available at:

```
https://local.api.snc-demo.fr/api/docs
```

This interface provides documentation for all available API routes.
