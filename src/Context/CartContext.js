import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem("userToken");

export default function CartContextProvider({ children }) {
  let [cartData, setCartData] = useState(null);

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

  async function getCartDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: { token: userToken },
      }
    );

    setCartData(data);
    console.log(data);

    return data;
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

  function payment(cartId, url, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values },
        { headers: { token: userToken } }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function allOrders(cartId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`)
      .then((response) => response)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartDetails,
        removeCartItem,
        updateItemQty,
        clearCart,
        payment,
        allOrders,
        cartData,
        setCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
