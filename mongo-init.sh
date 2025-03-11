#!/bin/bash

mongoimport --db DC_Station \
            --collection animals \
            --file /initial_data/DC_Station.animals.json \
            --jsonArray \
            --username admin \
            --password admin \
            --authenticationDatabase admin

mongoimport --db DC_Station \
            --collection knowledges \
            --file /initial_data/DC_Station.knowledges.json \
            --jsonArray \
            --username admin \
            --password admin \
            --authenticationDatabase admin

mongoimport --db DC_Station \
            --collection requests \
            --file /initial_data/DC_Station.requests.json \
            --jsonArray \
            --username admin \
            --password admin \
            --authenticationDatabase admin

mongoimport --db DC_Station \
            --collection users \
            --file /initial_data/DC_Station.users.json \
            --jsonArray \
            --username admin \
            --password admin \
            --authenticationDatabase admin

mongosh <<EOF
use DC_Station;
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "DC_Station" }]
});
EOF