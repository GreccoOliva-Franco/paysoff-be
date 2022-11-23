#!/bin/bash

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")

# Go to docker-compose.yml directory
cd $SCRIPTPATH
cd ..

docker compose down
docker volume rm $(docker volume ls -q)
