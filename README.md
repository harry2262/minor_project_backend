

# Hostel Room Booking Backend

This repository provides a backend API for managing hostel room bookings. The application supports user authentication, OTP-based verification, room allocation, and hostel management. It is built with **Node.js**, **Express.js**, and **MongoDB**.

## Features

- **User Authentication**:
  - Register and log in with JWT-based authentication.
  - OTP-based email verification.
- **Room Booking**:
  - Book rooms in hostels.
  - Check room availability.
- **Hostel Management**:
  - Add and update hostel details.
  - Manage room data with capacity and occupants.
- **Email Notifications**:
  - Send emails for OTP verification and booking notifications.
- **Robust Error Handling**:
  - Custom middleware for structured error responses.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing user, hostel, and room information.
- **Redis**: Queues for sending emails efficiently.
- **BullMQ**: Task queue for asynchronous email processing.
- **SendGrid**: Email delivery.
- **JWT**: Token-based authentication.

## Getting Started

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system.
2. **MongoDB**: Install and configure MongoDB.
3. **Redis**: Install and start the Redis server.
4. **SendGrid API Key**: For sending emails.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd hostel-room-booking-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   DB_LOCAL_URI=mongodb://localhost:27017/hostel
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_TIME=7d
   COOKIE_EXPIRES_TIME=7
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_cloud_api_key
   CLOUDINARY_API_SECRET=your_cloud_api_secret
   SMTP_PASSWORD=your_sendgrid_api_key
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```

4. Start the application:
   ```bash
   npm start
   ```

### API Endpoints

#### User Routes

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| POST   | `/api/v1/user/register` | Register a new user.       |
| POST   | `/api/v1/user/login`    | Log in a user.             |
| POST   | `/api/v1/user/logout`   | Log out a user.            |
| POST   | `/api/v1/user/bookRoom` | Book a room in a hostel.   |
| POST   | `/api/v1/user/sendEmail`| Send email notification.   |

#### OTP Routes

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/api/v1/otp/sendOtp`  | Send an OTP to a user email. |
| POST   | `/api/v1/otp/verifyOtp`| Verify an OTP.              |

#### Hostel Routes

| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| POST   | `/api/v1/hostel/addHostel`| Add a new hostel.               |
| PATCH  | `/api/v1/hostel/updateHostel`| Update hostel details.          |
| GET    | `/api/v1/hostel/:id`     | Get details of a specific hostel.|
| POST   | `/api/v1/hostel/bookRoom`| Book a room in a hostel.         |
| POST   | `/api/v1/hostel/addhostelandrooms`| Add a hostel and its rooms.  |
| GET    | `/api/v1/hostel/:hostelName/roomCounts`| Get room count by floor. |
| GET    | `/api/v1/hostel/:hostelName/getBookedRooms`| Get all booked rooms. |

### Project Structure

```
/
├── config/               # Configuration files (database connection)
├── controllers/          # Controllers for handling routes
├── middleWares/          # Custom middleware (auth, error handling)
├── models/               # Mongoose schemas for database
├── routes/               # API route definitions
├── utils/                # Utility functions (email, JWT, queues)
├── app.js                # Main application configuration
├── server.js             # Server initialization
├── docker-compose.yaml   # Docker configuration
└── package.json          # Dependencies and scripts
```

### Deployment

To deploy using Docker, ensure `docker` and `docker-compose` are installed, and run:
```bash
docker-compose up --build
```

