import pika
import json
from datetime import datetime

#  RabbitMQ connection 
credentials = pika.PlainCredentials('teste', 'senha')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost', credentials=credentials)
)
channel = connection.channel()

QUEUE_NAME = 'weather_queue'
channel.queue_declare(queue=QUEUE_NAME)

# Data mock to test
message = {
    "timestamp": datetime.utcnow().isoformat(),
    "location": "São Paulo - SP",
    "temperature": 27.5,
    "humidity": 60,
    "wind_speed": 12.3,
    "condition": "Ensolarado"
}

# Push to the queue
channel.basic_publish(
    exchange='',
    routing_key=QUEUE_NAME,
    body=json.dumps(message)
)

print("It worked!")
connection.close()
