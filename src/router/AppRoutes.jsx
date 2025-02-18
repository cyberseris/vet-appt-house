import { createHashRouter, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import VeterinaryPage from "../pages/VeterinaryPage";
import UserPage from "../pages/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthWrapper from "../components/auth/AuthWrapper";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "veterinary", element: <VeterinaryPage /> },
      {
        path: "user",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <UserPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: (
      <AuthWrapper isAuthenticated={true}>
        <AuthLayout />
      </AuthWrapper>
    ),
    children: [{ path: "login", element: <LoginPage /> }],
  },
];

const AppRoutes =
  process.env.NODE_ENV === "production"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

export default AppRoutes;
