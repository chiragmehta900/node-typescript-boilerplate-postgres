
# Node TypeScript Boilerplate Postgres

Developer Ready: A comprehensive template. Works out of the box for most Node.js projects.
This project is intended to be used with the latest Active LTS release of Node.js.
## Tech Stack

**Server:** Node, Express

**DataBase:** postgres, typeorm


## Run Locally

Clone the project

```bash
  git clone https://github.com/chiragmehta900/node-typescript-boilerplate-postgres
```

Go to the project directory

```bash
  cd node-typescript-boilerplate-postgres
```

Install dependencies

```bash
  npm install
```

Start the tsc

```bash
  npm run watch
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`



## Documentation

[Documentation](https://linktodocumentation)


## API Reference

#### Create user

```http
  POST /user/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstName`      | `string` | **Required**. Your API key |
| `lastName`      | `string` | **Required**. Your API key |
| `email`      | `string` | **Required**. Your API key |
| `password`      | `string` | **Required**. Your API key |
| `phoneNumber`      | `number` | **Required**. Your API key |

#### login user

```http
  POST /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `phoneNumber`      | `number` | **Required**. Your API key |
| `password`      | `string` | **Required**. Your API key |


#### Get all users

```http
  GET /user/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `uuid` | **Required**. Your API key |
| `firstName` | `string` | **Required**. Your API key |
| `lastName` | `string` | **Required**. Your API key |
| `email` | `string` | **Required**. Your API key |
| `password` | `string` | **Required**. Your API key |
| `profileImage` | `string` | **Required**. Your API key |
| `isActive` | `boolean` | **Required**. Your API key |
| `phoneNumber` | `number` | **Required**. Your API key |
| `tocken` | `string` | **Required**. Your API key |
| `refreshToken` | `string` | **Required**. Your API key |

A postman collection has been added for better understanding.


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Author

- [@chiragmehta900](https://www.github.com/chiragmehta900)


## Support

For support, email chiragmehta900@gmial.com or join our Slack channel.