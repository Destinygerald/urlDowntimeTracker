# Url Downtime Tracker Frontend

This is the frontend for **Url Downtime Tracker**, a Learning Management System (LMS) designed to help students and instructors interact with educational content, complete assignments, track progress, and more. The application is built with **Next.js**, providing a seamless, modern, and responsive user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **Url Downtime Tracker Frontend** is a React-based application that powers the user interface for the Downtime tracker app. It integrates with a backend to provide features like:

- **Authentication**: User registration, login, and session management.
- **Downtime**: Users can see and get notified of url downtime.

## Features
- **User Authentication**: Secure user login and registration with JWT authentication.
- **Downtime**: Users can see and get notified of url downtime..

## Technologies Used

- **React.js** - Js framework used for building the frontend.
- **Axios** - HTTP client for making API requests.
- **Redux** (optional) - For global state management (if applicable).
- **TypeScript** - For static typing and improved developer experience (if applicable).

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Destinygerald/urlDowntimeTracker.git


2. **Navigate to the project directory:**
    ```bash
    cd programming-lab-frontend

3. Install the dependencies:
    ```bash
    npm install

or if you're using yarn
    ```bash
    yarn add

4. Getting Started
To run the project locally in development mode:
    ```bash
    npm run dev

## Project Structure
### Here’s a breakdown of the project's directory structure:
    ```
    /src/pages                - Page components, including routes for courses, assignments, login, etc.
    /src/components           - Reusable components (header, footer, forms, etc.)
    /public                   - Public assets (images, fonts, etc.)
    /src/styles               - Global CSS styles and Tailwind config
    /src/utils                - Utility functions and API helpers
    /services                 - API calls to interact with the backend
    /src/redux                - Redux for global state management
    /package.json             - Project metadata and dependencies
