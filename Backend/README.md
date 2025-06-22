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

## Notes

- The password is securely hashed before storing.
- The returned token can be used for authenticated requests.