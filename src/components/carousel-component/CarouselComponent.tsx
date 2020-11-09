import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import carouselClasses from "./CarouselComponent.module.css";

interface Props {
  key?: string;
  selectedProductImages: any[];
}

const CarouselComponent: React.SFC<Props> = (props) => {
  useEffect(() => {
    if (props.selectedProductImages && props.selectedProductImages.length > 0) {
      (document.getElementById(
        "carouselSection"
      ) as HTMLElement).style.display = "block";
      (document.getElementById(
        "carouselOverlay"
      ) as HTMLElement).style.display = "block";
    }
  }, [props.selectedProductImages]);
  let closeCarousel = () => {
    (document.getElementById("carouselSection") as HTMLElement).style.display =
      "none";
    (document.getElementById("carouselOverlay") as HTMLElement).style.display =
      "none";
  };
  return (
    <>
      <div
        className={carouselClasses.overlay}
        id="carouselOverlay"
        onClick={closeCarousel}
      ></div>
      <div className={carouselClasses.carouselWrapper} id="carouselSection">
        <Carousel>
          {props.selectedProductImages.map((image, index) => {
            return (
              <div key={"courelimg" + index}>
                <img alt="product" src={image.href} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComponent;
