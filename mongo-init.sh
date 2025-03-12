#!/bin/bash
mongosh DC_Station -u admin -p admin<<EOF
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "DC_Station" }]
});
exit;
EOF
mongoimport --db DC_Station --collection animals --file /initial_data/DC_Station.animals.json --jsonArray --username admin --password admin
mongoimport --db DC_Station --collection knowledges --file /initial_data/DC_Station.knowledges.json --jsonArray --username admin --password admin
mongoimport --db DC_Station --collection requests --file /initial_data/DC_Station.requests.json --jsonArray --username admin --password admin
mongoimport --db DC_Station --collection users --file /initial_data/DC_Station.users.json --jsonArray --username admin --password admin
echo "Initial Database Successful";
