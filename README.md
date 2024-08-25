# Node SQL Demo App

This project demonstrates a simple Node.js application that interacts with a MySQL database using the Express framework and MySQL2 module. It provides basic functionality to create a database table, insert data into it, and retrieve data through a RESTful API.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Docker (optional, for running the MySQL database in a container)

## Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/canaokar/node-sql.git
   cd node-sql
   ```

2. **Install Dependencies:**

   Use npm to install the required packages.

   ```bash
   npm install
   ```

3. **Set Up the MySQL Database:**

   If you don't have MySQL installed locally, you can run a MySQL instance using Docker.

   **Using Docker:**

   ```bash
   docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=myPa$$word -e MYSQL_DATABASE=car -p 3306:3306 -d mysql:latest
   ```

   This command will:
   - Create and run a new MySQL container named `mysql-db`.
   - Set the root password to `myPa$$word`.
   - Create a database named `car`.
   - Expose MySQL on port 3306.

   You can connect to this database using the credentials specified in the Docker command.

4. **Create the Database (if not using Docker):**

   If you have MySQL installed locally, you can manually create the database:

   ```sql
   CREATE DATABASE car;
   ```

## Running the Application

1. **Start the Server:**

   Run the application using Node.js:

   ```bash
   node app.js
   ```

   The server will start on port 3000.

2. **API Endpoints:**

   - **Initialize Database and Create Table:**

     ```bash
     GET /init-db
     ```

     This endpoint creates the `cars` table if it doesn't already exist.

   - **List All Cars:**

     ```bash
     GET /list
     ```

     This endpoint retrieves all records from the `cars` table.

   - **Insert a New Car:**

     ```bash
     POST /insert
     ```

     Example request body (JSON):

     ```json
     {
       "car_name": "Toyota",
       "color": "Red"
     }
     ```

     This endpoint inserts a new record into the `cars` table.

## Code Overview

### `app.js`

This is the main file that sets up the Express server and defines the routes.

- **Express Setup:** The application is built using the Express framework, which simplifies the creation of server-side applications in Node.js.
- **MySQL2 Module:** The `mysql2` module is used to connect to the MySQL database and execute SQL queries.
- **Routes:**
  - **`/init-db`:** Initializes the database and creates the `cars` table.
  - **`/list`:** Retrieves all cars from the database.
  - **`/insert`:** Adds a new car to the database.

### Project Structure

```bash
.
├── app.js       # Main application file
├── package.json # Project metadata and dependencies
└── README.md    # Project documentation
```

## Docker Cleanup

To stop and remove the Docker container when you're done, run:

```bash
docker stop mysql-db
docker rm mysql-db
```
