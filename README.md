# Streamin Backend

## Overview

Streamin Backend is a Node.js-based RESTful API that powers the Streamin platform. It enables users to upload, manage, and interact with video content. The backend is designed to handle user authentication, video CRUD operations, and comment management, providing a seamless experience for users and content creators.

## Features

- **User Authentication**: Secure user registration and login.
- **Video Management**: Upload, edit, delete, and retrieve video posts.
- **Comment System**: Add, delete, and like comments on videos.
- **Like System**: Like and unlike videos and comments.
- **Session Management**: Maintain user sessions for personalized experiences.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and video data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module for loading environment variables.
- **cors**: Middleware for enabling Cross-Origin Request Sharing.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Bernard-Calma/streamin-backend.git
    cd streamin-backend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and define the following:

    ```
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the application:

    ```bash
    npm start
    ```

   The application will be accessible at `http://localhost:5000/`.

## API Endpoints

### Authentication

- `POST /register`: Register a new user.
- `POST /login`: User login.

### Videos

- `POST /videos`: Upload a new video.
- `GET /videos`: Retrieve all videos.
- `GET /videos/:id`: Retrieve a specific video by ID.
- `PUT /videos/:id`: Update a video.
- `DELETE /videos/:id`: Delete a video.

### Comments

- `POST /videos/:id/comments`: Add a comment to a video.
- `DELETE /comments/:id`: Delete a comment.
- `POST /comments/:id/like`: Like a comment.
- `DELETE /comments/:id/like`: Unlike a comment.

### Likes

- `POST /videos/:id/like`: Like a video.
- `DELETE /videos/:id/like`: Unlike a video.

## Database Schema

The application uses MongoDB with Mongoose ODM. The primary models include:

- **User**: Stores user information.
- **Video**: Stores video details and associated comments.
- **Comment**: Stores comments made on videos.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.
