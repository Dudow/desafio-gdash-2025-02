package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	Location    string  `json:"location"`
	Temperature float64 `json:"temperature"`
	Humidity    int     `json:"humidity"`
	WindSpeed   float64 `json:"windSpeed"`
	Precipitation float64 `json:"precipitation"`
	Condition   string  `json:"condition"`
}

func main() {
	rabbitURL := getenv("RABBIT_URL", "amqp://teste:senha@rabbitmq:5672/")
	apiURL := getenv("WEATHER_API_URL", "http://api:3004/weathers/register-weather")
	weatherAPIToken := getenv("WEATHER_API_TOKEN", "")


	queueName := getenv("QUEUE_NAME", "weather_queue")

	connection := connectRabbit(rabbitURL)
	channel := createChannel(connection)

	defer connection.Close()
	defer channel.Close()

	messages, err := channel.Consume(
		queueName,
		"",
		false,  
		false, 
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Queue error: %v", err)
	}

	fmt.Println("Worker Go waiting for messages...")

	forever := make(chan bool)

	go func() {
		for message := range messages {
			handleMessage(message, channel, apiURL, weatherAPIToken)
		}
	}()

	<-forever
}

func connectRabbit(url string) *amqp091.Connection {
    for {
		connection, err := amqp091.Dial(url)
        if err != nil {
            log.Printf("RabbitMQ connection error: %s\nRetrying in 5 seconds...", err)
            time.Sleep(5 * time.Second)
            continue
        }
        log.Println("Connected to RabbitMQ!")
        return connection
    }
}

func createChannel(conn *amqp091.Connection) *amqp091.Channel {
    channel, err := conn.Channel()
    if err != nil {
        log.Fatalf("Failed to open channel: %s", err)
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

func handleMessage(message amqp091.Delivery, channel *amqp091.Channel, apiURL, weatherAPIToken string) {
	var data WeatherMessage

	headers := map[string]string{
		"Content-Type": "application/json",
		"WEATHER_API_TOKEN": weatherAPIToken,
	}

	
	error := json.Unmarshal(message.Body, &data)
	if error != nil {
		fmt.Println("JSON Parse error:", error)
		message.Nack(false, false)
		return
	}

	// SUCCESS CASE
	err := processWeather(data)
	if err == nil {
		message.Ack(false)
		sendPost(apiURL, data, headers)
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

	err := channel.Publish(
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

	if err != nil {
		log.Printf("Failed to republish: %v", err)
		message.Nack(false, false)
		return
	}


}

func validateWeatherMessage(weather WeatherMessage) error {
	if weather.Timestamp == "" {
		return fmt.Errorf("timestamp is required")
	}
	if weather.Location == "" {
		return fmt.Errorf("location is required")
	}
	if weather.Humidity < 0 || weather.Humidity > 100 {
		return fmt.Errorf("humidity must be between 0 and 100")
	}
	if weather.Condition == "" {
		return fmt.Errorf("condition is required")
	}

    return nil
}

func sendPost(url string, data WeatherMessage, headers map[string]string) (*http.Response, error) {

	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal json: %w", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Add headers
	req.Header.Set("Content-Type", "application/json")
	for k, v := range headers {
		req.Header.Set(k, v)
	}

	client := &http.Client{
		Timeout: 10 * time.Second,
	}
	res, err := client.Do(req)


	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}

	if res.StatusCode < 200 || res.StatusCode >= 300 {
		defer res.Body.Close()
		return res, fmt.Errorf("non-2xx status code: %d", res.StatusCode)
	}

	return res, nil
}