# E-COMMERCE API DOCUMENTATION

> E-COMMERCE is a CMS website to accomodate management of product database. This app has :
>
> RESTful endpoint for products's CRUD operation with JSON formatted response

### Technology use in this website

> client: VUE CLI,VUEX, Component,Bootstrap
>
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

Response(400 - AUTH_FAILED)

```json
{
  "message": "Authentication Failed!"
}
```

## POST /login
> Login account

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
  "emailUser": "<your email>",
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

## POST /products
> Create new product

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:

```json
{
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>"
}
```

Response(201 - Created):

```json
{
  "id": "<your product id>",
  "name": "<your product name>",
  "image_url": "<your product image_url>",
  "price": "<your product price>",
  "stock": "<your product stock>",
  "updatedAt": "<your product updatedAt date>",
  "createdAt": "<your product createdAt date>",
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

## GET /products 
> Get all llist products

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
    "name": "<your product name>",
    "image_url": "<your product image_url>",
    "price": "<your product price>",
    "stock": "<your product stock>",
    "updatedAt": "<your product updatedAt date>",
    "createdAt": "<your product createdAt date>",
  },
  {
    ...
  }
]
```

## GET /products/:id
> Get one product by id

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
  "updatedAt": "<your product updatedAt date>",
  "createdAt": "<your product createdAt date>",
}
```

## PUT /products/:id
> Edit product by id

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
  "updatedAt": "<your product updatedAt date>",
  "createdAt": "<your product createdAt date>",
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

## DELETE /products/:id
> Delete product by id

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
  "message": "Successfully delete product!"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```
