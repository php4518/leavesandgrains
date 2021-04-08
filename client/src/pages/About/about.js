import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import News from '../../components/news/news';
import NewsLetter from '../../components/news-letter/news-letter';

import img1 from '../../images/About/content-1.png';
import img2 from '../../images/About/content-2.png';
import img3 from '../../images/About/content-3.png';
import map from '../../images/About/map.png';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class About extends Component {
  componentDidMount() {
    window.document.title = 'WashAway - About';
  }

  goto = (page) => () => {
    this.props.history.push(page);
  }

  render() {
    return (
      <div className="about-us">
        <section className="about-us--banner text-white d-flex align-items-center">
        </section>
        <section className="about-us--header text-center text-white d-flex align-items-center">
          <Container>
            <div className="about-us--title">Our Mission</div>
            <div className="about-us--subtitle">Equal Protection for All Workers.</div>
            <div className="about-us--info">
              Coronavirus has put businesses in a bind: your workforce is more important to protect than ever,
              but they’re also more difficult to protect. As personal protective equipment manufacturing ramps up,
              we’ve noticed providers catering to individual or medical buyers. WashAway is committed to protecting the businesses left out of this equation.
          </div>
          </Container>
        </section>

        <section className="about-us--content text-dark">
          <div className="wrapper">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Row className="content-row m-0">
                  {
                    [
                      {
                        title: 'Road to Recovery',
                        description: 'The virus has disrupted global supply chains and domestic employment; purchasing from WashAway will secure your supply chain and kickstart American manufacturing. There is a horizon to this pandemic. When we beat COVID-19, we’d like to see our country’s workforce stronger than ever.',
                        image: img1,
                        className: 'd-flex p-0',
                      },
                      {
                        title: 'Providing for Our Community',
                        description: 'You want to protect your work family--we get it. We feel the same way about our community. That’s why we’re committed to creating work opportunities in our hometown and yours.',
                        image: img2,
                        className: 'd-flex p-0',
                      },
                    ].map(({ title, description, image, className = '' }) => {
                      return (
                        <div className={`${className} column mb-md-0 col-12`}>
                          <div className="px-0 mt-md-0 col-12 col-md-6">
                            <div className="image">
                              {
                                image && (
                                  <img src={image} alt="Image" />
                                )
                              }
                            </div>
                          </div>
                          <div className="px-0 mb-md-0 col-12 col-md-6">
                            <div className="content">
                              <div className="title">
                                <div>
                                  <strong>{title}</strong>
                                </div>
                              </div>
                              <div className="description">
                                <span>{description}</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        <section className="about-us--map text-white">
          <Row className="m-0">
            <Col className="column p-0" sm={12}>
              <div className="map">
                <div className="map-image"></div>
              </div>
              <div className="description">
                <div className="title">Locally Made</div>
                <div className="info">
                  Our factory here in Binghamton, New York, is locally-owned and operated. We are a mom-and-pop shop with the capacity of a much larger manufacturer, and we’re sharing our technology to empower local suppliers to compete with international outfits.
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="about-us--promise text-center text-white">
          <Container>
            <div className="about-us--promise--title">Our Promise</div>
            <div className="about-us--promise--subtitle">High-quality, locally-sourced products, guaranteed.</div>
            <div className="about-us--promise--info">
              <Button className="about-us--promise--buy-now" variant="success" onClick={this.goto('/shop')}>BUY NOW</Button>
            </div>
          </Container>
        </section>

        <section className="about-us--news d-flex align-items-center">
          <Container className="p-xl-0">
            <News />
          </Container>
        </section>

        <section className="about-us--newsLetter d-flex align-items-center">
          <Container className="p-xl-0">
            <NewsLetter />
          </Container>
        </section>
      </div>
    );
  }
}

export default About;
