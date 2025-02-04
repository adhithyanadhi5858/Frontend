import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout"
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import AdmineDashBoard from "../pages/AdmineDashBoard";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";


export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/product-details",
        element: <ProductPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "admine-dashboard",
        element: <AdmineDashBoard />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      }

    ]
  },

]);
