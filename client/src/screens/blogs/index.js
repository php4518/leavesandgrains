import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    CarouselControl,
    Carousel,
    CarouselItem,
    CarouselIndicators,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

const Blogs = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    // State for Animation
    const [animating, setAnimating] = React.useState(false);

    // Sample items for Carousel
    const items = [
        {
            caption: 'Sample Caption One', src:
                'https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg',
            altText: 'Slide One',
            title: 'INTRODUCING OUR PLANT-BASED RANGE MAKEOVER',
            desc: 'You asked, we listened. Our plant-based meals have received a protein boost! We’ve now packed at least 20g of protein in every plant-based meal. Check ou'
        },
        {
            caption: 'Sample Caption Two', src:
                'https://images.everydayhealth.com/images/why-are-healthy-eating-habits-important-alt-722x406.jpg',
            altText: 'Slide Two',
            title: 'UPDATE: FASTER & MORE FREQUENT DELIVERY WITH MY MUSCLE CHEF',
            desc: 'Your meal prep just got a whole lot easier and faster with our NEW delivery schedule! More delivery days, more flexibility, and more time for you! Find out more in'
        },
        {
            caption: 'Sample Caption Two', src:
                'https://www.sjpl.org/sites/default/files/styles/hero_image/public/2019-08/teensreach-1400.jpg?h=d59b0d8b&itok=vPmnrTfX',
            altText: 'Slide Two',
            title: 'WHAT TO EAT WHEN YOURE SICK THIS WINTER',
            desc: 'Not feeling well this winter? Heres an Accredited Sports Dietitians guide to the best immune-boosting foods to eat when youre sick and symptom- ridden.'
        }
    ];

    // Items array length
    const itemLength = items.length - 1

    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    // Carousel Item Data
    const carouselItemData = items.map((item) => {
        return (
            <CarouselItem
                key={item.src}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img src={item.src} alt={item.altText} />
                <div className="carousel-caption">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                </div>
            </CarouselItem>
        );
    });

    return (
        <>
            <div
                className="page-header"
                data-parallax={true}
            >
                <div className="filter" />
                <div style={{
                    display: 'block', width: "100%"
                }}>
                    <Carousel previous={previousButton} next={nextButton}
                        activeIndex={activeIndex}>
                        <CarouselIndicators items={items}
                            activeIndex={activeIndex}
                            onClickHandler={(newIndex) => {
                                if (animating) return;
                                setActiveIndex(newIndex);
                            }} />
                        {carouselItemData}
                        <CarouselControl directionText="Prev"
                            direction="prev" onClickHandler={previousButton} />
                        <CarouselControl directionText="Next"
                            direction="next" onClickHandler={nextButton} />
                    </Carousel>
                </div >
            </div>
            <div className="main">
                <Container>
                    <div className="row pt-5">
                        <div className="col-12">
                            <h3 className="text-uppercase border-bottom mb-4">Latest Articles </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/1423619/pexels-photo-1423619.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Japanese Street </h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis. </p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/10154570/pexels-photo-10154570.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Sahara Desert Mountain</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Beautiful Girl Portrait</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/1423619/pexels-photo-1423619.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Japanese Street </h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis. </p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/10154570/pexels-photo-10154570.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Sahara Desert Mountain</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Beautiful Girl Portrait</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/1423619/pexels-photo-1423619.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Japanese Street </h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis. </p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/10154570/pexels-photo-10154570.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Sahara Desert Mountain</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/9469740/pexels-photo-9469740.jpeg" className="card-img-top" alt="Card Image" />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Beautiful Girl Portrait</h5>
                                    <p className="card-text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus tortor ac nisi blandit volutpat. Vestibulum pellentesque eros elit, ac blandit ante fringilla quis.</p>
                                    <a href="#"><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row style={{
                        display: 'block', padding: 30, textAlign: 'center'
                    }}>
                        <Pagination>
                            {/* <PaginationItem disabled={currentPage <= 0}>
                            <PaginationLink onClick={handlePreviousClick} previous href="#" />
                        </PaginationItem> */}
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">4</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">5</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Row >
                </Container>
            </div>
        </>
    );
}

export default Blogs;
