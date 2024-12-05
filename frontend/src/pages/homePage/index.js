import { memo } from "react";
import "./style.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import i1Img from "../../assets/svg/slider/i1.jpg";
import i2Img from "../../assets/svg/slider/i2.jpg";
import i3Img from "../../assets/svg/slider/i3.jpg";
import i4Img from "../../assets/svg/slider/i4.jpg";
import i5Img from "../../assets/svg/slider/i5.jpg";

const homePage = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const sliderItems = [
    {
      itemImg: i1Img,
      name: "",
    },
    {
      itemImg: i2Img,
      name: "",
    },
    {
      itemImg: i3Img,
      name: "",
    },
    {
      itemImg: i4Img,
      name: "",
    },
    {
      itemImg: i5Img,
      name: "",
    },
  ];

  return (
    <div className="homePage">
      <div className="homePage-banner col-xl-10">
        <img src={require("../../assets/svg/banner.png")} alt="Banner" />
      </div>
      <div className="homePage-content">
        {/*Categories Begin*/}
        <div className="container-slider">
          <Carousel responsive={responsive} className="slider">
            {sliderItems.map((item, key) => (
              <div key={key} className="slider-item"
                style={{ backgroundImage: `url(${item.itemImg})` }}>
                    <p>{item.name}</p>
              </div>
            ))}
          </Carousel>
        </div>
        {/*Categories End*/}
      </div>
    </div>
  );
};

export default memo(homePage);
