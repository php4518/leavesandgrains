import React from "react";
import { Card, Carousel, CarouselCaption, CarouselIndicators, CarouselItem } from "reactstrap";
import { getImageUrl } from "../../helpers/utils";

const ImageCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div className="image-gallery">
        <div className="image-container">
          <input type="radio" name="gallery_group" id="image1" checked />
          <div className="image-1">
            <label className="prev" htmlFor="image4"></label>
            <label className="next" htmlFor="image2"></label>
          </div>
          <input type="radio" name="gallery_group" id="image2" />
          <div className="image-2">
            <label className="prev" htmlFor="image1"></label>
            <label className="next" htmlFor="image3"></label> </div>
          <input type="radio" name="gallery_group" id="image3" />
          <div className="image-3">
            <label className="prev" htmlFor="image2"></label>
            <label className="next" htmlFor="image4"></label> </div>
          <input type="radio" name="gallery_group" id="image4" />
          <div className="image-4">
            <label className="prev" htmlFor="image3"></label>
            <label className="next" htmlFor="image1"></label> </div>
        </div>
        <div className="thumbnails">
          <label htmlFor="image1"></label>
          <label htmlFor="image2"></label>
          <label htmlFor="image3"></label>
          <label htmlFor="image4"></label>
        </div>
      </div>
      {/* <center>
        <h1 id="heading">Image Gallery</h1>
        <div id="img-box">
          <img id="img-right" src="https://wallpapercave.com/wp/wp4708299.jpg" alt="right" />
          <img id="img-left" src="https://wallpapercave.com/wp/wp4708245.jpg" alt="left" />
          <img id="img-cen" src="https://wallpapercave.com/wp/wp3698669.jpg" alt="" />
          <img id="img-1" src="https://wallpapercave.com/wp/wp4708299.jpg" alt="" />
          <img id="img-2" src="https://wallpapercave.com/wp/wp4708245.jpg" alt="" />
          <img id="img-3" src="https://wallpapercave.com/wp/wp3698669.jpg" alt="" />
        </div>
      </center> */}

      {/* <h1>3d images gallery</h1>
      <div className="container">
        <div id="carousel">
          <figure><img src="https://wallpapercave.com/wp/wp4708299.jpg" alt="" /></figure>
          <figure><img src="https://wallpapercave.com/wp/wp4708245.jpg" alt="" /></figure>
          <figure><img src="https://wallpapercave.com/wp/wp3698669.jpg" alt="" /></figure>
          <figure><img src="https://wallpapercave.com/wp/wp4708299.jpg" alt="" /></figure>
          <figure><img src="https://wallpapercave.com/wp/wp4708245.jpg" alt="" /></figure>
          <figure><img src="https://wallpapercave.com/wp/wp3698669.jpg" alt="" /></figure>
          <figure><img src="https://images.unsplash.com/photo-1568051243847-b6319fad107c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure><img src="https://images.unsplash.com/photo-1568094328197-3d83d7cbfe94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" /></figure>
          <figure><img src="https://images.unsplash.com/photo-1568022316712-0886fa296902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" /></figure>
        </div>
      </div> */}
    </>
    //   <div className="section" id="carousel">
    //   <div className="page-carousel mb-0">
    //     <Carousel
    //       activeIndex={activeIndex}
    //       next={next}
    //       previous={previous}
    //     >
    //       <CarouselIndicators
    //         items={items}
    //         activeIndex={activeIndex}
    //         onClickHandler={goToIndex}
    //       />
    //       {items.map((item, index) => {
    //         return (
    //           <CarouselItem
    //             onExiting={onExiting}
    //             onExited={onExited}
    //             key={getImageUrl(item)}
    //           >
    //             <img src={getImageUrl(item)} alt={item.altText}/>
    //             <CarouselCaption
    //               captionText={index.toString()}
    //               captionHeader=""
    //             />
    //           </CarouselItem>
    //         );
    //       })}
    //       {
    //         items.length > 1 &&
    //         <>
    //           <a
    //             className="left carousel-control carousel-control-prev"
    //             data-slide="prev"
    //             href="#pablo"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               previous();
    //             }}
    //             role="button"
    //           >
    //             <span className="fa fa-angle-left"/>
    //             <span className="sr-only">Previous</span>
    //           </a>
    //           <a
    //             className="right carousel-control carousel-control-next"
    //             data-slide="next"
    //             href="#pablo"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               next();
    //             }}
    //             role="button"
    //           >
    //             <span className="fa fa-angle-right"/>
    //             <span className="sr-only">Next</span>
    //           </a>
    //         </>
    //       }
    //     </Carousel>
    //   </div>
    // </div>
  );
}

export default ImageCarousel;
