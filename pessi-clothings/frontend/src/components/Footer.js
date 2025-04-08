// client/src/components/Footer.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link,} from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-light text-center text-lg-start mt-4">
    <Container className="p-4">
      <Row>
        <Col lg={4} md={6} className="mb-4 mb-md-0">
          <h5 className="text-uppercase">Pessi Clothing's</h5>
          <ul className="list-unstyled mb-0">
            <li>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>

            </li>
            <li>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            </li>
          </ul>
        </Col>
        <Col lg={4} md={6} className="mb-4 mb-md-0">
          <h5 className="text-uppercase">Support</h5>
          <ul className="list-unstyled mb-0">
            <li>
              <Link to="/faq" className="text-dark text-decoration-none">FAQ</Link>
            </li>
            <li>
              <Link to="/help" className="text-dark text-decoration-none">Help</Link>
            </li>
          </ul>
        </Col>
        <Col lg={4} md={12} className="mb-4 mb-md-0">
          <h5 className="text-uppercase">Our Details</h5>
          <p>Lakkavaram, Prakasam Dist</p>
          <p>Email: guntakasrinu768@gmail.com</p>
          <p>Phone: +91 6301108437</p>
        </Col>
      </Row>
    </Container>
    <div className="text-center p-3 bg-dark text-white">
      © {new Date().getFullYear()} E-Commerce. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
