import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import './footer.scss';

const Footer = () => {
    return (
        <footer className="py-5 bg-primary">
            <Container>
                <Row className="flex-column-reverse flex-md-row">
                    <Col md={6}>
                        <div className="text-white d-block mt-5 copyrights">© 2020 Leavesandgrains. All Rights Reserved.</div>
                        <p className="text-white-50 mt-2 mb-0">
                            Content on leavesandgrains.com is for informational purposes only. The use of this website is subject to terms and conditions.
                        </p>
                    </Col>
                    <Col md={6}>
                        <div className="h-100 d-flex flex-column align-items-md-end align-items-start justify-content-between">
                            <Link className="text-white cursor-disabled">Privacy Policy</Link>
                            <Link className="text-white cursor-disabled">Terms of Use</Link>
                            <Link className="text-white cursor-disabled">Help</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};

export default Footer;
