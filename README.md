# Ikonex Academy

A student management and learning platform built with React, Node.js, Prisma, and MySQL.

## Overview

Ikonex Academy is a web application designed to streamline student management, course administration, and academic operations. The platform provides an intuitive interface for managing students, courses, instructors, and educational resources.

## Features

* Student Management
* Course Management
* Instructor Management
* Authentication & Authorization
* RESTful API Integration
* MySQL Database Support
* Responsive User Interface
* Modern React Frontend
* Prisma ORM for Database Operations

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL

### Development Tools

* Git & GitHub
* VS Code
* npm

## Project Structure

```text
Ikonex-Academy/
│
├── Front-end/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Back-end/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Adreen-99/Ikonex-Academy.git
cd Ikonex-Academy
```

### Backend Setup

```bash
cd Back-end

npm install
```

Create a `.env` file:

```env
DATABASE_URL="mysql://username:password@localhost:3306/ikonex"
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run Migrations:

```bash
npx prisma migrate dev
```

Start the Backend Server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Front-end

npm install

npm run dev
```

## API Endpoints

### Students

```http
GET    /students
POST   /students
GET    /students/:id
PUT    /students/:id
DELETE /students/:id
```

### Courses

```http
GET    /courses
POST   /courses
GET    /courses/:id
PUT    /courses/:id
DELETE /courses/:id
```

## Environment Variables

```env
DATABASE_URL=
PORT=
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Adreen Githinji**

GitHub: https://github.com/Adreen-99
