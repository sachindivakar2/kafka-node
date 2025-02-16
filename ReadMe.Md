Test Kafka Cluster
✅ Create a Topic

Run the following command:

docker exec -it kafka-1 kafka-topics --create \
  --topic test-topic \
  --partitions 3 \
  --replication-factor 2 \
  --bootstrap-server kafka-1:29092

✅ List Topics

docker exec -it kafka-1 kafka-topics --list --bootstrap-server kafka-1:29092

✅ Start a Kafka Producer

docker exec -it kafka-1 kafka-console-producer \
  --broker-list localhost:9092 \
  --topic test-topic

Type a message and press Enter:

Hello

✅ Start a Kafka Consumer

docker exec -it kafka-1 kafka-console-consumer \
  --bootstrap-server localhost:9092 \
  --topic test-topic \
  --from-beginning

Output.

Hello


Now that Kafka is set up, you can:

    Verify Kafka is Running

docker-compose up -d

Check logs:

docker logs kafka-1

List topics:

docker exec -it kafka-1 kafka-topics --list --bootstrap-server kafka-1:29092

Create a Test Topic

docker exec -it kafka-1 kafka-topics --create --topic test-chat --partitions 3 --replication-factor 3 --bootstrap-server kafka-1:29092

Start Producing and Consuming Messages Producer

docker exec -it kafka-1 kafka-console-producer --topic test-chat --bootstrap-server kafka-1:29092

Consumer

docker exec -it kafka-1 kafka-console-consumer --topic test-chat --from-beginning --bootstrap-server kafka-1:29092

To view  Kafka logs with Kafdrop

    go to http://localhost:9000/ 