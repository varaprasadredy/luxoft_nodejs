export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "User API Documentation",
    "description": "User API Information",
  },
  "host": `localhost:${process.env.API_PORT}`,
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    '/api/user': {
      "post": {
        "tags": [
          "User"
        ],
        "description": "Create new user in User table",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User that we want to create",
            "schema": {
              // "$ref": "#/definitions/User"
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
            "schema": {
              // "$ref": "#/definitions/User"
            }
          }
        }
      },
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get all users from User table",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              // "$ref": "#/definitions/user"
            }
          }
        }
      }
    },
    "/api/user/{id}": {
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "ID of user that we want to find",
          "type": "number"
        }
      ],
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get user with given ID",
        "responses": {
          "200": {
            "description": "User is found",
            "schema": {
              // "$ref": "#/definitions/User"
            }
          }
        }
      },
    }
  }
}