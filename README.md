# SmartPark - Parking Management System

SmartPark is a web-based parking management system for a company located in Rubavu district, West Province of Rwanda. The system helps manage parking space sales, car entries/exits, and generates reports.

## Features

- User authentication (login/register)
- Dashboard with real-time statistics
- Parking slot management (add/delete slots)
- Car entry and exit processing
- Automatic fee calculation (500 RWF per hour)
- Bill generation with detailed information
- Payment records and receipt printing
- Daily reports generation
- Responsive design

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation and Setup

### Database Setup

1. Install MySQL if you haven't already
2. Create a database named `smartpark_db` (the application will do this automatically if it doesn't exist)
3. Make sure MySQL is running on the default port (3306)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

The application will be available at http://localhost:5173

## Usage

1. Register a new user account
2. Log in with your credentials
3. Use the sidebar navigation to access different features:
   - Dashboard: View overall statistics
   - Parking Slots: View all parking slots and their status, add or delete slots
   - Car Entry: Record a new car entering the parking lot
   - Car Exit: Process a car leaving the parking lot and calculate fees
   - Payments: View payment records, print receipts, and generate reports
   - Reports: Generate and view daily reports with detailed information

## Default Settings

- Fixed hourly parking rate: 500 RWF per hour
- Any duration under one hour is still charged the full hourly rate
- The system automatically creates 20 parking slots on first run
- Additional parking slots can be added through the UI

## License

This project is proprietary and owned by SmartPark company.

## Contact

For any inquiries, please contact SmartPark management.
