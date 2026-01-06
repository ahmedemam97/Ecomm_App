import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
function FeaturedProducts() {
  let [cartLoading, setCartLoading] = useState(null);
  let { addToCart } = useContext(CartContext)

  function getFeaturedProducts() {
    let data = axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data;
  }

  let { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['FeaturedProducts'], queryFn: getFeaturedProducts,
    cacheTime: 3000,
    refetchOnWindowFocus: false,
  }
  )

  async function addProduct(id) {
    try {
      setCartLoading(id)
      await addToCart(id);
      toast.success("Product added to cart successfully")
    } catch (err) {
      toast.error(err)
    } finally {
      setCartLoading(null)
    }

  }



  return <>
    {!isLoading ? <div className="">
      <Toaster />

      <div>
        <Helmet >
          <title>Featured Products</title>
        </Helmet>
        <MainSlider />
        <CategorySlider />
      </div>

      <h2>FeaturedProducts</h2>
      <div className="row gap-2">
        {data?.data.data.map((product) => {
          return <div className="product mx-auto col-lg-2 col-md-3 col-sm-5 mt-5 cursor-pointer d-flex flex-column justify-content-between p-1" key={product.id}>
            <Link to={`productDetails/${product.id}`} >
              <div>
                <img className="w-100" src={product.imageCover} alt={product.title} />
                <div className="text-main">{product.brand.name}</div>
                <p>{product.title.split(' ').slice(0, 2).join(' ')}</p>
              </div>
              <div className="">
                <div className="d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <div>
                    <FontAwesomeIcon icon={faStar} className="my-auto rating-color" />
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>
                <div className="mt-2">
                </div>
              </div>
            </Link>

            <button type="button" onClick={() => addProduct(product.id)} className="btn bg-main text-white w-100 d-flex justify-content-center" >
              {cartLoading === product.id ?
                <BallTriangle
                  height={24}
                  width={24}
                  radius={5}
                  color="#fff"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{ padding: '0' }}
                  wrapperClass=""
                  visible={true}
                />
                :
                'Add To Cart'
              }
            </button>

          </div>
        })}

      </div>
    </div>
      :
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
    }


  </>;
}

export default FeaturedProducts;
