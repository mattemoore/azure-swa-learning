#!/bin/bash
CONTAINER_NAME="ece-connect-db"
DEV_PASSWORD="localdevpassword"
NETWORK_NAME="db-network"

docker kill $CONTAINER_NAME ; docker rm $CONTAINER_NAME ; docker network rm $NETWORK_NAME
docker network create $NETWORK_NAME
docker run --name $CONTAINER_NAME --network $NETWORK_NAME -e POSTGRES_PASSWORD=$DEV_PASSWORD -v $(pwd)/dev_data:/var/lib/postgresql/data -d postgres:11

# Shell into db container:
# docker run -it --network $NETWORK_NAME --rm postgres:11 psql -h $CONTAINER_NAME -U postgres    