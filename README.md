# E-COMMERCE API DOCUMENTATION

> E-COMMERCE is website a website. This app has :
>
> RESTful endpoint for todo's CRUD operation with JSON formatted response
> Technology use
> client: vue component
> server: sequelize,express,postgres,ORM(express)

## Restful Endpoints

1. POST ; /login
2. GET : /products
3. POST : /products
4. GET : /products/:id
5. PUT : /products/:id
6. DELETE : /products/:id

## Global Response

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## POST /login

Request body:

```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

Response(200 - Ok):

```json
{
  "access_token": "<user token>"
}
```

Response(404 - EMAIL NOT FOUND)

```json
{
  "message": "Email not found please register first!"
}
```

Response(400 - EMAIL PASS NOT MATCH)

```json
{
  "message": "Email and Password not match!"
}
```

Response(400 - AUTH_FAILED)

```json
{
  "message": "Authentication Failed!"
}
```

## GET /products

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:

```json
{
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>"
}
```

Response(201 - Created):

```json
{
  "id": 1,
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>",
  "updatedAt": "2020-06-08T14:38:39.104Z",
  "createdAt": "2020-06-08T14:38:39.104Z"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

## GET /products

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:
Not Needed

Response(200 - Ok):

```json
[
  {
    "id": "<your product id>",
    "title": "<your task title>",
    "category": "<your task category>",
    "description": "<your task description>",
    "updatedAt": "2020-06-08T14:38:39.104Z",
    "createdAt": "2020-06-08T14:38:39.104Z"
  },
  {
    ...
  }
]
```

## GET /products/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request param id: integer (required)

Request body:
not needed

Response(200 - Ok):

```json
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "updatedAt": "2020-06-08T14:38:39.104Z",
  "createdAt": "2020-06-08T14:38:39.104Z"
}
```

## PUT /products/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params id: integer (required)

Request body:

```json
{
  "name": "<your product name>",
  "image_url": "<your product image url>",
  "price": "<your product price>",
  "stock": "<your product stock>"
}
```

Response(200 - OK):

```json
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "updatedAt": "2020-06-20T14:38:39.104Z",
  "createdAt": "2020-06-20T14:38:39.104Z"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

## DELETE /products/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params id: integer (required)

Request body:
not needed

Response(200 - Ok):

```json
{
  "message": "Successfully delete task!"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```
