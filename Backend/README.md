# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. On successful registration, the user receives an authentication token and their user information.

---

## Request Body

The request body must be sent as JSON and include the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success (201 Created)

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

- **201**: User registered successfully.
- **400**: Validation error or missing required fields.
- **500**: Internal server error.

---

## Example Request

```bash
curl -X POST http://localhost:PORT/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

## Example Response

### Registration Success (201 Created)

- `token` (string): JWT Token for authentication.
- `user` (object):
  - `_id` (string): User's unique ID.
  - `fullname` (object):
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).

**Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1c2e2e8b9a001f3e4a12",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

This endpoint allows an existing user to log in using their email and password. On successful authentication, the user receives an authentication token and their user information.

---

## Request Body

The request body must be sent as JSON and include the following fields:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success (200 OK)

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
  }
}
```

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

---

## Status Codes

- **200**: User logged in successfully.
- **400**: Validation error or missing required fields.
- **401**: Invalid email or password.
- **500**: Internal server error.

---

## Example Request

```bash
curl -X POST http://localhost:PORT/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

## Example Response

### Login Success (200 OK)

- `token` (string): JWT Token for authentication.
- `user` (object):
  - `_id` (string): User's unique ID.
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.

**Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1c2e2e8b9a001f3e4a12",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

This endpoint returns the authenticated user's profile information. The request must include a valid JWT token (usually in a cookie or Authorization header).

---

## Authentication

- Requires authentication (JWT token).

---

## Responses

- `user` (object):
  - `_id` (string): User's unique ID.
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.

### Success (200 OK)

```json
{
  "_id": "665f1c2e2e8b9a001f3e4a12",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

### Unauthorized (401 Unauthorized)

```json
{
  "message": "Authentication required"
}
```

---

## Status Codes

- **200**: Profile returned successfully.
- **401**: Authentication required or invalid token.

---

## Example Request

```bash
curl -X GET http://localhost:PORT/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

This endpoint logs out the authenticated user by blacklisting their JWT token and clearing the authentication cookie.

---

## Authentication

- Requires authentication (JWT token).

---

## Responses

### Success (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

### Unauthorized (401 Unauthorized)

```json
{
  "message": "Authentication required"
}
```

---

## Status Codes

- **200**: User logged out successfully.
- **401**: Authentication required or invalid token.

---

## Example Request

```bash
curl -X GET http://localhost:PORT/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```