# Setup Kong and Konga

## Kong
- Run `docker-compose up -d` to start Kong
- Run `yarn kong:init` to setup the Kong database

If you want to see/test the services:
- Proxy: http://localhost:8000
- Admin API: http://localhost:8001

## Konga Dashboard

### Setup
- Go to http://localhost:1337
- Register yourself
- Create a new connection with the following details:
  - Name: Kong
  - URL: http://kong:8001
  - Activate the connection
  
Now we are able to setup our routes and services in Konga.

### Create a Service to Customers microservice
- Go to Services and create a new service
  - Name: customers
  - Host: 192.168.0.45 //Your local IP (You can check this running `ifconfig` in your terminal or going to you computer network settings)
  - Path: /customers //This is the microservice path (where Kong will point to). In this case, to the apps/customers/src/customers/customers.controller.ts
  - Activate the service

Now it's time to create a route to this service.
- Go to Routes and create a new route
  - Name: register
  - Paths: /customers/api/v1/ //This is the route path (where the client will point to in the moment of request)
  - Submit changes

Now, our route to register a new user will be available throgh this URL: http://localhost:8000/customers/api/v1/

