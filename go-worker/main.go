package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/rabbitmq/amqp091-go"
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	Location    string  `json:"location"`
	Temperature float64 `json:"temperature"`
	Humidity    int     `json:"humidity"`
	WindSpeed   float64 `json:"wind_speed"`
	Condition   string  `json:"condition"`
}

func main() {
	connection, error := amqp091.Dial("amqp://teste:senha@localhost:5672/")
	if error != nil {
		log.Fatalf("RabbitMQ connection error: %v", error)
	}
	defer connection.Close()

	channel, error := connection.Channel()
	if error != nil {
		log.Fatalf("Open channel error: %v", error)
	}
	defer channel.Close()

	queueName := "weather_queue"

	messages, error := channel.Consume(
		queueName,
		"",
		true,  
		false, 
		false,
		false,
		nil,
	)
	if error != nil {
		log.Fatalf("Queue error: %v", error)
	}

	fmt.Println("Worker Go waiting for messages...")

	forever := make(chan bool)

	go func() {
		for message := range messages {
			fmt.Println("Message received!")

			var weather WeatherMessage
			error := json.Unmarshal(message.Body, &weather)
			if error != nil {
				fmt.Println("JSON Parse error:", error)
				continue
			}

			fmt.Printf("⛅ Data received:\n%+v\n\n", weather)
		}
	}()

	<-forever
}
