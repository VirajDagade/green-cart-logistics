## 1. Project Overview & Purpose

GreenCart Logistics is a full-stack web application designed to streamline logistics operations. It enables managers to efficiently manage drivers, routes, and orders while providing simulation features to optimize delivery performance and profitability. The app supports role-based access, task management, and real-time analytics to improve decision-making in logistics.

---

## 2. Setup Steps

This repository contains two main parts:

- **/backend** — Node.js/Express API server
- **/frontend** — React.js client application

You will need to set up both parts locally to run the full application.

---

## 3. Tech Stack Used

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
- **Database:** MongoDB Atlas (Cloud-hosted)
- **Deployment:** Vercel (Frontend), Railway (Backend)
- **Testing:** Postman for API endpoints
- **Version Control:** Git & GitHub

---

## 4. Setup Instructions

### Backend

1. Navigate to `/backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies
   npm install

3. Create a .env file in /backend with the required environment variables (see section 5).

4. Run the development server:
   npm run dev

5. Backend API will run at http://localhost:5000

Frontend

1. Navigate to /frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Create a .env file in /frontend with the required environment variables (see section 5).

4. Run the React development server:
   npm run dev

5. Frontend app will run at http://localhost:5173

6. Environment Variables

Backend (/backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=515d1v51f5v1f55b5fb5fbcdcvdvd

Frontend (/frontend/.env)
VITE_API_URL=http://localhost:5000/api

6. Deployment Instructions
   Backend deployed on Railway.app with environment variables configured for MongoDB Atlas and JWT secret.

Frontend deployed on Vercel connected to the backend API.

MongoDB database hosted on MongoDB Atlas (cloud service).

Steps to deploy:

Push your code to GitHub (separate /backend and /frontend folders).

Set up Railway project, link GitHub backend repo, configure environment variables, and deploy backend.

Set up Vercel project, link GitHub frontend repo, configure VITE_API_URL to backend URL, and deploy frontend.

Verify both deployments are accessible via public URLs.

Available Endpoints & Example Requests/Responses
Auth
POST /api/auth/login
Request:

json
Copy
Edit
{
"email": "manager@example.com",
"password": "password123"
}
Response:

json
Copy
Edit
{
"token": "jwt_token_here"
}
Drivers
GET /api/drivers (Requires Auth)
Response:

json
Copy
Edit
[
{
"\_id": "driverId123",
"name": "John Doe",
"shift_hours": 8,
"past_week_hours": [8,7,9,8,6,7,8]
}
]
POST /api/drivers (Requires Auth)
Request:

json
Copy
Edit
{
"name": "Jane Smith",
"shift_hours": 8,
"past_week_hours": [8,7,8,8,7,6,8]
}
Response: Newly created driver object.

Orders
GET /api/orders (Requires Auth)
Response:

json
Copy
Edit
[
{
"_id": "orderId123",
"order_id": "ORD001",
"value_rs": 1200,
"assigned_route": "routeId123",
"delivery_timestamp": "2025-08-12T09:00:00.000Z"
}
]
Simulation
POST /api/simulation (Requires Auth)
Request:

json
Copy
Edit
{
"availableDrivers": 5,
"startTime": "09:00",
"maxHoursPerDriver": 8
}
Response:

json
Copy
Edit
{
"totalProfit": "1234.56",
"efficiencyScore": "85.00",
"onTimeDeliveries": 25,
"lateDeliveries": 5,
"fuelCostTotal": "150.00"
}

8. Repository & Live Links
   GitHub Repository: https://github.com/VirajDagade/green-cart-logistics

   Frontend Live URL: https://green-cart-logistics-seven.vercel.app/

   Backend API URL: https://green-cart-logistics.onrender.com/

Developed by
Viraj Dagade
