
## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Docker
- Docker Compose

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/monorepo-microservices.git
    cd monorepo-microservices
    ```

2. Install dependencies for both microservices:
    ```bash
    cd apps/customers
    yarn install
    cd ../orders
    yarn install
    ```

### Running the Project

1. Start Kafka and Zookeeper using Docker Compose:
    ```bash
    cd infra/kafka
    docker-compose up -d
    ```

2. Start Kong and Konga (API Gateway and Admin Interface):
    ```bash
    cd ../kong
    docker-compose up -d
    ```

3. Start the `customers` microservice:
    ```bash
    cd ../../apps/customers
    yarn run start:dev
    ```

4. Start the `orders` microservice:
    ```bash
    cd ../orders
    yarn run start:dev
    ```

### Running Tests

To run tests for each microservice, use the following commands:

- For `customers` microservice:
    ```bash
    cd apps/customers
    yarn run test
    ```

- For `orders` microservice:
    ```bash
    cd apps/orders
    yarn run test
    ```

## 📡 Microservices Communication

The `customers` and `orders` microservices communicate with each other using Kafka messaging. When a new customer is created in the `customers` microservice, a Kafka message is sent to the `orders` microservice to create a reference to this customer.

### Kafka Setup

To run Kafka locally, you can use the `docker-compose.yml` file located in [kafka](http://_vscodecontentref_/0).

1. Start Kafka and Zookeeper:
    ```bash
    cd infra/kafka
    docker-compose up -d
    ```

2. Verify the connection:
    ```bash
    nc -zv localhost 22181  # Zookeeper
    nc -zv localhost 29092  # Kafka
    ```

3. Create a new Kafka topic:
    ```bash
    docker exec -it kafka /usr/bin/kafka-topics --create --topic new_topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
    ```

4. List Kafka topics:
    ```bash
    docker exec -it kafka /usr/bin/kafka-topics --list --bootstrap-server localhost:9092
    ```

### Kong Setup

To configure Kong and the services and routes within Konga, follow the instructions below:

1. Access the Konga interface at `http://localhost:1337`.
2. Add a new service in Konga:
    - **Name**: customers-service
    - **URL**: http://customers:3000
3. Add a route for the `customers-service`:
    - **Paths**: /customers
4. Repeat the process for the `orders-service`:
    - **Name**: orders-service
    - **URL**: http://orders:3000
    - **Paths**: /orders

## 🗂️ Entities

### Customers Microservice

- **Customer**
    - `id`: String (Primary Key)
    - `email`: String (Unique)
    - `password`: String
    - `name`: String
    - `phone`: String
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)

### Orders Microservice

- **Order**
    - `id`: String (Primary Key)
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)
    - `total`: Float
    - `customerId`: String (Foreign Key referencing `Customer` in `customers` microservice)
    - `customer`: Customer (Relation to `Customer` entity in `customers` microservice)

- **Customer**
    - `id`: String (Primary Key)
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)
    - `externalId`: String (Reference to `Customer` entity in `customers` microservice)

## 📄 Additional Information

- **Environment Variables**: Ensure to set the necessary environment variables in a `.env` file for both microservices.
- **Code Quality**: The project uses ESLint and Prettier for code quality and formatting. Run `yarn lint` and `yarn format` to check and format the code.
- **Database**: Both microservices use SQLite as the database. Prisma is used as the ORM.

## 📜 License

This project is licensed under the MIT License.
