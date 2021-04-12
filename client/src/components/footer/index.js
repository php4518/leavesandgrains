import React from "react";
import {Container, Row} from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://twitter.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  rel="noreferrer"
                  title="Follow us on Twitter"
                >
                  <i className="fa fa-twitter" />
                  <p className="d-lg-none">Twitter</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  rel="noreferrer"
                  title="Like us on Facebook"
                >
                  <i className="fa fa-facebook-square" />
                  <p className="d-lg-none">Facebook</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                  target="_blank"
                  rel="noreferrer"
                  title="Follow us on Instagram"
                >
                  <i className="fa fa-instagram" />
                  <p className="d-lg-none">Instagram</p>
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Leaves and Grains
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
