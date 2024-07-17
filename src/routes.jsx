// import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import { element } from "prop-types";
import SettingsRedirect from "./pages/SettingsPage/SettingsRedirect.jsx";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </AdminRoute>
    ),
  },
  {
    path: "/settings/:tabName",
    element: (
      <AdminRoute>
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      </AdminRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsRedirect />
      </ProtectedRoute>
    ),
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
