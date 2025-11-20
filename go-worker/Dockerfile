FROM golang:1.25 AS builder

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o worker main.go

FROM alpine:latest

COPY --from=builder /app/worker .

CMD ["./worker"]