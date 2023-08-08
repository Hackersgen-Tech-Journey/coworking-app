# COWRKING APP

## Config
The configuration file is a json file that contains the parameters for the database connection and all the information necessary for the application to function.

The file must be located in the /config folder
```
{
    "dsn": "host=<database_host> port=<database_port> user=<database_user> password=<database_password> dbname=<database_name> sslmode=<ssl_mode [enable|disable]>",
    "secret_key": "<JWT_secret>"
}
```


## Build & Run


### Bare metal

#### prerequisites

> A local postgres database server with a database for the app
> 
> Enter the correct parameters in the configuration file

Run the server:
```
go run .
```

Build the executable:

```
go build .
```

Build the executable for a different operative system or architecture:

```
GOOS=<os> GOARCH=<arch> go build . 

Example:
GOOS=linux GOARCH=amd64 go build . 
```

### Docker

#### prerequisites

> A local postgres database server with a database for the app
>
> Enter the correct parameters in the docker configuration file

Build the docker image:
```
docker build -t coworkingapp:latest .
```

Run the docker image:
```
docker run coworkingapp
```

### Docker Compose

In the docker folder there are the dockerfile for the database and a sql script that is used to initially create the database.
The docker-compose file references these files to build the stack

```
docker compose up
```