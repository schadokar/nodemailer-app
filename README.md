# Express Mail Gateway

This nodejs (Express JS) application will be used as mail gateway to hide sensitive information from the frontend. It is built as API gateway which receives a post request and enriches the message with the sensitive data and forwards everything to the mail gateway via SMTP provider.

## Author

This repository was originally forked from :link: [schadokar/nodemailer-app](https://github.com/schadokar/nodemailer-app) and enhanced with a couple of code snippets.

## Installation

Clone the repository to your local folder:

`git clone <reponame>`

Install the nodejs dependencies with npm.

`npm i`

## Configuration

Configure the application by using environment variables or a `.env` file with the following parameters.

```
SMTP_USER=<SMTP_USER>
SMTP_PASS=<SMTP_PASSWORD>
SMTP_DOMAIN=<SMTP_DOMAIN>
SMTP_PORT=<Port to be used e.g. 25>
MAIL_RECIPIENT=List-of@mail-recipiens.com,
```

## Run the application

Dev mode:

```
npm run dev
```

Productive:

```
npm run start
```

## Sample API Request

```
POST http://<hostname>:3000/api/v1/sendmail

REQUESTBODY
{
    "from": "requester@sample.com",
    "subject": "Subject for the mail",
    "message": {
        "test1":"test1Value",
        "test2":"test2Value"
    }
}
```
