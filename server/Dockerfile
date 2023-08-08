FROM hub.sorintdev.it/fedora:35
COPY coworkingapp /app/
RUN mkdir "/config"
COPY config/config-docker.json /config/config.json

ENTRYPOINT ["/app/coworkingapp"]