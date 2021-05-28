# NodeJS Application for Users 
## Description
Create Users with simple rest API using Node JS with MariaDB.

## Features
- You can create, update, delete and get users in User Table.
- API Documentation available with Swagger
- Have a data access layer for User model with get the User table. It helps to avoid the duplications of User model functions.
- Available Role based login for Web application.
- Model and Controller pattern

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd DXC_NODEJS
npm install
npm start
```

For development environments

```sh
NODE_ENV='development'
API_PORT= 3012

DB_NAME='luxoft_users'
DB_HOST='localhost'
DB_USERNAME='user1'
DB_PASSWORD='password1'
```

## API Documentation
Link: http://localhost:3012/api-docs/
## Endpoints

```sh
1. Login
URL: http://localhost:3012/api/user/login
Method: POST
Description: User Login 
Body: {
    email:"James@123.com"
    password:"1234"
}
```
```sh
2. Add User
URL: http://localhost:3012/api/user
Method: POST
Description: Create new user
Body: {
    "name":"Fred123",
    "email":"Fred@123.com",
    "password":"68651",
    "role":"ADMIN"
}
```
```sh
3. Get All Users
URL: http://localhost:3012/api/user
Method: GET
Description: Get all user
```
```sh
4. Get user by id
URL: http://localhost:3012/api/user{id}
Method: GET
Description: Get user by id
```

## MariaDB Setup
Install Maria DB on MacOS
```sh
brew install mariadb
```
After installation, start MariaDB Server:
```sh
mysql.server start
```
Access MariaDB Server
```sh
sudo mysql -u root
sudo mysql -u root -p
```
Create and Show Database
```sh
CREATE DATABASE 'yourDB';
SHOW DATABASES;
```
Create New MariaDB User
```sh
CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';
```
Grant Privileges to MariaDB User
```sh
GRANT ALL PRIVILEGES ON *.* TO 'user1'@localhost IDENTIFIED BY 'password1';
```