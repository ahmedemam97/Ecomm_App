import { useContext } from "react";
import { CounterContext } from "../../Context/CounterContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

function FeaturedProducts() {
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
    let response = await addToCart(id)
    console.log(response);

  }

  return <>
    {!isLoading ? <div className="">
      <h2>FeaturedProducts</h2>
      {console.log(data?.data.data)}
      <div className="row gap-2">
        {data?.data.data.map((product) => {
          return <div className="product mx-auto col-lg-2 col-md-3 col-sm-5 mt-5 cursor-pointer d-flex flex-column justify-content-between p-1" key={product.id}>
            <Link to={`productDetails/${product.id}`} >
              <div>
                <img className="w-100" src={product.imageCover} alt={product.title.split(' ', 2)} />
                <div className="text-main">{product.brand.name}</div>
                <p>{product.title.split()}</p>
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
            <input type="button" onClick={() => addProduct(product.id)} className="btn bg-main text-white w-100" value={'Add To Cart'} />
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
