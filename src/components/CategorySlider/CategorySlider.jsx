import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function CategorySlider() {

  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let { data } = useQuery({ queryKey: ['CategorySlider'], queryFn: getCategories });


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  return (<div>
    {console.log(data)}
    <Slider {...settings}>
      {data?.data.data ? data?.data.data.map((category) => {
        return <img height={150} style={{ objectFit: 'cover' }} src={category.image} alt={category.name} />
      }) : ''}
    </Slider>
  </div>)
}

export default CategorySlider;
