import json
import os
import pika
import requests
import time
import logging

# SETTINGS

def cast_env_float(key, default):
    value = os.getenv(key)
    if value is None:
        return default
    try:
        return float(value)
    except ValueError:
        raise ValueError(f"Invalid float for {key}: {value}")

LAT = cast_env_float("LAT", -23.55)
LON = cast_env_float("LON", -46.63)
LOCATION_NAME = os.getenv("LOCATION_NAME", "São Paulo - SP")
QUEUE_NAME = os.getenv("QUEUE_NAME", "weather_queue")
RABBIT_URL = os.getenv("RABBIT_URL", "amqp://teste:senha@rabbitmq:5672/")
INTERVAL = int(os.getenv("INTERVAL", 10))

# https://open-meteo.com/en/docs#weather_variable_documentation
WEATHER_CODES_ENUM = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Intense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Intense Rain",
    80: "Light Rain showers",
    81: "Moderate Rain showers",
    82: "Heavy Rain showers"
}

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

def fetch_weather():
    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={LAT}&longitude={LON}"
        "&current=relative_humidity_2m,temperature_2m,wind_speed_10m,weather_code,precipitation"
    )

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()  # levanta HTTPError se status >= 400
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"[fetch_weather] HTTP error: {e}")
        raise
    except ValueError as e:
        print(f"[fetch_weather] JSON decode error: {e}")
        raise

    currentWeather = data.get("current")
    if not currentWeather:
        raise RuntimeError("Missing 'current' field in API response")

    try:
        weather_code = currentWeather["weather_code"]
        weather = {
            "timestamp": currentWeather["time"],
            "location": LOCATION_NAME,
            "temperature": currentWeather["temperature_2m"],
            "humidity": currentWeather["relative_humidity_2m"],
            "windSpeed": currentWeather["wind_speed_10m"],
            "precipitation": currentWeather["precipitation"],
            "condition": WEATHER_CODES_ENUM.get(weather_code, "Unknown"),
        }
    except KeyError as e:
        raise RuntimeError(f"Missing expected field in 'current': {e}")

    return weather

def send_to_rabbitmq(message):
    try:
        #  RabbitMQ connection 
        parameters = pika.URLParameters(RABBIT_URL)
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()

        channel.queue_declare(queue=QUEUE_NAME)

        # Push to the queue
        channel.basic_publish(
            exchange='',
            routing_key=QUEUE_NAME,
            body=json.dumps(message)
        )

        logger.info("Message sent to RabbitMQ")
        connection.close()


    except Exception as error:
        logger.exception("Error sending message to RabbitMQ", error)


    

if __name__ == "__main__":
    while True:
        try:
            weather = fetch_weather()
            send_to_rabbitmq(weather)


        except Exception as error:
            print("Collector Error:", error)

        print(f"⏳ Waiting {INTERVAL} seconds...\n")
        time.sleep(INTERVAL)
