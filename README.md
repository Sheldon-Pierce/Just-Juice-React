# Just-Juice

This is a README file for the Just-Juice E-commerce site. The project utilizes React, Redux, Chakra-UI, and other related technologies to create a fully functional ecommerce website for selling juices. It provides a foundation for building an online store with features such as product listings, shopping cart management, user authentication, and more.

## Website

https://just-juice.onrender.com/

Due to the hosting service, first load is always slow as Render works in the background.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine using `git clone https://github.com/your-username/just-juice.git`.
2. Navigate to the project directory.
3. Install dependencies:
   - Run `npm install` in the root directory to install server dependencies.
   - Navigate to the `client` folder.
   - Run `npm install` to install the client dependencies.
4. Create a `.env` file in the `server` folder and add necessary environment variables.
5. Start the client and server simultaneously:
   - In the root directory, run `npm run app`.
   - This command uses the `concurrently` package to run the client and server concurrently.
   - The client will be running on `http://localhost:3000`.
   - The server will be running on `http://localhost:5000`.
6. Open your browser and visit `http://localhost:3000` to view the Just-Juice application.

## Usage

The Just-Juice ecommerce site provides the following functionality:

- **Product Listings**: Browse and view available juices with details like name, price, and description.
- **Shopping Cart**: Add juices to the shopping cart, update quantities, and remove items.
- **Checkout**: Proceed to the checkout process, enter shipping and payment information.
- **User Authentication**: Register a new account or login with existing credentials.
- **Order History**: View past order details and status.
- **Admin Panel**: Perform administrative tasks such as adding new products, managing inventory, and more.

Feel free to customize the project according to your specific requirements for the Just-Juice store.

## Folder Structure

The folder structure of the Just-Juice project is organized as follows:

```
├── server
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── database.js
│   ├── index.js
│   └── ...
└── client
    ├── public
    │   └── ...
    └── src
        ├── components
        ├── redux
        ├── screens
        ├── App.js
        ├── index.css
        └── index.js
```

- **`server`**: Contains the server-side code for handling requests and managing the backend of Just-Juice.
  - **`middleware`**: Contains middleware functions for the server.
  - **`models`**: Contains the database models for Just-Juice.
  - **`routes`**: Defines the routes and endpoints for the Just-Juice API.
  - **`database.js`**: Configuration file for connecting to the database.
  - **`index.js`**: Entry point of the server application.

- **`client`**: Contains the client-side code for the Just-Juice React application.
  - **`public`**: Contains the public assets and the HTML file for the Just-Juice application.
  - **`src`**: Contains the main source code of the React application.
    - **`components`**: Contains reusable components used throughout the Just-Juice application.
    - **`redux`**: Contains Redux actions, reducers, and store configuration for Just-Juice.
    - **`screens`**: Defines the different screens/pages of the Just-Juice application.
    - **`App.js`**: The main component that renders the Just-Juice application.
    - **`index.css`**: Global CSS styles for the Just-Juice application.
    - **`index.js`**: Entry point of the Just-Juice application.

## Technologies

The Just-Juice project is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Redux: A predictable state container for managing application state.
- React Router: A library for routing and navigation in React applications.
- Axios: A promise-based HTTP client for making API calls.
- Chakra-UI: A flexible UI component library for React applications.
- CSS Modules: A CSS naming convention that allows scoping of styles to specific components.
- Express.js: A web application framework for building the server-side of Just-Juice.
- MongoDB: A NoSQL database used for storing data in Just-Juice.
- Concurrently: A utility for running multiple commands concurrently.
- Other dependencies as specified in the `package.json` files.

## Contributing

Contributions to the Just-Juice project are welcome. Feel free to open issues and submit pull requests.

When contributing, please ensure that you follow the existing coding style and conventions.
