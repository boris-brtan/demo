# Mail Backend Application

## Requirements
- [docker](https://docs.docker.com/get-docker/)

## Setup

To setup clean cloned project, node modules need to be installed first by command 
```sh
npm ci
```
After successful installation new files will be created
- `config.ini` file inside [mailer service](./service/mailer/) where credentials and connection data need to be set for smtp connector.
- `docker-compose.yml` file for development process

### Development

Development of an app is based on docker with compose plugin.  
There is just one command to easily run development mode:
```sh
docker compose watch # starts containers and restarts them on code base changes
```
