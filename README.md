# Modern TODO Application

A full-stack TODO application built with Node.js, Express, MySQL, and modern frontend technologies.

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, Read, Update, and Delete TODOs
- 🔄 Real-time status updates (Pending, In Progress, Completed)
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure JWT-based authentication
- 🗃️ MySQL database for persistent storage

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm (Node Package Manager)

## Setup Instructions

### 1. Database Setup

```sql
CREATE DATABASE todo_app;
CREATE USER 'dbuser'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON todo_app.* TO 'dbuser'@'localhost';
FLUSH PRIVILEGES;

USE todo_app;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 2. Environment Setup

Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_USER=dbuser
DB_PASSWORD=123456
DB_NAME=todo_app
JWT_SECRET=your_jwt_secret_key
```

### 3. Installation

```bash
# Install dependencies
npm install

# Start the application
node app.js
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### TODOs
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Usage

1. Register a new account or login with existing credentials
2. Add new todos using the input field at the top
3. Update todo status using the dropdown menu (Pending/In Progress/Completed)
4. Delete todos using the trash icon
5. Logout using the button in the top-right corner

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected API endpoints
- SQL injection prevention
- XSS protection

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Security**: bcrypt for password hashing

## Error Handling

The application includes comprehensive error handling for:
- Database connection issues
- Authentication failures
- Invalid API requests
- Server errors

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For support, please open an issue in the repository or contact the maintainers. 