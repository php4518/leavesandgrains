import React, { useState } from "react";
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { contactSupport } from "../../redux/actions/user";
import './stylefolders/css/mainstyle.css';
import "./mypagestyle.scss";

const WeightLossEvent = () => {

    const { state: { order } = {} } = useLocation();
    const dispatch = useDispatch();
    const { userStatus, currentUser = {} } = useSelector(({ user }) => {
        const { userStatus, currentUser } = user;
        return { userStatus, currentUser };
    });
    const { _id: customer, email = '', name = '' } = currentUser;

    const [contactFields, setContactFields] = useState({
        customer,
        order,
        email,
        name,
        subject: '',
        description: '',
    });

    const handleInputChange = (e) => setContactFields({ ...contactFields, [e.target.name]: e.target.value });

    const handleSupportQuery = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(contactSupport(contactFields));
    };

    return (
        <div className="mobile-shift">
            <MenuHeader />
            <section className="featured">
                <Container>
                    <div className="row">

                        <div className="col-lg-3 feature">

                            <i className="icon-suitcase icon-lg"></i>

                            <h2>Resources</h2>

                            <p>Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor.</p>

                            <a href="">Explore more<i className="icon-arrow-long-right"></i></a>

                        </div>

                        <div className="col-lg-3 feature">

                            <i className="icon-dashboard icon-lg"></i>

                            <h2>Training &amp; Funding</h2>

                            <p>Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor.</p>

                            <a href="">Browse training<i className="icon-arrow-long-right"></i></a>

                        </div>

                        <div className="col-lg-3 feature">

                            <i className="icon-cloud icon-lg"></i>

                            <h2>Connect</h2>

                            <p>Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor.</p>

                            <a href="">Connect now<i className="icon-arrow-long-right"></i></a>

                        </div>

                        <div className="col-lg-3 feature">

                            <i className="icon-chat icon-lg"></i>

                            <h2>Communicate</h2>

                            <p>Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor.</p>

                            <a href="">Start now<i className="icon-arrow-long-right"></i></a>

                        </div>
                    </div>
                </Container>
            </section>

            <section className="grid">

                <div className="bg-secondary">

                    <div className="container">

                        <div className="row fitness-first">

                            <div className="col-lg-4 text-block" style={{ bottom: "0px" }}>

                                <div className="text-lockup">

                                    <h3>It's All About</h3>

                                    <h2>Fitness First</h2>

                                    <img src="assets/img/drop-muted.png" />

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

                                    <a href="">Read More</a>

                                </div>

                            </div>

                            <div className="col-lg-8 large-thumb">

                                <div className="stats">

                                    <p>Active Users <span>(34)</span></p>

                                    <img src="assets/img/drop-primary.png" />

                                </div>

                            </div>

                        </div>

                        <div className="row love-your-body">

                            <div className="col-lg-8 large-thumb">

                                <div className="stats">

                                    <p>Products Used <span>(658)</span></p>

                                    <img src="assets/img/drop-primary.png" />

                                </div>

                            </div>

                            <div className="col-lg-4 text-block b-0" style={{ bottom: "0px" }}>

                                <div className="text-lockup">

                                    <h3>Love</h3>

                                    <h2>Your Body</h2>

                                    <img src="assets/img/drop-muted.png" />

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

                                    <a href="">Read More</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="container">

                    <div className="row mid-unit">

                        <div className="col-lg-4 lifestyle">

                            <div className="small-thumb"></div>

                            <div className="text-block">

                                <div className="text-lockup">

                                    <h3>Track Your</h3>

                                    <h2>Lifestyle</h2>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

                                    <i className="icon-user"></i>

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-8 summer-fun">

                            <div className="large-thumb">

                                <p className="date">24th August</p>

                                <div className="category">

                                    <p>Health &amp; Fitness</p>

                                    <i className="icon-tag"></i>

                                </div>

                            </div>

                            <div className="text-block">

                                <div className="text-lockup">

                                    <h2>Summer of Fun</h2>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row bottom-unit">

                        <div className="col-lg-8 get-involved">

                            <div className="large-thumb"></div>

                            <div className="text-block">

                                <div className="text-lockup">

                                    <h3>Helping You</h3>

                                    <h2>Get Involved In Yourself</h2>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.</p>

                                    <img src="assets/img/strawberry.png" />

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-4 eating-habits">

                            <div className="small-thumb"></div>

                            <div className="text-block">

                                <div className="text-lockup">

                                    <h3>Improve Your</h3>

                                    <h2>Eating Habits</h2>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>

                                    <img src="assets/img/avocado.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex social-btns">
                <a className="app-btn blu flex vert" href="http:apple.com">
                    <i className="fa fa-apple"></i>
                    <p>Available on the <br /> <span className="big-txt">App Store</span></p>
                </a>

                <a className="app-btn blu flex vert" href="http:google.com">
                    <i class="fa fa-play" style={{ "font-size": "24px" }}></i>
                    <p>Get it on <br /> <span className="big-txt">Google Play</span></p>
                </a>

                <a className="app-btn blu flex vert" href="http:alphorm.com">
                    <i className="fa fa-desktop"></i>
                    <p>Application <br /> <span className="big-txt">Desktop</span></p>
                </a>
            </div>
            <footer>

                <div className="closer">

                    <div className="closing-claim">

                        <h1>We launch leaders with big ideas</h1>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                    </div>

                </div>

                <div className="bg-angled-left"></div>

                <div className="bg-angled-right"></div>

                <div className="container footer-lockup">

                    <div className="red-angle"></div>

                    <div className="row">

                        <div className="col-lg-4">

                            <h3>Resources</h3>

                            <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam.</p>

                        </div>

                        <div className="col-lg-8">

                            <h3>About us</h3>

                            <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam.</p>

                        </div>

                        <div className="col-lg-5">

                            <h3>Stay in touch</h3>

                            <div className="social-icons">

                                <a href=""><i className="icon-facebook"></i></a>
                                <a href=""><i className="icon-twitter"></i></a>
                                <a href=""><i className="icon-youtube-play"></i></a>
                                <a href=""><i className="icon-linkedin"></i></a>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-lg-8 col-lg-offset-7">

                            <form>
                                <input type="text" placeholder="Your Name" />
                                <input type="email" placeholder="Your Email" spellCheck="false" />

                                <button className="newsletter-btn" type="submit" value="Join Newsletter">Join Newsletter<i className="icon-chevron-circle-right"></i></button>

                            </form>

                        </div>

                    </div>
                </div>

            </footer >
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        </div >
    )
}

export default WeightLossEvent;
