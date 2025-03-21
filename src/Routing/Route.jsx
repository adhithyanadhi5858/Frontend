import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout"
import ErrorPage from "../pages/User/ErrorPage"
import Register from "../pages/User/RegisterPage";
import Login from "../pages/User/LoginPage"
import ProductPage from "../pages/User/ProductDetailsPage";
import CartPage from "../pages/User/CartPage";
import ProfilePage from "../pages/User/ProfilePage";
import ProductsPage from "../pages/User/ProductsPage";
import HomePage from "../pages/User/HomePage";
import WhishListPage from "../pages/User/WhishListPage";
import ContactPage from "../pages/User/ContactPage";
import AboutPage from "../pages/User/AboutPage";
import OrdersPage from "../pages/User/OrdersPage";
import UserProtectionPage from "./UserProtectionPage";
import AdmineLayout from "../layout/AdmineLayout";
import AdmineHome from "../pages/Admine/AdmineHome";
import AdmineLoginPage from "../pages/Admine/AdmineLogin";
import AdmineError from "../pages/Admine/AdmineError";
import AdminProfile from "../pages/Admine/AdmineProfile";
import AdminOrderPage from "../pages/Admine/AdminOrderPage";
import AdminProductsPage from "../pages/Admine/AdminProductPage";
import AdminUsersPage from "../pages/Admine/AdminUsers";
import AdminUpdateProduct from "../pages/Admine/AdmineUpdateProduct";
import AdmineProtection from "./AdmineProtection";
import PaymentSuccess from "../pages/User/PaymentSuccesPage";
import PaymentError from "../pages/User/PaymentErrorPage";


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
        path: "/products",
        element: <ProductsPage />
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
        path: "/product-details/:productId",
        element: <ProductPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "user",
        element: <UserProtectionPage />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />
          },
          {
            path: "whishlist",
            element: <WhishListPage />
          },
          {
            path: "cart",
            element: <CartPage />
          },
          {
            path: "orders",
            element: <OrdersPage />
          },
          {
            path: "payment/success",
            element: <PaymentSuccess/>
          },
          {
            path: "payment/cancel",
            element: <PaymentError/>
          },
        ]
      },

    ]
  },
  {
    path: "admine",
    element: <AdmineLayout />,
    errorElement: <AdmineError />,
    children: [
      {
        path: "login",
        element: <AdmineLoginPage />
      },
      {
        path: "",
        element: <AdmineProtection />,
        children: [
          {
            path: "",
            element: <AdmineHome />
          },
          {
            path: "orders",
            element: <AdminOrderPage />
          },
          {
            path: "products",
            element: <AdminProductsPage />
          },
          {
            path: "users",
            element: <AdminUsersPage />
          },
          {
            path: "products/update/:productId",
            element: <AdminUpdateProduct />
          },
          {
            path: "profile",
            element: <AdminProfile />
          }

        ]

      }



    ]
  }

]);
