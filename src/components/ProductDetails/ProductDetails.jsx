import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function ProductDetails() {
  let [cart, setCart] = useState(false)
  let { id } = useParams();
  let { addToCart } = useContext(CartContext)

  async function getProductDetails(id) {
    let productData = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    console.log(productData);

    return productData;
  }

  let { data, isLoading, isError } = useQuery({ queryKey: ["ProductDetails"], queryFn: () => getProductDetails(id) });

  async function addProduct(id) {
    try {
      setCart(true)
      await addToCart(id)
      toast.success('Product added to cart successfully')
    } catch (err) {
      toast.err(err)
    } finally {
      setCart(false)
    }
  }

  return <>
    {isLoading ?

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
      <>
        <h2>ProductDetails</h2>
        <Toaster />
        {data?.data.data ? <div className="row">
          <Helmet >
            <title>{data?.data.data.title}</title>
          </Helmet>
          <div className="col-md-5 gap-2">
            <img src={data?.data.data.imageCover} alt={data?.data.data.title} className="w-100" />
          </div>
          <div className="details col-md-7 my-auto fs-5">
            <p>{data?.data.data.title}</p>
            <p className="opacity-75 fs-6">{data?.data.data.slug}</p>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <span className="d-block fs-6 opacity-75">{data?.data.data.category.name}</span>
                  <span className="d-block fs-6 opacity-75">{data?.data.data.price} EGP</span>
                </div>

                <div className="">
                  <FontAwesomeIcon className="fs-6 my-auto rating-color" icon={faStar} />
                  <span className="fs-6 ">{data?.data.data.ratingsAverage}</span>
                </div>
              </div>

              <button onClick={() => addProduct(data?.data.data.id)} type="text" className="btn bg-main text-white d-flex justify-content-center">
                {cart ? <BallTriangle
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
                  'Add To Cart'
                }


              </button>
            </div>
          </div>
        </div>
          :
          ''}
      </>
    }

  </>;
}

export default ProductDetails;
