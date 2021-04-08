import React, { useState } from 'react';
import './product.scss';
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import ProductBanner from "../../images/Home/product.png";
import Toggle from "../../images/icon_toggle.png";
import ToggleExpanded from "../../images/icon-toggle-expaned.png";

const allProducts = [
  {
    title: 'Quality Formula',
    description: 'Our sanitizer formula adheres to the highest standards, so you can ensure your workers remain protected.',
  },
  {
    title: 'Cost Effective',
    description: 'We take a fixed price cut on all of our products to prevent price gouging.',
  },
  {
    title: '99.99% Protection',
    description: 'Our sanitizer provides 99.99% protection against germs, including viral particles.',
  },
  {
    title: 'Ease of Use',
    description: 'We sell industrial sprayers that evenly and cleanly distribute our sanitizer formula. One gallon covers 20 square feet.',
  },
  {
    title: 'Great Alternative',
    description: 'WashAway uses all-American sourcing and manufacturing, so you can contribute to job creation across the country while protecting your supply chain.',
  },
];
const Product = () => {
  const [activeAccordion, setActiveAccordion] = useState(undefined);
  return (
    <div className="product--wrapper">
      <Row>
        <Col md={6}>
          <img src={ProductBanner} alt="" height="460" className="bannerImg" />
        </Col>
        <Col md={6}>
          <h3 className="section--title mt-5 mb-4">Our Product</h3>
          <Accordion>
            {
              allProducts.map(({ title, description }, index) => <Card className="bg-transparent">
                <Card.Header className="bg-transparent">
                  <Accordion.Toggle as={Button} variant="link" eventKey={index} onClick={() => setActiveAccordion((index === activeAccordion) ? undefined : index)}>
                    {title}
                    <img src={(activeAccordion === index) ? ToggleExpanded : Toggle} alt="" width="24" className="float-right" />
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body className="px-0">{description}</Card.Body>
                </Accordion.Collapse>
              </Card>)
            }
          </Accordion>
        </Col>
      </Row>
    </div>
  )
};

export default Product;
