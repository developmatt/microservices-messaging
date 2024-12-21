# monorepo-microservices


## Kafka

To run kafka locally, you can use the docker-compose.yml file.
### docker
Run `docker-compose up -d`

### Check if the connection with kafka and zookeeper is ok
nc -zv localhost 22181 // zookeeper

nc -zv localhost 29092 // kafka

### Create a new kafka topic
`docker exec -it kafka /usr/bin/kafka-topics --create --topic new_topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`
- kafka is the container name
- new_topic is the topic name

### Check if the topic was created
`docker exec -it kafka /usr/bin/kafka-topics --list --bootstrap-server localhost:9092`

### Test if the messages can be sent and listened

Remember to run this both commands in different terminals

#### Listening
docker exec -it kafka /usr/bin/kafka-console-consumer --topic novo_topico --bootstrap-server localhost:9092 --from-beginning

#### Sending
docker exec -it kafka /usr/bin/kafka-console-producer --topic novo_topico --bootstrap-server localhost:9092
After run this command, you can write the message and press enter to send it.