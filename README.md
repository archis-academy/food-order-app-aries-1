# Food Order App

This is a comprehensive food ordering application developed using React and Vite. It allows users to browse various food categories, add items to their cart, and place orders seamlessly.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Example User Credentials](#example-user-credentials)


## Features
- **User Authentication**: Secure login and registration.
- **Food Categories**: Browse food items by categories such as  Cold Dishes, Soups, Grills, Appetizers, Desserts.
- **Cart Functionality**: Add, remove, and update items in the cart.
- **Order Management**: Place orders and track their status.
- **Role Based Authentication**: Default User and Admin specific dashboard features.


## Technologies Used
- **Frontend**
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/): A build tool that provides a faster and leaner development experience for modern web projects.
  - [SCSS](https://sass-lang.com/): A CSS preprocessor that adds power and elegance to the basic language.
- **Backend**
  - [Firebase](https://firebase.google.com/): A platform developed by Google for creating mobile and web applications.
- **State Management**
  - [React Context API](https://reactjs.org/docs/context.html): A way to manage global application state.
- **Routing**
  - [React Router](https://reactrouter.com/): A collection of navigational components that compose declaratively with your application.


## Installation
To run this project locally, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/archis-academy/food-order-app-aries-1.git
    cd food-order-app-aries-1
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the development server**
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage
Once the application is running, you can:

1. **Register or Log in** to your account.
2. **Browse** through different food categories.
3. **Add items** to your cart.
4. **View and manage** items in your cart.
5. **Place an order** and track its status.

## Project Structure
The project is organized as follows:

  - **public/**: Contains the static assets.
  - **src/**: Contains the source code for the application.
  - **assets/**: Contains image files and other assets.
  - **components/**: Contains reusable React components.
  - **contexts/**: Contains the context providers for state management.
  - **hooks/**: Contains custom React hooks.
  - **pages/**: Contains the main page components for routing.
  - **services/**: Contains service files for API interactions.
  - **styles/**: Contains global and component-specific styles.
  ## Example User Credentials
Since this project has role based authentication you can use these credentials to log in as an Admin or Default User. Or register as a default user.

**Admin**
```
email: admin@gmail.com
password: 2024Admin
```

**Default User**
```
email: user@gmail.com
password: 2024User
```


---


