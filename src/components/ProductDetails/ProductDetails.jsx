import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  let { id } = useParams();

  async function getProductDetails(id) {
    let productData = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    console.log(productData);

    return productData;
  }

  let { data, isLoading, isError } = useQuery({ queryKey: ["ProductDetails"], queryFn: () => getProductDetails(id) });

  return <>
    <h2>ProductDetails</h2>
    {data?.data.data ? <div className="row">
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

          <input type="text" className="btn bg-main text-white" value={'Add To Cart'} />
        </div>
      </div>
    </div>
      :
      ''}

  </>;
}

export default ProductDetails;
