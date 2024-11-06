# Thrifty-Tracker

Thrifty-Tracker is a web application that allows users to easily manage  their expences and also keep the track of their transactions. This MERN-stack project manages all the information about Income-transaction,Expensec-transaction, and also keep details of all the due transaction.

## Description

Thrifty-Tracker streamlines the process of managing expences by providing a user-friendly platform where users can view income-transaction,expense-transaction , and Due-transaction.
## Features

- **User Authentication**: Users can sign up and log in with their profiles.
- **Transaction Management**: Thrifty_tracker manages all information related to transaction.
- **Reset Password/Forgot Password**: User can reset their password.
- **Search**:User can search for the transaction based on different criteria likes name,date,category.
- **Delete/Update**: User can update and delete their transaction.

## Tech Stack

Thrifty-Tracker is built using the MERN stack:

- **MongoDB**: For the database to store all data related to users, transaction,due-transaction.
- **Express**: For the backend server to handle API requests and manage the application logic.
- **React**: For the frontend to create a dynamic and responsive user interface.
- **Node.js**: For the backend runtime environment to execute JavaScript code server-side.

## Installation

To run Thrifty-Tracker locally, follow these steps:

1. **Clone the repository**:

   ```bash
      https://github.com/amit02-ux/Thrifty-Tracker.git
    cd Thrifty_tracker
   ```

2. **Install backend dependencies**:

   ```bash
   npm install
   ```

3. **Install frontend dependencies**:

   ```bash
   cd client
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `Thrifty-Tracker` directory and add the following environment variables:

   ```plaintext
   PORT=your_server_running_port
   DEV_MODE=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**:
   Open two terminal windows/tabs:

   - In the first terminal, start the backend server:
     ```bash
     npm start
     ```
   - In the second terminal, start the frontend development server:
     ```bash
     cd client
     npm start
     ```

6. **Access the application**:
   Open your web browser and go to `http://localhost:3000`.

## Usage

1. **Sign Up/Login**: Users can create an account or log in with an existing account.
2. **Add transaction**:User can add the transaction.
3. **Manage transaction**: user can update their transaction with relevant information.


## Contributing

We welcome contributions to Thrifty-Tracker. If you'd like to contribute, please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

Thank you for using Thrifty-Tracker!

