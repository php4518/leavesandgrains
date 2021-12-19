import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getBlogs } from 'redux/actions/blog';
import BlogCard from "../../components/blog-card";
import BlogDetails from "../../components/blog-card/blog-details";
import AddBlogDetails from "../../components/blog-card/add-blog-details";
import DeleteBlogDetails from "../../components/blog-card/delete-blog";
import MenuHeader from "../../components/header/menuHeader";
import { CALORIES_TYPES, CARBS_TYPES, FAT_TYPES, MEAL_TYPES, PROTEIN_TYPES, SORT_TYPES } from "../../helpers/constants";
import AppAlert from "../../components/alert";

const Blogs = (props) => {
    const dispatch = useDispatch();
    const { allBlogs, blogStatus, individualMeals } = useSelector(({ blog, cart }) => ({
        allBlogs: blog.blogs,
        blogStatus: blog.blogStatus,
        individualMeals: cart.individualMeals
    }));

    const [blogs, setBlogs] = useState([]);
    const [blogDetail, showBlogDetails] = useState(null);
    const [editBlogDetail, showEditBlogDetails] = useState(null);
    const [deleteBlogDetail, showDeleteBlogDetails] = useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [addBlogDetail, showAddBlogDetails] = useState(null);
    const [isForm, setIsForm] = useState(false);
    // State for Animation
    const [animating, setAnimating] = React.useState(false);
    useEffect(() => dispatch(getBlogs()), []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => setBlogs(allBlogs), [allBlogs]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (addBlogDetail || editBlogDetail) {
            setIsForm(true);
        } else {
            setIsForm(false);
        }
    })
    // Sample items for Carousel
    const items = [
        {
            caption: 'Sample Caption One',
            src: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg',
            altText: 'Slide One',
            title: 'INTRODUCING OUR PLANT-BASED RANGE MAKEOVER',
            desc: 'You asked, we listened. Our plant-based meals have received a protein boost! We’ve now packed at least 20g of protein in every plant-based meal. Check ou'
        },
        {
            caption: 'Sample Caption Two',
            src: 'https://images.everydayhealth.com/images/why-are-healthy-eating-habits-important-alt-722x406.jpg',
            altText: 'Slide Two',
            title: 'UPDATE: FASTER & MORE FREQUENT DELIVERY WITH MY MUSCLE CHEF',
            desc: 'Your meal prep just got a whole lot easier and faster with our NEW delivery schedule! More delivery days, more flexibility, and more time for you! Find out more in'
        },
        {
            caption: 'Sample Caption Two',
            src: 'https://www.sjpl.org/sites/default/files/styles/hero_image/public/2019-08/teensreach-1400.jpg?h=d59b0d8b&itok=vPmnrTfX',
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

    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    const handleAddItem = (item) => {
        if (props.onMealSelect) {
          props.onMealSelect(item)
        }
      };

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
                        {userRole.role === "ADMIN" ?
                            <Button className="btn-info float-right" color="info" onClick={showAddBlogDetails}>
                                Add New Blog
                            </Button>
                            : null
                        }
                    </div>
                    <AppAlert alert={blogStatus} />
                    {!isForm ?
                        <Row>
                            {
                                (!blogs.length) ? <Col className="no-data-available">No blogs available</Col> :
                                    blogs.map((item, index) =>
                                        <Col key={index} lg="4" md="8" sm="8">
                                            <BlogCard blog={item} onClick={showBlogDetails} onEditClick={showEditBlogDetails} onDeleteClick={showDeleteBlogDetails} addItem={handleAddItem}
                                                quantity={individualMeals[item._id]?.quantity} />
                                        </Col>
                                    )
                            }
                        </Row>
                        :
                        <>
                            {editBlogDetail && editBlogDetail !== '' ?
                                <AddBlogDetails blog={editBlogDetail} toggleModal={() => showEditBlogDetails(null)} />
                                :
                                <AddBlogDetails blog={addBlogDetail} toggleModal={() => showAddBlogDetails(null)} />
                            }
                        </>
                    }
                    {/* <div className="row">
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
                        </div>
                    */}
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
