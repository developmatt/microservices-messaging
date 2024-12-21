
## Getting Started

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
    docker-compose up -d
    ```

2. Start the `customers` microservice:
    ```bash
    cd apps/customers
    yarn run start:dev
    ```

3. Start the `orders` microservice:
    ```bash
    cd apps/orders
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

## Microservices Communication

The `customers` and `orders` microservices communicate with each other using Kafka messaging. When a new customer is created in the `customers` microservice, a Kafka message is sent to the `orders` microservice to create a reference to this customer.

### Kafka Setup

To run Kafka locally, you can use the `docker-compose.yml` file.

1. Start Kafka and Zookeeper:
    ```bash
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

5. Test Kafka messaging:
    - Listening:
        ```bash
        docker exec -it kafka /usr/bin/kafka-console-consumer --topic new_topic --bootstrap-server localhost:9092 --from-beginning
        ```
    - Sending:
        ```bash
        docker exec -it kafka /usr/bin/kafka-console-producer --topic new_topic --bootstrap-server localhost:9092
        ```

## Entities

### Customers Microservice

- **Customer**
    - [id](http://_vscodecontentref_/2): String (Primary Key)
    - [email](http://_vscodecontentref_/3): String (Unique)
    - [password](http://_vscodecontentref_/4): String
    - [name](http://_vscodecontentref_/5): String
    - [phone](http://_vscodecontentref_/6): String
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)

### Orders Microservice

- **Order**
    - [id](http://_vscodecontentref_/7): String (Primary Key)
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)
    - [total](http://_vscodecontentref_/8): Float
    - [customerId](http://_vscodecontentref_/9): String (Foreign Key referencing [Customer](http://_vscodecontentref_/10) in `customers` microservice)
    - [customer](http://_vscodecontentref_/11): Customer (Relation to [Customer](http://_vscodecontentref_/12) entity in `customers` microservice)

- **Customer**
    - [id](http://_vscodecontentref_/13): String (Primary Key)
    - `createdAt`: DateTime (Default: now)
    - `updatedAt`: DateTime (Updated automatically)
    - [externalId](http://_vscodecontentref_/14): String (Reference to [Customer](http://_vscodecontentref_/15) entity in `customers` microservice)

## Additional Information

- **Environment Variables**: Ensure to set the necessary environment variables in a `.env` file for both microservices.
- **Code Quality**: The project uses ESLint and Prettier for code quality and formatting. Run `yarn lint` and `yarn format` to check and format the code.
- **Database**: Both microservices use SQLite as the database. Prisma is used as the ORM.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please reach out to the project maintainers.
