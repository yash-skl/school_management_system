# School Management API

A simple Node.js + Express.js + MySQL based REST API for managing school data.

This project allows users to:
- Add new schools
- Fetch all schools sorted by proximity to the user's location

The project was built as part of a backend assignment to demonstrate:
- REST API development
- MySQL integration
- Input validation
- Distance calculation using latitude & longitude
- Proper backend architecture


# Tech Stack

- Node.js
- Express.js
- MySQL
- Postman (for testing)


# Project Structure

school-management-api/
│
├── src/
│   ├── db/
│   │   └── index.js
│   │
│   ├── controllers/
│   │   └── schoolController.js
│   │
│   ├── routes/
│   │   └── schoolRoutes.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   └── distanceCalculator.js
│   │   └── ApiResponse.js
│   │
│   ├── validations/
│   │   └── schoolValidation.js
│   │
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   │
│   └── app.js
│
├── .env
├── index.js
├── package.json
└── README.md
Database Setup

Create a MySQL database:

CREATE DATABASE school_management;

Use the database:

USE school_management;

Create the schools table:

CREATE TABLE schools(
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
Environment Variables

Create a .env file in the root directory:

PORT=3000

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=school_management

Update the database credentials according to your local MySQL setup.

## Installation

-Clone the repository:
git clone <your-github-repo-link>

-Move into the project directory:
cd school-management-api

-Install dependencies:
npm install

-Start the server:
npm run dev

Server will run on:

http://localhost:3000

# API Endpoints
1. Add School
Endpoint
POST /api/v1/schools/add
Request Body
{
    "name": "Delhi Public School",
    "address": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025
}
Success Response
{
    "statusCode": 201,
    "data": "School added successfully",
    "message": "Success",
    "success": 201
}
2. List Schools

Returns schools sorted according to distance from the user's location.

Endpoint
GET /api/v1/schools/list?latitude=28.7041&longitude=77.1025
Success Response
{
    "statusCode": 200,
    "data": [
{
            "id": "c45a0ab1-ec83-44f2-8cc6-506de64f20e2",
            "name": "Delhi Public School",
            "address": "Delhi",
            "latitude": 28.7041,
            "longitude": 77.1025,
            "distance": 0.00013
}
],
    "message": "Success"
}

## Distance Calculation
The API uses the Haversine Formula to calculate the geographical distance between:

User coordinates
School coordinates
Schools are then sorted from nearest to farthest.

## Validation
The API validates:

-Required fields
-Valid latitude and longitude
-Empty request data
-Invalid coordinate values


Author

Yash Shukla
