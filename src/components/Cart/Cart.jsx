import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from '../../Assets/images/emptyCart.jpg'
import { BallTriangle } from "react-loader-spinner";

function Cart() {
  let [clearCartLoader, setClearCartLoader] = useState(false)
  let [cartLoader, setCartLoader] = useState(false)
  let { getCartDetails, removeCartItem, updateItemQty, clearCart, setCartData, cartData } = useContext(CartContext);
  let navigate = useNavigate();

  async function getCartData() {
    try {
      setCartLoader(true)
      let { data } = await getCartDetails();
      console.log(cartData);

    } catch (err) {
      return err
    } finally {
      setCartLoader(false)
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
    setClearCartLoader(true)
    let { data } = await clearCart()
    setClearCartLoader(false)
    setCartData(data);
    toast.success('The Cart Has Been Cleared :(')
    navigate('/')
  }

  useEffect(() => {
    getCartData()
  }, [])

  return <div>
    <Toaster />
    {cartLoader ?
      <div className="d-flex justify-content-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>

      :


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
          <>
            <div className="w-100 mt-4">
              <button onClick={() => clearAll()} className="btn bg-main w-100 text-white d-flex justify-content-center" type="button" >
                {clearCartLoader ?
                  <BallTriangle
                    height={24}
                    width={24}
                    radius={5}
                    color="#fff"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  :
                  "Clear Cart"
                }
              </button>
            </div>

            <div className="d-flex justify-content-around mt-3">
              <Link to={'/payment'} className="btn btn-primary w-25 text-white">Online Payment</Link>
              <Link to={''} className="btn btn-secondary w-25 text-white">Online Payment</Link>
            </div>


          </>
        }
      </div>
    }

  </div>;
}

export default Cart;
