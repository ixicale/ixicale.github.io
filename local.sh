#!/bin/bash
APP=ixicale.github.io
CONTAINER_NAME=my-running-app

function deploy(){
    docker build -t $APP . && \
    docker run --name $CONTAINER_NAME -p 4000:4000 -p 35729:35729 -v "$(pwd):/usr/src/app" $APP
}
function remove(){
    docker stop $CONTAINER_NAME && \
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
