# MERN Stack Blogging App

## Introduction

This is a full-stack blogging application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to create, edit, and delete blog posts, comment on posts, and categorize content. The application includes user authentication, profile management, and password reset functionality. It’s designed to be scalable and secure, with various measures like rate-limiting and XSS protection.

## Features

- **User Authentication**: Sign up, log in, and log out with JWT-based authentication.
- **Blog Posts**: Create, edit, and delete posts with support for markdown and rich text.
- **Comments**: Users can comment on posts.
- **Categories**: Organize posts into categories.
- **Pagination**: Infinite scrolling for posts with pagination support.
- **Profile Management**: Users can update their profile information and change passwords.
- **Password Reset**: Secure password reset using email links.
- **Admin Dashboard**: Manage users and posts for admin users.
- **Security**: Implemented rate-limiting, CORS, helmet for securing headers, and XSS clean to prevent cross-site scripting.

## Tech Stack

### Frontend:

- **React**: Used for the client-side interface.
- **Tailwind CSS**: For responsive and modern UI styling.
- **Redux**: State management for handling global state such as user authentication and post data.

### Backend:

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user, post, and comment data.
- **Mongoose**: ODM for MongoDB, providing schema-based data models.
- **JWT (Json Web Token)**: For secure authentication and authorization.
- **Cloudinary**: For image upload and storage in blog posts.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/mern-blogging-app.git
   cd mern-blogging-app
   ```

2. **Install dependencies**:

   - For the backend:

     ```bash
     cd backend
     npm install
     ```

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Setup MongoDB**:
   Make sure you have MongoDB running locally or use MongoDB Atlas, and update your environment variables accordingly.

## Environment Variables

To run the app, you'll need to add environment variables in both the `frontend` and `backend` directories.

- **Backend** (`.env` file in `/backend`):

  ```
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  APP_EMAIL_ADDRESS=your app email address
  APP_EMAIL_PASSWORD=your app password
  DOMAIN_LINK=your frontend link
  ```

- **Frontend** (`.env` file in `/frontend`):
  ```
  REACT_APP_API_URL=http://localhost:4000/api
  ```

## Usage

### Running the backend server:

```bash
cd backend
npm start
```

### Running the frontend app:

```bash
cd frontend
npm start
```

### Running both together:

You can use a tool like **concurrently** to run both the client and server simultaneously in development mode.

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000`.

## API Endpoints

- **Authentication**:

  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Login user.

- **Posts**:

  - `GET /api/posts` - Get all posts.
  - `GET /api/posts/:id` - Get a single post by ID.
  - `POST /api/posts` - Create a new post (Requires authentication).
  - `PUT /api/posts/:id` - Update a post (Requires authentication).
  - `DELETE /api/posts/:id` - Delete a post (Requires admin privileges).

- **Comments**:

  - `POST /api/comments` - Add a comment to a post.
  - `GET /api/comments/:postId` - Get comments for a post.

- **Categories**:

  - `GET /api/categories` - Get all categories.
  - `POST /api/categories` - Add a new category.

- **Password Reset**:
  - `POST /api/password/reset` - Send a password reset link.
  - `PUT /api/password/reset/:userId/:token` - Reset password.
