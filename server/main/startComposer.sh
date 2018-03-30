# Be sure to run stopFabric.sh then startFabric.sh before executing this file
composer card create -p connection.json -u PeerAdmin -c Admin@org1.example.com-cert.pem -k keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
composer card import -f PeerAdmin@fabric-network.card
composer runtime install -c PeerAdmin@fabric-network -n aics
composer network start -c PeerAdmin@fabric-network -a aics.bna -A admin -S adminpw
composer card import -f admin@aics.card
composer network ping -c admin@aics
