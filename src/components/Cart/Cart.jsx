import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import EmptyCart from '../../Assets/images/emptyCart.jpg'

function Cart() {
  let [cartData, setCartData] = useState(null)
  let { getCartDetails, removeCartItem, updateItemQty, clearCart } = useContext(CartContext);

  async function getCartData() {
    try {
      let { data } = await getCartDetails();
      setCartData(data)
    } catch (err) {
      return err
    } finally {

    }
  }

  async function removeItem(productId) {
    let { data } = await removeCartItem(productId);

    if (data.status === 'success') {
      setCartData(data);
      toast.success('Item deleted successfully :)')
    }
  }

  async function updateQty(id, count) {
    let { data } = await updateItemQty(id, count);
    setCartData(data)
  }

  async function clearAll() {
    let { data } = await clearCart()
    setCartData(data);
  }

  useEffect(() => {
    getCartData()
  }, [])

  return <div>
    <Toaster />
    <div className="p-3 cartDetails my-2">
      <h2>Cart Details</h2>
      <div className="w-75">
        <h4 className="text-main">Products Count : {cartData?.numOfCartItems}</h4>
        <h5 className="text-main">Total Cart Price : {cartData?.data?.totalCartPrice}</h5>
      </div>

      {cartData ? cartData?.data?.products.map((product) => {
        return <div key={product.product._id} className="row border-bottom my-1 py-2">
          <div className="col-md-2 p-0">
            <div className="w-100 p-0 text-center ">
              <img className="w-75" src={product.product.imageCover} alt="" />
            </div>
          </div>
          <div className="col-md-10 pe-3 ps-0 py-4  d-flex justify-content-between">
            <div>
              <h5>{product.product.title.split(' ').slice(0, 2).join(' ')}</h5>
              <span className="text-main d-block py-2">Price : {product.price}</span>
              <button onClick={() => removeItem(product.product._id)} className="btn text-danger ps-0"><i className="fas fa-trash"></i> Remove</button>
            </div>

            <div className="countDiv">
              <button onClick={() => updateQty(product.product._id, product.count + 1)} className="btn countBtn">+</button>
              <span className="mx-2 itemCount">{product.count}</span>
              <button onClick={() => updateQty(product.product._id, product.count - 1)} className="btn countBtn">-</button>
            </div>
          </div>

        </div>
      })
        :
        ''}

      {cartData?.numOfCartItems <= 0 ?
        <div className="w-100 text-center mt-5">
          <img src={EmptyCart} alt="" className="w-75" />
          <Link className="btn bg-main text-white w-75" to='/'>Search For Products</Link>
        </div>

        :
        <div className="w-100 mt-4">
          <input onClick={() => clearAll()} className="btn bg-main w-100 text-white" type="button" value="Clear Cart" />
        </div>
      }
    </div>


  </div>;
}

export default Cart;
