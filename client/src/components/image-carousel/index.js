import React from "react";
import {Card, Carousel, CarouselCaption, CarouselIndicators, CarouselItem} from "reactstrap";
import {getImageUrl} from "../../helpers/utils";

const ImageCarousel = ({items}) => {
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
    <div className="section" id="carousel">
      <Card className="page-carousel mb-0 h-auto">
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items.map((item, index) => {
            return (
              <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={getImageUrl(item)}
              >
                <img src={getImageUrl(item)} alt={item.altText}/>
                <CarouselCaption
                  captionText={index.toString()}
                  captionHeader=""
                />
              </CarouselItem>
            );
          })}
          {
            items.length > 1 &&
            <>
              <a
                className="left carousel-control carousel-control-prev"
                data-slide="prev"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  previous();
                }}
                role="button"
              >
                <span className="fa fa-angle-left"/>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="right carousel-control carousel-control-next"
                data-slide="next"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                role="button"
              >
                <span className="fa fa-angle-right"/>
                <span className="sr-only">Next</span>
              </a>
            </>
          }
        </Carousel>
      </Card>
    </div>
  );
}

export default ImageCarousel;
