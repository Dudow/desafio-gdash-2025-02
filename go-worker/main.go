package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	Location    string  `json:"location"`
	Temperature float64 `json:"temperature"`
	Humidity    int     `json:"humidity"`
	WindSpeed   float64 `json:"wind_speed"`
	Condition   string  `json:"condition"`
	Precipitation float64 `json:"precipitation"`
}

func main() {
	rabbitURL := getenv("RABBIT_URL", "amqp://teste:senha@rabbitmq:5672/")
	queueName := getenv("QUEUE_NAME", "weather_queue")

	connection := connectRabbit(rabbitURL)
	channel := createChannel(connection)

	defer connection.Close()
	defer channel.Close()

	messages, error := channel.Consume(
		queueName,
		"",
		false,  
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

			handleMessage(message, channel)
		}
	}()

	<-forever
}

func connectRabbit(url string) *amqp091.Connection {
    for {
		connection, error := amqp091.Dial(url)
        if error != nil {
            log.Printf("RabbitMQ connection error: %s\nRetrying in 5 seconds...", error)
            time.Sleep(5 * time.Second)
            continue
        }
        log.Println("Connected to RabbitMQ!")
        return connection
    }
}

func createChannel(conn *amqp091.Connection) *amqp091.Channel {
    channel, error := conn.Channel()
    if error != nil {
        log.Fatalf("Failed to open channel: %s", error)
    }
    return channel
}

func getenv(key, def string) string {
    v := os.Getenv(key)
    if v == "" {
        return def
    }
    return v
}

func getRetryCount(headers amqp091.Table) int {
    if headers == nil {
        return 0
    }
    raw, ok := headers["x-retry"]
    if !ok {
        return 0
    }
    f, ok := raw.(int32)
    if !ok {
        return 0
    }
    return int(f)
}

func processWeather(weather WeatherMessage) error {


	if err := validateWeatherMessage(weather); err != nil {
		return err
	}
	fmt.Println(weather)


    return nil 
}

func handleMessage(message amqp091.Delivery, channel *amqp091.Channel) {
	var data WeatherMessage

	error := json.Unmarshal(message.Body, &data)
	if error != nil {
		fmt.Println("JSON Parse error:", error)
		message.Nack(false, false)
		return
	}

	err := processWeather(data)
	if err == nil {
		message.Ack(false)
		return
	}

	// FAIL CASE
	retryCount := getRetryCount(message.Headers)

	if retryCount >= 3 {
		log.Println("Message failed too many times, discarding")
		message.Nack(false, false)
		return
	}

	log.Printf("Retry %d for message...\n", retryCount+1)
	republishMessage(message, channel, retryCount)

}


func republishMessage(message amqp091.Delivery, channel *amqp091.Channel, retryCount int) {
	newHeaders := amqp091.Table{
		"x-retry": int32(retryCount + 1),
	}

	error := channel.Publish(
		"",
		message.RoutingKey,
		false,
		false,
		amqp091.Publishing{
			ContentType: "application/json",
			Body:        message.Body,
			Headers:     newHeaders,
		},
	)

	if error != nil {
		log.Printf("Failed to republish: %v", error)
		message.Nack(false, false)
		return
	}
}

func validateWeatherMessage(weather WeatherMessage) error {
    if weather.Timestamp == "" ||
        weather.Location == "" ||
        weather.Temperature == 0 ||
        weather.Humidity == 0 ||
        weather.WindSpeed == 0 ||
        weather.Condition == "" {
        return fmt.Errorf("missing required fields")
    }

    return nil
}