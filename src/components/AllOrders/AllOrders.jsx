import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";

function AllOrders() {
  let { allOrders, cartData } = useContext(CartContext);

  async function getAllOrders() {
    let response = await allOrders(cartData);
    console.log(response);

  }

  useEffect(() => {
    getAllOrders();
  }, [])
  return <h2>AllOrders</h2>;
}

export default AllOrders;
