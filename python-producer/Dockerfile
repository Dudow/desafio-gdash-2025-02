FROM python:3.11-slim

WORKDIR /producer

COPY producer.py .

RUN pip install requests pika

CMD ["python", "producer.py"]
