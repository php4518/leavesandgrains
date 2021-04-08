import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import About from '../../components/about/about';
import NewsLetter from '../../components/news-letter/news-letter';
import News from '../../components/news/news';
import Product from '../../components/product/product';

import Banner from '../../images/Home/sanitizer.png';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Home extends Component {

  goto = (page) => () => {
    this.props.history.push(page);
  }

  render() {
    return (
      <div className="home">
        <section className="home--banner text-white d-flex align-items-center">
          <Container>
            <Row>
              <Col md={7}>
                <div className="d-flex flex-column justify-content-center align-items-start h-100">
                  <h3 className="section--title">Our Promise</h3>
                  <div className="section--info">
                    <p><strong>High-quality, locally-sourced products, guaranteed.</strong></p>
                    <img src={Banner} alt="Sanitizer" className="w-auto d-block d-md-none banner--mob" />
                    <p>
                      We’re here to help businesses protect their workforce.
                      Our all-American sourcing provides you with a secure supply chain and generates work opportunities
                      throughout the country. By choosing WashAway, you can support your company and your country.
                    </p>
                  </div>
                  <Button variant="success" onClick={this.goto('/shop')}>Buy Now</Button>
                </div>
              </Col>
              <Col md={5} className="text-center d-md-block d-none">
                <img src={Banner} alt="Sanitizer" className="w-auto" height="422" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="home--news d-flex align-items-center">
          <Container className="p-xl-0">
            <News />
          </Container>
        </section>

        <section className="home--about d-flex align-items-center">
          <Container>
            <About />
          </Container>
        </section>

        <section className="home--product">
          <Container>
            <Product />
          </Container>
        </section>

        <section className="home--newsLetter d-flex align-items-center">
          <Container>
            <NewsLetter />
          </Container>
        </section>

      </div>
    );
  }
}

export default Home;
