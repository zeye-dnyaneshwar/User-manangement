# Voosh- User Management System

## Description
Our user management system is a streamlined platform where individuals can create, update, and view profiles within a vibrant community 

## Features
- **Create Profile:** Users can create their profile.
- **Update Profile:**
  - User can update his profile
- **Watch:** Users can watch public profiles.
- **Signout:** Users can logout.
- **GitHub Auth:** Users can login through github.
- **Admin:** Admin Can See all profiles.

## Installation

### For Backend Server
1. Clone the repository: `git clone https://github.com/zeye-dnyaneshwar/User-manangement.git`
2. Navigate to the project directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file.
5. Add MongoDB URL in the `.env` file for connection: `MONGO_URL = <Mongo Database URL>`
6. Add JWT_SECRET_KEY in the `.env` file: `JWT_SECRET_KEY = <Your JWT secret key>`
7. Add the port number in the `.env` file: `PORT = <port number>`
8. Add CLIENT_ID in the `.env` file: `CLIENT_ID=<client id>`
9. Add CLIENT_SECRET in the `.env` file: `CLIENT_SECRET=<client secret>`
10. Start the backend server: `npm run dev`

### For Frontend Server
1. Navigate to the project directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the frontend server: `npm run dev`

### For Swagger Documentation
- Link:- `https://user-manangement.onrender.com/api/v1/docs/`

## Tech Stack
- **Frontend:** ReactJS 
- **Backend:** NodeJs, Express, MongoDB, JSON Web Token (JWT),bcrypt ,GitHub auth.


## API Endpoints

-**BaseUrl** `https://user-manangement.onrender.com/api/v1`

### Auth Routes

#### 1. Register

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Parameters:**
  - `name` (string): User's name.
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response:**
  - Success: 200 OK, User Created successfully, along with user details and authentication token.
  - Conflict: 409 conflict, User already exists.
  - Error: 400 Bad Request, Error message.

#### 2. Login
- **Endpoint:** `POST /auth/login`
- **Description:** Logs in an existing user.
- **Parameters:**
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response:**
  - Success: 200 OK, Login successful, along with authentication token.
  - Not Found: 404 OK, User not found.
  - Unauthorized: 401 OK, Incorrect password.
  - Error: 400 Bad Request, Error message.

#### 3. Logout
- **Endpoint:** `POST /auth/logout`
- **Description:** user logout.
- **Parameters:**
  - `token` (string): User's login token.
- **Response:**
  - Success: 200 OK, Logout successful.
  - Error: 400 Bad Request, Error message.

### Github Routes

#### 1. Get Access Token
- **Endpoint:** `GET /git/accessToken`
- **Description:** Get access token from git.
- **Query:**
  - `code` (string): code provided by github authorize in url.
- **Response:**
  - Success: 200 OK, access token and user's github email.
  - Error: 400 Bad Request, Error message.

#### 2. Get User data 
- **Endpoint:** `GET /git/getUserData`
- **Description:** Get User Data from git.
- **Query:**
  - `email` (string): pass the email.
- **Response:**
  - Success: 200 OK, Login Successfull with  github userData.
  - Error: 400 Bad Request, Error message.

### User Routes

#### 1. UpdateProfile
- **Endpoint:** `PATCH /users/update/:id`
- **Description:** Updates the existing user.
- **Parameters:**
  - `id` (string): User ID.
- **Request Body:**
  - can be name,email,password,image,phone,accountType("Public","Private")
- **Authentication:** Requires a valid authentication token.
- **Response:**
  - Success: 200 OK, User Updated Successfully.
  - Conflict: 409 Conflict, Email is already present.
  - Not Found: 401 Not Authorized, You can not update others profile.
  - Error: 400 Bad Request, Error message.

#### 2. Get Users
- **Endpoint:** `GET /users`
- **Description:** Retrieves all Users.
- **Authentication:** Requires authentication.
- **Authorization:** Admin can see all the users normal user can see only public profile users.
- **Response:**
  - Success: 200 OK, List of Users.
  - Error: 400 Bad Request, Error message.

#### 3. Get One User
- **Endpoint:** `GET /users/:id`
- **Description:** Get only one user.
- **Authentication:** Requires authentication.
- **Authorization:** If the profile is private then only admin and that perticular user can see the profile.
- **Parameters:**
  - `id` User id.
- **Response:**
  - Success: 200 OK, Particular user details.
  - Unauthorized: 401 ,Not authorized.
  - Error: 400 Bad Request, Error message.

## Flow:- 
  - I have Designed the flow like instagram where first the user have to either register  or login through mail then it will be redirected to the dashboard where he can see the  public profiles and his own profile user can updated his profile while admin will be added manually where admin can see all the users profiles user can sign out.

## Deployed Links

## demo admin credentials
email:- omkar@gmail.com
password: Password@123

- **Backend:** [https://user-manangement-1.onrender.com]
- **Frontend:** [https://user-manangement-mu.vercel.app/]

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.