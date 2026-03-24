import json
import os
import time
import numpy as np
from kafka import KafkaConsumer, KafkaProducer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

KAFKA_BROKER = os.getenv('KAFKA_BROKER', 'localhost:9092')
TOPICS = ['sample.created', 'sample.updated', 'result.generated']

class AnomalyDetector:
    def __init__(self):
        self.model = RandomForestClassifier(random_state=42)
        self.is_trained = False

    def train_initial_model(self):
        # Dummy clinical data for training (Features: [Age, ParameterValue, PrevValue])
        # Labels: 0 (Normal), 1 (Abnormal)
        features = np.array([
            [25, 5.0, 5.1], [30, 150.0, 148.0], [45, 12.0, 11.5], [60, 200.0, 195.0],
            [22, 12.0, 5.0], [35, 300.0, 150.0], [50, 25.0, 12.0], [70, 450.0, 200.0]
        ])
        labels = np.array([0, 0, 0, 0, 1, 1, 1, 1])

        # WHY: split before preprocessing to mencegah data leakage
        X_train, X_test, y_train, y_test = train_test_split(
            features, labels, test_size=0.2, random_state=42
        )

        self.model.fit(X_train, y_train)
        self.is_trained = True
        print("Anomaly Detection model trained.")

    def predict(self, feature_vector):
        if not self.is_trained:
            return 0
        return self.model.predict([feature_vector])[0]

detector = AnomalyDetector()
detector.train_initial_model()

producer = KafkaProducer(
    bootstrap_servers=[KAFKA_BROKER],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

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

        if topic == 'result.generated':
            process_result_for_anomaly(data)
        elif topic == 'sample.created':
            print(f"New sample registered: {data.get('sample_id')}")

def process_result_for_anomaly(data):
    # Dummy feature extraction from result data
    try:
        val = float(data.get('value', 0))
        # In a real app, we'd fetch patient age and previous values from DB
        features = [30, val, val]
        prediction = detector.predict(features)

        if prediction == 1:
            print(f"CRITICAL ANOMALY DETECTED for Result {data.get('result_id')}!")
            producer.send('result.anomaly', {
                'result_id': data.get('result_id'),
                'anomaly': True,
                'timestamp': time.time()
            })
    except ValueError:
        pass

if __name__ == "__main__":
    while True:
        try:
            consume_messages()
        except Exception as e:
            print(f"Error: {e}. Retrying in 5 seconds...")
            time.sleep(5)
