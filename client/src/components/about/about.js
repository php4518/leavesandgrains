import React from 'react';
import './about.scss';
import Icon1 from '../../images/components/about/Flexible-returns.png';
import Icon2 from '../../images/components/about/free-2-day-shipping.png';
import Icon3 from '../../images/components/about/responsibly-sourced.png';
import Icon4 from '../../images/components/about/ethical-pricing.png';
import OwlCarousel from "react-owl-carousel";

const options = {
    margin: 24,
    nav: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 4,

        }
    },
};

const About = () => {
  return (
    <div className="about--wrapper text-center">
        <h3 className="section--title">Why Leaves and Grains?</h3>
        <OwlCarousel className="owl-theme" {...options}>
            <div className="d-flex flex-column align-items-center">
                <div className="icon"><img src={Icon1} alt="Flexible Returns" /></div>
                <div className="mt-4">
                    <h4 className="title">Flexible Returns</h4>
                    <p className="description">
                        Our suppliers are local, so we can offer a flexible, open return policy on all products.
                    </p>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="icon"><img src={Icon2} alt="Free Shipping" /></div>
                <div className="mt-4">
                    <h4 className="title">Free Shipping</h4>
                    <p className="description">
                        We are a dropshipping service that only works with suppliers who provide quick, low-cost shipping.
                    </p>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="icon"><img src={Icon3} alt="Responsibly Sourced" /></div>
                <div className="mt-4">
                    <h4 className="title">Responsibly Sourced</h4>
                    <p className="description">
                        We are committed to ethically sourcing all of our products right here in America.
                    </p>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="icon"><img src={Icon4} alt="Ethical pricing" /></div>
                <div className="mt-4">
                    <h4 className="title">Ethical Pricing</h4>
                    <p className="description">
                        We take a fixed markup on each product to avoid price gouging.
                    </p>
                </div>
            </div>
        </OwlCarousel>
    </div>
  )
};

export default About;
