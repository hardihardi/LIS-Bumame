package kafka

import (
	"context"
	"encoding/json"
	"os"

	"github.com/segmentio/kafka-go"
)

var writer *kafka.Writer

func Init() {
	broker := os.Getenv("KAFKA_BROKER")
	if broker == "" {
		broker = "localhost:9092"
	}

	writer = &kafka.Writer{
		Addr:     kafka.TCP(broker),
		Balancer: &kafka.LeastBytes{},
	}
}

func Publish(ctx context.Context, topic string, key string, value interface{}) error {
	v, err := json.Marshal(value)
	if err != nil {
		return err
	}

	return writer.WriteMessages(ctx, kafka.Message{
		Topic: topic,
		Key:   []byte(key),
		Value: v,
	})
}
