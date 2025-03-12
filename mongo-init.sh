#!/bin/bash
sleep 5  # Give MongoDB some time to start

# Create MongoDB user
mongosh -u admin -p admin <<EOF
use DC_Station;
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "DC_Station" }]
});
exit;
EOF

echo "✅ Created user: admin (DC_Station)"

# Import JSON data (outside mongosh)
mongoimport --db DC_Station --collection animals --file /initial_data/DC_Station.animals.json --jsonArray --username admin --password admin --authenticationDatabase admin
mongoimport --db DC_Station --collection knowledges --file /initial_data/DC_Station.knowledges.json --jsonArray --username admin --password admin --authenticationDatabase admin
mongoimport --db DC_Station --collection requests --file /initial_data/DC_Station.requests.json --jsonArray --username admin --password admin --authenticationDatabase admin
mongoimport --db DC_Station --collection users --file /initial_data/DC_Station.users.json --jsonArray --username admin --password admin --authenticationDatabase admin

echo "✅ Initial Database Successful"