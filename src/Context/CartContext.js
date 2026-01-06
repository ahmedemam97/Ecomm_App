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

  function getCartDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token: userToken },
    });
  }

  function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: userToken },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateItemQty(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers: { token: userToken } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: userToken },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartDetails,
        removeCartItem,
        updateItemQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
