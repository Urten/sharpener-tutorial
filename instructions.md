TASK: Implement Sequelize Models, Relationships, and API Endpoints
STACK: Node.js + Express + Sequelize (MySQL)

GOAL
Build a bus booking backend using Sequelize ORM with One-to-Many relationships
between Users, Buses, and Bookings. Use a MySQL database named `bus_booking`
running on localhost.

────────────────────────────────────────
1. DATABASE & SEQUELIZE SETUP
────────────────────────────────────────

Database:
- DB Name: bus_booking
- Host: localhost
- Username: guest
- Password: 123456
- Dialect: mysql

Actions:
- Initialize Sequelize with the above configuration
- Authenticate the connection
- Sync all models to the database using sequelize.sync()

Example requirement:
- Use Sequelize models only (no raw SQL tables)
- Convert all data models into Sequelize models

────────────────────────────────────────
2. SEQUELIZE DATA MODELS
────────────────────────────────────────

A. User Model
Fields:
- id (Primary Key, auto-increment)
- name (STRING, required)
- email (STRING, required, unique)

B. Bus Model
Fields:
- id (Primary Key, auto-increment)
- busNumber (STRING, required, unique)
- totalSeats (INTEGER, required)
- availableSeats (INTEGER, required)

C. Booking Model
Fields:
- id (Primary Key, auto-increment)
- seatNumber (INTEGER, required)
- userId (Foreign Key → Users.id)
- busId (Foreign Key → Buses.id)

All models must:
- Be defined using Sequelize.define or class-based models
- Use proper data types and constraints
- Be exported correctly

────────────────────────────────────────
3. MODEL RELATIONSHIPS (ONE-TO-MANY)
────────────────────────────────────────

Users ↔ Bookings
- One User has many Bookings
- One Booking belongs to one User

Associations:
User.hasMany(Booking)
Booking.belongsTo(User)

Buses ↔ Bookings
- One Bus has many Bookings
- One Booking belongs to one Bus

Associations:
Bus.hasMany(Booking)
Booking.belongsTo(Bus)

Ensure:
- Foreign keys are created in Bookings table
- Referential integrity is maintained

────────────────────────────────────────
4. API ENDPOINTS (POSTMAN TESTING)
────────────────────────────────────────

STEP 1: CREATE BASE DATA

Create User
POST /users

Body:
{
  "name": "John Doe",
  "email": "john@example.com"
}

Create Bus
POST /buses

Body:
{
  "busNumber": "MH12AB1234",
  "totalSeats": 40,
  "availableSeats": 30
}

STEP 2: CREATE BOOKING

Create Booking
POST /bookings

Body:
{
  "userId": 1,
  "busId": 1,
  "seatNumber": 10
}

────────────────────────────────────────
5. FETCH DATA USING SEQUELIZE ASSOCIATIONS
────────────────────────────────────────

Get All Bookings for a Specific User (Include Bus Details)
GET /users/:id/bookings

Expected Response:
[
  {
    "id": 1,
    "seatNumber": 10,
    "bus": {
      "busNumber": "MH12AB1234"
    }
  }
]

Get All Bookings for a Specific Bus (Include User Details)
GET /buses/:id/bookings

Expected Response:
[
  {
    "id": 1,
    "seatNumber": 10,
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]

────────────────────────────────────────
6. DELIVERABLES
────────────────────────────────────────

- Sequelize configured and connected to MySQL (bus_booking)
- All models converted to Sequelize models
- sequelize.sync() used to create tables
- One-to-Many associations correctly defined
- CRUD endpoints for Users, Buses, and Bookings
- Association-based queries using Sequelize include
- Clean, logically correct API responses
