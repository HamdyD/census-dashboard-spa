# Census data visualization

This project provides a web-based application to visualize census data using a Table and a Doughnut chart. The application is structured with a backend built in Node.js and an Express server, and a frontend developed with React and Vite.

## Table of Contents

- [Census data visualization](#census-data-visualization)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Requirements](#requirements)
  - [Usage](#usage)
    - [Running with Docker](#running-with-docker)
    - [Running Locally](#running-locally)
  - [Database Setup](#database-setup)

## Features

Visualize census data using an interactive paginated Table and a Doughnut charts.

## Technologies Used

This project is built using the following key technologies:

- **Node.js** with **Express**: Backend server and API handling.
- **Sequelize** with **SQLite**: ORM for managing and querying data in the SQLite database.
- **React**: Frontend user interface, using component-based architecture.
- **Vite**: Development server and build tool for faster development.

## Requirements

- Docker and Docker Compose (for Docker-based setup)

- Node.js (for local setup)

## Usage

### Running with Docker

To run the application using Docker, follow these steps:

1.  Ensure you have Docker and Docker Compose installed.

2.  Place the `us-census.db` file in the following directory:

```bash
backend/src/database/us-census.db
```

3.  From the root of the project, execute the following command:

```bash
docker-compose up
```

4.  Access the application in your web browser at `http://localhost:8080`.

### Running Locally

If you prefer to run the application without Docker, follow these steps:

1.  Navigate to the `backend` directory and install the necessary dependencies:

```bash
cd backend
npm install
```

2.  Start the backend server:

```shell
npm run start
```

3.  Open a new terminal window, navigate to the `frontend` directory, and install the frontend dependencies:

```bash
cd ../frontend
npm install
```

4.  Start the frontend development server:

```bash
npm run dev
```

5.  Access the application in your web browser at `http://localhost:5173`.

## Database Setup

Make sure to place the `us-census.db` SQLite database file in the following directory:

```bash
backend/src/database/us-census.db
```
