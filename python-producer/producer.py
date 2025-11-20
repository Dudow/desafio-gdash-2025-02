import pika
import json
import requests
import logging
from datetime import datetime

# SETTINGS

LAT = -23.55
LON = -46.63
LOCATION_NAME = "São Paulo - SP"
QUEUE_NAME = "weather_queue"
RABBIT_URL = "amqp://teste:senha@localhost:5672/"

# https://open-meteo.com/en/docs#weather_variable_documentation
WEATHER_CODES_ENUM = {
    0: "Céu limpo",
    1: "Parcialmente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    51: "Garoa leve",
    61: "Chuva leve",
}

def fetch_weather():
    url = (
        f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}&longitude={LON}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,weather_code,precipitation"
    )

    response = requests.get(url)
    data = response.json()
    currentWeather = data["current"]
    logging.warning(currentWeather)

    weatherCode = currentWeather["weather_code"]
    # humidity = data["relative_humidity_2m"]


    weather = {
        "timestamp": currentWeather["time"],
        "location": LOCATION_NAME,
        "temperature": currentWeather["temperature_2m"],
        "humidity": currentWeather["relative_humidity_2m"],
        "wind_speed": currentWeather["wind_speed_10m"],
        "precipitation": currentWeather["precipitation"],
        "condition": WEATHER_CODES_ENUM.get(weatherCode, "Unknown")
    }

    return weather

def send_to_rabbitmq(message):
    #  RabbitMQ connection 
    credentials = pika.PlainCredentials('teste', 'senha')
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost', credentials=credentials)
    )
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_NAME)

    # Push to the queue
    channel.basic_publish(
        exchange='',
        routing_key=QUEUE_NAME,
        body=json.dumps(message)
    )

    print("It worked!")
    connection.close()

if __name__ == "__main__":
    print("Coletando dados...")
    weather = fetch_weather()
    send_to_rabbitmq(weather)