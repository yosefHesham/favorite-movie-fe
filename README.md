# Favorite Movies & TV Shows Web Application (Frontend)

This project is the frontend of a full-stack web application designed to manage a list of favorite movies and TV shows. It's built with a modern technology stack to provide a fast, responsive, and user-friendly experience.

### Features

- **Add New Entry**: A clean, responsive form allows users to add new movie or TV show entries with details like title, director, budget, location, and year/time.
- **Image Upload**: Entries can be enhanced with an image poster or thumbnail, with uploads handled by the ImgHippos service.
- **Display Entries**: All records are beautifully presented in a responsive table.
- **Infinite Scroll**: The table efficiently loads more records as the user scrolls, providing a smooth experience even with a large number of entries.
- **Edit and Delete**: Each entry includes buttons for editing its details or deleting it from the list after a confirmation.
- **Modern UI/UX**: The application uses Shadcn UI components and TailwindCSS for a clean, accessible, and responsive design.
- **Notifications**: User actions are confirmed with clear and modern toasts powered by Sonner.
- **Separation of Concerns**: All network calls are neatly organized in a dedicated `src/api` directory for better code organization and maintainability.

### Technology Stack

- **React (with Vite and TypeScript)**: A powerful combination for building user interfaces with a fast development environment and strong type safety.
- **TailwindCSS**: A utility-first CSS framework for rapid and consistent styling.
- **Shadcn UI**: A collection of accessible and customizable components that seamlessly integrates with TailwindCSS.
- **`react-hook-form`**: A highly performant and flexible library for form management and validation.
- **Sonner**: A modern, composable toast library for user notifications.
- **ImgHippos**: The service used for handling image uploads.

---

### Setup Instructions

Follow these steps to get the frontend application running locally.

**Prerequisites**

- Node.js (LTS version recommended)
- npm or Yarn
- A running backend server for the application.

**Steps**

1.  **Clone the repository and navigate to the frontend directory:**

    ```bash
    git clone https://github.com/yosefHesham/favorite-movie-fe.git
    cd favorite-movie-fe
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

3.  **Configure the backend API URL:**

    clone my backend repository from [here](https://github.com/yosefHesham/favorite-movie-be).

    Create a `.env` file in the root of the frontend directory and add your backend's API URL.

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

    _Note: If your backend is deployed, use its live URL instead._

4.  **Run the development server:**

    ```bash
    npm run dev
    # or yarn dev
    ```

The application will start, and you can view it by navigating to `http://localhost:5173` in your browser.
