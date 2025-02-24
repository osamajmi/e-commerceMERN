import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, CircularProgress } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);


  const Banner = async ()=>{

    try{

        const data = await axios.get("http://127.0.0.1:3030/getBanner/true")
        console.log(data)
        setBanners(data.data.banners)
        setLoading(false)

    }
    catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
   
    Banner();

  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Slider {...settings}>
          {banners.map((banner) => (
            <Box key={banner._id} component="img"
              src={`http://127.0.0.1:3030/uploads/banners/${banner.bannerImage}`}
              alt={banner.bannerTitle}
              sx={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: 2 }}
            />
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default BannerSlider;
