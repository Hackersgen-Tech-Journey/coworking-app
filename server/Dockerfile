FROM golang:1.21.3

WORKDIR /app
COPY coworkingapp /app/
RUN mkdir /app/config
COPY config/config-docker.json /app/config/config.json

ENTRYPOINT ["/app/coworkingapp"]

EXPOSE 8080:8080