# nodejs-auth

PROJECT TITLE:
nodejs-auth using mysql

DESCRIPTION:
Implement User Authentication and Logout using nodejs and mysql

GETTING STARTED:

Dependencies
Nodejs, Xampp, VSCode, Web Browser, Postman

INSTALLING:
In VSCode, clone the repository and go to the project directory.
In terminal run command "npm i" to install all the dependencies.
create ".env" file and copy below data:
PORT = 8000
DB_PASSWORD =
DB_NAME = nodejs-auth
ACCESS_TOKEN_EXPIRATION = 1h
REFRESH_TOKEN_SECRET= 10d

EXECUTING PROGRAM:
Open Xampp and start apache and mysql server.
Use Postman to consume APIs.

COMMAND TO RUN:
In terminal, enter command "npm run dev" (make sure you are in the project directory)

API ENDPOINTS:
\*Use "POST" method for all APIs

eg: http://localhost:8000/user/register

1. "/user/register"

   takes four arguments:
   name:VARCHAR,
   username:VARCHAR,
   password:VARCHAR,
   passwordConfirm:VARCHAR

2. "/user/login"

   takes two arguments:
   username and password

3. "/user/logout"

   protected route, user needs to be logged in, requires cookie

4. "/user/refresh-access-token"

   protected route, user needs to be logged in, requires cookie

5. "/user/dashboard"

   protected route, user needs to be logged in, requires cookie

APPROACH:
MVC pattern is used which provides a better division of labor and improved maintenance.
Use of comments and proper naming convention to improve readability of code.

CHALLANGES:
I have mostly worked on MongoDB and its been a while since I last worked on MySQL. Setting up the development environment took some time. However, good documentation made learning quick and easy.

SECURITY:
Cookie options like httpOnly, secure, sameSite are used to secure cookie.
Routes are protected and tokens are also verified before providing access.
".env" file is used to secure credentials.
Passwords are encrypted using bcrypt.
Token expiration is implemented to improve security.
