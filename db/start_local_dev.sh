#!/bin/bash
CONTAINER_NAME="ece-connect-db"
VOLUME_NAME="db-volume"

docker volume create $VOLUME_NAME ; docker kill $CONTAINER_NAME ; docker rm $CONTAINER_NAME ;
docker run --name $CONTAINER_NAME --network host -p 5432:5432 -e POSTGRES_PASSWORD="IrreleventDueToHostTrust" \
    -v $VOLUME_NAME:/var/lib/postgresql/data:rw -d postgres:11
docker run --rm --network host -v $(pwd)/db/migrations:/var/migrations flyway/flyway \
    -url=jdbc:postgresql://localhost:5432/ececonnect \
    -user=postgres -locations=filesystem:/var/migrations migrate
docker logs -f $CONTAINER_NAME

# Shell into db container:
# docker run -it --network host --rm postgres:11 psql -h 127.0.0.1 -U postgres -d ECECONNECT

# Reset db:
# docker kill $CONTAINER_NAME ; docker rm $CONTAINER_NAME; docker volume rm $VOLUME_NAME