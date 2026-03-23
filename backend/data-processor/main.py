import json
import os
import time
from kafka import KafkaConsumer

KAFKA_BROKER = os.getenv('KAFKA_BROKER', 'localhost:9092')
TOPICS = ['sample.created', 'sample.updated']

def consume_messages():
    print(f"Connecting to Kafka at {KAFKA_BROKER}...")
    consumer = KafkaConsumer(
        *TOPICS,
        bootstrap_servers=[KAFKA_BROKER],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='data-processor-group',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )

    print(f"Listening for events on {TOPICS}...")
    for message in consumer:
        topic = message.topic
        data = message.value
        print(f"Received event on {topic}: {data}")

        if topic == 'sample.created':
            process_new_sample(data)
        elif topic == 'sample.updated':
            process_sample_update(data)

def process_new_sample(data):
    # Logic to notify lab equipment or queue processing tasks
    print(f"Processing new sample: {data.get('sample_id')}")

def process_sample_update(data):
    print(f"Sample status updated: {data.get('status')}")

if __name__ == "__main__":
    while True:
        try:
            consume_messages()
        except Exception as e:
            print(f"Error: {e}. Retrying in 5 seconds...")
            time.sleep(5)
