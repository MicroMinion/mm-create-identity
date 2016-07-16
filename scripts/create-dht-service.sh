#!/bin/sh

SERVICE_DIR=/etc/service

mkdir -p ${SERVICE_DIR}/mm-dht/log/main
mkdir -p ${SERVICE_DIR}/mm-dht/env
cp ../services/dht/run ${SERVICE_DIR}/mm-dht/run
cp ../services/dht/run-log ${SERVICE_DIR}/mm-dht/log/run
ln -sf ${SERVICE_DIR}/mm-dht /service/mm-dht
