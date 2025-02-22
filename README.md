# Task Management Application - Client Side

## Description

This is the frontend for a Task Management Application built with Vite.js and React. The application allows users to manage their tasks with a drag-and-drop interface. It features authentication via Firebase, real-time task updates, and a modern, responsive UI.

## Live Link

[Live Application](https://task-sorter-by-ashraf.web.app/)

## Technologies Used

- **Frontend:** Vite.js, React, React Router, React Query, Tailwind CSS, DaisyUI
- **Authentication:** Firebase Authentication
- **State Management:** React Query
- **Drag-and-Drop:** @hello-pangea/dnd
- **Notifications:** React Toastify, SweetAlert2

## Dependencies

```json
"dependencies": {
  "@hello-pangea/dnd": "^18.0.1",
  "@tanstack/react-query": "^5.66.8",
  "axios": "^1.7.9",
  "dotenv": "^16.4.7",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-awesome-reveal": "^4.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.4.0",
  "react-router": "^7.1.1",
  "react-toastify": "^11.0.2",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10"
},
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "daisyui": "^4.12.23",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-management-client.git
   cd task-management-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Features

- **User Authentication:** Google sign-in via Firebase.
- **Task Management:** Add, edit, delete, and reorder tasks.
- **Drag-and-Drop:** Move tasks between categories.
- **Real-time Updates:** Sync changes instantly with the backend.
- **Responsive Design:** Works on both desktop and mobile.