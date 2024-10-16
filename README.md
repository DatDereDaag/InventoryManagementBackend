# Inventory Management API

This is an API for managing an inventory system, built with Node.js, Express, and MongoDB. It allows users to manage products, sales, and users with role-based access control (RBAC) for employees and managers.

## Table of Contents:
- Features
- Technologies Used
- Installation
- Environment Variables
- API Endpoints
- Usage

## Features
- CRUD operations for products, sales, and users
- Role-based access control (RBAC):
  + Employees can only retrieve data
  + Managers can retrieve, create, update and delete data but can not get user data or delete user data
  + Admins can perform CRUD operations on entire database and get and delete users
- User authentication via JWT
- Input validation using middleware
- Error handling with custom error messages
- MongoDB as the database for managing data

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) for authentication
- bcrypt.js for password hashing
- dotenv for managing environment variables

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed or a MongoDB cloud instance

### Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-management-api.git
```

2. Navigate to the project directory:
```bash
cd inventory-management-api
```

3. Install the required dependencies:
```bash
npm install
```

4. Set up the environment variables (see Environment Variables).

5. Start the development server:
```bash
npm start
```

## Environment Variables
Create a .env file in the root directory and configure the following variables:
```bash 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## API ENDPOINTS

### Users
- POST /login
- POST /reigster
- GET /
- GET /:userID
- DELETE /:userID
- Body:
    ```json
    {
      "name" : "Bob",
      "email": "bob@gmail.com",
      "password": "test1234",
      "role": "admin"
    }
    ```

### Sales
- POST /
- GET /
- GET /:saleID
- DELETE /:saleID
- PATCH /:saleID
- Body:
  ```json
    {
      "productID" : "66a6f3ce0acb797bdd533dae",
      "quantity": "2",
      "sold_for": "14.29"
    }
    ```

### Products
- POST /
- GET /
- GET /:productID
- DELETE /:productID
- PATCH /:productID
- Body:
  ```json
   {
     "name" : "Bobby",
     "description": "real bobby",
     "price": "12.99",
     "quantity": "5",
     "category": "snack",
     "supplier": "Bob"
   }
   ```
    
