# EmployWise User Management App Assignment - Frontend

## Project Overview
This is a React-based user management application that integrates with the Reqres API to provide authentication, user listing, editing, and deletion functionalities.

### Features
- User Authentication
- Paginated User List
- User Edit and Delete Functionality
- Responsive Design
- Error Handling

## Technology Stack
- React
- Axios (for API requests)
- React Router (for navigation)
- Local Storage (for token management)
- Tailwind Css 
- Redux-toolkit

<!-- ## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) -->

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/employwise-user-management.git
cd EmployWise-Assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root with the following:
```
VITE_BASE_URI=https://reqres.in
```

### 4. Run the Application
```bash
npm run dev
```
The application will run on `http://localhost:5173`

## Functionalities

### Authentication
- Login with provided credentials
- Stores authentication token in local storage
- Redirects to user list on successful login

### User Management
- View paginated list of users
- Edit user details
- Delete users
- Responsive design for mobile and desktop

## API Endpoints Used
- `POST /api/login`: User Authentication
- `GET /api/users`: Fetch User List
- `PUT /api/users/{id}`: Update User
- `DELETE /api/users/{id}`: Delete User

## Error Handling
- Graceful error messages for API failures
- Form validation on login and edit screens
- Token expiration management

## Bonus Features
<!-- - Client-side search and filtering -->
- React Router navigation
- Responsive design

## Deployment
Deployed on: [[Vercel Link](https://employ-wise-assignment-azure.vercel.app/auth/login)]

## Notes and Assumptions
- Default login credentials:
  - Email: eve.holt@reqres.in
  - Password: cityslicka
- The application uses mock API from Reqres.in
- Pagination is implemented with 6 users per page

<!-- ## Future Improvements
- Implement more robust authentication
- Add more advanced filtering
- Enhance error handling
- Add unit and integration tests -->

## License
This project is open-source and available under the MIT License.

## Contact
[Mohit Singh Rawat]
[mohit.sr.lvp1021@gmail.com]
```

## Support
Give a ⭐️ if this project helped you!
```

## Running Tests
```bash
npm test
```

## Build for Production
```bash
npm run build
```
