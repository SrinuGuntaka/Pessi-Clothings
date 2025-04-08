// client/src/pages/HomePage.js

import React from 'react';
import HomeCarousel from '../components/HomeCarousel';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TrendingCard from '../components/TrendingCard';
import DiscountsCard from '../components/DiscountsCard';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      <HomeCarousel />
      <Container className="mt-4">
        <h2 className="text-center mb-4" style={{ fontWeight: '700' }}>
          Welcome to our Clothing Store
        </h2>
        <p className="text-center mb-5" style={{ fontSize: '1.2rem' }}>
          Discover the latest trends and unbeatable discounts on your favorite clothing.
        </p>
        <Row className="mb-5">
          {/* Wishlist Card */}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card
              className="text-center shadow-sm border-0"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Body>
                <FaHeart size={48} color="#ff4757" />
                <Card.Title className="mt-3">Wishlist</Card.Title>
                <Card.Text>Save your favorite items for later.</Card.Text>
                <Button variant="outline-danger" onClick={() => navigate('/wishlist')}>
                  View Wishlist
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Cart Card */}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card
              className="text-center shadow-sm border-0"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Body>
                <FaShoppingCart size={48} color="#2ed573" />
                <Card.Title className="mt-3">Cart</Card.Title>
                <Card.Text>Check out our amazing deals.</Card.Text>
                <Button variant="outline-success" onClick={() => navigate('/cart')}>
                  Go to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Trending Card */}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <TrendingCard />
          </Col>

          {/* Discounts Card */}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <DiscountsCard />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
