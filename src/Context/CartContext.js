import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem("userToken");

export default function CartContextProvider({ children }) {
  function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers: { token: userToken } }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
