# My Starter Kit 

This is an open-source starter kit for building applications with Postgres on Neon.


### Documentation

#### Overview

**Description**: This API manages user information including registration, retrieval, update, and deletion.

**Base URL**: `http://localhost:3000/api`

#### Endpoints

##### Register User

- **Endpoint**: `/register`
- **Method**: POST
- **Description**: Registers a new user.
- **Request Body**:
  ```json

  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - **Success**:
    - **Status Code**: 201 Created
    - **Body**:
      ```json
      {
        "id": 1,
        "username": "new_user",
        "email": "new_user@example.com",
        "password": "hashed_password",
        "created_at": "2024-09-01T18:49:07.498Z"
      }
      ```
  - **Error**:
    - **Status Code**: 400 Bad Request
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```

##### Retrieve All Users
- **Endpoint**: `/users`
- **Method**: GET
- **Description**: Retrieves a list of all users.
- **Responses**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      [
        {
          "id": 1,
          "username": "test_user_1",
          "email": "test_user_1@example.com"
        }
      ]
      ```

##### Retrieve User by ID
- **Endpoint**: `/users/:id`
- **Method**: GET
- **Description**: Retrieves a user by their ID.
- **Request Parameters**:
  - `id` (path parameter): The ID of the user.
- **Responses**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      {
        "id": 1,
        "username": "test_user_1",
        "email": "test_user_1@example.com"
      }
      ```
  - **Error**:
    - **Status Code**: 404 Not Found
    - **Body**:
      ```json
      {
        "error": "User not found"
      }
      ```

##### Update User
- **Endpoint**: `/users/:id`
- **Method**: PUT
- **Description**: Updates user information.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string" // Optional
  }
  ```
- **Responses**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      {
        "id": 1,
        "username": "updated_user",
        "email": "updated_user@example.com",
        "password": "hashed_password",
        "created_at": "2024-09-01T18:49:07.498Z"
      }
      ```
  - **Error**:
    - **Status Code**: 400 Bad Request
    - **Body**:
      ```json
      {
        "error": "Error message"
      }
      ```

##### Delete User
- **Endpoint**: `/users/:id`
- **Method**: DELETE
- **Description**: Deletes a user by their ID.
- **Responses**:
  - **Success**:
    - **Status Code**: 200 OK
    - **Body**:
      ```json
      {
        "message": "User deleted successfully",
        "user": {
          "id": 1,
          "username": "test_user_1",
          "email": "test_user_1@example.com",
          "password": "hashed_password",
          "created_at": "2024-09-01T18:49:07.498Z"
        }
      }
      ```
  - **Error**:
    - **Status Code**: 404 Not Found
    - **Body**:
      ```json
      {
        "error": "User not found"
      }
      ```
