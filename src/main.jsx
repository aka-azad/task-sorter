import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "./Pages/LoginPage.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import TaskBoard from "./Pages/TaskBoard.jsx";

const router = new createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TaskBoard />,
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />

        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
