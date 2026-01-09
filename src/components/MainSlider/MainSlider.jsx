import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import img1 from '../../Assets/images/banner-4.jpeg'
import img2 from '../../Assets/images/blog-img-1.jpeg'
import img3 from '../../Assets/images/blog-img-2.jpeg'
import img4 from '../../Assets/images/grocery-banner-2.jpeg'
import img5 from '../../Assets/images/grocery-banner.png'
import img6 from '../../Assets/images/slider-2.jpeg'
import img7 from '../../Assets/images/slider-image-1.jpeg'
import img8 from '../../Assets/images/slider-image-2.jpeg'
import img9 from '../../Assets/images/slider-image-3.jpeg'

function MainSlider() {

  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let { data } = useQuery({ queryKey: ['CategorySlider'], queryFn: getCategories });

  let categoryImgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9];


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: "linear"
  };

  return (<div className="mb-5 mt-3 row gx-0">
    <div className="col-md-8">
      <Slider {...settings}>
        {categoryImgs.map((category, index) => {
          return <img key={index} height={400} style={{ objectFit: 'cover' }} src={category} alt={category[index]} />
        })}
      </Slider>


    </div>

    <div className="col-md-4">
      <img src={img8} alt="" style={{ objectFit: 'cover' }} className="w-100" height={200} />
      <img src={img1} alt="" style={{ objectFit: 'cover' }} className="w-100" height={200} />
    </div>
  </div>)
}

export default MainSlider;
