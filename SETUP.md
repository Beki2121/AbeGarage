# Abie Garage Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Backend Setup

1. Navigate to the BackEnd directory:

```bash
cd Abie_Garage-main/BackEnd
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the BackEnd directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=abe_garage

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here

# Server Configuration
PORT=3000
```

4. Set up your MySQL database and import the initial queries from `services/sql/initial-queries.sql`

5. Start the backend server:

```bash
npm start
```

## Frontend Setup

1. Navigate to the FrontEnd directory:

```bash
cd Abie_Garage-main/FrontEnd
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the FrontEnd directory:

```env
VITE_API_URL=http://localhost:3000
```

4. Start the frontend development server:

```bash
npm run dev
```

## Troubleshooting

### JSON Parsing Error

If you encounter "Unexpected end of JSON input" errors:

1. **Check if the backend is running** on port 3000
2. **Verify database connection** - ensure MySQL is running and credentials are correct
3. **Check environment variables** - make sure all required variables are set
4. **Clear browser cache** and restart both frontend and backend servers

### Common Issues

1. **Database Connection Error**:

   - Verify MySQL is running
   - Check database credentials in `.env` file
   - Ensure database exists

2. **CORS Error**:

   - Backend CORS is already configured
   - Make sure frontend is using the correct API URL

3. **Port Already in Use**:
   - Change the PORT in backend `.env` file
   - Update frontend API URL accordingly

## API Endpoints

The backend provides the following main endpoints:

- `/api/employee/login` - Employee login
- `/api/customers` - Customer management
- `/api/vehicles` - Vehicle management
- `/api/orders` - Order management
- `/api/services` - Service management

## Development

- Backend runs on: `http://localhost:3000`
- Frontend runs on: `http://localhost:5173` (Vite default)
- API base URL: `http://localhost:3000/api`
