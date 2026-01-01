import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import FeaturedProducts from "./components/Home/FeaturedProducts";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import CounterContextProvider from "./Context/CounterContext";
import { UserContext } from "./Context/UserContext";
import { useContext, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><FeaturedProducts /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {

  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])

  return (

    <CartContextProvider>
      <CounterContextProvider>
        <RouterProvider router={routers}>
          <Layout />
        </RouterProvider>
      </CounterContextProvider>
    </CartContextProvider>

  );
}

export default App;
