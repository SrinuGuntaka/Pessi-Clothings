import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get current user
  const userWishlistKey = `wishlist_${user?.email}`;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const savedWishlist = JSON.parse(localStorage.getItem(userWishlistKey)) || [];
      setWishlist(savedWishlist);
    }
  }, [user]);

  const handleRemove = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product._id !== productId);
    localStorage.setItem(userWishlistKey, JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const handleMoveToCart = (product) => {
    const userCartKey = `cart_${user?.email}`;
    const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    if (!savedCart.some((item) => item.product._id === product._id)) {
      savedCart.push({ product, quantity: 1 });
      localStorage.setItem(userCartKey, JSON.stringify(savedCart));
    }

    handleRemove(product._id);
    alert('Moved to Cart!');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '10px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <div className="d-flex justify-content-between mt-2">
                    <Button variant="success" size="sm" onClick={() => handleMoveToCart(product)}>
                      Move to Cart
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(product._id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </Container>
  );
};

export default WishlistPage;
