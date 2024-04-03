#!/bin/bash
APP=app
CONTAINER_NAME=ixicale.github.io

function deploy(){
    docker build -t $APP.$CONTAINER_NAME .;
    docker run \
        --name $CONTAINER_NAME \
        -p 4000:4000 -p 35729:35729 \
        -v "$(pwd):/usr/src/app" $APP.$CONTAINER_NAME;
}
function remove(){
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
}

# by parameter --deploy or --remove do the action
if [ "$1" == "--deploy" ]; then
    deploy
elif [ "$1" == "--remove" ]; then
    remove
else
    echo "Usage: $0 --deploy | --remove"
fi
