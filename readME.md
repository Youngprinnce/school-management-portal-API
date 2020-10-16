# School Management API

# Installation

Install the dependencies

```sh
$ npm install
```

Run app

```sh
$ npm start
```

# To run the project in development server

1. Open a free tier account with [mailGun](https:mailgun.com) to get your api_key and domain name
2. Change `.env.example` to `.env` file and update the db credentials, enter the secret key, enter mailgun_api_key, enter mailgun_domain amd also fill in your email address.
3. Go back to project root folder and run below commands
4. Make a `POST` request in postman to this endpoint route to register `http://localhost:3000/api/register`
5. Enter values respectively for

```
first_name
last_name
username
email
password
age
gender
```

6. A verification token will be sent to your email to activate account
7. To activate account, make a `GET` request to this endpoint `http://localhost:3000/api/activation` and pass the token from your email to the request body
8. To login, make a `PUT` request to this endpoint `http://localhost:3000/api/login` pass your email and password to the request body
9. To get a new password, make a `PUT` request to this endpoint `http://localhost:3000/api/forgot-password` and pass in your email to the request body
10. A password reset link will be sent to your email to change passowrd
11. To change password, make a `PUT` request to this endpoint URL from your email and pass the new password to the request body

# Pre-requites

1. Node JS v12.16.1 or above.
2. Visual Studio Code
3. MailGun Acoount
4. PostMan
